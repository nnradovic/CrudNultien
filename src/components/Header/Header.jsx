import React, { useState, useEffect, Fragment } from "react";
import { useDispatch } from "react-redux";
//api
import { searchApi, fetchApi } from "../../api/fetch_api";
//components
import styles from "./header.module.sass";
//module
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavLink,
  Input
} from "reactstrap";
//helpers
import { useDebouncedCallback } from "use-debounce";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  // Search input
  const [debouncedFunction] = useDebouncedCallback(searchTerm => {
    setsearchTerm(searchTerm);
  }, 1000);

  useEffect(() => {
    (searchTerm === "" ? fetchApi : searchApi)(
      "Comment",
      "get",
      searchTerm
    ).then(res => {
      dispatch({ type: "LOAD_COMMENT", payload: res.data.resultData });
    });
  }, [searchTerm, dispatch]);

  return (
    <Fragment>
      <Navbar light expand="lg" className={styles.navigation}>
        <NavbarBrand href="/">Front end app</NavbarBrand>
        <Input
          style={{ width: 200 }}
          placeholder="Search"
          onChange={e => debouncedFunction(e.target.value)}
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
