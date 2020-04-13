import React from 'react';
import { Col, Row, Radio } from 'antd';
import SubmitAdvance from './components/submitAdvance';

const optionList = [
    {
        label: 'Eu mesmo(a)',
        value: 1
    },
    {
        label: 'Outra pessoa',
        value: 0
    }
];

const Origin = ({ step, setStep, isSubmit, formik }) => {
    return (
        <Row>
            <Col className={"mb-30 text-center"} md={24}>
                Quem vai ser avaliado?
            </Col>
            <Col className={"mb-30 text-center"} md={24}>
                <Radio.Group size="large" className="mb-5" name='origin' style={{width: "100%"}}>
                    <Row 
                        gutter={30}
                    >
                        {
                            optionList.map((elem, i) => (
                                <Col xs={24} md={6} key={i} className={'mb-15'}>
                                    <Radio.Button
                                        onChange={formik.handleChange}
                                        value={elem.value}
                                        className={"custom-radio-button"}
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
                disabled={formik.values.origin === null}
                step={step}
                setStep={setStep}
                isSubmit={isSubmit}
            />
        </Row>
    );
}

export default Origin;