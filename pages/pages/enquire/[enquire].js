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
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';

export default function Enquire() {
    const router = useRouter();
    const { enquire } = router.query;
    const page = enquire === 'new' ? 'Add Admin' : 'Enquire Details';
    const [value, setValue] = useState('');
    const [enquireList, setEnquireList] = useState({ id: uuid(), amount: '', quotation: '', status: '' });
    const toast = useRef(null);
    const [file, setFile] = useState('');
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
    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded        
        console.log(event.files.length);
        if (event.files.length > 0) {
            const files = event.files[0];
            const size = files.size / 1024;
            const type = files.type;
            const fileName = enquireList.id + "." + type.split('/')[1];
            if (size > 250) { toast('File size should not be greater than 250 KB'); }
            else if (!type.includes('pdf')) { toast('File type format should be pdf'); }
            else {
                setFile(files);
                setEnquireList({ ...enquireList, ['quotation']: fileName });
            }
        }

    };
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(enquireList, "fffff")
        if (!enquireList.amount) { toastAlert('Enter the amount'); }
        else if (!enquireList.quotation) { toastAlert('Upload the quotation'); }
    };



    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" />
            </React.Fragment>
        );
    };


    useEffect(() => {
        document.title = page + ' | NAC Vendor';
        document.getElementById('navEnquire').classList.add('active-route');
    }, []);
    return (
        <>
            {/* <Toolbar className="mb-4" l right={rightToolbarTemplate}></Toolbar> */}

            <form method='POST' onSubmit={handleSubmit}>

                <Toast ref={toast} />
                <div className="col-12 md:col-12">
                    <div className='card'>
                        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                            <h5 className="m-0">{page}</h5>
                            <span className="block md:mt-0 p-input-icon-left">
                                <Button icon={`pi pi-${enquire === 'new' ? 'plus' : 'pencil'}`} severity="success" className="mr-1" tooltip={page} tooltipOptions={{ position: 'top' }} disabled={false} />
                                <Button icon="pi pi-arrow-left" severity="danger" className="ml-1" tooltip="Go Back" tooltipOptions={{ position: 'top' }} onClick={() => router.push('/pages/enquire')} />
                            </span>
                        </div>
                        <hr />
                        <div className="col-12 lg:col-8">
                            <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                <label htmlFor="Title" className="col-fixed w-9rem">
                                    Title:
                                </label>
                                <InputText id="Title" value={enquireList.title}  disabled />
                            </div>
                            <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                <label htmlFor="Description" className="col-fixed w-9rem">
                                    Description:
                                </label>
                                <InputText id="Description" value={enquireList.description} disabled/>
                            </div>
                            <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                <label htmlFor="Deadline" className="col-fixed w-9rem">
                                    Deadline:
                                </label>
                                <InputText id="Deadline" value={enquireList.deadline}  disabled />
                            </div>
                            <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                <label htmlFor="email" className="col-fixed w-9rem">
                                    Enquire Status:
                                </label>
                                <InputText id="status" value={enquireList.status} disabled />
                            </div>
                            <div className="flex align-items-center flex-wrap gap-2 mb-3">
                                <label htmlFor="amount" className="col-fixed w-9rem">
                                    Amount:
                                </label>
                                <InputText id="amount" keyfilter="money" value={enquireList.amount} onChange={handleChange} />
                                {/* onChange={(e) => setAmount(e.target.value)} */}
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className="col-12 md:col-12">               
                    <div className='card'>
                    <h5 htmlFor="quotation" className="col-fixed w">Upload Quotation :</h5>
                    <hr />
                        <div className="flex align-items-center flex-wrap gap-2 mb-3">
                            {/* <label htmlFor="quotation" className="col-fixed w">
                                Upload Quotation:
                            </label> */}
                           
                            {/* <FileUpload mode="basic" accept="application/pdf" id="quotation" maxFileSize={1024000} label="Upload" chooseLabel="Upload" customUpload uploadHandler={customBase64Uploader} className="mr-2 inline-block" /> */}
                            {/* <InputText id="email" value={enquireList.description}  onChange={(e) => setEmail(e.target.value)} required className="p-invalid" />                         */}
                            <FileUpload name="demo[]" url={'/api/upload'} accept="application/pdf" maxFileSize={1000000} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}