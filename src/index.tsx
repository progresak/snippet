import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const element = document.getElementById('root');

render(<App logGlobalError={console.error} isInitialized />, element);
