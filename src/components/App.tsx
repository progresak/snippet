import React, { Component, ErrorInfo, Suspense } from 'react';
import Layout from './layout/Layout';
import Dashboard from './views/Dashboard';
import StoreContext from '../providers/StoreContext';
import { SnippetConfiguration, WithApplicationState } from '../types';
import { fetchBase, fetchSubjectData } from '../actions';
import { ReservationModal } from './common';

interface Props {
    // eslint-disable-next-line no-unused-vars
    logGlobalError: (options: { error: Error, errorInfo: ErrorInfo}) => void;
    isInitialized: boolean;
    configuration: SnippetConfiguration;
}

const Loader = <h1>LOADING ...</h1>;

class App extends Component<Props, WithApplicationState> {
    constructor(props: Props) {
        super(props);
        this.state = {
            // @ts-ignore
            applicationState: {
                apiConfiguration: props.configuration,
                meta: {
                    isModalOpen: false,
                    reservationWorkoutId: undefined,
                },
            },
        };
    }

    componentDidMount = async () => {
        const { configuration } = this.props;

        const baseData = await fetchBase(configuration);
        const subjectData = await fetchSubjectData(configuration);
        this.setAppState({ baseData, subjectData }); // TODO: fix structure of data

        const { applicationState } = this.state;
        // eslint-disable-next-line no-console
        console.log(applicationState);
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const { logGlobalError } = this.props;
        logGlobalError({ error, errorInfo });
    }

    setAppState = <T, >(obj: T) => {
        const { applicationState: previousApplicationState, ...other } = this.state;
        console.log({ previousApplicationState, obj });
        this.setState({ applicationState: { ...previousApplicationState, ...obj }, ...other });
    }

    render() {
        const { isInitialized } = this.props;

        if (!isInitialized) {
            return Loader;
        }

        return (
            <StoreContext.Provider value={{ applicationState: this.state, setApplicationState: this.setAppState }}>
                <Layout>
                    <Suspense fallback={Loader}>
                        <Dashboard />
                    </Suspense>
                </Layout>
                <ReservationModal />
                <div id="modal" />
            </StoreContext.Provider>
        );
    }
}

export default App;
