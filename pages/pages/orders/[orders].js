import React, { useEffect, useState, useRef } from 'react';
import { v4 as uuid } from "uuid";
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { Divider } from 'primereact/divider';
import { Dropdown } from 'primereact/dropdown';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProductService } from '../../../demo/service/ProductService';
import { DataTable } from 'primereact/datatable';
import { Badge } from 'primereact/badge';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Calendar } from 'primereact/calendar';
import { getSession } from '../../../util';


export default function o() {


    let emptyInvoice = {
        invoiceidcre: null,
        duedate: '',
        amount: null,
        invoice: null
    };

    const router = useRouter();
    const { orders } = router.query;
    const page = orders === 'new' ? 'Add Admin' : 'Orders Details';
    const [ordersList, setOrdersList] = useState({ id: uuid(), orderid: '1', invoiceid:'ABC1',orderamount: '12000', paidamount: '7500',balanceamount:'4500' });
    const [invoiceList, setInvoiceList] = useState({ id: uuid(), invoiceidcre: '',duedate:'',amount:'', invoice: ''});


    const [invoiceDialog, setInvoiceDialog] = useState(false);
    const [selectedinvoice, setSelectedInvoice] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [invoice, setInvoice] = useState(emptyInvoice);
    const [value, setValue] = useState('');
    const [adminList, setAdminList] = useState({ id: uuid(), userName: '', userPassword: '', userMobile: '', userEmail: '', userRole: '', userStatus: '', createdOn: '' });
    const toast = useRef(null);
    const [paymentList, setPaymentList] = useState([{
        id: uuid(),
        sno: '1',
        paymentdate: '27-Jul-2023',
        totalamount: '12000',
        paidamount: '7500',
        balanceamount: '4500',
        modeofpayment: 'Cash',
        transactionid: 'ASD12'
    }]);






    const headerTemplate = () => {
        return (
            <div className='mx-2'>
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mt-1">
                    <h5 className="m-0">Payment Details</h5>
                </div>
                <hr />
            </div>
        )
    };


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

    const [startDate, setStartDate] = useState(new Date());

    const toastAlert = (errMessage) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: errMessage, life: 3000 });
    };
    const handleChange = (event) => {
        const { id, value } = event.target;
        setAdminList({ ...adminList, [id]: value })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(invoiceList, "fffff")
        if (!invoiceList.invoiceidcre) { toastAlert('Enter the Invoice Id'); }
        else if (!invoiceList.duedate) { toastAlert('Enter the Due Date'); }
        else if (!invoiceList.amount) { toastAlert('Enter the amount'); }
        else if (!invoiceList.invoice) { toastAlert('Upload the Invoice'); }
    };

    const onInputChange = (e, invoiceidcre) => {
        const val = (e.target && e.target.value) || '';
        let _invoice = { ...invoice };
        _invoice[`${invoiceidcre}`] = val;

        setInvoice(_invoice);
    };
    const openNew = () => {
        setInvoice(emptyInvoice);
        setSubmitted(false);
        setInvoiceDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setInvoiceDialog(false);
    };


    const saveInvoice = () => {
        setSubmitted(true);

        if (invoice.invoiceidcre) {
            let _invoice = { ...invoice };
            if (invoice.invoiceidcre) {
                const index = findIndexById(invoice.invoiceidcre);


            } else {
                _invoice.invoiceidcre = createId();
                _invoice.duedate = createId();
                _invoice.amount = '';
                _invoice.invoice = '';
                _invoice.push(_invoice);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }


            setInvoiceDialog(false);
            setInvoice(emptyInvoice);
        }
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < invoice.length; i++) {
            if (invoice[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    };





    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} label="Import" chooseLabel="Import" className="mr-2 inline-block" /> */}

            </React.Fragment>
        );
    };







    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                {/* <div className="my-2"> */}
                {/* <Button label="Invoice Details" type='button' icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />                    */}
                {/* </div> */}
            </React.Fragment>
        );
    };

    const onInputNumberChange = (e, invoiceidcre) => {
        const val = e.value || 0;
        let _invoice = { ...invoice };
        _invoice[`${invoiceidcre}`] = val;

        setInvoice(_invoice);
    };

    const invoiceDialogFooter = (
        <>
            <Button label="Cancel" icon="pi pi-times" text onClick={hideDialog} />
            <Button type="submit" label="Save" icon="pi pi-check" text onClick={saveInvoice} />
        </>
    );

    const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        console.log(event.files.length);
        if (event.files.length > 0) {
            const files = event.files[0];
            const size = files.size / 1024;
            const type = files.type;
            const fileName = ordersList.id + "." + type.split('/')[1];
            if (size > 250) { toast('File size should not be greater than 250 KB'); }
            else if (!type.includes('pdf')) { toast('File type format should be pdf'); }
            else {
                setFile(files);
                setOrdersList({ ...ordersList, ['invoice']: fileName });
            }
        }

    };

    const footerTemplate = {
        layout: 'RowsPerPageDropdown CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
        RowsPerPageDropdown: (options) => {
            const dropdownOptions = [{ label: 'All', value: options.totalRecords }, { label: 10, value: 10 }, { label: 25, value: 25 }, { label: 50, value: 50 }, { label: 100, value: 100 }];
            return (
                <div className='left_item'>
                    <span style={{ color: 'var(--text-color)', userSelect: 'none' }}>Items per page: </span>
                    <Dropdown value={options.value} onChange={options.onChange} options={dropdownOptions} />
                </div>
            );
        },
        CurrentPageReport: (options) => {
            const name = (options.totalRecords > 1) ? 'Orders' : 'Orders'
            return (
                <div className='center_item'>
                    <span style={{ color: 'var(--text-color)', userSelect: 'none', width: 'auto', textAlign: 'center' }}>
                        Showing {options.first} - {options.last} of {options.totalRecords} {name}
                    </span>
                </div>
            );
        },


    };


    useEffect(() => {
        document.title = page + ' | NAC Vendor';
        document.getElementById('navOrder').classList.add('active-route');
    }, []);
    return (
        <form method='POST' onSubmit={handleSubmit}>
            <Toast ref={toast} />
            {/* <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar> */}
            <div className='card'>
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 className="m-0">{page}</h5>
                    <span className="block md:mt-0 p-input-icon-left">
                        {/* <Button icon={`pi pi-${orders === 'new' ? 'plus' : 'pencil'}`} severity="success" className="mr-1" tooltip={page} tooltipOptions={{ position: 'top' }} disabled={false}/> */}
                        <Button label="Invoice Details" type='button' icon="pi pi-plus" severity="sucess" className="mr-2" onClick={openNew} />
                        <Button icon="pi pi-arrow-left" severity="danger" className="ml-1" type='button' tooltip="Go Back" tooltipOptions={{ position: 'top' }} onClick={() => router.push('/pages/orders')} />
                    </span>
                </div>
                <hr />
                <div className='mt-3'>
                <Dialog visible={invoiceDialog} style={{ width: '505px' }} header="Invoice Details" type="button" modal className="p-fluid" footer={invoiceDialogFooter} onHide={hideDialog}>

                        <div className="field">
                            <label htmlFor="invoiceidcre">Invoice No.</label>
                            <InputText id="invoiceidcre"  onChange={(e) => onInputChange(e, 'invoiceidcre')} required autoFocus  />
                            {submitted && !invoice.invoiceidcre && <small className="p-invalid">Invoice No. is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="duedate">Due Date</label>
                            <Calendar inputId="calendar" id="duedate" required showIcon></Calendar>
                            {submitted && !invoice.calendar && <small className="p-invalid">Due Date is required.</small>}
                        </div>
                        <div className="formgrid grid">
                            <div className="field col">
                                <label htmlFor="amount">Amount</label>
                                <InputNumber id="amount"  onValueChange={(e) => onInputNumberChange(e, 'amount')} mode="currency" currency="INR" locale="en-INDIA" required />
                                {submitted && !invoice.amount && <small className="p-invalid">Amount is required.</small>}
                            </div>
                        </div>
                        <div className="formgrid grid">
                            <label htmlFor="invoice" className="col-fixed w-9rem">
                                Upload Invoice:
                            </label>
                            {/* <FileUpload mode="basic" accept="application/pdf" id="invoice" maxFileSize={1000000} label="Upload" chooseLabel="Upload" customUpload uploadHandler={customBase64Uploader} className="mr-2 inline-block" />                             */}
                            <FileUpload name="demo[]" url={'/api/upload'} accept="application/pdf"  maxFileSize={1000000} />
                        </div>

                </Dialog>
                <div className="col-12 lg:col-8">
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="orderid" className="col-fixed w-9rem">
                           Order ID :
                        </label>
                        <span>1</span>
                    </div>
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="invoiceid" className="col-fixed w-9rem">
                            Invoice No. :
                        </label>
                        <span>ABC1</span>
                    </div>
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="orderamount" className="col-fixed w-9rem">
                            Amount :
                        </label>
                        <span>12000</span>
                    </div>
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="paidamount" className="col-fixed w-9rem">
                            Paid Amount :
                        </label>
                        <span>7500</span>
                    </div>
                    <div className="flex align-items-center flex-wrap gap-2 mb-3">
                        <label htmlFor="balanceamount" className="col-fixed w-9rem">
                            Balance Amount :
                        </label>
                        <span>4500</span>
                    </div>
                    </div>
                </div>
            </div>

            <>
            <DataTable
                tableStyle={{ width: '100%' }} className='mb-4 datatable-responsive' scrollHeight="430px" size='small' scrollable showGridlines stripedRows paginator
                header={headerTemplate}
                dataKey="id" value={paymentList} rows={10} sortMode="multiple" removableSort
                rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Payments"
            >
                <Column
                    header='S.NO' headerStyle={{ 'minWidth': '60%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='sno' filterField="sno" className='text-start'
                />
                <Column
                    header='Payment Date' headerStyle={{ width: '60%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='paymentdate' filterField="paymentdate" className='text-end'
                />
                 <Column
                    header='Total Amount' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='totalamount' filterField="totalamount" className='text-start'
                />
                <Column
                    header='Paid Amount' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='paidamount' filterField="paidamount" className='text-start'
                />
                <Column
                    header='Balance Amount' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='balanceamount' filterField="balanceamount" className='text-center'
                />
                <Column
                    header='Mode Of Payment' headerStyle={{ width: '1%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='modeofpayment' filterField="modeofpayment" className='text-center'
                />
                <Column
                    header='Transaction Id' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='transactionid' filterField="transactionid" className='text-start'
                />
            </DataTable>
        </>
        </form>
    )
}