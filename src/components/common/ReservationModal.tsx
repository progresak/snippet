import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal/Modal';
import { withActionProps, withSelectorProps, withStoreProps } from './withStateContext';
import { compose, isEmptyObject } from '../../utils';
import { isModalOpened } from '../../selectors';
import { closeModal as closeModalAction, reFetchBaseData, sendReservation, SendReservationResponse, setLoginCookie } from '../../actions/state';
import { AvatarPlaceholder, EnvelopeImg, PhoneImg, UserFilledImg, UserImg } from './imageComponents';
import Button from './Button';
import { CreateReservationErrorResponse, CreateReservationResponse } from '../../actions';
import { FormData, SignInCookieFormat } from '../../types';
import { LocalizedText, TextKey } from '../../translations';

interface ReservationModalProps {
    isOpened: boolean;
    closeModal: () => void;
    reserveWorkout: (formData: FormData) => Promise<SendReservationResponse>;
    refetch: () => Promise<void>;
    loginUser: (formData: FormData, customerId: string) => void;
    cookie: SignInCookieFormat;
}
const isErrorResponse = (res: CreateReservationResponse): res is CreateReservationErrorResponse => res?.error;
const initFormState = {
    name: '',
    surname: '',
    email: '',
    phone: '',
};
const initMeta = {
    touched: false,
    valid: false,
};
const initFormMetaState = {
    name: initMeta,
    surname: initMeta,
    email: initMeta,
    phone: initMeta,
};
type FormMetaData = Record<keyof FormData, {
    touched: boolean;
    valid: boolean;
}>;

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpened, closeModal, reserveWorkout, refetch, loginUser, cookie }) => {
    const [formData, setFormData] = useState<FormData>(initFormState);
    const [formMetaData, setFormMetaData] = useState<FormMetaData>(initFormMetaState);
    const [isSigned, setIsSigned] = useState<boolean >(false);
    useEffect(() => {
        if (undefined === cookie || isEmptyObject(cookie)) {
            return;
        }
        const { calendarIds, customerId, ...cookieFormData } = cookie;

        setFormData(cookieFormData);

        return () => {
            setFormMetaData(initFormMetaState);
            setFormData(initFormState);
        };
    }, [cookie, isOpened]);

    const setFormInvalid = () => {
        const newObj = {};
        Object.keys(formData).forEach((key: keyof FormData) => {
            newObj[key] = { touched: true, valid: !!formData[key] };
        });
        setFormMetaData(newObj);
    };
    const handleCloseModal = () => {
        setFormMetaData(initFormMetaState);
        setFormData(initFormState);
        closeModal();
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.surname || !formData.email || !formData.phone) {
            return setFormInvalid();
        }
        reserveWorkout(formData).then((response) => {
            if (isErrorResponse(response)) {
                console.error(' There is an error occured');
                return;
            }

            const { customerId } = response;
            setIsSigned(true);
            setTimeout(() => {
                setFormData(initFormState);
                closeModal();
                loginUser(formData, customerId);
                refetch();
            }, 2500);
        });
    };

    const { name, surname, email, phone } = formData;

    const handleOnChange = (key: string) => (e) => {
        const { value } = e.target;
        setFormData({ ...formData, [key]: value });
        setFormMetaData({ ...formMetaData, [key]: { touched: true, valid: true } });
    };

    const handleOnBlur = (key: string) => (e) => {
        const { value } = e.target;
        const newD = { ...formMetaData, [key]: { touched: true, valid: !!value } };
        setFormMetaData(newD);
    };
    const isInvalid = (key: keyof FormData) => !formMetaData[key].valid && formMetaData[key].touched;

    const isFormInvalid = isInvalid('name') || isInvalid('surname') || isInvalid('email') || isInvalid('phone');
    if (!isOpened) {
        return null;
    }

    return (
        <Modal isActive onClose={handleCloseModal} portalContainerId="modal">
            <ContentWrapper>
                <AvatarWrapper>
                    <AvatarPlaceholder color="#6cb91c" />
                </AvatarWrapper>
                <Title><LocalizedText textKey={TextKey.ReservationLabelText} /></Title>
                <form onSubmit={handleOnSubmit}>
                    <InputsWrapper>
                        <InputWrapper>
                            <IconWrapper>
                                <UserImg />
                            </IconWrapper>
                            <Input
                                value={name}
                                invalid={isInvalid('name')}
                                onBlur={handleOnBlur('name')}
                                onChange={handleOnChange('name')}
                                placeholder="Jméno"
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <IconWrapper>
                                <UserFilledImg />
                            </IconWrapper>
                            <Input
                                value={surname}
                                invalid={isInvalid('surname')}
                                onBlur={handleOnBlur('surname')}
                                onChange={handleOnChange('surname')}
                                placeholder="Příjmení"
                            />
                        </InputWrapper>
                        <Break />
                        <InputWrapper>
                            <IconWrapper>
                                <EnvelopeImg />
                            </IconWrapper>
                            <Input
                                value={email}
                                invalid={isInvalid('email')}
                                onBlur={handleOnBlur('email')}
                                onChange={handleOnChange('email')}
                                type="email"
                                placeholder="Váš e-mail"
                            />
                        </InputWrapper>
                        <InputWrapper>
                            <IconWrapper>
                                <PhoneImg />
                            </IconWrapper>
                            <Input
                                value={phone}
                                invalid={isInvalid('phone')}
                                onBlur={handleOnBlur('phone')}
                                onChange={handleOnChange('phone')}
                                placeholder="Mobil"
                            />
                        </InputWrapper>
                    </InputsWrapper>
                    {isFormInvalid ? (<LocalizedText textKey={TextKey.FillAllFields} />) : null}
                    {isSigned ? <SignedSpan className="fade-in"><LocalizedText textKey={TextKey.LoggedIn} /></SignedSpan> : null}
                    <ButtonsWrapper>
                        <Button variant="secondary" onClick={handleCloseModal}><LocalizedText textKey={TextKey.Cancel} /></Button>
                        <Button onClick={handleOnSubmit}><LocalizedText textKey={TextKey.Ok} /></Button>
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

const SignedSpan = styled.div`
    background: rgba(108,185,28,0.5);
    color: #595959;
    border: 1px solid #5da216;
    border-radius: 4px;
    padding: 5px 20px;
    width: 70%;
    margin: auto;
`;

const InputsWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
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
const Input = styled.input<{invalid: boolean}>`
  height: 28px;
  color: #595959;
  border-radius: 5px;
  min-width: 200px;
  font-size: 16px;
  border:1px solid #8d9da5;
  background: white;
  padding-left: 30px;
  margin: 5px 10px;
  
  ${({ invalid }) => invalid && 'border-color: red;'}
  ${({ invalid }) => invalid && 'box-shadow: 0 0 1px 1px red;'}
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
  background: white;
  border:1px solid #dadada;
  text-align: center;
  padding: 10px;
  margin-bottom: 10px;
`;

const Title = styled.h2`
    font-size: 16px;
    font-weight: bold;
`;
