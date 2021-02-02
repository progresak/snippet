import React from 'react';
import { WithApplicationState } from '../types';

const initialValue: WithApplicationState = {
    applicationState: undefined, // TODO maybe set placeholders
};

const StoreContext = React.createContext<WithApplicationState>(initialValue);

export default StoreContext;
