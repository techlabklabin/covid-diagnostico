import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Alert from 'react-s-alert';

import { withFirebase } from '../../containers/Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import * as ERRORS from '../../constants/errors';

import { Form, Icon, Input, Button,Select } from 'antd';

import MaskedInput from 'react-text-mask';

import logo from "../../assets/logo.png";
import "./index.css";

const { Option } = Select;

const INITIAL_STATE = {
    username: '',
    email: '',
    phone: '',
    passwordOne: '',
    passwordTwo: '',
    isAdmin: false,
    isLoading: false,
    error: null,
    area: 'florestal'
};


const SignUpPage = () => (
    <div className={"login-wrapper"}>
        <SignUpForm />
    </div>
);

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { username, email, passwordOne, phone,area } = this.state;
                const roles = [];

                this.setState({
                    isLoading: true
                })

                roles.push(ROLES.GUEST);

                this.props.firebase
                    .doCreateUserWithEmailAndPassword(email, passwordOne)
                    .then(authUser => {
                        // Create a user in Firebase firestore database
                        return this.props.firebase
                            .user(authUser.user.uid)
                            .set({
                                username,
                                phone,
                                email,
                                roles,
                                area
                            });
                    })
                    .then(() => {
                        return this.props.firebase.doSendEmailVerification();
                    })
                    .then(() => {
                        this.setState({ ...INITIAL_STATE });

                        Alert.success("Sua conta foi criada com sucesso :)", {
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
    }

    onChange = event => {
        if (event.target.name === "email") {
            event.target.value = event.target.value.trim();
        }
        this.setState({ [event.target.name]: event.target.value });
    };

    validatePasswordOne = (rule, value, callback) => {
        if (value && value.length > 5) {
            callback();
            return;
        }
        callback('Passwords must contain at least 6 digits');
    };

    validatePassword = (rule, value, callback) => {
        if (value && value === this.state.passwordOne) {
            callback();
            return;
        }
        callback('Passwords must match!');
    };

    validatePhone = (rule, value, callback) => {
        if (value && value.length === 15) {
            callback();
            return;
        }
        callback('Telefone deve estar no modelo (99) 99999-9999');
    }

    handleChangeUser = (e) =>{
       this.setState({
           area: e
       })
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login-panel">
                <div style={{ textAlign: "center" }}>
                    <img width={"200px"} className="mb-20" src={logo} alt="logo" />
                </div>
                <Form onSubmit={this.onSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Insira seu nome' }],
                        })(
                            <Input
                                name="username"
                                autoComplete="email"
                                onChange={this.onChange}
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Nome"
                                size="large"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('email', {
                            validateFirst: true,
                            validateTrigger: 'onBlur',
                            rules: [{ required: true, message: "Insira o e-mail" }],
                        })(
                            <Input
                                name="email"
                                autoComplete="new-password"
                                onChange={this.onChange}
                                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="E-mail"
                                size="large"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                            <Select style={{height:50}} defaultValue="Florestal" onChange={this.handleChangeUser} className={"ant-input-affix-wrapper ant-input-affix-wrapper-lg"} showSearch placeholder="Área">
                                <Option value="Florestal">Florestal</Option>
                                <Option value="Papeis">Papéis</Option>
                                <Option value="Embalagens">Embalagens</Option>
                                <Option value="Corp">Corp</Option>
                                <Option value="Celulose">Celulose</Option>
                            </Select>
                    </Form.Item>

                    <Form.Item>
                    {getFieldDecorator('phone', {
                            rules: [
                                { required: true, message: 'Insira seu número de telefone' },
                            ],
                            validateFirst: true
                        })(
                            <span className="ant-input-affix-wrapper ant-input-affix-wrapper-lg">
                                <span className="ant-input-prefix">
                                    <Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />
                                </span>
                                <MaskedInput
                                    name="phone"
                                    autoComplete="new-password"
                                    mask={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                    placeholder="Telefone com DDD"
                                    guide={false}
                                    className="ant-input ant-input-lg"
                                    id="my-input-id"
                                    onChange={this.onChange}
                                />
                            </span>)}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('passwordOne', {
                            rules: [
                                { required: true, message: 'Insira sua senha' },
                                { validator: this.validatePasswordOne.bind(this), message: "A senha precisa conter pelo menos 6 digitos" }
                            ],
                            validateFirst: true
                        })(
                            <Input
                                name="passwordOne"
                                autoComplete="new-password"
                                onChange={this.onChange}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Senha"
                                type="password"
                                size="large"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        {getFieldDecorator('passwordTwo', {
                            rules: [{ validator: this.validatePassword.bind(this), message: 'As senhas precisam ser iguais' }],
                            validateFirst: true
                        })(
                            <Input
                                name="passwordTwo"
                                autoComplete="new-password"
                                onChange={this.onChange}
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Confirme a Senha"
                                type="password"
                                size="large"
                            />,
                        )}
                    </Form.Item>

                    <Form.Item>
                        <Button size="large" block loading={this.state.isLoading} type="primary" htmlType="submit" className="login-form-button btn-brand">
                            Cadastrar
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
const WrappedLoginForm = Form.create({ name: 'signup_form' })(SignUpFormBase)
const SignUpForm = compose(
    withRouter,
    withFirebase,
)(WrappedLoginForm);

export default SignUpPage;

export { SignUpForm };