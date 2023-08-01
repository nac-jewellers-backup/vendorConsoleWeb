import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';
import Link from 'next/link';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/layout/images/sia.png`} alt="Logo" height="30" className="mr-2 mt-1" />
            <span className="font-medium ml-2">© 2023<Link href="http://infographicanalytics.com/" target='_blank'> Sundar Infographic Analytics.</Link> All Rights Reserved.</span>
        </div>
    );
};

export default AppFooter;
