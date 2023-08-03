import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

const FormLayoutDemo = () => {
    const [dropdownItem, setDropdownItem] = useState(null);
    const dropdownItems = [
        { name: 'Option 1', code: 'Option 1' },
        { name: 'Option 2', code: 'Option 2' },
        { name: 'Option 3', code: 'Option 3' }
    ];

    return (
        <div className="grid">
            <div className="col-12">
                <div className="card">
                    <h5>Enter Your Mobile No</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-12">
                            <label htmlFor="firstname2">Mobile No</label>
                            <InputText id="firstname2" type="text" />
                        </div>
                        <div className="field col-12 md:col-12 tex mt-2" style={{"text-align": "right;"}}>
                        <Button label="Submit" icon="pi pi-lock" className="p-button p-component w-2"></Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Enter Your OTP</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-1">
                            <InputText id="firstname2" type="text" maxLength={4} keyfilter="pint" />
                        </div>
                       
                        <div className="field col-12 md:col-12 tex mt-2" style={{"text-align": "right;"}}>
                        <Button label="Verify" icon="pi pi-lock" className="p-button p-component w-2"></Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12">
                <div className="card">
                    <h5>Change Password</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-12">
                            <label htmlFor="firstname2">Old Password</label>
                            <InputText id="firstname2" type="text" />
                        </div>
                        <div className="field col-12 md:col-12">
                            <label htmlFor="lastname2">New Password</label>
                            <InputText id="lastname2" type="text" />
                        </div>
                        <div className="field col-12 md:col-12">
                            <label htmlFor="lastname2">Confirm Password</label>
                            <InputText id="lastname2" type="text" />
                        </div>
                        <div className="field col-12 md:col-12 tex mt-2" style={{"text-align": "right;"}}>
                        <Button label="Change Password" icon="pi pi-lock" className="p-button p-component w-2"></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormLayoutDemo;
