import React from 'react';
import LanguageSelector from './LanguageSelector';
import { SmallLogo } from '../../common';
import { withStoreProps } from '../../common/withStateContext';
import { Address } from '../../../types';
import { compose } from '../../../utils';
import { AvatarPlaceholderImg } from '../../common/imageComponents';
import { LocalizedText } from '../../../translations';
import TextKey from '../../../translations/TextKey';
import { AddressLabel, BrandLabel, Image, LanguageWrapper, LogoWrapper, SiteSubTitle, SiteTitle, TitleWrapper, HeaderElement } from './styles';

interface HeaderProps {
    logoUrl: string;
    title: string;
    titleAlternative?: string;
    address: Address;
}

export const Header: React.FC<HeaderProps> = ({ logoUrl, title, titleAlternative, address }) => {
    const fullAddress = `${title} ${address?.street} ${address?.city}`;
    const webTitle = title || titleAlternative || '';
    return (
        <HeaderElement>
            <LogoWrapper>
                {logoUrl
                    ? <Image src={logoUrl} alt="Logo" />
                    : <AvatarPlaceholderImg color="#595959" />}
            </LogoWrapper>
            <TitleWrapper>
                <SiteTitle>{webTitle}</SiteTitle>
                <SiteSubTitle>
                    <LocalizedText textKey={TextKey.Reservation} />
                    {' '}
                    <span>na skupinovou lekci</span>
                </SiteSubTitle>
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
    withStoreProps(['subjectData', 'name'], 'titleAlternative'),
    withStoreProps(['subjectData', 'marketingName'], 'title'),
    withStoreProps(['baseData', 'address'], 'address'),
);

export default withHeaderData(Header);
