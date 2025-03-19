import React, { useState } from "react";
import styles from "./Register.module.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const validateInputs = () => {
        if (name.length < 3) return "Name must be at least 3 characters.";
        if (!/\S+@\S+\.\S+/.test(email)) return "Invalid email address.";
        if (password.length < 8) return "Password must be at least 8 characters.";
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        const error = validateInputs();
        if (error) return setMessage(error);

        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Registration successful! You can now log in.");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                setMessage(data.msg || "Registration failed.");
            }
        } catch (error) {
            setMessage("Failed to connect to the server.");
        }
        setLoading(false);
    };

    return (
        <div className={styles.container}>
            <h2>Register</h2>
            {message && <p className={styles.message}>{message}</p>}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className={styles.input} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className={styles.input} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className={styles.input} />
                <button type="submit" className={styles.button} disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;
