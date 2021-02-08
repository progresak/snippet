import React from 'react';
import styled from 'styled-components';
import { compose, getDisplayDate, isPrevWeekButtonDisabled } from '../../../../utils';
import { withActionProps, withStoreProps } from '../../withStateContext';
import { setWeekDiffFilter } from '../../../../actions/state';
import { NextButton } from '../../imageComponents';

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
            <RoundArrowButton reverse onClick={() => !isPrevDisabled && setDiff(false)} color={isPrevDisabled ? '#cdcdcd' : undefined} disabled={isPrevDisabled} />
            <DisplayedDate>
                {`Týden:${getDisplayDate(dateFrom)} - ${getDisplayDate(dateTo)}`}
            </DisplayedDate>
            <RoundArrowButton onClick={() => setDiff(true)} />
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

const RoundArrowButton = styled(NextButton)<{disabled?: boolean, onClick: () => void; reverse?: boolean}>`
  cursor: pointer;
  ${({ reverse }) => reverse && 'transform: rotate(180deg);'}
  

`;
