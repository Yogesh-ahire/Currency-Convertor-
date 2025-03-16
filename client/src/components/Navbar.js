import React, { useContext } from "react";
import { Link } from "react-router-dom";
import  AuthContext  from "../context/AuthContext";  // ✅ Ensure correct import
import styles from "./Navbar.module.css";  // ✅ Import CSS module

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);  // ✅ Get user state & logout function

    return (
        <nav className={styles.navbar}>
            <Link to="/" className={styles.logo}>Collab Tool</Link>
            <div className={styles.links}>  {/* ✅ Use styles.links */}
                <Link to="/" className={styles.link}>Home</Link>
                <Link to="/editor" className={styles.link}>Editor</Link>

                {user ? (  // ✅ If user is logged in
                    <>
                        <span className={styles.user}>Welcome, {user.name}!</span>
                        <button onClick={logout} className={styles.logoutBtn}>Logout</button>
                    </>
                ) : (  // ✅ If user is NOT logged in
                    <>
                        <Link to="/login" className={styles.link}>Login</Link>
                        <Link to="/register" className={styles.link}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;  // ✅ Ensure default export
