import React from 'react';
import styled from 'styled-components';
import placeholder from '../../../../../images/running.png';
import profile from '../../../../../images/profile.png';
import Occupancy from './Occupancy';

const Workout = () => (
    <Wrapper>
        <ImageWrapper>
            <WorkoutImage src={placeholder} alt="placeholder" />
        </ImageWrapper>
        <ContentWrapper>
            <ContentHeading>
                <DateElement>Pondělí 25.1 17:00</DateElement>
                <GreenText>60 min</GreenText>
                <GreenText>Cena: 150 Kč</GreenText>
                <Occupancy current={7} max={10} />
            </ContentHeading>
            <ContentBody>
                <Information>
                    <h3>Kruhový trening</h3>
                    <span>skupinové cvičení s TRX</span>
                    <Note>Poznámka: přineste si taneční boty</Note>
                </Information>
                <Instructor>
                    <AvatarWrapper>
                        <Avatar src={profile} alt="Profil" />
                    </AvatarWrapper>
                    <InstructorName>Arnold</InstructorName>
                </Instructor>
                <ActionsElement>
                    <ReservationButton>přihlásit</ReservationButton>
                </ActionsElement>
            </ContentBody>
        </ContentWrapper>
    </Wrapper>
);

export default Workout;

const AvatarWrapper = styled.div`
    max-width: 50px;
    border-radius: 100px;
    background: #dadada;
    text-align: center;
`;

const Avatar = styled.img`
    width: 90%;
    border-radius: 100px;
`;
const InstructorName = styled.span`
  color: #595959;
  font-size: 14px;
`;

const ReservationButton = styled.button`
      color: white;
      padding: 10px 20px;
      border: 1px solid #5da216;
      border-radius: 5px;
      background: #6cb91c;
      text-transform: uppercase;
      cursor: pointer;
  
      ${({ disabled }) => disabled && 'background: #b7b7b7;'}
      ${({ disabled }) => disabled && 'cursor: auto;'}
`;

const Wrapper = styled.div`
    border-radius: 5px;
    border: 1px solid #acacac;
    display: flex;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
`;

const WorkoutImage = styled.img`
    width: 80%;
`;

const ImageWrapper = styled.div`
    max-width: 120px;
    min-height: 120px;
    border-right: 4px solid #6bb91c;
    background: #b4b4b4;
    text-align: center;
`;

const ContentWrapper = styled.div`
  background: #f0f0f0;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

const ContentHeading = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 15px;
    padding: 5px;
    margin: 0 10px;
    border-bottom: 1px solid #d6d6d6;
`;
const DateElement = styled.span`
    font-weight: 600;
    color: #737373;
`;
const GreenText = styled.span`
    color: #6cb91c;
`;
const ContentBody = styled.div`
    display: flex;
    justify-content: space-around;
    height: 100%;
    align-items: center;
`;
const Information = styled.div`
    font-size: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    &> span {
     font-size: 15px;
      margin-top: 10px;
   }
`;
const Note = styled.div`
    font-size: 13px;
    color: #ee652a;
    font-weight: bold;
    margin-top:10px;
`;
const Instructor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ActionsElement = styled.div``;
