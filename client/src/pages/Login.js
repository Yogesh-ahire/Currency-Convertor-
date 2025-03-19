import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            login({
                id: data.id,  // Ensure ID is stored
                name: data.name,
                email: data.email,
                role: data.role,  // Ensure role is stored
            });
        } else {
            alert(data.msg);
        }
    };

    return (
        <div className={styles.container}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
                <button type="submit" className={styles.button}>Login</button>
            </form>
        </div>
    );
};

export default Login;
