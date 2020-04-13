import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import Alert from 'react-s-alert';

import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../../containers/Firebase';
import * as ROUTES from '../../constants/routes';
import * as ERRORS from '../../constants/errors';

import { Form, Icon, Input, Button } from 'antd';

import logo from "../../assets/logo.png";
import "./index.css";

const SignInPage = () => (
    <div className={"login-wrapper"}>
        <SignInForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    isLoading: false,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { email, password } = this.state;

                this.setState({
                    isLoading: true
                })

                this.props.firebase
                    .doSignInWithEmailAndPassword(email, password)
                    .then((response) => {
                        this.setState({ ...INITIAL_STATE });
                        this.props.history.push(ROUTES.DASHBOARD);
                    })
                    .catch(error => {
                        Alert.error(ERRORS.auth[error.code], {
                            position: 'bottom-right',
                            effect: 'stackslide',
                        });
                        this.setState({
                            isLoading: false
                        })
                    });
            }
        });
    };

    onChange = event => {
        if (event.target.name === "email") {
            event.target.value = event.target.value.trim();
        }
        this.setState({ [event.target.name]: event.target.value });
    };


    componentDidMount() {
        if (JSON.parse(localStorage.getItem('authUser'))) {
            this.props.history.push('/dashboard')
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login-panel">
                <div className="text-center">
                    <img width={"200px"} className="mb-20" src={logo} alt="logo" />
                </div>
                <Form onSubmit={this.onSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Insira seu E-mail' }],
                        })(
                            <Input
                                name="email"
                                autoComplete="email"
                                onChange={this.onChange}
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="E-mail"
                                size="large"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Insira sua senha' }],
                        })(
                            <Input
                                name="password"
                                autoComplete="current-password"
                                onChange={this.onChange}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                size="large"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" block loading={this.state.isLoading} type="primary" htmlType="submit" className="login-form-button btn-brand">
                            Log in
                        </Button>
                    </Form.Item>
                    <div className="text-center">
                        <PasswordForgetLink />
                        Não é cadastrado?  <Link to={ROUTES.SIGN_UP}>Cadastre-se aqui</Link>
                    </div>
                    <div className="text-center mt-30">
                        <img width="50px" src="https://s3-sa-east-1.amazonaws.com/static-c4/klabin-logo.png" alt="logo-klabin" />
                    </div>
                </Form>
            </div>
        );
    }
}
const WrappedLoginForm = Form.create({ name: 'login_form' })(SignInFormBase)
const SignInForm = compose(
    withRouter,
    withFirebase,
)(WrappedLoginForm);

export default SignInPage;

export { SignInForm };