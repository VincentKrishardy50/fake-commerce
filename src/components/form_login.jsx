import "../App.css";

export default function FormLogin({validateSignUp, validateSignIn}){
    return(
        <>
        <div className="form-container sign-up-container">
            <h1 className="logo-sign">Fakecommerce</h1>
            <form method="post">
              <h1>Create Account</h1>
              <input
              id="username"
                type="text"
                name="username"
                placeholder="Username"
                required
              />
              <input id="email" type="email" name="email" placeholder="Email" required />
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <button id="signup" onClick={validateSignUp}>{"Sign Up"}</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <h1 className="logo-sign">Fakecommerce</h1>
            <form method="post">
              <h1>Sign in</h1>
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
              />
              <button id="signin" onClick={validateSignIn}>{"Sign In"}</button>
            </form>
          </div>
        </>
    )
}