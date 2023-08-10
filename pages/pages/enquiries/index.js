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
import { getSession } from '../../../util';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const Enquiries = () => {

    const [userList, setUserList] = useState([{
        id: uuid(),
        title: 'Enquiries regarding sample brouchers',
        description: 'Enquiries,iYou might enquiries, or ask about, the difference between the words enquiries and "inquire." Good question. The answer is, not much. They are the same word with different spellings. Typically the British prefer the "e" version, but both are correct.nquire (rather formal) to ask somebody for information: I called the station to enquiries about train times.',
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
            message: 'Do you want to delete this Enquiries?',
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
             // setLoaded(true);
             setLoaded(false);
            const session = getSession();
            if (!session) { router.push("/") }
            // await axios.post(`${process.env.API_URL}/list_enquiries`, { session: session }, { headers: { 'x-api-key': process.env.API_KEY } }).then((response) => {
            //     console.log(response.data.result);
            //     setUserList(response.data.result)
            //     setLoaded(false);
            // }).catch((error) => {
            //     console.log(error);
            // });

        }
        document.title = 'My Enquiries List | NAC Vendor';
        getData();
    }, []);




    const headerTemplate = () => {
        return (
            <div className='mx-2'>
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center mt-1">
                    <h5 className="m-0">My Enquiries</h5>
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
    const status = (rowData) => {
        return <Badge value={rowData.status} severity={rowData.status === 'Open' ? 'success' : 'danger'}></Badge>
    };
    const actions = (rowData) => {
        return (
            <>
                <Toast ref={toast} />
                <ConfirmDialog />
                <Button icon="pi pi-eye" severity="primary" className="mr-1 w-auto h-auto" tooltip="View Enquiries" tooltipOptions={{ position: 'top' }} text onClick={() => router.push(`/pages/enquiries/${rowData.id}`)} />
            </>
        )
    };
    const emptyMessage = () => {
        return <h5 className='text-center pt-1' style={{ fontSize: '1em' }}>No Enquiries to Display</h5>
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
            const name = (options.totalRecords > 1) ? 'Enquiries' : 'Enquiries'
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
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Enquiries"
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
                    field='status' filterField="status" className='text-center' body={status}
                />
                <Column
                    header='Actions' headerStyle={{ width: '4%', backgroundColor: '#d7e4fc', whiteSpace: 'nowrap' }}
                    body={actions} className='text-center' exportable={false}
                />
            </DataTable>
        </>
    );
};

export default Enquiries;