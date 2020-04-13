import React from "react";
import { Row, Col, Alert, Icon } from 'antd'

const Result = ({ data, feedback }) => {
    const feedbackIcon = [
        <Icon type="warning" />,
        <Icon type="warning" />,
        <Icon type="check-circle" />,
    ]
    const feedbackState = [
        "error",
        "warning",
        "success",
    ]
    const feedbackColor = [
        "#e74c3c",
        "#fac814",
        "#009530",
    ]

    return (
        feedback ?
            <Row style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Col className={'mb-30'}>
                    <h2 className={"text-center"}>Obrigado</h2>
                    <p className={"text-center"}>
                        Aqui vai uma mensagem para o colaborador(a) avaliado:
                    </p>
                    <p className={"text-center"}>
                        {feedback.warning.baseMsg}
                    </p>
                    {
                        <Alert
                            style={{
                                borderColor: feedbackColor[feedback.warning.hasteKey]
                            }}
                            className={'custom-alert'}
                            message={<strong>Atenção</strong>}
                            description={feedback.warning.warning}
                            type={feedbackState[feedback.warning.hasteKey]}
                            showIcon
                            icon={feedbackIcon[feedback.warning.hasteKey]}
                        />
                    }
                </Col>
            </Row>
            :
            <div style={{ display: "flex", justifyContent: "center", fontSize: "50px" }}>
                <Icon type={"loading"} />
            </div>
    );
}

export default Result;