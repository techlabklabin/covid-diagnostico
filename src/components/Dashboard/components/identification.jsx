import React from 'react';
import { Button, Row, Col } from 'antd'

const Identification = ({handleBeginScan, handleCpfModal}) => (
    <Row>
        <Col md={24}>
            <Button
                block
                onClick={handleBeginScan}
                size={"large"}
                className="btn-brand"
                icon="scan"
            >
                Scanear crachá
        </Button>
        </Col>
        <Col md={24}>
            <Button
                block
                onClick={() => handleCpfModal(true)}
                size={"large"}
                className="btn-brand mt-25"
                icon="user"
            >
                Inserir CPF
            </Button>
        </Col>
    </Row>
);

export default Identification;