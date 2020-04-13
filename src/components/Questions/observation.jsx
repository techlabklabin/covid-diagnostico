import React from 'react';
import { Col,  Row, Input } from 'antd';
import SubmitAdvance from './components/submitAdvance';

const {TextArea} = Input;

const Observation = ({step, setStep, isSubmit, formik}) => {
    
    return (
        <Row style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            <Col className={"mb-30 text-center"} md={24}>
                Se quiser compartilhar outra informação importante sobre o quadro de saúde da pessoa avaliada, escreva aqui:
            </Col>
            <Col className={"mb-30 text-center"} xs={24} md={12}>
                <TextArea
                    onChange={formik.handleChange}
                    autoSize={{ minRows: 5, maxRows: 5 }}
                    name="obs"
                />
            </Col>
            <SubmitAdvance
                step={step}
                setStep={setStep}
                isSubmit={isSubmit}
            />
        </Row>
    );
}

export default Observation;