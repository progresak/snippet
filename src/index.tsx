import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { SnippetConfiguration } from './types';


interface AppStartProps {
    elementId: string;
    configuration: SnippetConfiguration;
}

const Start = ({ elementId, configuration }: AppStartProps) => {
    const element = document.getElementById(elementId);

    if (element === null) {
        throw new Error(`Element not found: '${elementId}'`);
    }

    render(
        <App configuration={configuration} logGlobalError={console.error} isInitialized />,
        element,
    );
};

// @ts-ignore
window.startSnippet = Start;

export default Start;
