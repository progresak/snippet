import React from 'react';
import styled from 'styled-components';
import { compose, getDisplayDate, isPrevWeekButtonDisabled } from '../../../../utils';
import { withActionProps, withStoreProps } from '../../withStateContext';
import { setWeekDiffFilter } from '../../../../actions/state';

interface DateSwitcherProps {
    dateFrom?: Date;
    dateTo?: Date;
    setDiff: (add: boolean) => void;
}

export const DateSwitcher: React.FC<DateSwitcherProps> = ({ dateFrom, dateTo, setDiff }) => {
    if (!dateFrom || !dateTo) {
        return null;
    }
    const isPrevDisabled = isPrevWeekButtonDisabled(dateFrom);
    return (
        <WrapperElement>
            <RoundArrowButton onClick={() => setDiff(false)} disabled={isPrevDisabled}>{'<'}</RoundArrowButton>
            <DisplayedDate>
                {`Týden:${getDisplayDate(dateFrom)} - ${getDisplayDate(dateTo)}`}
            </DisplayedDate>
            <RoundArrowButton onClick={() => setDiff(true)}>{'>'}</RoundArrowButton>
        </WrapperElement>
    );
};

const withDateFilterData = compose(
    withStoreProps(['filter', 'dateFrom'], 'dateFrom'),
    withStoreProps(['filter', 'dateTo'], 'dateTo'),
    withActionProps(setWeekDiffFilter, 'setDiff'),
);
export default withDateFilterData(DateSwitcher);

const DisplayedDate = styled.span`
    font-size: 20px;
    font-weight: 300;
`;

const WrapperElement = styled.div`
  text-align: center;
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const RoundArrowButton = styled.button`
  border-radius: 40px;
  border: none;
  color: white;
  font-weight: bold;
  padding: 6px 10px;
  box-shadow: none;
  text-shadow: none;
  background: #6cb91c;
  cursor: pointer;

  ${({ disabled }) => disabled && 'background: #b7b7b7;'}
  ${({ disabled }) => disabled && 'border-color: #c4c4c4;'}
  ${({ disabled }) => disabled && 'cursor: auto;'}
  
  &:focus {
    border:none;
    outline: none;
  }
`;
