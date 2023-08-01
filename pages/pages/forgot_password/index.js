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
                        {/* <div className="text-center mb-5">
                            <img src="/demo/images/login/avatar.png" alt="Image" height="50" className="mb-3" />
                            <div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                            <span className="text-600 font-medium">Sign in to continue</span>
                        </div> */}

                        <div>
                            {/* <label htmlFor="mobilenum" className="block text-900 text-xl font-medium mb-2">
                                Enter Registered Mobile Number
                            </label>
                            <InputText inputid="mobilenum" type="text" placeholder="Mobile Number" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} /> */}
                            {/* <InputNumber value={inputNumberValue} onValueChange={(e) => setInputNumberValue(e.value)} showButtons></InputNumber> */}

                            {isNumber ?
                                <>
                                    {/* <div className="field col-12">
                                        <span className="p-float-label">
                                            <InputText
                                                id="mobile"
                                                keyfilter="pint"
                                                className='w-full md:w-30rem mb-5'
                                                autoComplete='off'
                                                maxLength={10}                                                
                                            />
                                            <label htmlFor="mobile">Enter Registered Mobile Number</label>
                                        </span>
                                    </div>                                    */}
                                    <label htmlFor="pint" className="font-bold block mb-2" >
                                        Enter Registered Mobile Number
                                    </label>
                                    <InputText id="pint" keyfilter="pint" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} placeholder="Enter Registered Mobile Number" maxLength={10} autoComplete='off'/>
                                    <Button label="Send OTP" className="w-full p-3 text-xl" onClick={() => {setIsNumber(false)}}></Button>
                                </> :
                                <>
                                    <div className="font-semibold text-3xl my-3">
                                        <p>OTP Verification</p>
                                        <div className='text-center'>
                                            <InputText keyfilter={'pint'} className='col-6 mx-2' maxLength={4} />
                                            {/* <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} />
                                            <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} />
                                            <InputText keyfilter={'pint'} className='col-2 mx-1' maxLength={1} /> */}
                                            <Button label="Verify" className="col-3 text-xl mx-2" onClick={() => router.push('/')}></Button>
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
