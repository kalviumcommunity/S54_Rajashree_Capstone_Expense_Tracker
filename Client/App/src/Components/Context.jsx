import React, { createContext,useState } from 'react'
export const AppContext = createContext()

const Context =({children}) => {

 const [isLoggedIn, setIsLoggedIn] = useState(false);
 const [isSignedUp, setIsSignedUp] = useState(false);
 const[username,setUsername]=useState("")
 const[userEmail,setUserEmail]=useState("")
 const[totalSpent, setTotalSpent]=useState("0")

  return (
    <AppContext.Provider value={{isSignedUp,setIsSignedUp,isLoggedIn, setIsLoggedIn,username,setUsername,userEmail,setUserEmail,totalSpent, setTotalSpent}}>
        {children}
    </AppContext.Provider>
  )

}

export default Context