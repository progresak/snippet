import React from 'react';
import styled from 'styled-components';
import { device } from '../../../../../layout/global/mediaQueries';
import { LocalizedText, TextKey } from '../../../../../../translations';

interface OccupancyProps {
    max: number;
    current: number;
    newLine?: boolean;
}

const Occupancy: React.FC<OccupancyProps> = ({ max, current, newLine = false }) => (
    <Wrapper>
        <span>
            <LocalizedText textKey={TextKey.Occupated} />
            :&nbsp;
        </span>
        {newLine ? <br /> : null}
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
    text-align: center;
    @media ${device.compact} {
      line-height: 20px;
      margin-top: 10px;
      //font-size: 17px;
  }
`;

const From = styled.span`
    font-weight: 600;
`;

const ColoredCount = styled.span<{ isFull: boolean}>`
  font-weight: 600;
  color: #6cb91c;
  ${({ isFull }) => isFull && 'color: #ea172a'}
`;
