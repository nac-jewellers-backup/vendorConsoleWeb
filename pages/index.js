import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useTimeout } from 'primereact/hooks';
import { LayoutContext } from '../layout/context/layoutcontext';
import { getSession, setUserSession } from '../util';

const LoginPage = () => {
    const [login, setLogin] = useState({ tableName: 'nac_cms_vendor', mobile_number: '', password: '' });
    const [err, setErr] = useState('');
    const { layoutConfig } = useContext(LayoutContext);
    const router = useRouter();
    const [disable, setDisable] = useState(false);
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });
    useTimeout(() => setErr(''), (10 * 1000));

    const handleChange = (event) => {
        const { id, value } = event.target;
        setLogin({ ...login, [id]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setDisable(false);
        const { mobile_number, password } = login;
        if (!mobile_number) { setErr('Enter the mobile number!') }
        else if(mobile_number.length !== 10 ){setErr('Enter valid mobile number!')}
        else if (!password) { setErr('Enter the password') }
        else if (password.length !==8) { setErr('Enter valid password') }
        else {
            setDisable(true);
            await axios.post(`${process.env.API_URL}/login`, login, { headers: { 'x-api-key': process.env.API_KEY } }).then((response) => {
                setUserSession(response.data.session);
                router.push('/dashboard');
            }).catch((error) => {
                console.log(error);
                setErr(error.response.data.message);
                setDisable(false);
            });
        }
    };

    useEffect(() => {
        if (getSession()) { router.push('/dashboard') }
    }, [])

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo.png`} alt="Sakai logo" className="mb-3" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <form method='POST' onSubmit={handleSubmit}>
                            <label htmlFor="mobile_number" className="block text-900 text-xl font-medium mb-2">Mobile Number</label>
                            <InputText id="mobile_number" keyfilter="pint" placeholder="Mobile Number" className="w-full md:w-30rem mb-5" maxLength={10} style={{ padding: '1rem' }} value={login.mobile_number} onChange={handleChange} />
                            <label htmlFor="password" className="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password inputId="password" value={login.password} onChange={handleChange} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem" feedback={false} />
                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    {err && <label className='p-error'>{err}</label>}
                                </div>
                                <Link className='font-medium no-underline ml-2 text-right cursor-pointer' style={{ color: 'var(--primary-color)' }} href="/pages/forgot_password">Forgot password?</Link>
                            </div>
                            <Button label="Sign In" className="w-full p-3 text-xl" disabled={disable} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

};

LoginPage.getLayout = function getLayout(page) {
    return (
        <>
            {page}
        </>
    );
};
export default LoginPage;