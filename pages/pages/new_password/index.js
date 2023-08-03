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
                    <div>
                        <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                            <div>
                                <>
                                    <label htmlFor="pint" className="block text-900 text-xl font-medium mb-2" >
                                    Change Password
                                    </label>
                                    <div className="p-fluid formgrid grid">                        
                                        <div className="field col-12 md:col-12">
                                            <label htmlFor="lastname2">New Password</label>
                                            <InputText id="lastname2" type="text" />
                                        </div>
                                        <div className="field col-12 md:col-12">
                                            <label htmlFor="lastname2">Confirm Password</label>
                                            <InputText id="lastname2" type="text" />
                                        </div>
                                        <div className="text-right">                                       
                                        <Button label="Change Password"  className="w-full p-3 text-xl"  onClick={() => router.push('/')}></Button>
                                        </div>
                                    </div>
                                </>                                     
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
