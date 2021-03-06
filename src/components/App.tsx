import React, { Component, ErrorInfo, Suspense } from 'react';
import Layout from './layout/Layout';
import Dashboard from './views/Dashboard';
import StoreContext from '../providers/StoreContext';
import { MyFoxMicroSite, SignInCookieFormat, SnippetConfiguration, WithApplicationState } from '../types';
import { fetchBase, fetchSubjectData } from '../actions';
import { ReservationModal } from './common';
import { getCookie } from '../utils/cookies';
import { Loader } from './layout/components';
import { getCurrentWeekDateRange, getProp } from '../utils';
import ThemeContext from '../providers/ThemeContext';
import LocalizationContext from '../providers/LocalizationContext';
import { getTranslation } from '../translations';

interface Props {
    // eslint-disable-next-line no-unused-vars
    logGlobalError: (options: { error: Error, errorInfo: ErrorInfo}) => void;
    isInitialized: boolean;
    configuration: SnippetConfiguration;
}

class App extends Component<Props, WithApplicationState> {
    constructor(props: Props) {
        super(props);
        const { dateFrom, dateTo } = getCurrentWeekDateRange();
        const cookie = getCookie<SignInCookieFormat>('customerData');

        const selectedLanguage = window.localStorage.selectedLanguage || navigator.language;
        this.state = {
            // @ts-ignore
            applicationState: {
                apiConfiguration: props.configuration,
                meta: {
                    isFetching: true,
                    isModalOpen: false,
                    reservationWorkoutId: undefined,
                    isInitialized: true,
                },
                filter: { dateFrom, dateTo, selectedWorkoutId: undefined, selectedLectorId: undefined },
                cookie,
                selectedLanguage,
            },
        };
    }

    componentDidMount = async () => {
        const baseDataP = fetchBase(this.state);
        const subjectDataP = fetchSubjectData(this.state);

        Promise.all([baseDataP, subjectDataP]).then(([baseData, subjectData]) => {
            this.setAppState({ ...this.state, baseData, subjectData, meta: { isFetching: false } });
            const title = subjectData.marketingName || subjectData.name;
            document.title = `${title} rezervace`;
        });
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const { logGlobalError } = this.props;
        logGlobalError({ error, errorInfo });
    }

    setAppState = <T, >(newState: T) => {
        const { applicationState: oldState, ...other } = this.state;
        this.setState({ applicationState: { ...oldState, ...newState }, ...other });
        return this.state;
    }

    render() {
        const { isInitialized } = this.props;

        if (!isInitialized) {
            return <Loader />;
        }
        const micrositeData: MyFoxMicroSite = getProp<WithApplicationState>(this.state, ['applicationState', 'subjectData', 'microsite']);
        // Mock Test data for redesign
        // const micrositeData = {
        //     id: '',
        //     publishSnippet: true,
        //     snippetBackground: 'black',
        //     snippetButtonColor: 'blue',
        //     snippetButtonLink: 'blue',
        //     snippetButtonText: 'blue',
        //     snippetColor: 'red',
        //     snippetLogo: spinner,
        //     snippetNoteLabel: 'blak',
        //     snippetNotePlaceholder: 'This is placeholder',
        //     snippetNoteRequired: false,LocalizedText.tsx
        //     snippetStaffSelect: false,
        // };
        return (
            <StoreContext.Provider value={{ applicationState: this.state, setApplicationState: this.setAppState, getState: () => this.state.applicationState }}>
                <ThemeContext.Provider value={micrositeData}>
                    <LocalizationContext.Provider value={{ localizeText: getTranslation(this.state.applicationState.selectedLanguage) }}>
                        <Layout>
                            <Suspense fallback={<Loader />}>
                                <Dashboard />
                            </Suspense>
                        </Layout>
                        <Loader />
                        <ReservationModal />
                        <div id="modal" />
                    </LocalizationContext.Provider>
                </ThemeContext.Provider>
            </StoreContext.Provider>
        );
    }
}

export default App;
