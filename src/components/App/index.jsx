import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import SignInPage from '../SignIn';
import SignUpPage from '../SignUp';
import PasswordForgetPage from '../PasswordForget';
import Dashboard from '../Dashboard';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../../containers/Session';



const App = () => (
    <Router>
        <div>
            <Alert stack={{ limit: 3 }} />
            <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
            <Route exact path={ROUTES.SIGN_IN} component={SignInPage} />
            <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
            <Route path={ROUTES.DASHBOARD} component={Dashboard} />
        </div>
    </Router>
);


export default withAuthentication(App);