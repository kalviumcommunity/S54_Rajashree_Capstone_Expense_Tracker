
import './App.css'
import PersonalDashboard from './Components/AfterLogin/PersonalMode/PersonalDashboard'
import Login from './Components/Login/Login'
import Landingpage from './Components/BeforeLogin/Landingpage'

import Signup from './Components/Login/Signup'
import {Routes,Route} from 'react-router-dom'
import Notification from './Components/AfterLogin/PersonalMode/Notification'
import PersonalExpense from './Components/AfterLogin/PersonalMode/PersonalExpense'
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
     </Routes>

    </>
  )
}

export default App
