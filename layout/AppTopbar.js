import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { LayoutContext } from './context/layoutcontext';
import { Menu } from 'primereact/menu';
import { Badge } from 'primereact/badge';


const AppTopbar = forwardRef((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const menu = useRef(null);
    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));
    const overlayMenuItems = [
        // {
        //     label: 'Profile',
        //     icon: 'pi pi-user',
        //     url: '/uikit/formlayout'
        // },
        {
            label: 'Change Password',
            icon: 'pi pi-lock',
            url: '/pages/changepassword'
        },
        {
            separator: true
        },
        {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            url: '/'
        }
    ];
    const toggleMenu = (event) => {
        menu.current.toggle(event);
    };
    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo.png`} width="150px" height={'70px'} widt={'true'} alt="logo" />
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>
                <button type="button" className="p-link layout-topbar-button">
                    <i className="pi pi-bell p-overlay-badge" style={{ fontSize: '2rem' }}>
                        <Badge value="2"></Badge>
                    </i>
                    <span>Notification</span>
                </button>
                <Menu ref={menu} model={overlayMenuItems} popup />
                <button type="button" className="p-link layout-topbar-button" onClick={toggleMenu}>
                    <i className="pi pi-cog" style={{ fontSize: '2rem' }}></i>
                    <span>Profile</span>
                </button>
            </div>
        </div>
    );
});

export default AppTopbar;
