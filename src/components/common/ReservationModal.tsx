import React from 'react';
import styled from 'styled-components';
import Modal from './Modal/Modal';
import { withActionProps, withSelectorProps } from './withStateContext';
import { compose } from '../../utils';
import { isModalOpened } from '../../selectors';
import { closeModal as closeModalAction } from '../../actions/state';
import { ProfilePlaceholder } from './imageComponents';
import Button from './Button';

interface ReservationModalProps {
    isOpened: boolean;
    closeModal: () => void;
}

const ReservationModal: React.FC<ReservationModalProps> = ({ isOpened, closeModal }) => (
    <Modal isActive={isOpened} onClose={() => closeModal()} portalContainerId="modal">
        <ContentWrapper>
            <AvatarWrapper>
                <ProfilePlaceholder />
            </AvatarWrapper>
            <Title>Pro dokončení rezervace zadejte své kontaktní údaje:</Title>
            <InputsWrapper>
                <Input placeholder="Jméno" />
                <Input placeholder="Příjmení" />
                <Break />
                <Input placeholder="Váš e-mail" />
                <Input placeholder="Mobil" />
            </InputsWrapper>
            <ButtonsWrapper>
                <Button variant="secondary" onClick={() => closeModal()}>Zrušit</Button>
                <Button onClick={() => console.log('PEKCJA')}>Ok</Button>
            </ButtonsWrapper>

        </ContentWrapper>
    </Modal>
);

const withModalData = compose(
    withSelectorProps(isModalOpened, 'isOpened'),

    withActionProps(closeModalAction, 'closeModal'),
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
