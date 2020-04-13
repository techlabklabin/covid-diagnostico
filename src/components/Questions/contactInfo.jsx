import React, { Component } from 'react';
import { Col, Row, Typography, Radio, Icon } from 'antd';
import MaskedInput from 'antd-mask-input'
import SubmitAdvance from './components/submitAdvance';
import axios from 'axios'

const { Text } = Typography;

class ContactInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            medicalUnits: []
        }
    }

    componentDidMount() {

        this.getAxiosInstance().get('medicalUnit').then((response) => {
            this.setState({
                medicalUnits: response.data,
                isLoading: false
            })
        })

    }

    getAxiosInstance() {
        return axios.create({
            baseURL: ' https://us-central1-covid-19-b626a.cloudfunctions.net/',
            headers: {
                "Authorization": "Bearer " + (localStorage.getItem('authUser') && JSON.parse(localStorage.getItem('authUser')).jwtToken),
            },

        })
    }

    validate = phone => {
        if (phone === null) {
            return false;
        }
        const number = phone.replace(/[^0-9]/gi, '');
        return number.length >= 10;
    };

    render() {
        return (
            this.state.isLoading ?
                <div style={{ display: "flex", justifyContent: "center", fontSize: "50px" }}>
                    <Icon type={"loading"} />
                </div>
                :
                <Row style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Col className={"mb-30 text-center"} md={24}>
                        Fale um pouco mais sobre você, ou sobre o colaborador(a) avaliado:
                </Col>
                    <Col className={"mb-30 text-center"} xs={24} md={8}>
                        <div className="mb-5">
                            <Text strong>Qual o telefone de contato?</Text>
                        </div>
                        <MaskedInput
                            placeholder='Telefone'
                            mask="(11) 11111-1111"
                            size="large"
                            onChange={this.props.formik.handleChange}
                            name='phone'
                        />
                    </Col>
                    <Col className={"mb-30 text-center"} md={24}>
                        <div className="mb-5">
                            <Text strong>Em qual área trabalha?</Text>
                        </div>
                        <Radio.Group size="large" className="mb-5 mt-10" name='medicalUnit'>
                            <Row
                                gutter={30}
                            >
                                {
                                    this.state.medicalUnits.map((elem, i) => (
                                        <Col xs={24} key={i} md={12} className="mt-25">
                                            <Radio.Button
                                                onChange={this.props.formik.handleChange}
                                                value={elem.id}
                                                className={"custom-radio-button "}
                                            >
                                                {elem.label}
                                            </Radio.Button>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Radio.Group>
                    </Col>
                    <SubmitAdvance
                        disabled={!(this.validate(this.props.formik.values.phone) && !!this.props.formik.values.medicalUnit)}
                        step={this.props.step}
                        setStep={this.props.setStep}
                        isSubmit={this.props.isSubmit}
                    />
                </Row>
        );
    }
}

export default ContactInfo;