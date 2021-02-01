import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ResetStyle from './global/ResetStyle';
import GlobalStyle from './global/GlobalStyle';

const Layout: React.FC = ({ children }) => (
    <>
        <ResetStyle />
        <GlobalStyle />
        <ErrorBoundary>
            {children}
        </ErrorBoundary>
    </>
);

export default Layout;
