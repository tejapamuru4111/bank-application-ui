import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { Navigate } from "react-router-dom"
import { ThreeDots } from "react-loader-spinner"

const Home = () => {

    const [user, setUser] = useState(null)

    useEffect(() => {
        const jwtToken = Cookies.get('bank_login_token')

        const url = 'http://localhost:3011/'
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }
        
        const fetchUser = async() => {
            const response = await fetch(url, options)
            const data = await response.json()
            console.log(response)
            setUser(data)
        }
        fetchUser()
    },[])

    const renderPages = () => {
        switch (user.role) {
            case 'Employer':
                return <Navigate to={`/users`} />
            case 'Customer':
                return <Navigate to={`/${user.user_id}/transactions`} />
            default:
                return null;
        }
    }

    const jwtToken = Cookies.get('bank_login_token')

    if (jwtToken === undefined){
        return <Navigate to="/login" />
    }

    return (
        <div>
            {user === null?<ThreeDots  color="#000000" height="50" width="50" />: renderPages()}
        </div>
    )
}

export default Home 