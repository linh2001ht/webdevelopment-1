import React from 'react';
import { Nav } from 'react-bootstrap';
import "../App.css"
import DataTable from './createTable';

function ManageUser() {
    return (
        <div>
            <Nav className="manage-user-navbar">
                <a className="mu-back-button" onClick={() => {
                        window.open("/homepagemanager", "_self");
                        window.close();
                }}><i class="fas fa-arrow-circle-left"></i></a>
                <p className="mu-navbrand">Obstacle Crossed</p>
            </Nav>
            <p className="list-users">List of users</p>
            <DataTable />

        </div>
    );
}

export default ManageUser;