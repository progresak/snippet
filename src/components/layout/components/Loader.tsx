import React from 'react';
import styled from 'styled-components';
import loader from '../../images/spinner.svg';
import { withStoreProps } from '../../common/withStateContext';
import { compose } from '../../../utils';

interface LoaderProps {
    isLoading: boolean
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <SpinnerWrapper>
            <Spinner src={loader} alt="loading" />
        </SpinnerWrapper>
    );
};
const withHeaderData = compose(
    withStoreProps(['meta', 'isFetching'], 'isLoading'),
);
const Spinner = styled.img`
  width: 200px;
  margin: auto;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  vertical-align: center;
  align-items: center;
  text-align: center;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0,0.7);
`;

export default withHeaderData(Loader);
