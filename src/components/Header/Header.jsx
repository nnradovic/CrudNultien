import React, { useState, useEffect, Fragment } from "react";
import { searchApi, fetchApi } from "../../api/fetch_api";
import { useDispatch } from "react-redux";
import styles from "./header.module.sass";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  Input
} from "reactstrap";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  //Search input
  const handleChange = event => {
    setsearchTerm(event.target.value);
  };
  useEffect(() => {
    try {
      (searchTerm === "" ? fetchApi : searchApi)(
        "Comment",
        "get",
        searchTerm
      ).then(res => {
        dispatch({ type: "LOAD_COMMENT", payload: res.data.resultData });
      });
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm, dispatch]);

  return (
    <Fragment>
      <Navbar light expand="lg" className={styles.navigation}>
        <NavbarBrand href="/">Fronet end app</NavbarBrand>
        <Input
          style={{ width: 200 }}
          placeholder="Search"
          onChange={handleChange}
        />
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavLink href="/">Link 1</NavLink>
            <NavLink href="/">Link 2</NavLink>
            <NavLink href="/">Link 3</NavLink>
          </Nav>
        </Collapse>
      </Navbar>
    </Fragment>
  );
};

export default Header;
