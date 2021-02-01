import React from 'react';
import ErrorBoundary from './ErrorBoundary';

const plainDisplay = true;

const Layout: React.FC = ({ children }) => (
    <ErrorBoundary>
        {!plainDisplay ? (
            <div>
                {children}
            </div>
        ) : (
            children
        )}
    </ErrorBoundary>
);

// can be connected
export default Layout;
