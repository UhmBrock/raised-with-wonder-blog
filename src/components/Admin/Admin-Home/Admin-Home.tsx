import React, { useState } from 'react';
import AdminSidebar from '../Admin-Sidebar/Admin-Sidebar';
import "./Admin-Home.scss";
import { stat } from 'fs';
import { useLocation } from 'react-router-dom';

interface AHProps {

}

interface AHState {
}

const AdminHome: React.FunctionComponent<AHProps> = () => {

    const location = useLocation();

    return (
        <div className="wrapper">

            <AdminSidebar/>
            
            <div id="content">

            

            </div>
        </div>
    )
}

export default AdminHome;