import {BrowserRouter, Routes, Route} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import Home from './components/Home'
import Transactions from './components/Transactions'
import Users from './components/Users'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/login" element={<LoginForm />} />
      <Route exact path="/register" element={<RegistrationForm />} />
      <Route exact path="/" element={<Home />} />
      <Route exact path="/:userId/transactions" element={<Transactions />} />
      <Route exact path="/users" element={<Users />} />
      <Route element={<NotFound />}/>
    </Routes>
  </BrowserRouter>
)

export default App
