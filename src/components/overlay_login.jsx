import "../App.css";

export default function OverlayLogin({signInPage, signUpPage}){
    return(
        <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" onClick={signInPage}>Sign In</button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start the journey with us</p>
                <button className="ghost" onClick={signUpPage}>Sign Up</button>
              </div>
            </div>
          </div>
    )
}