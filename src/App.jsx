import {React,useState,useCallback,useEffect} from 'react'
import Login from './components/Pages/Login'
import Base from './components/Base'
import {AppContext} from './AppContext'
import PreLoader from './components/Loaders/PreLoader'

export default function App() {

  const [isLogin,setIsLogin]=useState(false)
  const [navActive,setNavActive]=useState('home')
  let user_id= localStorage.getItem("user_id")
  
  const handleNaveActive = (val) => {
     setNavActive(val)
  }

  const checkUserLogin = useCallback ((userInfo) => {

      // login now OR already is login
      if(userInfo!==null){
          if(user_id===null)
            localStorage.setItem("user_id",userInfo) 
          setIsLogin(true)
      }else{  // login not yet
          localStorage.removeItem("user_id")
          setIsLogin(false)
      }
 
},[])

const logout= useCallback (()=>{
  localStorage.removeItem("user_id")
  setIsLogin(false)
})

useEffect(() => {
    checkUserLogin(user_id)
  }, []); 


  return (
    <>
      {(isLogin)? 
        <div>
        <PreLoader /> 
        <AppContext.Provider value={{navActive,handleNaveActive,logout}}>
              <Base/> 
        </AppContext.Provider> 
        </div>:
        <Login checkUserLogin={checkUserLogin} />} 
   </>
  )

}


