import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { v4 as uuid } from "uuid";
import axios from 'axios';

import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import { Ripple } from 'primereact/ripple';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { Badge } from 'primereact/badge';
import { classNames } from 'primereact/utils';
import { FilterMatchMode } from 'primereact/api';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { getSession } from '../../util';


const Admins = () => {
    const [paymentList, setPaymentList] = useState([{
        id: uuid(),
        orderid: '23',
        title: 'New order has come',
        transactionid: 'ABC12',
        amountreceived: '7500',
        paymentdate: '27-Jul-2023'
    }]);
    const adminRole = [
        { name: 'All', code: '' },
        { name: 'Super Admin', code: 'Super Admin' },
        { name: 'Admin', code: 'Admin' },
        { name: 'User', code: 'User' }
    ];
    const adminStatus = [
        { name: 'All', code: '' },
        { name: 'Active', code: 'Active' },
        { name: 'Inactive', code: 'Inactive' }
    ];
    const [filters, setFilters] = useState({
        title: { value: '', matchMode: FilterMatchMode.CONTAINS },
        orderid: { value: '', matchMode: FilterMatchMode.CONTAINS },
        transactionid: { value: '', matchMode: FilterMatchMode.CONTAINS }
    });
    const toast = useRef(null);
    const dt = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [selectedList, setSelectedList] = useState([]);
    const router = useRouter();
    const acceptFunc = (id) => {
        toast.current.show({ severity: 'success', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    };
    const rejectFunc = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };
    const confirm = (id) => {
        confirmDialog({
            message: 'Do you want to delete this Admin?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => acceptFunc(id),
            reject: () => rejectFunc()
        });
    };
    const initFilters = () => {
        setFilters({
            title: { value: '', matchMode: FilterMatchMode.CONTAINS },
            orderid: { value: '', matchMode: FilterMatchMode.CONTAINS },
            transactionid: { value: '', matchMode: FilterMatchMode.CONTAINS }
        });
    };

    useEffect(() => {
        const getData = async () => {
            // setLoaded(true);
            setLoaded(false);
            const session = getSession();
            if (!session) { router.push("/") }
            // await axios.post(`${process.env.API_URL}/list_admin`, { session: session }, { headers: { 'x-api-key': process.env.API_KEY } }).then((response) => {
            //     console.log(response.data.result);
            //     setUserList(response.data.result)
            //     setLoaded(false);
            // }).catch((error) => {
            //     console.log(error);
            // });

        }
        document.title = 'Payment List | NAC Vendor';
        getData();
    }, []);


    const headerTemplate = () => {
        return (
            <div className='mx-2'>
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mt-1">
                    <h5 className="m-0">Payment Lists</h5>                   
                </div>
                <hr />
                <div className='grid mt-3'>
                    <div className="field col-12 md:col-2">
                        <span className="p-float-label">
                            <InputText
                                id="searchTitle"
                                keyfilter={/^[^<>*!]+$/}
                                className='w-full'
                                autoComplete='off'
                                value={filters.title.value}
                                onChange={(e) => setFilters({ ...filters, title: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                                onKeyDown={(e) => setFilters({ ...filters, title: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                            />
                            <label htmlFor="title">Search by Title</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-2">
                        <span className="p-float-label">
                            <InputText
                                keyfilter="pint"
                                className='w-full'
                                autoComplete='off'
                                // maxLength={10}
                                value={filters.orderid.value}
                                onChange={(e) => setFilters({ ...filters, orderid: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                                onKeyDown={(e) => setFilters({ ...filters, orderid: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                            />
                            <label htmlFor="orderid">Search by Order Id</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-2">
                        <span className="p-float-label">
                            <InputText
                                keyfilter="pint"
                                className='w-full'
                                autoComplete='off'
                                // maxLength={10}
                                value={filters.transactionid.value}
                                onChange={(e) => setFilters({ ...filters, transactionid: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                                onKeyDown={(e) => setFilters({ ...filters, transactionid: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                            />
                            <label htmlFor="transactionid">Search by Transaction Id</label>
                        </span>
                    </div>                    
                    <div className="field col-12 md:col-2">
                        <Button icon="pi pi-times" severity="danger" className="mx-1 inline-block" style={{ width: '80%' }} onClick={() => initFilters()} tooltip="Clear Search" tooltipOptions={{ position: 'top' }} />
                        {/* <Button icon="pi pi-upload" severity="help" className="mx-1 inline-block" style={{ width: '45%' }} onClick={exportExcel} disabled={selectedList.length === 0} tooltip="Export" tooltipOptions={{ position: 'top' }} /> */}
                    </div>
                </div>
            </div>
        )
    };
    const exportExcel = () => {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const sheet = wb.addWorksheet('Admins', { views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }] });
        var borderStyles = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
        sheet.columns = [
            { header: '#', key: 'id' },
            { header: 'Category Name', key: 'name' },
            { header: 'Product Count', key: 'product' },
            { header: 'Created By', key: 'created_name' },
            { header: 'Created On', key: 'created_on', style: { numFmt: 'DD-MMM-YYYY' } },
            { header: 'Status', key: 'status' }
        ];
        selectedList.map((selected, index) => (
            sheet.addRow({
                id: index + 1,
                name: selected.name,
                product: parseInt(selected.product),
                created_name: selected.created_name,
                created_on: moment(selected.created_on).format('DD-MMM-YYYY'),
                status: selected.status
            })
        ));
        sheet.getRow(1).font = { bold: true, size: 11 };
        sheet.columns.forEach(function (column) {
            let maxLength = 0;
            column["eachCell"]({ includeEmpty: true }, function (cell) {
                var columnLength = cell.value ? cell.value.toString().length + 2 : 10;
                if (columnLength > maxLength) { maxLength = columnLength; }
            });
            column.width = maxLength + 2;
        });
        sheet.eachRow({ includeEmpty: true }, function (row) {
            row.eachCell({ includeEmpty: true }, function (cell) {
                cell.border = borderStyles;
            });
        });
        wb.xlsx.writeBuffer().then(data => {
            const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8' });
            const url = window.URL.createObjectURL(blob);
            const anchor = document.createElement('a');
            anchor.href = url;
            anchor.download = `Admins List - ${moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    };
    const status = (rowData) => {
        return <Badge value={rowData.userStatus} severity={rowData.userStatus === 'Active' ? 'success' : 'danger'}></Badge>
    };
    const actions = (rowData) => {
        return (
            <>
                <Toast ref={toast} />
                <ConfirmDialog />
                {/* <Button icon="pi pi-eye" severity="primary" className="mr-1 w-auto h-auto" tooltip="Payment Details" tooltipOptions={{ position: 'top' }} text onClick={() => router.push(`/pages/payment/${rowData.id}`)} />                 */}
                <Button icon="pi pi-eye" severity="primary" className="mr-1 w-auto h-auto" tooltip="Payment Details" tooltipOptions={{ position: 'top' }} text  onClick={() => router.push(`/pages/orders/${rowData.id}`)}/>                
            </>
        )
    };
    const emptyMessage = () => {
        return <h5 className='text-center pt-1' style={{ fontSize: '1em' }}>No Admin to Display</h5>
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
            const name = (options.totalRecords > 1) ? 'Admins' : 'Admin'
            return (
                <div className='center_item'>
                    <span style={{ color: 'var(--text-color)', userSelect: 'none', width: 'auto', textAlign: 'center' }}>
                        Showing {options.first} - {options.last} of {options.totalRecords} {name}
                    </span>
                </div>
            );
        },
        FirstPageLink: (options) => {
            return (
                <button type="button" className={classNames(options.className, 'border-round')} onClick={options.onClick} disabled={options.disabled}>
                    <span className="py-3">First</span>
                    <Ripple />
                </button>
            );
        },
        PrevPageLink: (options) => {
            return (
                <button type="button" className={classNames(options.className, 'border-round')} onClick={options.onClick} disabled={options.disabled}>
                    <span className="py-3">Previous</span>
                    <Ripple />
                </button>
            );
        },
        PageLinks: (options) => {
            if ((options.view.startPage === options.page && options.view.startPage !== 0) || (options.view.endPage === options.page && options.page + 1 !== options.totalPages)) {
                const className = classNames(options.className, { 'p-disabled': true });
                return <span className={className} style={{ userSelect: 'none' }}>...</span>
            }

            return (
                <button type="button" className={options.className} onClick={options.onClick} >
                    {options.page + 1}
                </button>
            );
        },
        NextPageLink: (options) => {
            return (
                <button type="button" className={classNames(options.className, 'border-round')} onClick={options.onClick} disabled={options.disabled}>
                    <span className="py-3 pull-left">Next</span>
                    <Ripple />
                </button>
            );
        },
        LastPageLink: (options) => {
            return (
                <button type="button" className={classNames(options.className, 'border-round')} onClick={options.onClick} disabled={options.disabled}>
                    <span className="py-3 pull-right">Last</span>
                    <Ripple />
                </button>
            );
        }
    };


    return (
        <>
            <DataTable
                tableStyle={{ width: '100%' }} className='mb-4 datatable-responsive' scrollHeight="430px" size='small' scrollable showGridlines stripedRows paginator
                header={headerTemplate} filters={filters} loading={loaded} emptyMessage={emptyMessage}
                dataKey="id" value={paymentList} rows={10} sortMode="multiple" removableSort
                ref={dt} selectionMode="checkbox" selection={selectedList} onSelectionChange={(e) => setSelectedList(e.value)}                
                rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Payments"
            >
                <Column
                    selectionMode="multiple" headerStyle={{ width: '2%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }}
                    className='text-center' exportable={false}
                />
                <Column
                    header='Title' headerStyle={{ width: '40%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='title' filterField="title" className='text-end'
                />
                <Column
                    header='Order Id' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='orderid' filterField="orderid" className='text-center'
                />
                <Column
                    header='Transaction Id' headerStyle={{ width: '8%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='transactionid' filterField="transactionid" className='text-center'
                />
                <Column
                    header='Amount Received' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='amountreceived' filterField="amountreceived" className='text-right'
                />
                <Column
                    header='Payment Date' headerStyle={{ width: '6%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='paymentdate' filterField="paymentdate" className='text-right'
                />
                <Column
                    header='Actions' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }}
                    body={actions} className='text-center' exportable={false}
                />
            </DataTable>
        </>
    );
};

export default Admins;