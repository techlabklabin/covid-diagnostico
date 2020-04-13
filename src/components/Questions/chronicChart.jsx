import React from 'react';
import { Col, Row, Checkbox } from 'antd';
import SubmitAdvance from './components/submitAdvance';

const crhonicChartList = [
    {
        label: 'Diabetes',
        value: '0'
    },
    {
        label: 'Gestante',
        value: '1'
    },
    {
        label: 'Doenças pulmonares',
        value: '2'
    },
    {
        label: 'Doenças renais',
        value: '3'
    },
    {
        label: 'HIV',
        value: '4'
    },
    {
        label: 'Câncer',
        value: '5'
    },
    {
        label: 'Doenças cardíacas',
        value: '7'
    }
];

const ChronicChart = ({ step, setStep, isSubmit, formik }) => {
    return (
        <Row>
            <Col className={"mb-30 text-center"} md={24}>
                Marque também as opções que se encaixam no perfil do colaborador(a):
            </Col>
            <Col className={"mb-30 text-center"} md={24}>
                <Checkbox.Group style={{ width: '100%' }} name='chronicChart'>
                    <Row
                        gutter={30}
                    >
                        {
                            crhonicChartList.map((elem, key) => {
                                return (
                                    <Col
                                        xs={24}
                                        md={8}
                                        className={'mb-15'}
                                        key={key}
                                    >

                                        <Checkbox
                                            className={"custom-checkbox"}
                                            value={elem.value}
                                            onChange={formik.handleChange}
                                        >
                                            {elem.label}
                                        </Checkbox>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Checkbox.Group>
            </Col>



            <SubmitAdvance
                step={step}
                setStep={setStep}
                isSubmit={isSubmit}
            />
        </Row>
    );
}

export default ChronicChart;