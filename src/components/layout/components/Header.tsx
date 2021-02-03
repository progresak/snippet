import React from 'react';
import { AddressLabel, BrandLabel, Image, LanguageWrapper, LogoWrapper, SiteSubTitle, SiteTitle, TitleWrapper, HeaderElement } from './styles';
import LanguageSelector from './LanguageSelector';
import { SmallLogo } from '../../common';
import { withStoreProps } from '../../common/withStateContext';
import { Address } from '../../../types';
import { compose } from '../../../utils';
import placeholder from '../../images/user.svg';

interface HeaderProps {
    logoUrl: string;
    title: string;
    address: Address;
}

export const Header: React.FC<HeaderProps> = ({ logoUrl, title, address }) => {
    const fullAddress = `${title} ${address?.street} ${address?.city}`;
    const logoSrc = logoUrl || placeholder;
    return (
        <HeaderElement>
            <LogoWrapper>
                <Image src={logoSrc} alt="Logo" />
            </LogoWrapper>
            <TitleWrapper>
                <SiteTitle>{title}</SiteTitle>
                <SiteSubTitle>Rezervace na skupinovou lekci</SiteSubTitle>
                <AddressLabel>{fullAddress}</AddressLabel>
            </TitleWrapper>
            <LanguageWrapper>
                <LanguageSelector />
                <BrandLabel>
                    Rezervační systém
                    {' '}
                    <br />
                    <SmallLogo />
                    <span>myFox</span>
                </BrandLabel>
            </LanguageWrapper>
        </HeaderElement>
    );
};
const withHeaderData = compose(
    withStoreProps(['subjectData', 'microsite', 'snippetLogo', 'url'], 'logoUrl'),
    withStoreProps(['subjectData', 'name'], 'title'),
    withStoreProps(['baseData', 'address'], 'address'),
);

export default withHeaderData(Header);
