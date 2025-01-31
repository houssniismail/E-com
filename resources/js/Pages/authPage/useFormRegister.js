import { useState } from 'react';

const useFormRegister = (initialValues) => {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    const [processing, setProcessing] = useState(false);

    const postRegister = async (url, options) => {
        setProcessing(true);
        try {
            const response = await axios.post(url, values);
            // Handle successful submission
            if (options?.onFinish) {
                options.onFinish();
            }
        } catch (error) {
            // Handle errors
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            }
        } finally {
            setProcessing(false);
        }
    };

    const resetRegister = () => {
        setValues(initialValues);
        setErrors({});
    };

    return {
        postRegister,
        processingRegister: processing,
        errorsRegister: errors,
        resetRegister,
    };
};

export default useFormRegister;