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


const Orders = () => {
    const [userList, setUserList] = useState([{
        id: uuid(),
        title: 'Need pamphlet',
        description: 'Before you can begin to determine what the composition of a particular paragraph will be, you must first decide on an argument and a working thesis statement for your paper. What is the most important idea that you are trying to convey to your reader? The information in each paragraph must be related to that idea. In other words, your paragraphs should remind your reader that there is a recurrent relationship between your thesis.',
        orderid: '102',
        orderdate: '27-Jul-2023',
        amount: '12000',
        paidamount: '7500',
        balanceamount: '4500'
    }]);
    
  
    const [filters, setFilters] = useState({
        title: { value: '', matchMode: FilterMatchMode.CONTAINS },
        description: { value: '', matchMode: FilterMatchMode.CONTAINS },
        orderid: { value: '', matchMode: FilterMatchMode.CONTAINS }
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
            message: 'Do you want to delete this Order?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: () => acceptFunc(id),
            reject: () => rejectFunc()
        });
    };

    const paymentstatus = [
        { name: 'All', code: '' },
        { name: 'Paid', code: 'Paid' },
        { name: 'Pending', code: 'Pending' }
    ];

    const initFilters = () => {
        setFilters({
            title: { value: '', matchMode: FilterMatchMode.CONTAINS },
            description: { value: '', matchMode: FilterMatchMode.CONTAINS },
            orderid: { value: '', matchMode: FilterMatchMode.CONTAINS }
        });
    };
    const headerTemplate = () => {
        return (
            <div className='mx-2'>
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mt-1">
                    <h5 className="m-0">My Orders</h5>                    
                </div>
                <hr />
                <div className='grid mt-3'>
                    <div className="field col-12 md:col-2">
                        <span className="p-float-label">
                            <InputText
                                id="title"
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
                                id="searchDescription"
                                keyfilter={/^[^<>*!]+$/}
                                className='w-full'
                                autoComplete='off' 
                                value={filters.description.value}
                                onChange={(e) => setFilters({ ...filters, description: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                                onKeyDown={(e) => setFilters({ ...filters, description: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                            />
                            <label htmlFor="searchDescription">Search by Description</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-2">
                        <span className="p-float-label">
                            <InputText
                                id="searchOrderId"
                                keyfilter="pint"
                                className='w-full'
                                autoComplete='off'
                                value={filters.orderid.value}
                                onChange={(e) => setFilters({ ...filters, orderid: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                                onKeyDown={(e) => setFilters({ ...filters, orderid: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                            />
                            <label htmlFor="searchOrderId">Search by Order Id</label>
                        </span>
                    </div>                  
                    {/* <div className="field col-12 md:col-2">
                        <span className="p-float-label">
                            <Dropdown id="dropdown" options={paymentstatus} value={filters.paymentstatus.value} onChange={(e) => setFilters({ ...filters, paymentstatus: { value: e.target.value, matchMode: FilterMatchMode.EQUALS } })} optionLabel="name" className='w-full' />
                            <label htmlFor="dropdown">Select Status</label>
                        </span>
                    </div> */}
                    <div className="field col-12 md:col-2">
                        <Button icon="pi pi-times" severity="danger" className="mx-1 inline-block" style={{ width: '45%' }} onClick={() => initFilters()} tooltip="Clear Search" tooltipOptions={{ position: 'top' }} />
                        {/* <Button icon="pi pi-upload" severity="help" className="mx-1 inline-block" style={{ width: '45%' }} onClick={exportExcel} disabled={selectedList.length === 0} tooltip="Export" tooltipOptions={{ position: 'top' }} /> */}
                    </div>
                </div>
            </div>
        )
    };
    const exportExcel = () => {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const sheet = wb.addWorksheet('Orders', { views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }] });
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
        return <Badge value={rowData.paymentstatus} severity={rowData.paymentstatus === 'Active' ? 'success' : 'danger'}></Badge>
    };
    const actions = (rowData) => {
        return (
            <>
                <Toast ref={toast} />
                <ConfirmDialog />
                <Button icon="pi pi-eye" severity="primary" className="mr-1 w-auto h-auto" tooltip="View Orders" tooltipOptions={{ position: 'top' }} text onClick={() => router.push(`/pages/orders/${rowData.id}`)} />                
            </>
        )
    };
    const emptyMessage = () => {
        return <h5 className='text-center pt-1' style={{ fontSize: '1em' }}>No Orders to Display</h5>
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

    useEffect(() => {
        const getData = async () => {
            setLoaded(true);
            setLoaded(false);
        }
        document.title = 'My Orders | NAC Vendor';
        getData();
    }, []);

    return (
        <>
            <DataTable
                tableStyle={{ width: '100%' }} className='mb-4 datatable-responsive' scrollHeight="430px" size='small' scrollable showGridlines stripedRows paginator
                header={headerTemplate} filters={filters} loading={loaded} emptyMessage={emptyMessage} paginatorTemplate={footerTemplate}
                dataKey="id" value={userList} rows={10} sortMode="multiple" removableSort
                ref={dt} selectionMode="checkbox" selection={selectedList} onSelectionChange={(e) => setSelectedList(e.value)}
            >
                <Column
                    selectionMode="multiple" headerStyle={{ width: '2%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }}
                    className='text-center' exportable={false}
                />
                <Column
                    header='Title' headerStyle={{ 'minWidth': '60%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='title' filterField="title" className='text-start'
                />
                <Column
                    header='Description' headerStyle={{ width: '60%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='description' filterField="description" className='text-end'
                />
                <Column
                    header='Order Id' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='orderid' filterField="orderid" className='text-center'
                />
                <Column
                    header='Order Date' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='orderdate' filterField="orderdate" className='text-center'
                />
                <Column
                    header='Quotation Amount' headerStyle={{ width: '1%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='amount' filterField="amount" className='text-right'
                />
                <Column
                    header='Paid Amount' headerStyle={{ width: '1%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='paidamount' filterField="paidamount" className='text-right'
                />
                <Column
                    header='Balance Amount' headerStyle={{ width: '1%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='balanceamount' filterField="balanceamount" className='text-right'
                />
                {/* <Column
                    header='Payment Status' headerStyle={{ width: '1%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='paymentstatus' body={status} filterField="paymentstatus" className='text-center'
                />                 */}
                <Column
                    header='Actions' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }}
                    body={actions} className='text-center' exportable={false}
                />
            </DataTable>
        </>
    );
};

export default Orders;