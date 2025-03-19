import React, { useContext } from "react";
import { Link } from "react-router-dom";
import  AuthContext  from "../context/AuthContext";  
import styles from "./Navbar.module.css";  

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);  

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>Collab Tool</Link>
            <div className={styles.links}>  {}
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/editor" className={styles.link}>Editor</Link>

                {user ? (  //  If user is logged in
                    <>
                        <span className={styles.user}>Welcome, {user.name}!</span>
                        <button onClick={logout} className={styles.logoutBtn}>Logout</button>
                    </>
                ) : (  //  If user is NOT logged in
                    <>
                        <Link to="/login" className={styles.link}>Login</Link>
                        <Link to="/register" className={styles.link}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;  // 
