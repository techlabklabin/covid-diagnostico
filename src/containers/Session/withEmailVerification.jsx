import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import { Button, Row, Col, Divider } from 'antd'

import logo from "../../assets/logo.png";

const needsEmailVerification = authUser =>
  authUser &&
  !authUser.emailVerified
//  &&
// authUser.providerData
//   .map(provider => provider.providerId)
//   .includes('password');

const withEmailVerification = Component => {
  class WithEmailVerification extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isSent: false, isLoading: false };
    }
    onSendEmailVerification = () => {
      this.setState({
        isLoading: true
      })
      this.props.firebase
        .doSendEmailVerification()
        .then(() => this.setState({ isSent: true, isLoading: false }));
    };

    render() {
      return (
        <AuthUserContext.Consumer>
          {authUser =>
            needsEmailVerification(authUser) ? (
              <div>
                <div className="wrapper">
                  <Row className={"text-center pt-30"}>
                    <Col>
                      <div className="text-center">
                        <img width={"200px"} className="mb-10" src={logo} alt="logo" />
                      </div>
                      {!this.state.isSent ?
                        <p className="seamless-p">
                          Legal! Sua conta já foi criada, por uma questão de segurança, te enviamos um email de verificação.<br />
                          <Divider />
                          Cheque seu email para confirma-lo, ou caso não tenha recebido clique no botão abaixo<br />
                          (ah não esqueça de olhar nos spams! 😉)
                        </p>
                        :
                        <p className="seamless-p">
                          Ok, te enviamos um novo email de verificação, assim que fizer a confirmação você pode atualizar essa página
                        </p>
                      }
                      <Button
                        loading={this.state.isLoading}
                        className="btn-brand mt-20"
                        onClick={this.onSendEmailVerification}
                        disabled={this.state.isSent}
                      >
                        Reenviar email de confirmação
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            ) : (
                <Component {...this.props} />
              )
          }
        </AuthUserContext.Consumer >
      );
    }
  }

  return withFirebase(WithEmailVerification);
};

export default withEmailVerification;