import React from 'react'

export default function Login() {
  return (
    <div>
      <h2>Login Form</h2>
      <form action="/action_page.php" method="post">
            <div className="imgcontainer">
              <img src="./images/logo192.png"  />
            </div>
        <div className="container">
            <label for="uname"><b>User Id</b></label>
            <input type="text" placeholder="Enter User Id" name="uname" />                
            <button type="submit">Login</button>
        </div>

      </form>
    </div>
  )
} 
