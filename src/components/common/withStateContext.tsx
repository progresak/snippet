import React, { ComponentType } from 'react';
import StoreContext from '../../providers/StoreContext';
import { ApplicationState, WithApplicationState } from '../../types';
import { getProp } from '../../utils';

const withStoreContext = <P, >(WrappedComponent: ComponentType<P & WithApplicationState>): ComponentType<P> => (props: P) => (
    <StoreContext.Consumer>
        {(applicationState) => (
            <WrappedComponent
                {...applicationState}
                {...props}
            />
        )}
    </StoreContext.Consumer>
);

export default withStoreContext;

export const withStoreProps = (path: string | string[], key?: string) => <P, >(Component: ComponentType<P & WithApplicationState>): ComponentType<P> => withStoreContext(({ applicationState, ...props }) => {
    const pathProp = getProp(getProp(applicationState, 'applicationState'), path);
    const componentProps = props as unknown as P;
    const newProps = key
        ? { [key]: pathProp }
        : pathProp;

    return (
        // @ts-ignore
        <Component {...newProps} {...componentProps} />
    );
});

// eslint-disable-next-line no-unused-vars
type Selector = (applicationState: ApplicationState) => any;

export const withSelectorProps = (selector: Selector, key?: string) => <P, >(Component: ComponentType<P & WithApplicationState>): ComponentType<P> => withStoreContext(({ applicationState, ...props }) => {
    const pathProp = selector(getProp(applicationState, 'applicationState'));
    const componentProps = props as unknown as P;
    const newProps = key
        ? { [key]: pathProp }
        : pathProp;

    return (
        // @ts-ignore
        <Component {...newProps} {...componentProps} />
    );
});
