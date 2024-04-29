
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './Components/Login/Login'
import Signup from './Components/Login/Signup'

import Landingpage from './Components/BeforeLogin/Landingpage'

import PersonalDashboard from './Components/AfterLogin/PersonalMode/PersonalDashboard'
import PersonalExpense from './Components/AfterLogin/PersonalMode/PersonalExpense'
import Notification from './Components/AfterLogin/PersonalMode/Notification'

import BusinessDashboard from './Components/AfterLogin/BusinessMode/BusinessDashboard'

function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={ <Landingpage/>}></Route>
        <Route path='/signup' element={ <Signup/>}></Route>
        <Route path='/login' element={ <Login/>}></Route>
        <Route path='/personalDashboard' element={<PersonalDashboard/>}></Route>
        <Route path='/notification' element={<Notification/>}></Route>
        
        <Route path='/personalExpense' element={<PersonalExpense/>}></Route>

        <Route path='businessDashboard' element={<BusinessDashboard/>}></Route>
     </Routes>
    </>
  )
}

export default App
