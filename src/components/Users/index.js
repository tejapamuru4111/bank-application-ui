import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { NavLink, Navigate } from "react-router-dom"
import {FaRupeeSign} from 'react-icons/fa'
import Header from "../Header"

import './index.css'

const Users = () => {

    const [usersData, setUsersData] = useState([])

    useEffect(()=> {
        const jwtToken = Cookies.get('bank_login_token')

        const url = 'http://localhost:3011/users'
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }
        const fetchUsers = async() => {
            const response = await fetch(url, options)
            const data = await response.json()
            setUsersData(data)
        }
        fetchUsers()
    },[])

    const jwtToken = Cookies.get('bank_login_token')

    if (jwtToken === undefined){
        return <Navigate to="/login" />
    }

    return(
        <>
        <Header />
            <div className="users-bg-card">
                <h1 className="users-card-heading">Users</h1>
                {usersData.length === 0? <p>No users data</p>: 
                <ul className="users-list-card">
                    {usersData.map(user => (
                        <li key={user.user_id} className="users-list-item">
                            <NavLink to={`/${user.user_id}/transactions`}  className="users-user-card">
                                <h1 className="users-user-card-profile">{user.first_name[0].toUpperCase()}{user.last_name[0].toUpperCase()}</h1>
                                <div className="users-user-card-name-id-card">
                                    <h1 className="users-user-card-name">{user.first_name} {user.last_name}</h1>
                                    <p className="users-user-card-id">@{user.user_name}</p>
                                </div>
                                <p className="users-user-account-balence">Bal : <span className="user-balence-span"><FaRupeeSign /> {user.bal} </span></p>
                            </NavLink>
                        </li>
                    ))}
                </ul>}
            </div>
        </>
    )
}

export default Users