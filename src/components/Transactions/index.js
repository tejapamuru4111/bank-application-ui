import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import {Navigate, useParams } from "react-router-dom"
import Header from "../Header"
import Popup from 'reactjs-popup'
import { v4 as uuidv4 } from "uuid"
import {GiPayMoney, GiReceiveMoney} from 'react-icons/gi'
import {BsCurrencyRupee} from 'react-icons/bs'
import {FaRupeeSign} from 'react-icons/fa'

import './index.css'

import 'reactjs-popup/dist/index.css'

const Transactions = () => {

    const [transactionsData, setTransactionsData] = useState([])
    const [depositAmmount, setDepositAmmount] = useState(0)
    const [withdrawAmmount, setWithdrawAmmount] = useState(0)
    const [balence, setBalence] = useState(0)
    const [user, setUser] = useState()
    const [withdrawErr, setWithdrawErr] = useState()
    const [depositErr, setDepositErr] = useState()
    const [onTransaction, setOnTransaction] = useState(false)

    const userId = useParams().userId

    useEffect(()=> {
        const jwtToken = Cookies.get('bank_login_token')

        const url = `http://localhost:3011/${userId}/transactions`
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
            method: 'GET',
        }
        const fetchUserTransactions = async() => {
            const response = await fetch(url, options)
            const data = await response.json()
            setTransactionsData(data.userTransactions)
            setBalence(data.user.bal)
            setUser(data.user)
        }
        fetchUserTransactions()
    },[userId, onTransaction])

    // useEffect(()=> {
    //     const jwtToken = Cookies.get('bank_login_token')

    //     const url = `http://localhost:3011/${userId}/transactions`
    //     const options = {
    //         headers: {
    //             Authorization: `Bearer ${jwtToken}`,
    //         },
    //         method: 'GET',
    //     }
    //     const fetchUserTransactions = async() => {
    //         const response = await fetch(url, options)
    //         const data = await response.json()
    //         setTransactionsData(data.userTransactions)
    //         setBalence(data.user.bal)
    //     }
    //     fetchUserTransactions()
    // },[onTransaction,userId])

    const onClickWithdraw = async() => {
        if(withdrawAmmount === 0 || withdrawAmmount === ''){
            setWithdrawErr('Enter ammount')
        }
        else if (withdrawAmmount > balence) {
            setWithdrawErr('In sufficient balence')
        }
        else {
            const jwtToken = Cookies.get('bank_login_token')

            const updatedData = {
                id : uuidv4(),
                balence : balence - parseInt(withdrawAmmount),
                ammount : withdrawAmmount,
                type : 'Withdraw',
                userId : userId
            }

            const url = 'http://localhost:3011/transaction'
            const options = {
                body : JSON.stringify(updatedData),
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-type" : "application/json",
                },
                method: 'POST',
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok){
                setWithdrawAmmount(0)
                setWithdrawErr('Withdraw Successfully')
                setBalence(data)
                setOnTransaction(!onTransaction)
            }
        }
    }

    const onChangeWithdraw = (event) => {
        setWithdrawAmmount(event.target.value)
    }

    const onClicDeposit = async() => {
        if(depositAmmount === 0 || depositAmmount === ''){
            setDepositErr('Enter ammount')
        }
        else {
            const jwtToken = Cookies.get('bank_login_token')

            const updatedData = {
                id : uuidv4(),
                balence : balence + parseInt(depositAmmount),
                ammount : depositAmmount,
                type : 'Deposit',
                userId : userId
            }

            console.log(updatedData)

            const url = 'http://localhost:3011/transaction'
            const options = {
                body : JSON.stringify(updatedData),
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-type" : "application/json",
                },
                method: 'POST',
            }
            const response = await fetch(url, options)
            const data = await response.json()
            if (response.ok){
                setDepositErr('Deposited Successfully')
                setBalence(data)
                setDepositAmmount(0)
                setOnTransaction(!onTransaction)
            }
    }
    }

    const onChangeDeposit = (event) => {
        setDepositAmmount(event.target.value)
    }

    const jwtToken = Cookies.get('bank_login_token')

    if (jwtToken === undefined){
        return <Navigate to="/login" />
    }

    return(
        <>
            <Header />
            <div className="transactions-bg-container">
                {user && <div className="transactions-user-card">
                    <h1 className="transactions-user-card-profile">{user.first_name[0].toUpperCase()}{user.last_name[0].toUpperCase()}</h1>
                    <div className="transactions-user-card-name-id-card">
                        <h3 className="transactions-user-card-name">{user.first_name} {user.last_name}</h3>
                        <p className="transactions-user-card-id">@{user.user_name}</p>
                    </div>
                    <p className="transactions-user-account-balence">Bal : <span className="popup-balence-span"><FaRupeeSign /> {balence} </span></p>
                </div>}
                <div className="trasactions-bg-card">
                    <h1 className="transactions-card-heading">Transactions</h1>
                    {transactionsData.length === 0 ?<p className="transactions-card-err-msg">No transactions history</p>
                    :
                    <ul className="transactions-list-card">
                        {transactionsData.map(transaction => (
                            <li key={transaction.transaction_id} className="transactions-list-card-item">
                                {transaction.type === 'Deposit'? 
                                    <>
                                        <p><GiPayMoney  color="#0d840b"/></p>
                                        <p className="transaction-money-credit-date">Credited on {transaction.date}</p>
                                        <p className="transaction-money-credit-ammount"> + <BsCurrencyRupee /> {transaction.ammount}</p>
                                    </> 
                                    :
                                    <>
                                        <p><GiReceiveMoney color="#f30701" /></p>
                                        <p className="transaction-money-credit-date">Debited on {transaction.date}</p>
                                        <p className="transaction-money-debit-ammount"> - <BsCurrencyRupee /> {transaction.ammount}</p>
                                    </>}
                            </li>
                        ))}
                    </ul>}
                </div>
            </div>
            <div className="popup-buttons-container">
                <div className="popup-container">
                    <Popup
                        modal
                        trigger={
                        <button type="button" className="deposit-trigger-button">
                            Deposit
                        </button>
                        }
                    >
                        {close => (
                        <div className="popup-bg-card">
                            <div className="popup-content-card">
                                <p className="popup-balence">Bal: <span className="popup-balence-span"><BsCurrencyRupee /> {balence} </span></p>
                                <input className="popup-input-ammount" type="number" onChange={onChangeDeposit} value={depositAmmount} placeholder="enter deposit ammount" />
                                {depositErr && <p className="popup-submit-msg">{depositErr}</p>}
                            </div>
                            <div className="popup-content-card-buttons-card">
                                <button
                                type="button"
                                className="withdraw-trigger-button"
                                onClick={() => {
                                    setDepositErr('')
                                    close()
                                }}
                                >
                                Close
                                </button>
                                <button
                                type="button"
                                className="deposit-trigger-button"
                                onClick={onClicDeposit}
                                >
                                Deposit
                                </button>
                            </div>
                        </div>
                        )}
                    </Popup>
                </div>
                <div className="popup-container">
                    <Popup
                        modal
                        trigger={
                        <button type="button" className="withdraw-trigger-button">
                            Withdraw
                        </button>
                        }
                    >
                        {close =>  (
                                <div className="popup-bg-card">
                                    <div className="popup-content-card">
                                        <p className="popup-balence">Bal:<span className="popup-balence-span"><BsCurrencyRupee /> {balence}</span></p>
                                        <input className="popup-input-ammount" type="number" onChange={onChangeWithdraw} value={withdrawAmmount} placeholder="enter withdraw ammount" />
                                        {withdrawErr && <p className="popup-submit-msg">{withdrawErr}</p>}
                                    </div>
                                    <div className="popup-content-card-buttons-card">
                                        <button
                                        type="button"
                                        className="deposit-trigger-button"
                                        onClick={() => {
                                            setWithdrawErr('')
                                            close()
                                        }}
                                        >
                                        Close
                                        </button>
                                        <button
                                        type="button"
                                        className="withdraw-trigger-button"
                                        onClick={onClickWithdraw}
                                        >
                                        Withdraw
                                        </button>
                                    </div>
                                </div>
                            )}
                    </Popup>
                </div>
            </div>
        </>
    )
}

export default Transactions