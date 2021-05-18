import React, { useState } from 'react'
import { NavLink } from "react-router-dom"
import './css/Header.css'
import logo from '../resources/SE.png'
import profile from '../resources/arwen.png'
import AccountDropdown from './AccountDropdown'

function Header(props) {
    const [showDropdown, setShowDropdown] = useState(false)

    let dropdown
    let dropdownMask
    if (showDropdown) {
        dropdown = <AccountDropdown closeMenu={() => setShowDropdown(false)} />
        dropdownMask =
            <div className="dropdown-mask" onClick={() => setShowDropdown(false)} />
    }

    return (
        <div>
            <header className="header">
                <img className="logo" src={logo} alt="Logo" />
                <div className="nav-bar">
                    <NavLink
                        to="/students"
                        id="students-nav"
                        className="nav-item"
                        style={{ textDecoration: 'none' }}
                        activeStyle={{ borderBottom: '5px solid lightskyblue' }}
                        onClick={() => setShowDropdown(false)}
                    >
                        Students
                    </NavLink>
                    <NavLink
                        to="/assignments"
                        id="assignments-nav"
                        className="nav-item"
                        style={{ textDecoration: 'none' }}
                        activeStyle={{ borderBottom: '5px solid lightskyblue' }}
                        onClick={() => setShowDropdown(false)}
                    >
                        Assignments
                    </NavLink>
                    <NavLink
                        to="/reporting"
                        id="reporting-nav"
                        className="nav-item"
                        style={{ textDecoration: 'none' }}
                        activeStyle={{ borderBottom: '5px solid lightskyblue' }}
                        onClick={() => setShowDropdown(false)}
                    >
                        Reporting
                    </NavLink>
                    <div className="divider">
                        |
                    </div>
                    <img
                        className="profile"
                        src={profile} alt="Profile"
                        onClick={() => setShowDropdown(!showDropdown)}
                    />
                </div>
            </header>
            {dropdownMask}
            {dropdown}
        </div>
    );
}

export default Header;
