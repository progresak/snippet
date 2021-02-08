import React from 'react';
import styled from 'styled-components';
import Occupancy from './Occupancy';
import { withActionProps, withSelectorProps } from '../../../../withStateContext';
import { getCalendarById } from '../../../../../../selectors';
import { Calendar, Employee } from '../../../../../../types';
import { compose, getDisplayDateWithDayName, getDisplayDateWithTime } from '../../../../../../utils';
import { AvatarPlaceholderImg, GreenCheckmark, RunningPlaceholderImg } from '../../../../imageComponents';
import { openModalWithId } from '../../../../../../actions/state';
import { device } from '../../../../../layout/global/mediaQueries';

interface WorkoutProps extends Calendar {
    dateFrom: Date;
    signedIn: boolean;
    openModal: (workoutId: string) => boolean;
}

const renderInstructor = ({ userMyFox }: Employee, shortName = false) => {
    const { name, surname, pictureUrl } = userMyFox;
    const isPlaceholder = !pictureUrl;
    const instructorName = `${name}${!shortName ? ` ${surname}` : ''}`;

    return (
        <Instructor>
            <AvatarWrapper>
                {isPlaceholder
                    ? <AvatarPlaceholderImg />
                    : <Avatar src={pictureUrl} alt={instructorName} />}
            </AvatarWrapper>
            <InstructorName>{instructorName}</InstructorName>
        </Instructor>
    );
};

const Workout: React.FC<WorkoutProps> = ({ openModal, id, capacityBooked, capacity, duration, note, carts, employees, dateFrom, signedIn }) => {
    const workout = carts[0];
    const instructor = employees[0];
    const isPlaceholder = !workout.pictureUrl;

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
        <LayoutSelectorWrapper>
            <Wrapper className="desktop">
                <ImageWrapper isWorkoutFull={isWorkoutFull} isPlaceholder={isPlaceholder}>
                    {isPlaceholder
                        ? <RunningPlaceholderImg />
                        : <WorkoutImage src={workout.pictureUrl} alt="placeholder" />}
                </ImageWrapper>
                <ContentWrapper>
                    <ContentHeading>
                        <DateElement>{getDisplayDateWithDayName(dateFrom)}</DateElement>
                        <GreenText>
                            {duration}
                            {' '}
                            min
                        </GreenText>
                        <GreenText>
                            Cena:
                            {' '}
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
                        {renderInstructor(instructor, true)}
                        <ActionsElement>
                            {actionElement}
                        </ActionsElement>
                    </ContentBody>
                </ContentWrapper>
            </Wrapper>
            <Wrapper className="compact">
                <ContentWrapper>
                    <ContentHeading>
                        <DateElement>{getDisplayDateWithTime(dateFrom)}</DateElement>
                        <GreenText>
                            {duration}
                            {' '}
                            min
                        </GreenText>
                        <GreenText>
                            Cena:
                            {' '}
                            {carts[0].priceVat}
                            &nbsp;Kč
                        </GreenText>

                    </ContentHeading>
                    <ContentBody>
                        <ImageWrapper isWorkoutFull={isWorkoutFull} isPlaceholder={isPlaceholder}>
                            {isPlaceholder
                                ? <RunningPlaceholderImg />
                                : <WorkoutImage src={workout.pictureUrl} alt="placeholder" />}

                        </ImageWrapper>
                        <VerticalAligmentLP>
                            <Information>
                                <h3>{workout.name}</h3>
                                <span>{workout.note}</span>
                                {note ? (<Note>{note}</Note>) : null}
                            </Information>
                            <ActionsElement>
                                {actionElement}
                            </ActionsElement>
                        </VerticalAligmentLP>
                        <VerticalAligmentOnRight>
                            {renderInstructor(instructor, true)}
                            <Occupancy current={capacityBooked} max={capacity} newLine />
                        </VerticalAligmentOnRight>
                    </ContentBody>
                </ContentWrapper>
            </Wrapper>
        </LayoutSelectorWrapper>
    );
};

