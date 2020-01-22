import React, { useState } from 'react';
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
import style from './header.module.sass'
const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="light" light expand="lg" >
                <NavbarBrand href="/">MyBlog</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <Input placeholder="Search" />
                        <NavLink href="/">Link 1</NavLink>
                        <NavLink href="/">Link 2</NavLink>
                        <NavLink href="/">Link 3</NavLink>
                        <NavLink href="/">MyProfile</NavLink>
                        <NavLink href="/">Logout</NavLink>
                    </Nav>

                </Collapse>
            </Navbar>
        </div>
    );
}

export default Header