import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ResetStyle from './global/ResetStyle';
import GlobalStyle from './global/GlobalStyle';
import { PageWrapper, Content, Container, TopLine, PageBackground } from './styles';
import { Header, Footer } from './components';
import { LoginComponent } from '../common';

const Layout: React.FC = ({ children }) => (
    <>
        <ResetStyle />
        <GlobalStyle />
        <ErrorBoundary>
            <PageBackground />
            <PageWrapper>
                <TopLine />
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
