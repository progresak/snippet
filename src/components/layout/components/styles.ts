import styled from 'styled-components';

export const Image = styled.img`
    width: 100px;
    height: 100px;
`;

export const BrandLabel = styled.p`
    font-size: 10px;
    font-weight: 300;
    color: #acacac;
      & >span {
        font-size: 12px;
    }
`;

export const TitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

export const LanguageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const LogoWrapper = styled.div`
    max-width: 100px;
    background: white;
    padding: 5px;
    border-radius: 7px;
    border: 1px solid #acacac;
  
    margin-left: 20px; // TODO: hide for mobile
    margin-bottom: -30px;
`;

export const SiteTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

export const SiteSubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

export const AddressLabel = styled.label`
  font-size: 14px;
  font-weight: 300;
  color: #acacac;
`;

export const HeaderElement = styled.div`
    background: #595959;
    text-align: center;
    padding: 10px;
    padding-top: 20px;
    color: white;
    display: flex;
    justify-content: space-between;
`;
