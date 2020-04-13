import React from 'react';
import { Col, Radio, Row } from 'antd'
import SubmitAdvance from './components/submitAdvance';

const temperatureList = [
    {
        label: 'Abaixo de 37.7 °C',
        value: 'abaixo_de_37.7'
    },
    {
        label: 'Igual ou acima de 37.8 °C',
        value: 'igual_ou_acima_de_37.8'
    },
    {
        label: 'Acima de 39 °C',
        value: 'acima_de_39'
    }
];

const Temperature = ({ step, setStep, isSubmit, formik }) => (
    <Row>
        <Col className={"mb-30 text-center"} md={24}>
            Feito! Agora, informe a temperatura do colaborador(a):
        </Col>
        <Col className={"mb-30 text-center"} md={24}>
            <Radio.Group size="large" name='temperature'>
                <Row
                    gutter={30}
                >
                    {
                        temperatureList.map((elem, key) => {
                            return (
                                <Col xs={24} md={12} className={'mb-15'} key={key}>

                                    <Radio.Button
                                        onChange={formik.handleChange}
                                        value={elem.value}
                                        className={"custom-radio-button "}
                                    >
                                        {elem.label}
                                    </Radio.Button>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Radio.Group>
        </Col>
        <SubmitAdvance
            disabled={!formik.values.temperature}
            step={step}
            setStep={setStep}
            isSubmit={isSubmit}
        />
    </Row>
);

export default Temperature;