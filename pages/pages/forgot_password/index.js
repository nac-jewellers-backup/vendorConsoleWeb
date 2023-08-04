import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';


const LoginPage = () => {
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const [isNumber, setIsNumber] = useState(true);
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
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                {/* <img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" /> */}
                {/* <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}> */}
                <div>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div>
                            {isNumber ?
                                <>                                    
                                    <div className="font-semibold text-3xl my-3">
                                        <label htmlFor="pint" className="font-bold block mb-2" >
                                            Enter Registered Mobile Number
                                        </label>
                                        <div className='text-center'>
                                            <InputText keyfilter={'pint'} className='col-6 mx-2' maxLength={10} autoComplete='off'/>                                            
                                            {/* <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} />
                                            <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} />
                                            <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} /> */}
                                            <Button label="Verify" className="col-3 text-xl mx-2" onClick={() => setIsNumber(false)}></Button>                                            
                                        </div>
                                    </div>
                                </> :
                                <>
                                    <div className="font-semibold text-3xl my-3">
                                        <p>OTP Verification</p>
                                        <div className='text-center'>
                                            <InputText keyfilter={'pint'} className='col-6 mx-2' maxLength={4} />
                                            {/* <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} />
                                            <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} />
                                            <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} /> */}
                                            <Button label="Verify" className="col-3 text-xl mx-2" onClick={() => router.push('/pages/new_password')}></Button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
