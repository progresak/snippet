import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ResetStyle from './global/ResetStyle';
import GlobalStyle from './global/GlobalStyle';
import { PageWrapper, Content, Container, TopLine, PageBackground } from './styles';
import withTheme from '../common/withTheme';
import { LoginComponent } from '../common';
import { Header, Footer } from './components';

const TopLineElement = withTheme(TopLine);
const ConnectedGlobalStyle = withTheme(GlobalStyle);
const Layout: React.FC = ({ children }) => (
    <>
        <ResetStyle />
        <ConnectedGlobalStyle />
        <ErrorBoundary>
            <PageBackground />
            <PageWrapper>
                <TopLineElement />
                <Container>
                    <Header />
                    <LoginComponent />
                    <Content>
                        {children}
                    </Content>
                    <Footer />
                </Container>
            </PageWrapper>
        </ErrorBoundary>
    </>
);

export default Layout;
