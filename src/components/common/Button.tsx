import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<any> {
    variant?: 'primary' | 'secondary';
}
const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...other }) => <ButtonElement variant={variant} {...other} />;

export default Button;

const ButtonElement = styled.button<ButtonProps>`
      color: white;
      padding: 10px 20px;
      min-width: 100px;
      border: 1px solid #5da216;
      border-radius: 5px;
      background: #6cb91c;
      text-transform: uppercase;
      cursor: pointer;
  
      ${({ variant }) => variant === 'secondary' && 'background: #d66344;'}
      ${({ variant }) => variant === 'secondary' && 'border-color: #c14d2e;'}
      ${({ disabled }) => disabled && 'background: #b7b7b7;'}
      ${({ disabled }) => disabled && 'cursor: auto;'}
`;
