import React from 'react'
import { Link } from 'react-router-dom'
import './css/AccountDropdown.css'

function userLogOut(){
  localStorage.removeItem("user");
  window.location.reload(false);
}

function AccountDropdown(props) {
    return (
        <div>
            <ul className='dropdown'>
                <li className='username'>
                    Arwen of Rivendell
                </li>
                <li className='profile-list-item'>
                    <Link
                        to="/settings"
                        id="settings"
                        className='profile-list-text'
                        style={{ textDecoration: 'none' }}
                        onClick={props.closeMenu}
                    >
                        Settings
                    </Link>
                </li>
                <li className='profile-list-item'>
                    <Link
                        to="/account"
                        id="account"
                        className='profile-list-text'
                        style={{ textDecoration: 'none' }}
                        onClick={props.closeMenu}
                    >
                        Account
                    </Link>
                </li>
                <li className='profile-list-item'>
                    <Link
                        id="userLogOut"
                        className='profile-list-text'
                        style={{ textDecoration: 'none' }}
                        onClick={userLogOut}
                    >
                        Log Out
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default AccountDropdown
