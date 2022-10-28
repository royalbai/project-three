import React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

// Components
import Header from "./Header";
import About from "./About";
import Planner from "./Planner";
import Footer from "./Footer";


function Account() {

    const {user, logout} = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
            // console.log("you are logged out");
        } catch (e) {
            // console.log(e.message);
        }
    }

    return (
        <div>
            <div className="account">
                <h3>Account User:</h3>
                <p>{user && user.email}</p>
            </div>
            <div className="logout">
                <button onClick={handleLogout}>Logout</button>
            </div>
            <Header />
            <About />
            <Planner />
            <Footer />
        </div>
    );
};

export default Account;