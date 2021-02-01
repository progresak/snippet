import React from 'react';

class ErrorBoundary extends React.Component<{}, { hasError: boolean}> {
    constructor(props: {}) {
        super(props);
        this.state = { hasError: false };
    }

    // eslint-disable-next-line no-unused-vars
    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }

    componentDidCatch(error: any, errorInfo: any) {
        // You can also log the error to an error reporting service
        console.error(error, errorInfo); // LOG INTO SENTRY
    }

    render() {
        const { children } = this.props;
        // @ts-ignore
        const { hasError, error } = this.state;
        if (hasError) {
            // You can render any custom fallback UI

            return (
                <>
                    <h1>Whoops...</h1>
                    <code>
                        {error.message}
                        {error.stack}
                    </code>
                </>
            );
        }

        return children;
    }
}
export default ErrorBoundary;
