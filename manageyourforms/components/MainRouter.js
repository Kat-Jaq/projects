import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './Login'
import SignUp from './SignUp'
import AppBar from './AppBar'
import UsersF from './UsersF'
import Welcome from './Welcome'

export default function MainRouter() {

    return (
        <div>
            <Router>
                <AppBar></AppBar>
                <Switch>
                   
                    <Route path="/signup">
                        <SignUp initialMessage="Hello, please Sign Up"></SignUp>
                    </Route>
                    <Route path="/users">
                    <UsersF></UsersF>
                    </Route>
                    <Route path="/login">
                        <Login initialMessage="Hello, please Sign In"></Login>
                    </Route>
                    <Route path="/">
                        <Welcome initialMessage="Welcome"></Welcome>
                    </Route>
                   
                </Switch>
                
            </Router>
        </div>

    )

}