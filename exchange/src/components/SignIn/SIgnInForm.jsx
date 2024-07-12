import './SignInForm.css'
import { useState } from 'react'

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    console.log(email, password);

    const submitForm = (e) => {
        e.preventDefault()
    }

    return(
        <>
        <h1>Sign in</h1>
        <form onSubmit={submitForm}>
            <div className="mb-3">
              <label htmlFor="InputEmail" className="form-label-email">Email address</label>
              <input onChange={(e) => {setEmail(e.target.value)}} type="email" className="form-control" id="InputEmail" aria-describedby="emailHelp"></input>
             </div>
          <div className="mb-3">
              <label htmlFor="InputPassword" className="form-label-password">Password</label>
              <input onChange={(e) => {setPassword(e.target.value)}} type="password" className="form-control" id="InputPassword" ></input>
          </div>
          <div className="mb-3-form-check">
              <input type="checkbox" className="form-check-input" id="Check1"></input>
              <label className="form-check-label" htmlFor="Check1">Remember me</label>
          </div>
          <button onClick={submitForm} type="submit" className="btn-primary">Submit</button>
        </form>
        </>
    );
}

export default SignIn