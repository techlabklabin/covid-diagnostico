import React from 'react';
import { Col, Row, Checkbox } from 'antd';
import SubmitAdvance from './components/submitAdvance';

const respiratoryChartList = [
    {
        label: 'Tosse',
        value: '0',
        size: {
            xs: 24,
            md: 6
        }
    },
    {
        label: 'Nariz entupido',
        value: '2',
        size: {
            xs: 24,
            md: 6
        }
    },
    {
        label: 'Dificuldade para respirar',
        value: '1',
        size: {
            xs: 24,
            md: 6
        }
    }
];

const RespiratoryChart = ({ step, setStep, isSubmit, formik }) => {
    return (
        <Row>
            <Col className={"mb-30 text-center"} md={24}>
                Selecione quais sintomas ele apresenta:
            </Col>
            <Col className={"mb-30 text-center"} md={24}>
                <Checkbox.Group style={{ width: '100%' }} name='respiratoryChart'>
                    <Row
                        gutter={30}
                    >
                        {
                            respiratoryChartList.map((elem, key) => {
                                return (
                                    <Col
                                        xs={elem.size.xs}
                                        md={elem.size.md}
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

export default RespiratoryChart;