import React, { useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill's styles
import AuthContext from "../context/AuthContext";
import styles from "./Editor.module.css";

const Editor = ({ document = "", handleChange, ownerId }) => {
    const { user } = useContext(AuthContext);

    // Check if the user is authenticated
    const isAuthenticated = !!user;
    // Check if the user is the document owner
    const isOwner = user?.id === ownerId;
    // Check if the user has an "admin" or "editor" role
    const isEditor = user?.role === "admin" || user?.role === "editor";

    return (
        <div className={styles.container}>
            
            {!isAuthenticated ? (
                <p className={styles.error}>You must be logged in to edit this document.</p>
            ) : !isOwner && !isEditor ? (
                <p className={styles.error}>You do not have permission to edit this document.</p>
            ) : (
                <ReactQuill
                    className={styles.editorBox}
                    value={document}
                    onChange={handleChange}
                    theme="snow" // "bubble" is another option
                />
            )}
        </div>
    );
};

export default Editor;
