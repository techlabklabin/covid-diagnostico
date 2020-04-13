import React, { Component } from 'react';
import { geolocated } from "react-geolocated";
import { compose } from 'recompose';
import { Row, Col } from 'antd'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { withAuthorization, withEmailVerification } from "../../containers/Session";
import { withFirebase } from "../../containers/Firebase";
import logo from "../../assets/logo.png";
import ReportedPerson from './components/reportedPerson';
import Identification from './components/identification';
import Result from './components/result';
import Questions from '../Questions';
import { insertReport } from './functions';

const INITIAL_STATE = {
    isScanning: false,
    isInsertCpf: false,
    isFinished: false,
    insertFeedback: null,
    data: {
        badge: null,
        cpf: null,
        //cpf: '1',
        name: null,
        sender: {
            name: null,
            email: null,
            id: null,
        },
        createdAt: null,
        location: {
            lat: 0,
            lng: 0
        },
        questions: {}
    },
}

class Dashboard extends Component {
    constructor() {
        super()
        this.state = { ...INITIAL_STATE }
    }

    updatePosition = null;

    componentDidMount() {
        this.updatePosition = window.setInterval(this.handlePosition, 5000);
        const user = JSON.parse(localStorage.getItem('authUser'));
        this.setState({
            data: {
                ...this.state.data,
                sender: {
                    name: user ? user.username : "Anônimo",
                    id: user ? user.uid : null,
                    email: user ? user.email : null
                }
            }
        });
    }

    async getAxiosInstance() {
        return axios.create({
            baseURL: 'https://us-central1-mastersort-f9fa4.cloudfunctions.net/',
            headers: {
                "Authorization": "Bearer " + (localStorage.getItem('authUser') && JSON.parse(localStorage.getItem('authUser')).jwtToken),
            },

        })
    }

    handleBeginScan = () => {
        this.setState({
            isScanning: true
        })
    }

    handleCpfModal = show => {
        this.setState({
            ...this.state,
            isInsertCpf: show
        })
    }

    handleCpf = (cpf, name) => {
        this.setState({
            data: {
                ...this.state.data,
                cpf: cpf,
                name: name
            },
            isInsertCpf: false
        })
    }

    handleScan = (qrcodeRead) => {
        if (qrcodeRead) {
            const splitCode = qrcodeRead.split(" ");
            const badge = splitCode[0];
            splitCode.shift();

            const name = splitCode.join(' ');
            this.setState({
                data: {
                    ...this.state.data,
                    badge: badge,
                    name: name
                }
            })
        }
    }

    handlePosition = () => {
        if (this.props.isGeolocationEnabled && this.props.coords) {
            this.setState({
                data: {
                    ...this.state.data,
                    location: {
                        lat: this.props.coords.latitude,
                        lng: this.props.coords.longitude
                    }
                }
            })
            return true;
        } else {
            return false;
        }
    }

    handleQuestion = async questions => {
        this.setState({
            ...this.state,
            data: {
                ...this.state.data,
                questions: questions
            },
            isFinished: true
        });
        await this.handleInsert();
        // this.handleSend();
    }

    handleInsert = async () => {
        this.setState({
            data: {
                ...this.state.data,
                createdAt: moment().format(),
            }
        })

        const sendData = {
            ...this.state.data,
            ...this.state.data.questions,
            cpf: this.state.data.cpf ? this.state.data.cpf.replace(/[^0-9]/gi, '') : null
        };
        delete sendData.questions;

        let insertReturn = await insertReport(sendData);

        this.setState({
            insertFeedback: insertReturn.data
        })

        return insertReturn;
    }

    render() {
        return (
            <div>
                <div className="wrapper">
                    <div style={{ height: "100vh" }}>
                        <Row>
                            <Col className={"text-center"} md={24}>
                                <img width={"200px"} className="mb-20" src={logo} alt="logo" />
                            </Col>
                        </Row>
                        {
                            this.state.isFinished
                                ?
                                <Result data={this.state.data} feedback={this.state.insertFeedback} />
                                :
                                this.state.data.badge || this.state.data.cpf
                                    ?
                                    <Questions handleQuestion={this.handleQuestion} />
                                    :
                                    !this.state.isScanning && !this.state.isInsertCpf ?
                                        <Identification
                                            handleBeginScan={this.handleBeginScan}
                                            handleCpfModal={this.handleCpfModal} />
                                        :
                                        <ReportedPerson
                                            isScanning={this.state.isScanning}
                                            isInsertCpf={this.state.isInsertCpf}
                                            handleScan={this.handleScan}
                                            handleCpfModal={this.handleCpfModal}
                                            handleCpf={this.handleCpf}
                                        />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const condition = authUser => !!authUser; // just check if its not null
export default compose(
    withEmailVerification,
    withAuthorization(condition),
    withRouter,
    withFirebase,
    geolocated({
        positionOptions: {
            enableHighAccuracy: true,
        },
        userDecisionTimeout: 5000
    })
)(Dashboard);