import React, { Component, ErrorInfo, Suspense } from 'react';

import Layout from './layout/Layout';
import { Dashboard } from './views/dashboard';

interface Props {
    // eslint-disable-next-line no-unused-vars
    logGlobalError: (options: { error: Error, errorInfo: ErrorInfo}) => void;
    isInitialized: boolean;
}

const Loader = <h1>LOADING ...</h1>;

class App extends Component<Props, {}> {
    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        const { logGlobalError } = this.props;
        logGlobalError({ error, errorInfo });
    }

    render() {
        const { isInitialized } = this.props;

        if (!isInitialized) {
            return Loader;
        }

        return (
            <Layout>
                <Suspense fallback={Loader}>
                    <Dashboard />
                </Suspense>
            </Layout>
        );
    }
}

export default App;
