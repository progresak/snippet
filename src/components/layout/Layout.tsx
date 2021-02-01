import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import ResetStyle from './global/ResetStyle';
import GlobalStyle from './global/GlobalStyle';
import { PageWrapper, Content, Container, TopLine } from './styles';
import { Header, Footer } from './components';

const Layout: React.FC = ({ children }) => (
    <>
        <ResetStyle />
        <GlobalStyle />
        <ErrorBoundary>
            <PageWrapper>
                <TopLine />
                <Container>
                    <Header />
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
