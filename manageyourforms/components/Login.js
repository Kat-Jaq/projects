// class component
import React from 'react'
import {Link} from 'react-router-dom'
import {uriBase, api} from '../const'



export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            name: props.initialMessage, 
            userName: "",
            password: "",
            loggedIn: ""
        }

        this.onClickHandler = this.onClickHandler.bind(this)
        this.onChangeHandler = this.onChangeHandler.bind(this)

    }// end of constructor function

    onClickHandler() {

        let body = {
            userName: this.state.userName,
            password: this.state.password
        }

        fetch(`${uriBase}${api}/users/login`, {

            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(httpResponse => {
            if (!httpResponse.ok){
                throw new Error ("Couldn't Send Login")
            }
            return httpResponse.json()
        })
        .then(user => {
            if (user.hasOwnProperty("fName")){
                this.setState({loggedIn: "Logged In"})
            } else {
                this.setState({loggedIn: "Not Logged In"})
            }
        })
        .catch(error => {
            console.log(error)
        })
    }
    onChangeHandler(event){
        this.setState({[event.target.name]: event.target.value})
        console.log(this.state)
    }
    
    render() {
        return (
            <div>
                <div>
                <h1>{this.state.name}</h1>
                <h2>{this.state.loggedIn}</h2>
                Username <input onChange={this.onChangeHandler} name="userName" value={this.state.userName}></input><br></br>
                Password <input onChange={this.onChangeHandler} name="password" value={this.state.password}></input>
                </div>
                <div>
                <button onClick={this.onClickHandler}> Log In </button><br></br>
                </div>
                <div>
                <Link to= "/">Back to Home</Link>
                </div>  
                <div>
                    <Link to="/users">Users</Link>
                </div>
            </div>
        )
    }

}