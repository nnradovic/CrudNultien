import React from 'react';
import { withRouter } from 'react-router-dom';
import {
    Navbar,
    Nav,
    NavLink,


} from 'reactstrap';

function SideNavigation() {
    return (
        <Navbar color="light" light expand="lg" >

            <Nav vertical pills className="ml-auto" navbar>
                <NavLink href="/">Link 1</NavLink>
                <NavLink href="/">Link 2</NavLink>
                <NavLink href="/">Link 3</NavLink>

            </Nav>

        </Navbar>
    );
}

export default withRouter(SideNavigation);