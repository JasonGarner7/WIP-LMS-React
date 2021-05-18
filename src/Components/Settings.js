import React from 'react'
import './css/Settings.css'
//begin: json-server
// import Api, { db } from '../API';
import { db } from '../API';
//end: json-server


function Settings(props) {
  const userInfo = JSON.parse(localStorage.getItem("user"));
  const userId = userInfo.id;
  const user = db.endpoints.Teachers.getOne(userId);
  console.log(user);
  return (
    <div>
      Coming Soon
    </div>
  );
}

export default Settings;