const withWorkoutData = compose(
    withSelectorProps(getCalendarById),
    withActionProps(openModalWithId, 'openModal'),
);

export default withWorkoutData(Workout);

const VerticalAligment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const VerticalAligmentOnRight = styled(VerticalAligment)`
  margin-left: auto;
  height: 100%;
  justify-content: space-between;
`;
const VerticalAligmentLP = styled(VerticalAligment)`
  padding-left: 20px;
  text-align: left;
  align-items: start;
  min-width: 50%;
`;

const AvatarWrapper = styled.div`
    max-width: 50px;
    border-radius: 100px;
    background: #dadada;
    text-align: center;
    margin-bottom: 5px;
    overflow: hidden;
`;

const Avatar = styled.img`
    width: 100%;
    border-radius: 100px;
`;
const InstructorName = styled.span`
  color: #595959;
  font-size: 14px;
  @media ${device.compact} {
    font-weight: 100;
    //font-size: 18px;
  }
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

      @media ${device.compact} {
        font-size: 16px;
        font-weight: 500;
        height: 44px;
        width: 90%;
        max-width: 180px;
      }
`;

const LayoutSelectorWrapper = styled.div`
  & > div.desktop {
    display: flex;
  }
  & > div.compact {
    display: none;
  }
  
  @media ${device.compact} {
    & > div.desktop {
      display: none;
    }
    & > div.compact {
      display: flex;
    }
  }
`;

const Wrapper = styled.div`
    display: flex;
    &:last-child {
      border-bottom: 1px solid #d1d1d1;
      border-top: 1px solid #d1d1d1;
    }
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

const ImageWrapper = styled.div<{ isPlaceholder: boolean, isWorkoutFull: boolean }>`
    max-width: 120px;
      display: flex;
      align-content: center;
      justify-content: center;
    border-right: 4px solid #6bb91c;
    text-align: center;
    ${({ isPlaceholder }) => isPlaceholder && 'background: #c0c0c0;'}
    ${({ isWorkoutFull }) => isWorkoutFull && 'border-right: 4px solid #595959;'}
    
    @media ${device.compactMin} {
      min-width: 100px;
      min-height: 100px;
    }
    
    @media ${device.compact} {
      border: none;
      max-width: 80px;
      min-width: 60px;
      margin-bottom: auto;
    }
`;

const ContentWrapper = styled.div`
  background: rgb(251,251,251);
  background: -moz-linear-gradient(0deg, rgba(251,251,251,1) 0%, rgba(232,232,232,1) 100%);
  background: -webkit-linear-gradient(0deg, rgba(251,251,251,1) 0%, rgba(232,232,232,1) 100%);
  background: linear-gradient(0deg, rgba(251,251,251,1) 0%, rgba(232,232,232,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#fbfbfb",endColorstr="#e8e8e8",GradientType=1);
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  @media ${device.compact} {
    padding: 10px;
    
  }
`;

const ContentHeading = styled.div`
    display: flex;
    justify-content: space-between;
    //font-size: 20px;
    text-align: center;
  
    @media ${device.compactMin} {
      margin: 0 10px;
      padding: 5px;
      border-bottom: 1px solid #d6d6d6;
      font-size: 15px;  
    }
`;
const DateElement = styled.span`
    font-weight: 600;
    color: #737373;
  
`;
const GreenText = styled.span`
    color: #6cb91c;
  @media ${device.compact} {
    margin-left: 10px;
  }
`;
const ContentBody = styled.div`
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    padding: 10px;
  
    @media ${device.compact} {
      padding: 0;
      margin-top: 15px;
      justify-content: left;
    }
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
    @media ${device.compact} {
      //font-size: 26px;
      //text-align: left;
      flex:1;
      &> span {
        font-weight: 100;
        //font-size: 20px;
      }
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

const ActionsElement = styled.div`
  @media ${device.compact} {
    margin-top:20px;
    width:100%
  }
`;
