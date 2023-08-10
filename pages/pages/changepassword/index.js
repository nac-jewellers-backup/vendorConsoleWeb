import React, { useState , useEffect } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';
import {getSession} from '../../../util'
import { useRouter } from 'next/router';

function FormLayoutDemo(){

const [isNumber, setIsNumber] = useState('number');
const [mobile_number,setName] = useState("");
// Mobile validation message
const [mobile_validate,validat_mob] = useState("");
const [chpwd_validate,validat_chpwd] = useState("");
// Show & Hide previous page
const [Mobile_vefiy,setMobile_vefiy] = useState(1);
const [Otp_vefiy,setOtp_vefiy] = useState(0);
const [Changepwd_vefiy,setChangepwd_vefiy] = useState(0);
// Otp validate
const [otp,setOtp] = useState("")
const [confirmOtp,setConfirmOtp] = useState("");

// const [change_password, setChange_password] = useState({id: '' });
const [change_password, setChange_password] = useState({ tableName: 'nac_cms_vendor', id: '', old_password:'', new_password: '', confirmPassword:'' });
// const [password, setPassword] = useState({ new_password: '', confirmPassword: '' });

const handleChange = (e) => {
    const { id, value } = e.target;
    setChange_password({ ...change_password, [id]: value });
}

const router = useRouter();

useEffect(() => {
    setIsNumber('number');
}, [])

// Mobile no validation
const postUser = async(e) => {
    e.preventDefault();
    if(mobile_number && mobile_number.length ==10){
       await axios.post(`${process.env.API_URL}/verify`, { tableName: "nac_cms_vendor", mobile_number:mobile_number},{headers:{'x-api-key':process.env.API_KEY }})
    .then(res => {
        const {data} = res.data;
            console.log(res.data);
            // validat_mob("Valid No")
            setMobile_vefiy(0)
            setOtp_vefiy(1)
            setConfirmOtp(data.otp);
            setChange_password({ ...change_password, ['id']: res.data.data.id });
    }
    ).catch(err=>{
        console.log(err.response.data);
        validat_mob(err.response.data.message)
    })
    }else{
        validat_mob("Enter Valid Mobile No")
    }
}

// Otp == confirmOtp Check
const check_otp =()=>{
    console.log(otp, confirmOtp);
    if (otp.toString() === confirmOtp.toString()){
        setMobile_vefiy(0)
        setOtp_vefiy(0)
        setChangepwd_vefiy(1)
    } else{
        validat_mob("Enter Valid OTP")
    }
}

// Create New Password
const postpassword = async(e) => {
    e.preventDefault();
    const passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,8}$/);
        (otp.toString() === confirmOtp.toString()) ? setIsNumber('') : validat_chpwd('Enter Correct OTP');
        const { old_password,new_password, confirmPassword } = change_password;
        const checkpassword = passwordPattern.test(new_password);
        validat_chpwd("")
        if (!old_password) {
            validat_chpwd("Enter the Old Password")
        } else if (!new_password) {
            validat_chpwd("Enter the New Password")
        } else if (!confirmPassword) {
            validat_chpwd("Enter the confirm Password")
        } else if (!checkpassword) {
            validat_chpwd("Password should be Minimum eight to nine characters, at least one uppercase letter, one lowercase letter, one number and one special character");
        } else if (new_password !== confirmPassword) {
            validat_chpwd("Password mismatched")
        } else if (old_password === new_password) {
            validat_chpwd("Old password and new password cannot be the same")
        } else {
        console.log(change_password)
       await axios.post(`${process.env.API_URL}/change_password`, {session:getSession(),  request:change_password}, {headers:{'x-api-key':process.env.API_KEY }})
        .then(res => {
        console.log(res.data);
        router.push("/indexDesign");
        }
        )
        .catch(err=>{
            console.log(err.response.data);
            validat_chpwd(err.response.data.message)
        })
        }
        }

    return (
        <div className="grid">
             {Mobile_vefiy ?
                <div className="col-12">
                <div className="card">
                    <h5>Enter Your Mobile No</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-12">
                            <label htmlFor="mobile_number">Mobile No</label>
                            <InputText
                                type="text"
                                id="contactpersonNo"
                                keyfilter="pint"
                                className='w-full'
                                autoComplete='off'
                                maxLength={10}
                                value={mobile_number} onChange={(e) => setName(e.target.value) }
                            />
                        </div>
                            <lable className="ml-2 text-red-600">{mobile_validate}</lable>
                        <div className="field col-12 md:col-12 tex mt-2" style={{"text-align": "right;"}}>
                        <Button onClick={postUser} label="Submit" icon="pi pi-lock" className="p-button p-component w-2"></Button>
                        </div>
                    </div>
                </div>
            </div>:  <></>}

            {Otp_vefiy ?<div className="col-12">
                <div className="card">
                    <h5 style={{"text-align":"center"}}>Enter Your OTP</h5>
                    <div className="p-fluid formgrid grid justify-content-center">
                        <div className="field col-4">
                        <InputText
                                type="text"
                                id="contactpersonNo"
                                keyfilter="pint"
                                className='w-full text-2xl text-center'
                                autoComplete='off'
                                maxLength={4}
                                value={otp}
                                onChange={(e)=>setOtp(e.target.value)}
                                placeholder='****'
                            />
                        </div>
                        <div className="field col-12 md:col-12 tex mt-2" style={{"text-align":"center"}}>
                        <Button label="Verify" icon="pi pi-lock" className="p-button p-component w-2" onClick={check_otp}></Button>
                        </div>
                        <lable className="ml-2 text-red-600">{mobile_validate}</lable>
                    </div>
                </div>
            </div>:<></>}

          {Changepwd_vefiy?<div className="col-12">
            <form method='POST' onSubmit={postpassword}>
                <div className="card">
                    <h5>Change Password</h5>
                    <div className="p-fluid formgrid grid">
                        <div className="field col-12 md:col-12">
                            <label htmlFor="old_password">Old Password</label>
                            <InputText id="old_password" type="text" placeholder='******'
                            value={change_password.old_password} onChange={handleChange} maxLength={8}/>
                        </div>
                        <div className="field col-12 md:col-12">
                            <label htmlFor="new_password">New Password</label>
                            <InputText id="new_password" type="text" placeholder='******'
                            value={change_password.new_password} onChange={handleChange} maxLength={8}/>
                        </div>
                        <div className="field col-12 md:col-12">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <InputText id="confirmPassword" type="text" placeholder='******'
                            value={change_password.confirmPassword} onChange={handleChange} maxLength={8}/>
                        </div>
                        <lable className="ml-2 text-red-600">{chpwd_validate}</lable>
                        <div className="field col-12 md:col-12 tex mt-2" style={{"text-align": "right;"}}>
                        <Button label="Change Password" icon="pi pi-lock" className="p-button p-component w-2"></Button>
                        </div>
                        <div className='py-2 ml-2'>
                            <span className='fw-bold'>
                                Note: Password should be eight characters, at least one uppercase letter, one lowercase letter, one number and one special character<br />
                            </span>
                        </div>
                    </div>
                </div>
            </form>
            </div>:<></>}
        </div>
    );
};

export default FormLayoutDemo;
