import React from 'react'
import {Link} from 'react-router-dom'
import {uriBase, api} from '../const'



export default function SignUp(props) {

    let [message, setMessage] = React.useState(props.initialMessage)
    let [fName, setfName] = React.useState("")
    let [lName, setlName] = React.useState("")
    let [userName, setUserName] = React.useState("")
    let [password, setPassword] = React.useState("")

    const onClickHandler = (event) => {
        event.preventDefault()

        let formData = new FormData()
        formData.append("fName", fName)
        formData.append("lName", lName)
        formData.append("userName", userName)
        formData.append("password", password)

        fetch(`${uriBase}${api}/user/signup`, {
            method: "POST",
            body: formData
        })
        .then(HttpRequest =>{
            if(!HttpRequest.ok){
                throw new Error("Couldn't Add User")
            }
            return HttpRequest.json()
        })
        .then(user => {
            //ToDo handle user
            setMessage("Welcome!")
        })
        .catch(error => {
            console.log(error)
        })
        
    }

    const onChangeHandler = (event) => {
        switch (event.target.name) {
            case 'fName':
                setfName(event.target.value)
                break
            case 'lName':
                setlName(event.target.value)
                break
            case 'userName':
                setUserName(event.target.value)
                break
            case 'password':
                setPassword(event.target.value)
                break
            default:

        }
    }
    return (
        <div>
            <h1> {message} </h1>
            <form>
            <div>
            First Name: <input onChange={onChangeHandler} name="fName" value={fName}></input><br></br>
            Last Name: <input onChange={onChangeHandler} name="lName" value={lName}></input><br></br>
            User Name: <input onChange={onChangeHandler} name="userName" value={userName}></input><br></br>
            Password: <input onChange={onChangeHandler} name="password" value={password}></input><br></br>
            </div>
            <div>
            <input type="submit" onClick={onClickHandler}></input><br></br>
            </div>
            </form>
            <div>
            <Link to= "/">Back to Home</Link>
            </div>
        </div>
    )
}