import React, { Component, ErrorInfo, Suspense } from 'react';
import Layout from './layout/Layout';
import Dashboard from './views/Dashboard';
import StoreContext from '../providers/StoreContext';
import { SnippetConfiguration, WithApplicationState } from '../types';
import { fetchBase, fetchSubjectData } from '../actions';
import { ReservationModal } from './common';
import { getCookie } from '../utils/cookies';
import { Loader } from './layout/components';
import { getCurrentWeekDateRange } from '../utils';

interface Props {
    // eslint-disable-next-line no-unused-vars
    logGlobalError: (options: { error: Error, errorInfo: ErrorInfo}) => void;
    isInitialized: boolean;
    configuration: SnippetConfiguration;
}

class App extends Component<Props, WithApplicationState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            // @ts-ignore
            applicationState: {
                apiConfiguration: props.configuration,
                meta: {
                    isFetching: true,
                    isModalOpen: false,
                    reservationWorkoutId: undefined,
                },
            },
        };
    }

    componentDidMount = async () => {
        const { configuration } = this.props;

        const baseDataP = fetchBase(configuration);
        const subjectDataP = fetchSubjectData(configuration);
        const cookie = getCookie('customerData');

        const { dateFrom, dateTo } = getCurrentWeekDateRange();

        Promise.all([baseDataP, subjectDataP]).then(([baseData, subjectData]) => {
            this.setAppState({ baseData, subjectData, cookie, meta: { isFetching: false }, filter: { dateFrom, dateTo } }); // TODO: fix structure of data
        });
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const { logGlobalError } = this.props;
        logGlobalError({ error, errorInfo });
    }

    setAppState = <T, >(obj: T) => {
        const { applicationState: previousApplicationState, ...other } = this.state;
        console.log('DEBUG', { previousApplicationState, obj });
        this.setState({ applicationState: { ...previousApplicationState, ...obj }, ...other });
    }

    render() {
        const { isInitialized } = this.props;

        if (!isInitialized) {
            return <Loader />;
        }

        return (
            <StoreContext.Provider value={{ applicationState: this.state, setApplicationState: this.setAppState }}>
                <Layout>
                    <Suspense fallback={<Loader />}>
                        <Dashboard />
                    </Suspense>
                </Layout>
                <Loader />
                <ReservationModal />
                <div id="modal" />
            </StoreContext.Provider>
        );
    }
}

export default App;
