import React from 'react';
import styled from 'styled-components';
import myFoxLogo from '../../images/logo_myfox.svg';
import { SmallLogo } from '../../common';

export const Footer: React.FC = () => (
    <FooterElement>
        <FooterContent>
            <span>Harmony Body Fitness</span>
            <Copyright>
                <SmallLogo />
                &nbsp;rezervační systém my
                <strong>Fox</strong>
                {' '}
                &copy; www.myFox.cz
            </Copyright>
        </FooterContent>
        <MyFoxLogo src={myFoxLogo} />
    </FooterElement>
);

export default Footer;

/* Styled components */

const MyFoxLogo = styled.img`
  width: 40px;
  align-self: end;
`;

const FooterElement = styled.div`
    background-color: #595959;
    font-weight: 300;
    color: white;
    padding: 15px;
    display: flex;
    justify-content: space-between;
`;

const FooterContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  vertical-align: middle;
  align-items: center;
  justify-content: space-around;
`;

const Copyright = styled.span`
  color: #acacac;
  font-size: 12px;
`;
