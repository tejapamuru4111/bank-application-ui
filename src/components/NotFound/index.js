import { useNavigate } from 'react-router-dom'
import './index.css'

const NotFound = () => {

    const navigate = useNavigate()

    const onClickHome = () => {
        navigate('/')
    }

    return (
        <div className="not-found-container">
            <img
            src="https://assets.ccbp.in/frontend/react-js/not-found-blog-img.png"
            alt="not-found"
            className="not-found-img"
            />
            <button type="button" className='not-found-home-button' onClick={onClickHome}>Back to Home</button>
        </div>
    )
}

export default NotFound