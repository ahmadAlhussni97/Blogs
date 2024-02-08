import {React,useState,useRef} from 'react'
import '../../assets/css/Login.scss'   

export default function Login(props) {

   const [isError,setIsError]=useState(false)
   const user_id = useRef(null); 

   const userLogin = (e) => {
    // prevent loading
    e.preventDefault()
    
    // store user info
    if(user_id.current.value==="1"){
      setIsError(false)
      let userInfo=user_id.current.value
      props.checkUserLogin(userInfo)
    }
    else
       setIsError(true)
   }

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={(event)=>userLogin(event)}>
        <div className="imgcontainer">
            <img className='avatar' src={require("../../assets/images/profile.png")} />
        </div>
        <div className="container">
            <label htmlFor="user_id"><b>User Id</b></label>
            <input type="number"  placeholder="Enter User Id" ref={user_id}  />    
             <b className='error'>{(isError===true)?"User Not Found":""} </b>           
            <button type="submit">Login</button>
        </div>

      </form>
    </div>
  )
} 
