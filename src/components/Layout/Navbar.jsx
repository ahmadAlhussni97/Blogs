import {React,useState,useContext, useCallback,useEffect,createContext } from 'react'
import { Link } from 'react-router-dom'
import {AppContext} from '../../AppContext'

export default function Navbar() {
  
  const {navActive,handleNaveActive,logout} = useContext(AppContext)

  const changeNavActive=useCallback(()=>{
      
  if(navActive=="home"){
      let pathNameActive=window.location.pathname.split('/')[1]
        pathNameActive=(pathNameActive=='' || pathNameActive==undefined)?"home":pathNameActive
        handleNaveActive(pathNameActive)
    }
    
  },[])
  
  useEffect(() => {
    changeNavActive()
  }, []);

  return (
        <div className="navbar">
                      <Link onClick={()=>handleNaveActive('create')} className={navActive==='create'?'navbar-active':''}  to="/create">Create Blog</Link>
            <Link onClick={()=>handleNaveActive('home')}   className={navActive==='home'? 'navbar-active':''}   to="/">Home</Link>
            <Link onClick={()=>handleNaveActive('profile')} className={navActive==='profile'?'navbar-active':''}  to="/profile">Profile</Link>
            <Link to="/" onClickCapture={()=>logout()}>Logout</Link>
        </div>
  )
}
