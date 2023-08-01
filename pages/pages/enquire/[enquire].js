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
    const page = admin === 'new' ? 'Add Admin' : 'Edit Enquire';
    const [value, setValue] = useState('');
    const [enquireList, setEnquireList] = useState({ id: uuid(), userName: '', userPassword: '', userMobile: '', userEmail: '', userRole: '', userStatus: '', createdOn: '' });
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
        setEnquireList({ ...enquireList, [id]: value })
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!enquireList.userName) { toastAlert('Enter User Name'); }
        else if (!enquireList.userMobile) { toastAlert('Enter Mobile Number'); }
        else if (!enquireList.userMobile.length !== 10 ) { toastAlert('Enter Valid Mobile Number'); }
        else if (!enquireList.userEmail) { toastAlert('Enter EMail Address'); }
        else if (!enquireList.userRole) { toastAlert('Select Role'); }
        else if (!enquireList.userStatus) { toastAlert('Select Status'); }
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
                        <Button icon="pi pi-arrow-left" severity="danger" className="ml-1" tooltip="Go Back" tooltipOptions={{ position: 'top' }} onClick={() => router.push('/pages/enquire')} />
                    </span>
                </div>
                <hr />
                <div className="col-12 lg:col-8">
                <div className="card">
                    <h5>Inline</h5>
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="username1" className="col-fixed w-9rem">
                            Title
                        </label>
                        <InputText id="username1" value={enquireList.title} onChange={(e) => setTitle(e.target.value)}  className="p-invalid" disabled/>                       
                    </div>
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="email" className="col-fixed w-9rem">
                            Description
                        </label>
                        <InputText id="email" value={enquireList.description}  onChange={(e) => setDescription(e.target.value)}  className="p-invalid" disabled/>                        
                    </div>
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="email" className="col-fixed w-9rem">
                            Deadline
                        </label>
                        <InputText id="email" value={enquireList.deadline}  onChange={(e) => setDeadline(e.target.value)}  className="p-invalid" disabled/>                        
                    </div>
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="email" className="col-fixed w-9rem">
                            Upload Quotation
                        </label>
                        <InputText id="email" value={enquireList.description}  onChange={(e) => setEmail(e.target.value)} required className="p-invalid" />                        
                    </div>
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="amount" className="col-fixed w-9rem">
                            Amount
                        </label>
                        <InputText id="amount" value={enquireList.amount}  onChange={(e) => setAmount(e.target.value)} required className="p-invalid" />                        
                    </div>
                    <div className="flex align-items-center flex-wrap gap-2">
                        <label htmlFor="email" className="col-fixed w-9rem">
                            Enquire Status
                        </label>
                        <InputText id="status" value={enquireList.status}  onChange={(e) => setStatusl(e.target.value)}  className="p-invalid" disabled/>                        
                    </div>
                </div>
            </div>
                <div className='mt-3'>
                    <div className="field col-12">
                        <span className="p-float-label">
                            <InputText
                                id="userName"
                                keyfilter={/^[a-zA-Z ]*$/}
                                className='w-full'
                                autoComplete='off'
                                maxLength={50}
                                value={enquireList.userName}
                                onChange={handleChange} disabled
                            />
                            <label htmlFor="title">Title</label>
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
                                value={enquireList.userMobile}
                                onChange={handleChange} disabled
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
                                value={enquireList.userEmail}
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
                                value={enquireList.userPassword}
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
                                value={enquireList.userRole}
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
                                value={enquireList.userStatus}
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