import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import ReactGA from 'react-ga';

import Firebase, {
    FirebaseContext
} from './containers/Firebase'

ReactGA.initialize(process.env.REACT_APP_FIREBASE_TRACK_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()} x={console.log(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN)}>
        <App />
    </FirebaseContext.Provider>
    , document.getElementById('root'));