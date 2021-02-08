import React from 'react';
import styled from 'styled-components';
import Portal from './Portal';
import GlobalStyle from '../../layout/global/GlobalStyle';
import ResetStyle from '../../layout/global/ResetStyle';

export interface ModalProps {
    isActive: boolean;
    portalContainerId: string;
    onClose: () => void;
}
const Modal: React.FC<ModalProps> = ({
    isActive,
    portalContainerId,
    children,
}) => {
    if (!isActive) {
        return null;
    }

    return (

        <Portal containerId={portalContainerId}>
            <ResetStyle />
            <GlobalStyle />
            <ModalContainer>
                <Backdrop />
                <ModalBody>
                    <Content>
                        {children}
                    </Content>
                </ModalBody>
            </ModalContainer>
        </Portal>
    );
};

export default Modal;

export const MODAL_BORDER_RADIUS = '6px';
export const MODAL_BORDER_COLOR = '#7a8b96';

export const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const Backdrop = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.7;
  //pointer-events: initial;
  transition: opacity 350ms cubic-bezier(.4, 0, .2, 1);
  ${(props) => props.onClick && 'cursor: pointer;'}
`;

export const ModalBody = styled.div`
  background: #efefef;
  box-shadow: 0 15px 24px -6px rgba(0, 0, 0, .1), 0 -5px 24px -6px rgba(0, 0, 0, .15); // TODO
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1;
  width: 98%;
  max-width: 600px;
  border-radius: ${MODAL_BORDER_RADIUS};
  border: 1px solid ${MODAL_BORDER_COLOR};
  max-height: 98%;
  pointer-events: initial;
  transition-duration: 350ms;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-property: opacity, transform;
`;

export const Content = styled.div`
  background: #efefef;
  padding: 30px;
  border-radius: ${MODAL_BORDER_RADIUS};
  overflow: auto;
`;
