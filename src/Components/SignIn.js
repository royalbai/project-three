import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { signIn } = UserAuth();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            await signIn(email, password);
            navigate("/account")
        } catch (e) {
            setError(e.message);
            // console.log(e.message);
        }
    };

    return (
        <div>
            <div className="instructions">
                <h2>Sign in to your account</h2>
                <p>Don't have an account yet? <Link to="/signup">Sign up</Link></p>
            </div>
            <form className="infoEntry" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Email Address</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" />
                </div>
                <div>
                    <label htmlFor="">Enter Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" />
                </div>
                <button>Sign In</button>
            </form>
        </div>
    );
};

export default SignIn;

