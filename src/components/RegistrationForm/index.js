import { NavLink, useNavigate, Navigate } from 'react-router-dom'
import { useState } from "react"
import {v4 as uuidv4} from 'uuid'
import {TailSpin} from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const RegistrationForm = () => {

    const navigate = useNavigate()

    const [usernameInput, setUsernameInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [firstNameInput, setFirstNameInput] = useState('')
    const [lastNameInput, setLastNameInput] = useState('')
    const [roleInput, setRoleInput] = useState('')
    const [showUsernameError, setShowUsernameError] = useState(false)
    const [showPasswordError, setShowPasswordError] = useState(false)
    const [showRoleError, setShowRoleError] = useState(false)
    const [showFirstNameError, setShowFirstNameError] = useState(false)
    const [showLastNameError, setShowLastNameError] = useState(false)
    const [showSubmitError, setShowSubmitError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const [register, setRegister] = useState(false)
    const [employeeIdInput, setEmployeeIdInput] = useState('')
    const [employeeIdError, setShowEmployeeIdError] = useState(false)


  const validateLastName = () =>  (lastNameInput !== '')

  const validateFirstName = () => (firstNameInput !== '')

  const validateUsername = () => (usernameInput !== '') 

  const validatePassword = () => (passwordInput.length >= 8 && passwordInput !== '')

  const validateRole = () => (roleInput !== '')

  const validateEmployeeId = () => (employeeIdInput !== '')

  const onBlurEmployeeId = () => {
    const isValidEmployeeId = validateEmployeeId()
    setShowEmployeeIdError(!isValidEmployeeId)
  }

  const onChangeEmployeeId = event => {
    setEmployeeIdInput(event.target.value)
  }

  const renderEmployeeIdFeild = () => {
    const className = employeeIdError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="employer">
          EMPLOYEE ID
        </label>
        <input
          type="text"
          id="employer"
          className={className}
          value={employeeIdInput}
          placeholder="Enter employee id"
          onChange={onChangeEmployeeId}
          onBlur={onBlurEmployeeId}
        />
        {employeeIdError && <p className="error-message">Required</p>}
      </div>
    )
  }

  const onChangeRole = event => {
      setRoleInput(event.target.value)
  }

  const renderRoleField = () => {
    const className = showRoleError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="gender">
          ROLE
        </label>
        <div className="gender-field-card">
          <input
            type="radio"
            id="employer"
            name="role"
            value="Employer"
            className={className}
            onChange={onChangeRole}
          />
          <label htmlFor="employer" className="input-label">
            Employer
          </label>
        </div>
        {roleInput === 'Employer'? renderEmployeeIdFeild() : ''}
        <div className="gender-field-card">
          <input
            type="radio"
            id="customer"
            name="role"
            value="Customer"
            className={className}
            onChange={onChangeRole}
          />
          <label htmlFor="customer" className="input-label">
            Customer
          </label>
        </div>
      </div>
    )
  }

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

  const onBlurLastName = () => {
    const isValidLastName = validateLastName()
    setShowLastNameError(!isValidLastName)
  }

  const onChangeLastName = event => {
    setLastNameInput(event.target.value)
  }

  const renderLastNameField = () => {
    const className = showLastNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="lastName">
          LAST NAME
        </label>
        <input
          type="text"
          id="lastName"
          className={className}
          value={lastNameInput}
          placeholder="Last name"
          onChange={onChangeLastName}
          onBlur={onBlurLastName}
        />
      </div>
    )
  }

  const onBlurFirstName = () => {
    const isValidFirstName = validateFirstName()
    setShowFirstNameError(!isValidFirstName)
  }

  const onChangeFirstName = event => {
    setFirstNameInput(event.target.value)
  }

  const renderFirstNameField = () => {
    const className = showFirstNameError
      ? 'name-input-field error-field'
      : 'name-input-field'

    return (
      <div className="input-container">
        <label className="input-label" htmlFor="firstName">
          FIRST NAME
        </label>
        <input
          type="text"
          id="firstName"
          className={className}
          value={firstNameInput}
          placeholder="First name"
          onChange={onChangeFirstName}
          onBlur={onBlurFirstName}
        />
      </div>
    )
  }

  const onSubmitSuccess = () => {
    navigate("/login")
  }

  const onSubmitFailure = err => {
    setShowSubmitError(true)
    setErrorMsg(err)
    setRegister(false)
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const isValidFirstName = validateFirstName()
    const isValidLastName = validateLastName()
    const isValidUsername = validateUsername()
    const isValidPassword = validatePassword()
    const isValidRole = validateRole()
    const isValidEmployeeId = roleInput === 'Employer'? validateEmployeeId() : true

    if (
      isValidFirstName &&
      isValidLastName &&
      isValidUsername &&
      isValidPassword &&
      isValidRole && 
      isValidEmployeeId
    ) {
      setRegister(!register)

      const userDetails = {
        id : uuidv4(),
        userName: usernameInput,
        password: passwordInput,
        firstName: firstNameInput,
        lastName: lastNameInput,
        role: roleInput,
        employeeId: employeeIdInput,
        bal : 0,
      }


      const url = 'http://localhost:3011/register/'
      const options = {
            method: "POST",
            body: JSON.stringify(userDetails),
            headers : {
                "Content-type" : "application/json",
            }
      }
      
      const response = await fetch(url ,options)
      const data = await response.json()
      if (response.ok === true) {
        onSubmitSuccess(data)
      } else {
        onSubmitFailure(data)
      }
    } else {
        setShowFirstNameError(!isValidFirstName)
        setShowLastNameError(!isValidLastName)
        setShowUsernameError(!isValidUsername)
        setShowPasswordError(!isValidPassword)
        setShowRoleError(!isValidRole)
    }
  }

  const renderRegistrationForm = () =>  (
      <form className="form-container" onSubmit={onSubmitForm}>
        {renderFirstNameField()}
        {showFirstNameError && <p className="error-message">Required</p>}
        {renderLastNameField()}
        {showLastNameError && <p className="error-message">Required</p>}
        {renderUserNameField()}
        {showUsernameError && <p className="error-message">Required</p>}
        {renderPasswordField()}
        {showPasswordError && <p className="error-message">Required</p>}
        {renderRoleField()}
        {showRoleError && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
        {register? <TailSpin  color="#ffffff" height="15" width="30" /> : 'Register'}
        </button>
      </form>
    )

    const token = Cookies.get('bank_login_token')
    if (token !== undefined) {
      return <Navigate to="/login" />
    }
  
    return (
      <div className="registration-form-container">
        <h1 className="form-app-title">Wellcome to the App</h1>
        <div className="view-container">
          <h1 className="form-title">Registration</h1>
          {renderRegistrationForm()}
          {showSubmitError && (
            <p className="submit-error-text">*{errorMsg}</p>
          )}
          <p className="link-to-register">
            Already have an account ? <NavLink to="/login">Login</NavLink>
          </p>
        </div>
      </div>
    )
  }


export default RegistrationForm
