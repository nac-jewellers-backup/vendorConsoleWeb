import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from "uuid";
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

export default function Admin() {
    const router = useRouter();
    const { admin } = router.query;
    const page = admin === 'new' ? 'Add Admin' : 'Edit Admin';
    const [value, setValue] = useState('');
    const [adminList, setAdminList] = useState({ id: uuid(), userName: '', userPassword: '', userMobile: '', userEmail: '', userRole: '', userStatus: '', createdOn: '' });
    const toast = useRef(null);
    const adminRole = [
        { name: 'Super Admin', code: 'Super Admin' },
        { name: 'Admin', code: 'Admin' }
    ];
    const adminStatus = [
        { name: 'Active', code: 'Active' },
        { name: 'Inactive', code: 'Inactive' }
    ];
    const header = (<div className="font-bold mb-3">Pick a password</div>);
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </>
    );
    const toastAlert = (errMessage) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errMessage, life: 3000 });
    };
    const handleChange = (event) => {
        const { id, value } = event.target;
        setAdminList({ ...adminList, [id]: value })
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!adminList.userName) { toastAlert('Enter User Name'); }
        else if (!adminList.userMobile) { toastAlert('Enter Mobile Number'); }
        else if (!adminList.userMobile.length !== 10 ) { toastAlert('Enter Valid Mobile Number'); }
        else if (!adminList.userEmail) { toastAlert('Enter EMail Address'); }
        else if (!adminList.userRole) { toastAlert('Select Role'); }
        else if (!adminList.userStatus) { toastAlert('Select Status'); }
    };
    useEffect(() => {
        document.title = page + ' | NAC Vendor';
        document.getElementById('navAdmin').classList.add('active-route');
    }, []);
    return (
        <form method='POST' onSubmit={handleSubmit}>
            <Toast ref={toast} />
            <div className='card'>
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 className="m-0">{page}</h5>
                    <span className="block md:mt-0 p-input-icon-left">
                        <Button icon={`pi pi-${admin === 'new' ? 'plus' : 'pencil'}`} severity="success" className="mr-1" tooltip={page} tooltipOptions={{ position: 'top' }} disabled={false}/>
                        <Button icon="pi pi-arrow-left" severity="danger" className="ml-1" tooltip="Go Back" tooltipOptions={{ position: 'top' }} onClick={() => router.push('/pages/admin')} />
                    </span>
                </div>
                <hr />
                <div className='mt-3'>
                    <div className="field col-12">
                        <span className="p-float-label">
                            <InputText
                                id="userName"
                                keyfilter={/^[a-zA-Z ]*$/}
                                className='w-full'
                                autoComplete='off'
                                maxLength={50}
                                value={adminList.userName}
                                onChange={handleChange}
                            />
                            <label htmlFor="userName">Enter Name</label>
                        </span>
                    </div>
                    <div className="field col-12">
                        <span className="p-float-label">
                            <InputText
                                id="userMobile"
                                keyfilter="pint"
                                className='w-full'
                                autoComplete='off'
                                maxLength={10}
                                value={adminList.userMobile}
                                onChange={handleChange}
                            />
                            <label htmlFor="userMobile">Enter Mobile Number</label>
                        </span>
                    </div>
                    <div className="field col-12">
                        <span className="p-float-label">
                            <InputText
                                id="userEmail"
                                keyfilter="email"
                                className='w-full'
                                autoComplete='off'
                                maxLength={25}
                                value={adminList.userEmail}
                                onChange={handleChange}
                            />
                            <label htmlFor="userEmail">Enter EMail Address</label>
                        </span>
                    </div>
                    {admin === 'new' ? <div className="field col-12">
                        <span className="p-float-label">
                            <Password
                                id="userPassword"
                                panelClassName='w-full'
                                inputClassName='w-full'
                                className='w-full'
                                header={header}
                                footer={footer}
                                toggleMask
                                maxLength={15}
                                value={adminList.userPassword}
                                onChange={handleChange}
                            />
                            <label htmlFor="userPassword">Password</label>
                        </span>
                    </div> : <></>}
                    <div className="field col-12">
                        <span className="p-float-label">
                            <Dropdown
                                id="userRole"
                                className='w-full'
                                optionLabel="name"
                                options={adminRole}
                                value={adminList.userRole}
                                onChange={handleChange}
                            />
                            <label htmlFor="userRole">Select Role</label>
                        </span>
                    </div>
                    <div className="field col-12">
                        <span className="p-float-label">
                            <Dropdown id="userStatus"
                                className='w-full'
                                optionLabel="name"
                                options={adminStatus}
                                value={adminList.userStatus}
                                onChange={handleChange}
                            />
                            <label htmlFor="userStatus">Select Status</label>
                        </span>
                    </div>
                </div>
            </div>
        </form>
    )
}