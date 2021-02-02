import React from 'react';
import styled from 'styled-components';

interface OccupancyProps {
    max: number;
    current: number;
}

const Occupancy: React.FC<OccupancyProps> = ({ max, current }) => (
    <Wrapper>
        <span>Obsazeno:&nbsp;</span>
        <ColoredCount isFull={max === current}>{current}</ColoredCount>
        <From>
            &nbsp;/&nbsp;
            {max}
        </From>
    </Wrapper>
);

export default Occupancy;

const Wrapper = styled.div`
    font-size: 14px;
`;

const From = styled.span`
    font-weight: 600;
`;

const ColoredCount = styled.span<{ isFull: boolean}>`
  font-weight: 600;
  color: #6cb91c;
  ${({ isFull }) => isFull && 'color: #ea172a'}
`;
