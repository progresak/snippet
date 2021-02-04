import React from 'react';
import styled from 'styled-components';
import { SignInCookieFormat } from '../../types';
import { compose, isEmptyObject } from '../../utils';
import { withActionProps, withStoreProps } from './withStateContext';
import { logOut } from '../../actions/state';

interface LoginComponentProps {
    cookie: SignInCookieFormat;
    logout: () => void;
}
const LoginComponent = ({ cookie, logout }: LoginComponentProps) => {
    if (undefined === cookie || isEmptyObject(cookie)) {
        return null;
    }

    const { name, surname } = cookie;
    return (
        <Wrapper>
            <SignInText>
                {`Přihlašujete se jako: ${name} ${surname}, `}
            </SignInText>
            <LogoutText onClick={logout}>
                odhlásit
            </LogoutText>
        </Wrapper>
    );
};

const withCookieData = compose(
    withStoreProps('cookie', 'cookie'),
    withActionProps(logOut, 'logout'),
);

export default withCookieData(LoginComponent);

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    margin-top: 5px;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

const SignInText = styled.span``;
const LogoutText = styled.span`
    margin-left: 5px;
    color: #6cb91c;
    cursor: pointer;
    text-decoration: underline;
`;
