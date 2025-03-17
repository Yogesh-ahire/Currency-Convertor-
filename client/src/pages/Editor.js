import React from "react";
import styles from "./Editor.module.css";

const Editor = ({ document, handleChange }) => { // ✅ Receive props
    return (
        <div className={styles.container}>
            <h2>Collaborative Editor</h2>
            <textarea
                className={styles.editorBox}
                value={document} // ✅ Use prop
                onChange={handleChange} // ✅ Use prop
                rows="20"
                cols="80"
            />
        </div>
    );
};

export default Editor;
