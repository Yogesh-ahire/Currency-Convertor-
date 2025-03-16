import React from "react";
import styles from "./Editor.module.css";

const Editor = () => {
    return (
        <div className={styles.container}>
            <h2>Collaborative Editor</h2>
            <div className={styles.editorBox}>Start typing...</div>
        </div>
    );
};

export default Editor;
