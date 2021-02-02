import React from 'react';
import styled from 'styled-components';
import myFoxLogo from '../../images/logo_myfox.svg';
import { SmallLogo } from '../../common';
import { withStoreProps } from '../../common/withStateContext';

interface FooterProps {
    title: string;
}
export const Footer: React.FC<FooterProps> = ({ title }) => (
    <FooterElement>
        <FooterContent>
            <span>{title}</span>
            <Copyright>
                <SmallLogo />
                &nbsp;rezervační systém my
                <strong>Fox</strong>
                {' '}
                &copy;
                {' '}
                <Link href="https://www.myfox.cz">www.myFox.cz</Link>
            </Copyright>
        </FooterContent>
        <MyFoxLogo src={myFoxLogo} />
    </FooterElement>
);

const withFooterData = withStoreProps(['subjectData', 'name'], 'title');

export default withFooterData(Footer);

/* Styled components */

const MyFoxLogo = styled.img`
  width: 40px;
  align-self: end;
`;
const Link = styled.a`
    text-decoration: none;
    color: #acacac;
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
