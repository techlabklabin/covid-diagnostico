import React from 'react';
import { Button, Col } from 'antd'

const SubmitAdvance = ({ disabled, step, setStep, isSubmit }) => (
    <Col xs={24}>
        <Button
            onClick={() => !isSubmit && setStep(step + 1)}
            block
            className="btn-brand mb-30"
            disabled={disabled}
            htmlType={isSubmit ? "submit" : 'button'}
        >
            Próximo passo
        </Button>
    </Col>
);

export default SubmitAdvance;