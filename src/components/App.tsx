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
        const { dateFrom, dateTo } = getCurrentWeekDateRange();
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
                filter: { dateFrom, dateTo },
            },
        };
    }

    componentDidMount = async () => {
        const { configuration } = this.props;

        const baseDataP = fetchBase(configuration);
        const subjectDataP = fetchSubjectData(configuration);
        const cookie = getCookie('customerData');

        Promise.all([baseDataP, subjectDataP]).then(([baseData, subjectData]) => {
            this.setAppState({ ...this.state, baseData, subjectData, cookie, meta: { isFetching: false } });
        });
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const { logGlobalError } = this.props;
        logGlobalError({ error, errorInfo });
    }

    setAppState = <T, >(newState: T) => {
        const { applicationState: oldState, ...other } = this.state;
        this.setState({ applicationState: { ...oldState, ...newState }, ...other });
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
