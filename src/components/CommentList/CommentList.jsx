import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText,
    Input

} from 'reactstrap';
import { Redirect, Route } from 'react-router';

function CommentList() {
    return (
        <p>Test</p>
    );
}

export default withRouter(CommentList);