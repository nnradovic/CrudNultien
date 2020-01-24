import React, { useState, useEffect } from 'react';
import { searchApi, fetchApi } from '../../api/fetch_api'
import { useDispatch } from "react-redux"
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavLink,
    Input

} from 'reactstrap';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setsearchTerm] = useState('');
    const toggle = () => setIsOpen(!isOpen);
    const dispatch = useDispatch()


    //Search input
    function handleChange(searchInput) {
        setsearchTerm(searchInput)
    }

    useEffect(() => {
        if (searchTerm === '') {
            fetchApi('BlogPosts', 'get').then(res => {
                dispatch({ type: "LOAD_BLOG", payload: res.data.resultData })
            })
        } else {
            searchApi('BlogPosts', 'get', searchTerm).then(res => {
                dispatch({ type: "LOAD_BLOG", payload: res.data.resultData })
            })
        }

    }, [searchTerm]);

    return (
        <div>
            <Navbar color="light" light expand="lg" >
                <NavbarBrand href="/">MyBlog</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <Input placeholder="Search" onChange={(e) => handleChange(e.target.value)} />
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