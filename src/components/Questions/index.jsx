import React, {useState} from 'react';
import { useFormik } from 'formik';
import Temperature from './temperature';
import RespiratoryChart from './respiratoryChart';
import ChronicChart from './chronicChart';
import AgeTravelContact from './ageTravelContact';
import ContactInfo from './contactInfo';
import Origin from './origin';
import Observation from './observation';

const steps = [
    Origin,
    ContactInfo,
    Temperature,
    AgeTravelContact,
    RespiratoryChart,
    ChronicChart,
    Observation
];

const Questions = ({handleQuestion}) => {
    const formik = useFormik({
        initialValues: {
            origin: null,
            phone: null,
            temperature: null,
            sixtyMore: null,
            hasTravel: null,
            contactSuspect: null,
            respiratoryChart: [],
            chronicChart: [],
            obs: null,
            medicalUnit: null
        },
        onSubmit: values => {
            const nValues = {
                ...values,
                sixtyMore: values.sixtyMore === 'sim',
                hasTravel: values.hasTravel === 'sim',
                contactSuspect: values.contactSuspect === 'sim',
                origin: values.origin === 1,
                phone: values.phone.replace(/[^0-9]/gi, '')
            };

            handleQuestion(nValues);
        },
    });

    const [actStep, setActStep] = useState(0);

    let Step = null;
    if (actStep >= steps.length) {
        Step = steps[0];
        setActStep(0);
    } else {
        Step = steps[actStep];
    }
    
    return (
        <form onSubmit={formik.handleSubmit} x={console.log(formik.values)}>
            <Step
                step={actStep}
                setStep={setActStep}
                formik={formik}
                isSubmit={actStep >= steps.length - 1}
            />
        </form>
    );
}

export default Questions;
