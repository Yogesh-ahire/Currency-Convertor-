import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Editor from "./pages/Editor";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  const [document, setDocument] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const connectSocket = () => {
      const newSocket = new WebSocket("ws://localhost:5000"); 

      newSocket.onopen = () => console.log("WebSocket connected");

      newSocket.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          if (message.type === "init") setDocument(message.data);
          else if (message.type === "update") setDocument(message.data);
        } catch (error) {
          console.error("WebSocket message error:", error);
        }
      };

      newSocket.onclose = () => {
        console.log("WebSocket closed. Reconnecting in 3s...");
        setTimeout(connectSocket, 3000); // Auto-reconnect
      };

      newSocket.onerror = (err) => console.error("WebSocket error:", err);

      setSocket(newSocket);
    };

    connectSocket();
  }, []);

  // ✅ Fix: handleChange now correctly receives the value from ReactQuill
  const handleChange = (newDocument) => {
    setDocument(newDocument);
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "update", data: newDocument }));
    }
  };

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<Editor document={document} handleChange={handleChange} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;

