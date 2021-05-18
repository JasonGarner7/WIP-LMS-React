import React from 'react'
import {
    Switch,
    Route
} from "react-router-dom"

import Students from './Components/Students'
import Assignments from './Components/Assignments'
import Reporting from './Components/Reporting'
import Settings from './Components/Settings'
import Account from './Components/Account'

function Routes() {
    return (
        <Switch>
            <Route path="/students">
                <Students />
            </Route>
            <Route path="/assignments">
                <Assignments />
            </Route>
            <Route path="/reporting">
                <Reporting />
            </Route>
            <Route path="/settings">
                <Settings />
            </Route>
            <Route path="/account">
                <Account />
            </Route>
        </Switch>
    );
}

export default Routes