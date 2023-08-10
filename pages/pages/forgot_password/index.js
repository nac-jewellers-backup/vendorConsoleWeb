import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useTimeout } from 'primereact/hooks';
import axios from 'axios';

const LoginPage = () => {
    const [id, setId] = useState('');
    const [forgot_password, setForgot_password] = useState({ tableName: 'nac_cms_vendor', id: '', password: '' });
    const [password, setPassword] = useState({ new_password: '', confirmPassword: '' });
    const [mobile_number, setMobile_number] = useState('');
    const [otp, setOtp] = useState('');
    const router = useRouter();
    const [confirmOtp, setConfirmOtp] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const [isNumber, setIsNumber] = useState('number');
    const [disable, setDisable] = useState(false);
    const [mobile_validate, validat_mob] = useState("");
    useTimeout(() => validat_mob(''), (10 * 1000));
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    const postUser = async (e) => {
        e.preventDefault();
        if (mobile_number && mobile_number.length == 10) {
            await axios.post(`${process.env.API_URL}/verify`, { tableName: "nac_cms_vendor", mobile_number: mobile_number }, { headers: { 'x-api-key': process.env.API_KEY } })
                .then(res => { console.log(res.data); setIsNumber('otp'); setOtp(res.data.data.otp); setForgot_password({ ...forgot_password, ['id']: res.data.data.id }); validat_mob(''); }
                ).catch(err => {
                    console.log(err.response)
                    validat_mob(err.response.data.message)
                })
        } else { validat_mob("Enter Valid Mobile No") }
    }


    const checkOtp = (e) => {
        e.preventDefault();        
        if(otp.toString() === confirmOtp.toString()){
            setIsNumber(''),
            validat_mob('')
        }
        else{
            validat_mob('Enter Correct OTP')
        }
    }


    const postpassword = async (e) => {
        e.preventDefault();
        const passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,8}$/);
        // (otp.toString() === confirmOtp.toString()) ? setIsNumber('') : validat_mob('Enter Correct OTP');
        const { new_password, confirmPassword } = password;
        const checkpassword = passwordPattern.test(new_password);        
        validat_mob("")
        if (!new_password) {
            validat_mob("Enter the New Password")
        } else if (!confirmPassword) {
            validat_mob("Enter the confirm Password")
        } else if (!checkpassword) {
            validat_mob("Password should be Minimum eight to nine characters, at least one uppercase letter, one lowercase letter, one number and one special character");            
        } else if (new_password !== confirmPassword) {
            validat_mob("Password mismatched")
        } else {
            console.log(forgot_password)
            await axios.post(`${process.env.API_URL}/forgot_password`, forgot_password, { headers: { 'x-api-key': process.env.API_KEY } })
                .then(res => { (router.push('/')); console.log(res.data); validat_mob(''); }).catch(err => console.log(err.response))
        }

    }


    const handleChange = (e) => {
        const { id, value } = e.target;
        setPassword({ ...password, [id]: value });
        setForgot_password({ ...forgot_password, ['password']: value });
    }

    useEffect(() => {
        setIsNumber('number');
    }, [])

    return (
        <>
            <div className={containerClassName}>
                <div className="flex flex-column align-items-center justify-content-center">
                    <img src={`/layout/images/logo.png`} alt="NAC logo" className="mb-3" />
                    <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                        <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                            {isNumber === 'number' ?
                                <form method='POST' onSubmit={postUser}>
                                    <div className="font-semibold text-3xl my-3">
                                        <label htmlFor="pint" className="block text-900 text-xl font-medium mb-2" >
                                            Enter Registered Mobile Number
                                        </label>
                                        <div className='text-center'>
                                            <InputText id="mobile_number" keyfilter={'pint'} className='w-full md:w-30rem mb-5' value={mobile_number} onChange={(e) => setMobile_number(e.target.value)} maxLength={10} autoComplete='off' />
                                        </div>
                                        <label className="block text-900 text-xl font-medium mb-2 text-red-500">{mobile_validate}</label>
                                        <Button label="Send OTP" className="w-full p-3 text-xl" disabled={disable} />
                                    </div>
                                </form>
                                : isNumber === 'otp' ?
                                    <form method='POST' onSubmit={checkOtp}>
                                        <div className="font-semibold text-3xl my-3">
                                            <label htmlFor="pint" className="block text-900 text-xl font-medium mb-2" >
                                                OTP Verification
                                            </label>
                                            <div className='text-center'>
                                                <InputText id='otp' keyfilter={'pint'} className='w-full md:w-30rem mb-5' maxLength={4} value={confirmOtp} onChange={(e) => setConfirmOtp(e.target.value)} />
                                            </div>
                                            <label className="block text-900 text-xl font-medium mb-2 text-red-600">{mobile_validate}</label>
                                            <Button label="Verify" className="w-full p-3 text-xl" disabled={disable} />
                                        </div>
                                    </form>
                                    :
                                    <form method='POST' onSubmit={postpassword}>
                                        <div className="my-3">
                                            <label className="block text-900 text-xl font-medium mb-2" >
                                                Change Password
                                            </label>
                                            <div className="p-fluid formgrid grid">
                                                <div className="field col-12 md:col-12">
                                                    <label htmlFor="new_password">New Password</label>
                                                    <Password inputId='new_password' value={password.new_password} maxLength={8} onChange={handleChange} toggleMask feedback={false} />
                                                </div>
                                                <div className="field col-12 md:col-12">
                                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                                    <Password inputId='confirmPassword' value={password.confirmPassword} maxLength={8} onChange={handleChange} toggleMask feedback={false} />
                                                </div>
                                                <label className="block text-900 text-xl font-medium mb-2 text-red-600">{mobile_validate}</label>
                                                <Button label="Change Password" className="w-full p-3 text-xl" />
                                            </div>
                                            <div className='py-4'>
                                                <span className='fw-bold'>
                                                    Note: Password should be eight characters, at least one uppercase letter, one lowercase letter, one number and one special character<br />
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                            }
                        </div>
                    </div>
                </div>
            </div>
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
