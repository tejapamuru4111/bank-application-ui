import Cookies from 'js-cookie'
import {AiFillBank} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

import './index.css'

const Header = () => {

    const navigate = useNavigate()

    const onClickLogout = () => {
        Cookies.remove('bank_login_token')
        navigate('/login')
    }

    return(
        <div className='header-container'>
            <AiFillBank className='bank-header-logo' />
            <button type='button' onClick={onClickLogout} className='header-logout-button'>Logout</button>
        </div>
    )
}

export default Header