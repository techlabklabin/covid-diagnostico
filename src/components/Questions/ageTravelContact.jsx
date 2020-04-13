import React from 'react';
import { Col, Row, Typography, Radio } from 'antd';
import SubmitAdvance from './components/submitAdvance';

const { Text } = Typography;

const optionList = [
    {
        label: 'Sim',
        value: 'sim'
    },
    {
        label: 'Não',
        value: 'nao'
    }
];

const AgeTravelContact = ({ step, setStep, isSubmit, formik }) => {
    return (
        <Row>
            <Col className={"mb-30 text-center"} md={24}>
                Precisamos saber um pouquinho mais antes de prosseguir. Responda se o colaborador(a):
            </Col>
            <Col className={"mb-30 text-center"} md={24}>
                <div className="mb-5">
                    <Text strong>Tem mais de 60 anos?</Text>
                </div>
                <Radio.Group size="large" className="mb-5" name='sixtyMore'>
                    <Row gutter={30}>
                        {
                            optionList.map((elem, i) => (
                                <Col xs={12} key={i}>
                                    <Radio.Button
                                        onChange={formik.handleChange}
                                        value={elem.value}
                                        className={"custom-radio-button little-button"}
                                    >
                                        {elem.label}
                                    </Radio.Button>
                                </Col>
                            ))
                        }
                    </Row>
                </Radio.Group>
            </Col>
            <Col className={"mb-30 text-center"} md={24}>
                <div className="mb-5">
                    <Text strong>Viajou para outras cidades no últimos 14 dias?</Text>
                </div>
                <Radio.Group size="large" className="mb-5" name='hasTravel'>
                    <Row gutter={30}>
                        {
                            optionList.map((elem, i) => (
                                <Col xs={12} key={i}>
                                    <Radio.Button
                                        onChange={formik.handleChange}
                                        value={elem.value}
                                        className={"custom-radio-button little-button"}
                                    >
                                        {elem.label}
                                    </Radio.Button>
                                </Col>
                            ))
                        }
                    </Row>
                </Radio.Group>
            </Col>
            <Col className={"mb-30 text-center"} md={24}>
                <div className="mb-5">
                    <Text strong>Esteve em contato com alguma pessoa infectada ou com suspeita de ter o novo coronavirus?</Text>
                </div>
                <Radio.Group size="large" className="mb-5" name='contactSuspect'>
                    <Row gutter={30}>
                        {
                            optionList.map((elem, i) => (
                                <Col xs={12} key={i}>

                                    <Radio.Button
                                        onChange={formik.handleChange}
                                        value={elem.value}
                                        className={"custom-radio-button little-button"}
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
                disabled={!(
                    !!formik.values.sixtyMore &&
                    !!formik.values.hasTravel &&
                    !!formik.values.contactSuspect
                )}
                step={step}
                setStep={setStep}
                isSubmit={isSubmit}
            />
        </Row>
    );
}

export default AgeTravelContact;