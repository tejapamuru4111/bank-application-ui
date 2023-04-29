import React from "react"
import { Navigate, NavLink, useNavigate } from "react-router-dom"
import { useState } from "react"
import Cookies from 'js-cookie'
import {TailSpin} from 'react-loader-spinner'

import './index.css'

const LoginForm = () =>{

  const navigate = useNavigate();

    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [showUsernameError, setShowUsernameError] = useState(false)
    const [showPasswordError, setShowPasswordError] = useState(false)
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [login, setLogin] = useState(false)

    const validateUsername = () => usernameInput !== ''

    const validatePassword = () =>
      passwordInput.length >= 8 && passwordInput !== ''

    const onBlurPassword = () => {
      const isValidPassword = validatePassword()

      setShowPasswordError(!isValidPassword)
    }

    const onChangePassword = event => {
      setPasswordInput(event.target.value)
    }

    const renderPasswordField = () => {
      const className = showPasswordError
        ? 'name-input-field error-field'
        : 'name-input-field'

      return (
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className={className}
            value={passwordInput}
            placeholder="password"
            onChange={onChangePassword}
            onBlur={onBlurPassword}
          />
        </div>
      )
    }

    const onBlurUsername = () => {
      const isValidUsername = validateUsername()
      setShowUsernameError(!isValidUsername)
    }

    const onChangeUsername = event => {
      setUsernameInput(event.target.value)
    }

    const renderUserNameField = () => {
      const className = showUsernameError
        ? 'name-input-field error-field'
        : 'name-input-field'

      return (
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className={className}
            value={usernameInput}
            placeholder="username"
            onChange={onChangeUsername}
            onBlur={onBlurUsername}
          />
        </div>
      )
    }
    

    const onSubmitSuccess = (data) => {
      Cookies.set('bank_login_token', data.jwtToken, {
        expires: 30,
      }) 
      navigate("/")
    }

    const onSubmitFailure = err => {
      setShowSubmitError(true)
      setErrorMsg(err)
      setLogin(false)
    }

    const onSubmitForm = async event => {
      event.preventDefault()
      const isValidUsername = validateUsername()
      const isValidPassword = validatePassword()

      if (isValidUsername && isValidPassword) {
        setLogin(!login)
        const userDetails = {
          userName: usernameInput,
          password: passwordInput,
        }


        const url = 'http://localhost:3011/login/'
        const options = {
          method: 'POST',
          body: JSON.stringify(userDetails),
          headers: {
            'content-type': 'application/json'
          },
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
          onSubmitSuccess(data)
        } else {
          onSubmitFailure(data)
        }
      } else {
        setShowUsernameError(!isValidUsername)
        setShowPasswordError(!isValidPassword)
       }
    }
    
      const renderLoginForm = () => (
        <form className="form-container" onSubmit={onSubmitForm}>
          {renderUserNameField()}
          {showUsernameError && <p className="error-message">Required</p>}
          {renderPasswordField()}
          {showPasswordError && <p className="error-message">Required</p>}
          <button type="submit" className="submit-button">
            {login? <TailSpin  color="#ffffff" height="15" width="25" /> : 'Login'}
          </button>
        </form>
    )

    const token = Cookies.get('bank_login_token')
    if (token !== undefined) {
      return <Navigate to="/" />
    }
    
    return (
        <div className="registration-form-container">
        <h1 className="form-app-title">Wellcome to the App</h1>
        <div className="view-container">
          <h1 className="form-title">Login</h1>
          {renderLoginForm()}
          {showSubmitError && (
            <p className="submit-error-text">*{errorMsg}</p>
          )} 
          <p className="link-to-register">
            Donot have an account ? <NavLink to="/register">Register</NavLink>
          </p>
        </div>
      </div>
    )
  }


export default LoginForm

