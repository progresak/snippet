import React from 'react';
import logoImage from '../../images/logooo.png';
import { AddressLabel, BrandLabel, Image, LanguageWrapper, LogoWrapper, SiteSubTitle, SiteTitle, TitleWrapper, HeaderElement } from './styles';
import LanguageSelector from './LanguageSelector';
import { SmallLogo } from '../../common';

export const Header: React.FC = () => (
    <HeaderElement>
        <LogoWrapper>
            <Image src={logoImage} alt="Logo" />
        </LogoWrapper>
        <TitleWrapper>
            <SiteTitle>Harmony Body Fitness</SiteTitle>
            <SiteSubTitle>Rezervace na skupinovou lekci</SiteSubTitle>
            <AddressLabel>Harmony Body, U Zvonařky 7, Praha</AddressLabel>
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

export default Header;
