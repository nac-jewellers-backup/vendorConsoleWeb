import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import AppFooter from '../../../layout/AppFooter';


const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);

    const handleMobileNumberChange = (e) => {
        setMobileNumber(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add mobile number validation here
        if (!mobileNumber) {
            setError('Mobile number is required');
        } else if (!/^[0-9]{10}$/.test(mobileNumber)) {
            setError('Invalid mobile number');
        } else {
            // Implement your password recovery logic here
            // You can send the mobile number to the server to verify and initiate password recovery
            setError(''); // Clear any previous error
            console.log('Password recovery initiated for mobile number:', mobileNumber);
        }
    };
    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <>
            <div className={containerClassName}>
                <div className="flex flex-column align-items-center justify-content-center">                   
                    <div className="card text-center my-4" style={{ borderRadius: '55px' }}>
                        <div className="font-semibold text-3xl my-3">
                            <p>OTP Verification</p>
                            <div className='text-center'>
                                <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} />
                                <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} />
                                <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} />
                                <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} />                                
                                <Button label="Verify" className="col-3 text-xl mx-2" onClick={() => router.push('/')}></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter />
        </>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
        </React.Fragment>
    );
};
export default LoginPage;
