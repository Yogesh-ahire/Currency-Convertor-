import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/")
            .then((response) => {
                setMessage(response.data);
            })
            .catch((error) => console.error("Error:", error));
    }, []);

    return <h1>{message}</h1>;
}

export default Home;
