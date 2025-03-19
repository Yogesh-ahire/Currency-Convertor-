import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css"; 

const Home = () => {
    return (
        <div className={styles.container}>
            <h1>Welcome to the Real-time Collaboration Tool</h1>
            <p>Collaborate in real-time with your team efficiently.</p>
            <Link to="/editor">
                <button className={styles.editorButton}>Go to Editor</button>
            </Link>
        </div>
    );
};

export default Home;
