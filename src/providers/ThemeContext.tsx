import React from 'react';
import { MyFoxMicroSite } from '../types';
import spinner from '../components/images/spinner.svg';

const initialValue: MyFoxMicroSite = {
    id: '',
    publishSnippet: true,
    snippetBackground: 'black',
    snippetButtonColor: 'blue',
    snippetButtonLink: 'blue',
    snippetButtonText: 'blue',
    snippetColor: 'red',
    snippetLogo: spinner,
    snippetNoteLabel: 'blak',
    snippetNotePlaceholder: 'This is placeholder',
    snippetNoteRequired: false,
    snippetStaffSelect: false,
};

const ThemeContext = React.createContext<MyFoxMicroSite>(initialValue);

export default ThemeContext;
