import React, { ComponentType } from 'react';
import { MyFoxMicroSite } from '../../types';
import ThemeContext from '../../providers/ThemeContext';

const withTheme = <P, >(WrappedComponent: ComponentType<P & MyFoxMicroSite>): ComponentType<P> => (props: P) => (
    <ThemeContext.Consumer>
        {(themeProps) => (
            <WrappedComponent
                {...themeProps}
                {...props}
            />
        )}
    </ThemeContext.Consumer>
);

export default withTheme;
