import React from 'react';
import styled from 'styled-components';
import checkbox from '../../images/check.svg';
import userIcon from '../../images/user.svg';

interface ImageProps {
    alt?: string;
}

export const GreenCheckmark: React.FC<ImageProps> = ({ alt = 'green check mark' }) => <Image src={checkbox} alt={alt} />;
export const ProfilePlaceholder: React.FC<ImageProps> = ({ alt = 'green check mark' }) => <Image src={userIcon} alt={alt} />;

const Image = styled.img``;
