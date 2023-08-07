import { useRouter } from 'next/router';
import React, { useContext, useState, useEffect } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { useTimeout } from 'primereact/hooks';
import axios from 'axios';
import Link from 'next/link'

import { LayoutContext } from '../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import AppFooter from '../layout/AppFooter';
import { ProductService } from '../demo/service/ProductService';

const LoginPage = () => {
    const [login, setLogin] = useState({ mobile_number: '', password: '' });
    const { layoutConfig } = useContext(LayoutContext);
    const [err, setErr] = useState('');
    const [disable, setDisable] = useState(false);
    const router = useRouter();

    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    const handleChange = (event) => {
        const { id, value } = event.target;
        setLogin({ ...login, [id]: value })
    }
    useTimeout(() => setErr(''), (10 * 1000));
    const handleSubmit = (event) => {
        event.preventDefault();
        setDisable(false);
        const { mobile_number, password } = login;
        if (!mobile_number) { setErr('Enter the mobile number!') }
        else if (!password) { setErr('Enter the password') }
        else {
            setDisable(true);
            if (mobile_number == '8925754119' && password == '12345678') {
                setErr('');
                router.push('/pages/enquire')
            } else {
                setErr('Invalid Credentials');
                setDisable(false);
            }
        }
    };

    return (
        <>
            <div className={containerClassName}>
                <div className="flex flex-column align-items-center justify-content-center">
                    <img src={`/layout/images/logo.png`} alt="Sakai logo" className="mb-3" />
                    <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                        <div>
                            <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                                <form method='POST' onSubmit={handleSubmit}>

                                    <label htmlFor="mobile_number" className="block text-900 text-xl font-medium mb-2">
                                        Mobile Number
                                    </label>
                                    <InputText id="mobile_number" keyfilter="pint" placeholder="Mobile Number" value={login.mobile_number} onChange={handleChange} className="w-full md:w-30rem mb-5" maxLength={10} style={{ padding: '1rem' }} />

                                    <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">
                                        Password
                                    </label>
                                    <Password inputId="password" value={login.password} onChange={handleChange} placeholder="Password" className="w-full mb-5" toggleMask feedback={false} inputClassName="w-full p-3 md:w-30rem"></Password>

                                    <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                        <div className="flex align-items-center">
                                            {/* <Checkbox inputid="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked)} className="mr-2"></Checkbox> */}
                                            {err && <label htmlFor="rememberme1" className='p-error'>{err}</label>}

                                        </div>
                                        <Link className='font-medium no-underline ml-2 text-right cursor-pointer' style={{ color: 'var(--primary-color)' }} href="/pages/forgot_password">Forgot password?</Link>
                                    </div>

                                    <Button label="Sign In" className="w-full p-3 text-xl" disabled={disable} />
                                </form>
                            </div>
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
