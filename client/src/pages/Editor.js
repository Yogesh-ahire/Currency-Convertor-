import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import styles from "./Editor.module.css";

const Editor = ({ document, handleChange, ownerId }) => {
    const { user } = useContext(AuthContext);

    // Check if the user is authenticated
    const isAuthenticated = !!user;
    // Check if the user is the document owner
    const isOwner = user?.id === ownerId;
    // Check if the user has an "admin" or "editor" role
    const isEditor = user?.role === "admin" || user?.role === "editor";

    return (
        <div className={styles.container}>
            <h2>Collaborative Editor</h2>

            {!isAuthenticated ? (
                <p className={styles.error}>You must be logged in to edit this document.</p>
            ) : !isOwner && !isEditor ? (
                <p className={styles.error}>You do not have permission to edit this document.</p>
            ) : (
                <textarea
                    className={styles.editorBox}
                    value={document}
                    onChange={handleChange}
                    rows="20"
                    cols="80"
                />
            )}
        </div>
    );
};

export default Editor;
