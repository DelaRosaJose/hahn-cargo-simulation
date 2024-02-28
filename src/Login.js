import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// The Login component receives props from its parent component.
const Login = (props) => {
    // State variables to store email, password, and corresponding error messages.
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
   
    // React Router hook to enable navigation within the application.
    const navigate = useNavigate();

    // Function to handle the button click event.
    const onButtonClick = () => {
        // Set initial error values to empty.
        setEmailError("");
        setPasswordError("");

        // Validation checks for email and password.
        if ("" === email) {
            setEmailError("Please enter your email");
            return;
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email");
            return;
        }

        if ("" === password) {
            setPasswordError("Please enter a password");
            return;
        }

        if (password.length < 4) {
            setPasswordError("The password must be 4 characters or longer");
            return;
        }

        // If validation passes, initiate the login process.
        logIn();
    };

    // Function to perform user login using email and password.
    const logIn = () => {
        // Make a POST request to the login endpoint of the API.
        // fetch("https://localhost:7115/User/Login", {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ username: email, password })
        // })
        // .then(r => {
        //     if (r.ok) {
        //         // If the response is successful, store user information in local storage,
        //         // update the state, and navigate to the home page.
        //         localStorage.setItem("user", JSON.stringify({ email, token: r.token }));
        //         props.setLoggedIn(true);
        //         props.setEmail(email);
        //         window.alert("Wrong email or password" + r.username);
        //         // navigate("/");
        //     } else {
        //         // If the response is not successful, show an alert with an error message.
        //         window.alert("Wrong email or password" + r.message);
        //     }
        // });
        fetch("https://localhost:7115/User/Login", {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: email, password })
})
// .then(r => r.json()) // Parse the response as JSON
.then(async data => {
    // Check if the response is successful
    if (data.ok) {
        // Extract the token from the response data
        const DeserializedData = await data.json()
        
        // Store user information in local storage, update the state, and navigate to the home page.
        // localStorage.setItem("user", JSON.stringify({ email, token }));
        localStorage.setItem("token", DeserializedData.token);
        props.setLoggedIn(true);
        props.setEmail(email);
        navigate("/");
    } else {
        // If the response is not successful, show an alert with an error message.
        window.alert("Wrong email or password" + data.message);
    }
})
.catch(error => {
    // Handle any fetch errors here
    console.error('Fetch error:', error);
});

    };

    // JSX structure representing the login form.
    return (
        <div className={"mainContainer"}>
            <div className={"titleContainer"}>
                <div>Login</div>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={email}
                    placeholder="Enter your email here"
                    onChange={ev => setEmail(ev.target.value)}
                    className={"inputBox"}
                />
                <label className="errorLabel">{emailError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    value={password}
                    placeholder="Enter your password here"
                    onChange={ev => setPassword(ev.target.value)}
                    className={"inputBox"}
                    type="password"
                />
                <label className="errorLabel">{passwordError}</label>
            </div>
            <br />
            <div className={"inputContainer"}>
                <input
                    className={"inputButton"}
                    type="button"
                    onClick={onButtonClick}
                    value={"Log in"}
                />
            </div>
        </div>
    );
}

// Export the Login component.
export default Login;
