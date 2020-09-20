import React from 'react'
import {uriBase, api} from '../const'
import {Link} from 'react-router-dom'

export default function UsersF(props) {

    const [users, setUsers] = React.useState([])

    const refresh = () => {

        fetch(`${uriBase}${api}/users`, 
            {
            method: "GET",
            headers: {
                'Content-Type': "application/json"
            }
        })
            .then(HttpResponse => {
                if (!HttpResponse.ok) {
                    throw new Error("Bad Response")
                }
                return HttpResponse.json()
            })
            .then(response => {
                console.log(response)
                setUsers(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    React.useEffect(() => {

        refresh()
    }, [])

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {
                    users.map((user, index) =>{
                        return (
                            <li key={index}>{user.fName}</li>
                        )
                    })
                }
            </ul>
            <Link to= "/login">Back to Log In</Link>
        </div>

    )
}