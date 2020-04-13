import React, { useState } from 'react';
import QrReader from 'react-qr-reader'
import MaskedInput from 'antd-mask-input'
import { Row, Col, Modal, Input } from 'antd'
import device from 'current-device';

const handleError = () => {
    alert("Tente novamente");
}


const ReportedPerson = ({ isScanning, isInsertCpf, handleScan, handleCpfModal, handleCpf }) => {
    const [cpf, setCpf] = useState(null);
    const [name, setName] = useState(null);
    return (
        <Row>
            {
                isScanning && <div>
                    <QrReader
                        delay={300}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: '100%' }}
                    />
                    <p>{device.ios() ? "* Para uma melhor experiência utilize o Safari" : " * Para uma melhor experiência utilize o Google Chrome"}</p>
                </div>
            }
            {
                isInsertCpf &&
                <Modal
                    title="Insira o CPF e nome do colaborador"
                    visible={true}
                    onOk={() => handleCpf(cpf, name)}
                    onCancel={() => handleCpfModal(false)}
                    okButtonProps={{
                        className: "btn-brand"
                    }}
                    cancelButtonProps={{
                        className: "btn-neutral"
                    }}
                    cancelText="Cancelar"
                    okText="Confirmar"
                >
                    <Row>
                        <Col className="mb-10">
                            <MaskedInput
                                placeholder='CPF'
                                mask="111.111.111-11"
                                size="large"
                                onBlur={e => setCpf(e.target.value)}
                            />
                        </Col>
                        <Row>
                        </Row>
                        <Col>
                            <Input
                                placeholder="Nome do(a) colaborador(a)"
                                size="large"
                                onChange={e => setName(e.target.value)}
                            />
                        </Col>
                    </Row>
                </Modal>
            }
        </Row>
    )
};

export default ReportedPerson;