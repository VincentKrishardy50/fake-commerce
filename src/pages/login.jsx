import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormLogin from "../components/form_login";
import OverlayLogin from "../components/overlay_login";

export default function Login({ setLoggedIn }) {
  const navigate = useNavigate();
  const [changeForm, setChangeForm] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLogin")) {
      navigate("/");
    }
  }, []);

  function signUpPage() {
    setChangeForm("right-panel-active");
  }

  function signInPage() {
    setChangeForm("");
  }

  function validateSignIn(e) {
    e.preventDefault();
    document.getElementById("signin").textContent = "Loading..";
    setTimeout(() => {
      document.getElementById("signin").textContent = "Sign In";
      toast("Error during signin: Request failed with status code 401");
    }, 1000);
  }

  function validateSignUp(e) {
    e.preventDefault();
    document.getElementById("signup").textContent = "Loading..";

    const dataLogin = {
      email: document.getElementById("email").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    };

  
      axios
        .post("https://fakestoreapi.com/users", dataLogin)
        .then((response) => {
          localStorage.setItem("isLogin", true);
          setLoggedIn(true);
          navigate("/");
          localStorage.setItem("setToast", false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
  
  }
  return (
    <div className="signinup-container" style={{ display: "block" }}>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
        integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
        crossOrigin="anonymous"
      />

      <div
        className={`container ${changeForm}`}
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow:
            "0 14px 28px rgba(0, 0, 0, 0.2), 0 10px 10px rgba(0, 0, 0, 0.2)",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
          width: "768px",
          maxWidth: "100%",
          minHeight: "480px",
        }}
        id="container"
      >
        <FormLogin
          validateSignIn={validateSignIn}
          validateSignUp={validateSignUp}
        />

        <OverlayLogin signInPage={signInPage} signUpPage={signUpPage} />
      </div>
      <ToastContainer toastStyle={{ backgroundColor: "red", color: "white" }} />
    </div>
  );
}
