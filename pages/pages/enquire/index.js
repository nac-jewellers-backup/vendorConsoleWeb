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
import { getSession } from '../../util';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';


const Enquire = () => {
    const [userList, setUserList] = useState([{
        id: uuid(),
        title: 'Enquire regarding sample brouchers',
        description: 'Enquire,iYou might enquire, or ask about, the difference between the words enquire and "inquire." Good question. The answer is, not much. They are the same word with different spellings. Typically the British prefer the "e" version, but both are correct.nquire (rather formal) to ask somebody for information: I called the station to enquire about train times.',
        status: 'Open',
        deadline: '27-Jul-2023'
    }]);

    const adminStatus = [
        { name: 'All', code: '' },
        { name: 'Open', code: 'Open' },
        { name: 'Closed', code: 'Closed' },
        { name: 'Accepted', code: 'Accepted' }
    ];
    const [filters, setFilters] = useState({
        title: { value: '', matchMode: FilterMatchMode.CONTAINS },
        description: { value: '', matchMode: FilterMatchMode.CONTAINS },
        deadline: { value: '', matchMode: FilterMatchMode.EQUALS },
        status: { value: '', matchMode: FilterMatchMode.EQUALS }

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
            message: 'Do you want to delete this Enquire?',
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
            description: { value: '', matchMode: FilterMatchMode.CONTAINS },
            deadline: { value: '', matchMode: FilterMatchMode.EQUALS },
            status: { value: '', matchMode: FilterMatchMode.CONTAINS }

            // userStatus: { value: '', matchMode: FilterMatchMode.EQUALS }
        });
    };

    useEffect(() => {
        const getData = async () => {
            setLoaded(true);
            const session = getSession();
            if (!session) { router.push("/") }
            // await axios.post(`${process.env.API_URL}/list_enquire`, { session: session }, { headers: { 'x-api-key': process.env.API_KEY } }).then((response) => {
            //     console.log(response.data.result);
            //     setUserList(response.data.result)
            //     setLoaded(false);
            // }).catch((error) => {
            //     console.log(error);
            // });

        }
        document.title = 'Admin Lists | NAC Admin';
        getData();
    }, []);


    const postUser = () => {
        if (mobile_number && mobile_number.length == 10) {
            axios.post('https://rqc4db3lq5.execute-api.us-east-2.amazonaws.com/dev/verify', { tableName: "nac_cms_admin", mobile_number: mobile_number }, { headers: { 'x-api-key': '8DCiyiPd0f6ojQaYPwsH42IpPacBXf976Yt4TCIr' } })
                .then(res => console.log(res.data))
        } else {
            validat_mob("Enter Valid Mobile No")
        }
    }

    const headerTemplate = () => {
        return (
            <div className='mx-2'>
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mt-1">
                    <h5 className="m-0">My Enquires</h5>
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
                            <label htmlFor="searchTitle">Search by Title</label>
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
                    {/* <div className="field col-12 md:col-2">
                        <span className="p-float-label">
                            <InputText
                                keyfilter="pint"
                                className='w-full'
                                autoComplete='off'
                                maxLength={10}
                                value={filters.description.value}
                                onChange={(e) => setFilters({ ...filters, description: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                                onKeyDown={(e) => setFilters({ ...filters, description: { value: e.target.value, matchMode: FilterMatchMode.CONTAINS } })}
                            />
                            <label htmlFor="username">Search by Mobile</label>
                        </span>
                    </div> */}
                    {/* <div className="field col-12 md:col-2">
                        <span className="p-float-label">
                            <InputText
                                keyfilter="email"
                                className='w-full'
                                autoComplete='off'
                            />
                            <label htmlFor="username">Search by Email</label>
                        </span>
                    </div> */}
                    {/* <div className="field col-12 md:col-2">
                        <span className="p-float-label">
                            <Dropdown id="dropdown" options={adminRole} value={filters.userRole.value} onChange={(e) => setFilters({ ...filters, userRole: { value: e.target.value, matchMode: FilterMatchMode.EQUALS } })} optionLabel="name" className='w-full' />
                            <label htmlFor="dropdown">Select Role</label>
                        </span>
                    </div> */}
                    <div className="field col-12 md:col-2">
                        <span className="p-float-label">
                            <Dropdown id="dropdown" options={adminStatus} value={filters.status.value} onChange={(e) => setFilters({ ...filters, status: { value: e.target.value, matchMode: FilterMatchMode.EQUALS } })} optionLabel="name" className='w-full' />
                            <label htmlFor="dropdown">Select Status</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-2">
                        <Button icon="pi pi-times" severity="danger" className="mx-1 inline-block" style={{ width: '80%' }} onClick={() => initFilters()} tooltip="Clear Search" tooltipOptions={{ position: 'top' }} />
                    </div>
                </div>
            </div>
        )
    };
    const exportExcel = () => {
        const ExcelJS = require('exceljs');
        const wb = new ExcelJS.Workbook();
        const sheet = wb.addWorksheet('Enquire', { views: [{ state: 'frozen', xSplit: 1, ySplit: 1 }] });
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
            anchor.download = `Enquires - ${moment(new Date()).format('DD-MM-YYYY HH:mm:ss')}.xlsx`;
            anchor.click();
            window.URL.revokeObjectURL(url);
        });
    };
    const status = (rowData) => {
        return <Badge value={rowData.status} severity={rowData.status === 'Active' ? 'success' : 'danger'}></Badge>
    };
    const actions = (rowData) => {
        return (
            <>
                <Toast ref={toast} />
                <ConfirmDialog />
                <Button icon="pi pi-eye" severity="primary" className="mr-1 w-auto h-auto" tooltip="View Enquire" tooltipOptions={{ position: 'top' }} text onClick={() => router.push(`/pages/enquire/${rowData.id}`)} />
                {/* <Button icon="pi pi-trash" severity="danger" className="ml-1 w-auto h-auto" tooltip="Delete Admin" tooltipOptions={{ position: 'top' }} text onClick={() => confirm(rowData.id)} /> */}
            </>
        )
    };
    const emptyMessage = () => {
        return <h5 className='text-center pt-1' style={{ fontSize: '1em' }}>No Enquire to Display</h5>
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
            const name = (options.totalRecords > 1) ? 'Enquire' : 'Enquire'
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
        document.title = 'My Enquires | NAC Vendor';
        getData();
    }, []);

    return (
        <>
            <DataTable
                tableStyle={{ width: '100%' }} className='mb-4 datatable-responsive' scrollHeight="430px" size='small' scrollable showGridlines stripedRows paginator
                header={headerTemplate} filters={filters} loading={loaded} emptyMessage={emptyMessage}
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Enquire"

                dataKey="id" value={userList} sortMode="multiple" removableSort
                ref={dt} selectionMode="checkbox" selection={selectedList} onSelectionChange={(e) => setSelectedList(e.value)}
            >
                <Column
                    selectionMode="multiple" headerStyle={{ width: '2%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }}
                    className='text-center' exportable={false}
                />
                <Column
                    header='Title' headerStyle={{ 'minWidth': '10%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='title' filterField="title" className='text-start'
                />
                <Column
                    header='Description' headerStyle={{ width: '40%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='description' filterField="description" className='text-end'
                />
                <Column
                    header='Deadline' headerStyle={{ width: '8%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='deadline' filterField="deadline" className='text-center'
                />
                <Column
                    header='Status' headerStyle={{ width: '8%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }} sortable
                    field='status' filterField="status" className='text-center'
                />
                <Column
                    header='Actions' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }}
                    body={actions} className='text-center' exportable={false}
                />
            </DataTable>
        </>
    );
};

export default Enquire;