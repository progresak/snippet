import React from 'react';
import styled from 'styled-components';
import placeholder from '../../../../../images/running.svg';
import profilePlaceholder from '../../../../../images/user.svg';
import Occupancy from './Occupancy';
import { withActionProps, withSelectorProps } from '../../../../withStateContext';
import { getCalendarById } from '../../../../../../selectors';
import { Calendar, Employee } from '../../../../../../types';
import { compose, getDisplayDateWithDayName } from '../../../../../../utils';
import { GreenCheckmark } from '../../../../imageComponents';
import { openModalWithId } from '../../../../../../actions/state';
import { device } from '../../../../../layout/global/mediaQueries';

interface WorkoutProps extends Calendar {
    dateFrom: Date;
    signedIn: boolean;
    openModal: (workoutId: string) => boolean;
}

const renderInstructor = ({ userMyFox }: Employee) => {
    const { name, surname, pictureUrl } = userMyFox;
    const isPlaceholder = !pictureUrl;
    const instructorImageSrc = isPlaceholder ? profilePlaceholder : pictureUrl;
    const instructorName = `${name} ${surname}`;

    return (
        <Instructor>
            <AvatarWrapper>
                <Avatar src={instructorImageSrc} alt={instructorName} />
            </AvatarWrapper>
            <InstructorName>{instructorName}</InstructorName>
        </Instructor>
    );
};

const Workout: React.FC<WorkoutProps> = ({ openModal, id, capacityBooked, capacity, duration, note, carts, employees, dateFrom, signedIn }) => {
    const workout = carts[0];
    const instructor = employees[0];
    const isPlaceholder = !workout.pictureUrl;
    const workoutImageSrc = isPlaceholder ? placeholder : workout.pictureUrl;

    const openReservationModal = () => openModal(id);

    const isWorkoutFull = (capacityBooked >= capacity);
    const actionElement = signedIn
        ? (
            <SignedWrapper>
                <CheckMarkWrapper>
                    <GreenCheckmark />
                </CheckMarkWrapper>
                <MarkLabel>
                    přihlášeno
                </MarkLabel>
            </SignedWrapper>
        )
        : (
            <ReservationButton disabled={isWorkoutFull} onClick={openReservationModal}>
                přihlásit
            </ReservationButton>
        );

    return (
        <Wrapper>
            <ImageWrapper isPlaceholder={isPlaceholder}>
                <WorkoutImage src={workoutImageSrc} alt="placeholder" />
            </ImageWrapper>
            <ContentWrapper>
                <ContentHeading>
                    <DateElement>{getDisplayDateWithDayName(dateFrom)}</DateElement>
                    <GreenText>
                        {duration}
                        &nbsp;min
                    </GreenText>
                    <GreenText>
                        Cena:&nbsp;
                        {carts[0].priceVat}
                        &nbsp;Kč
                    </GreenText>
                    <Occupancy current={capacityBooked} max={capacity} />
                </ContentHeading>
                <ContentBody>
                    <Information>
                        <h3>{workout.name}</h3>
                        <span>{workout.note}</span>
                        {note ? (<Note>{note}</Note>) : null}
                    </Information>
                    {renderInstructor(instructor)}
                    <ActionsElement>
                        {actionElement}
                    </ActionsElement>
                </ContentBody>
            </ContentWrapper>
        </Wrapper>
    );
};

const withWorkoutData = compose(
    withSelectorProps(getCalendarById),
    withActionProps(openModalWithId, 'openModal'),
);

export default withWorkoutData(Workout);

const AvatarWrapper = styled.div`
    max-width: 50px;
    border-radius: 100px;
    background: #dadada;
    text-align: center;
`;

const Avatar = styled.img`
    width: 100%;
    border-radius: 100px;
`;
const InstructorName = styled.span`
  color: #595959;
  font-size: 14px;
`;

const CheckMarkWrapper = styled.div`
    width: 25px;
    margin-bottom: 5px;
`;
const SignedWrapper = styled.div`
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;
`;
const MarkLabel = styled.span`
    color: #6cb91c;
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
      ${({ disabled }) => disabled && 'border-color: #c4c4c4;'}
      ${({ disabled }) => disabled && 'cursor: auto;'}
`;

const Wrapper = styled.div`
    display: flex;
    border-top: 1px solid #acacac;
    border-bottom: 1px solid #acacac;
    

  @media ${device.compactMin} {
    border-radius: 5px;
    border: 1px solid #acacac;
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
`;

const WorkoutImage = styled.img`
    width: 100%;
    height: 100%;
`;

const ImageWrapper = styled.div<{ isPlaceholder: boolean }>`
    max-width: 120px;
    min-width: 100px;
    min-height: 100px;
    border-right: 4px solid #6bb91c;
    text-align: center;
    
    ${({ isPlaceholder }) => isPlaceholder && 'background: #b4b4b4;'}
    ${({ isPlaceholder }) => isPlaceholder && 'border-right: 4px solid #595959;'}
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
    justify-content: space-between;
    height: 100%;
    align-items: center;
    padding: 0 10px;
`;
const Information = styled.div`
    font-size: 22px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    min-width: 40%;
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
  text-align: center;
`;

const ActionsElement = styled.div``;
