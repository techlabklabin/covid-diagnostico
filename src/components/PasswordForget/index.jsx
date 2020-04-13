import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Alert from 'react-s-alert';

import { withFirebase } from '../../containers/Firebase';
import * as ROUTES from '../../constants/routes';
import * as ERRORS from '../../constants/errors';

import { Form, Icon, Input, Button } from 'antd';

import logo from "../../assets/logo.png";
import "./index.css";

const PasswordForgetPage = () => (
    <div className={"login-wrapper"}>
        <PasswordForgetForm />
    </div>
);

const INITIAL_STATE = {
    email: '',
};

class PasswordForgetFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { email } = this.state;

                this.setState({
                    isLoading: true
                })

                this.props.firebase
                    .doPasswordReset(email)
                    .then(() => {
                        this.setState({ ...INITIAL_STATE });

                        Alert.success("Você receberá um email com as instruções para cadastrar uma nova senha :)", {
                            position: 'bottom-right',
                            effect: 'stackslide',
                        });

                        //Redirect to SignIn
                        this.props.history.push(ROUTES.SIGN_IN);
                    })
                    .catch(error => {
                        console.error(error);
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
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login-panel">
                <div style={{ textAlign: "center" }}>
                    <img width={"200px"} className="mb-20" src={logo} alt="logo" />
                </div>
                <Form onSubmit={this.onSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('email', {
                            rules: [{ required: true, message: 'Insira seu E-mail' }],
                        })(
                            <Input
                                name="email"
                                autoComplete="off"
                                onChange={this.onChange}
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="E-mail"
                                size="large"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button size="large" block loading={this.state.isLoading} type="primary" htmlType="submit" className="login-form-button btn-brand">
                            Recuperar senha
                        </Button>
                    </Form.Item>
                    <div className="text-center mt-30">
                        <img width="50px" src="https://s3-sa-east-1.amazonaws.com/static-c4/klabin-logo.png" alt="logo-klabin" />
                    </div>
                </Form>
            </div>
        );
    }
}

const PasswordForgetLink = () => (
    <p>
        <Link to={ROUTES.PASSWORD_FORGET}>Esqueceu a senha?</Link>
    </p>
);

const WrappedLoginForm = Form.create({ name: 'signup_form' })(PasswordForgetFormBase)

export default PasswordForgetPage;

const PasswordForgetForm = withRouter(withFirebase(WrappedLoginForm));

export { PasswordForgetForm, PasswordForgetLink };