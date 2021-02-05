import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal/Modal';
import { withActionProps, withSelectorProps, withStoreProps } from './withStateContext';
import { compose, isEmptyObject } from '../../utils';
import { isModalOpened } from '../../selectors';
import { closeModal as closeModalAction, reFetchBaseData, sendReservation, SendReservationResponse, setLoginCookie } from '../../actions/state';
import { EnvelopeImg, PhoneImg, ProfilePlaceholder, UserFilledImg, UserImg } from './imageComponents';
import Button from './Button';
import { CreateReservationErrorResponse, CreateReservationResponse } from '../../actions';
import { FormData, SignInCookieFormat } from '../../types';

interface ReservationModalProps {
    isOpened: boolean;
    closeModal: () => void;
    reserveWorkout: (formData: FormData) => Promise<SendReservationResponse>;
    refetch: () => Promise<void>;
    loginUser: (formData: FormData, customerId: string, calendarId: string) => void;
    cookie: SignInCookieFormat;
}
const isErrorResponse = (res: CreateReservationResponse): res is CreateReservationErrorResponse => res?.error;
const initFormState = {
    name: '',
    surname: '',
    email: '',
    phone: '',
};

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpened, closeModal, reserveWorkout, refetch, loginUser, cookie }) => {
    const [formData, setFormData] = useState<FormData>(initFormState);
    useEffect(() => {
        if (undefined === cookie || isEmptyObject(cookie)) {
            return;
        }
        const { calendarIds, customerId, ...cookieFormData } = cookie;

        setFormData(cookieFormData);
    }, [cookie]);
    const handleOnSubmit = (e) => {
        e.preventDefault();
        reserveWorkout(formData).then((response) => {
            if (isErrorResponse(response)) {
                console.error(' There is an error occured');
                return;
            }

            const { customerId, calendarId } = response;

            setFormData(initFormState);
            refetch().then(() => {
                closeModal();
                loginUser(formData, customerId, calendarId);
            });
        });
    };

    const { name, surname, email, phone } = formData;

    const handleOnChange = (key: string) => (e) => {
        const { value } = e.target;
        setFormData({ ...formData, [key]: value });
    };

    return (
        <Modal isActive={isOpened} onClose={closeModal} portalContainerId="modal">
            <ContentWrapper>
                <AvatarWrapper>
                    <ProfilePlaceholder />
                </AvatarWrapper>
                <Title>Pro dokončení rezervace zadejte své kontaktní údaje:</Title>
                <form onSubmit={handleOnSubmit}>
                    <InputsWrapper>
                        <InputWrapper>
                            <IconWrapper>
                                <UserImg />
                            </IconWrapper>
                            <Input value={name} onChange={handleOnChange('name')} placeholder="Jméno" />
                        </InputWrapper>
                        <InputWrapper>
                            <IconWrapper>
                                <UserFilledImg />
                            </IconWrapper>
                            <Input value={surname} onChange={handleOnChange('surname')} placeholder="Příjmení" />
                        </InputWrapper>
                        <Break />
                        <InputWrapper>
                            <IconWrapper>
                                <EnvelopeImg />
                            </IconWrapper>
                            <Input value={email} onChange={handleOnChange('email')} type="email" placeholder="Váš e-mail" />
                        </InputWrapper>
                        <InputWrapper>
                            <IconWrapper>
                                <PhoneImg />
                            </IconWrapper>
                            <Input value={phone} onChange={handleOnChange('phone')} placeholder="Mobil" />
                        </InputWrapper>
                    </InputsWrapper>
                    <ButtonsWrapper>
                        <Button variant="secondary" onClick={closeModal}>Zrušit</Button>
                        <Button onClick={handleOnSubmit}>Ok</Button>
                    </ButtonsWrapper>
                </form>
            </ContentWrapper>
        </Modal>
    );
};

const withModalData = compose(
    withSelectorProps(isModalOpened, 'isOpened'),
    withActionProps(setLoginCookie, 'loginUser'),
    withActionProps(closeModalAction, 'closeModal'),
    withActionProps(sendReservation, 'reserveWorkout'),
    withActionProps(reFetchBaseData, 'refetch'),
    withStoreProps('cookie', 'cookie'),
);

export default withModalData(ReservationModal);

const InputsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-top: 10px;
`;

const ButtonsWrapper = styled.div`
    margin-top: 20px;
    & > button {
      margin: 0 10px;
    }
  
`;

const Break = styled.div`
  flex-basis: 100%;
  height: 0;
`;
const InputWrapper = styled.span`
  position: relative;
`;
const IconWrapper = styled.span`
    position: absolute;
    left: 15px;
    top: 10px;
`;
const Input = styled.input`
  height: 25px;
  border-radius: 5px;
  min-width: 200px;
  border:1px solid #8d9da5;
  background: white;
  padding-left: 30px;
  margin: 5px 10px;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
`;

const AvatarWrapper = styled.div`
  max-width: 50px;
  border-radius: 100px;
  background: #dadada;
  text-align: center;
  margin-bottom: 10px;
`;

const Title = styled.h2`
    font-size: 14px;
    font-weight: bold;
`;
