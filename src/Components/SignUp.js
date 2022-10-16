import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";


function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const { createUser } = UserAuth();
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try{
            await createUser(email, password);
            navigate("/account")
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    };

    return (
        <div>
            <div className="instructions">
                <h2>Sign up for account</h2>
                <p>Already have an account? <Link to="/">Sign in</Link></p>
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
                <button>Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;