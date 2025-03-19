import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import styles from "./Login.module.css";

const Login = () => {
    const { login } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const validateInputs = () => {
        if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address.";
        if (password.length < 6) return "Password must be at least 6 characters.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        const error = validateInputs();
        if (error) return setMessage(error);

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                login(data);
            } else {
                setMessage(data.msg || "Login failed. Please try again.");
            }
        } catch (error) {
            setMessage("Failed to connect to the server.");
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <h2>Login</h2>
            {message && <p className={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;
