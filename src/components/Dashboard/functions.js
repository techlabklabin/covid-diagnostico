import Axios from 'axios';

import Alert from 'react-s-alert';

export const insertReport = async (report) => {
    return Axios.post(`${process.env.REACT_APP_API_URL}/diagnosis`, {
        ...report
    });
};

export const sendWhatsapp = (data) => {
    const url = "https://api.whatsapp.com/send";
    const phone = process.env.REACT_APP_CONFIRMATION_DESTINY_PHONE;
    let message = `${encodeURIComponent('😷 Report suspeita de COVID-19')}%0A`;
    message += `${encodeURIComponent(`Matrícula: ${data.badge ? data.badge : 'não informado'}`)}%0A`;
    message += `${encodeURIComponent(`CPF: ${data.cpf ? data.cpf : 'não informado'}`)}%0A`;
    message += `${encodeURIComponent(`Nome: ${data.name}`)}%0A`;
    message += `${encodeURIComponent(`Telefone: ${data.questions.phone}`)}%0A`;
    message += `${encodeURIComponent(`Enviado por: ${data.sender.name}`)}`;
    window.open(`${url}?phone=${phone}&text=${message}`, '_blank');
}

export const share = (data) => {

    let message = '😷 Report suspeita de COVID-19';
    message += ` Matrícula: ${data.badge ? data.badge : 'não informado'}`;
    message += ` CPF: ${data.cpf ? data.cpf : 'não informado'}`;
    message += ` Nome: ${data.name || 'não informado'}`;
    message += ` Telefone: ${data.questions.phone || 'não informado'}`;
    message += ` Enfiado por: ${data.sender.name}`;

    if (navigator.share) {
        navigator.share({
                title: document.title,
                text: message,
            }).then(() => console.log('Successful share'))
            .catch(error => console.log('Error sharing:', error));
    } else {
        navigator.clipboard.writeText(message)
            .then(() => {
                Alert.success("Texto copiado para área de transferência", {
                    position: 'top',
                    effect: 'stackslide',
                });
            })
            .catch(() => {
                Alert.error("Não foi possível copiar o link", {
                    position: 'top',
                    effect: 'stackslide',
                });
            })
    }

}