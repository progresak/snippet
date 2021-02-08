import React, { ComponentType } from 'react';
import LocalizationContext from '../../providers/LocalizationContext';
import { WithLocalizeText } from '../../types';

const withLocalizeText = <P, >(WrappedComponent: ComponentType<P & WithLocalizeText>): ComponentType<P> => (props: P) => (
    <LocalizationContext.Consumer>
        {({ localizeText }) => (
            <WrappedComponent
                localizeText={localizeText}
                {...props}
            />
        )}
    </LocalizationContext.Consumer>
);

export default withLocalizeText;
