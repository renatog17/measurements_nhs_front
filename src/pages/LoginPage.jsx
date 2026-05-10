import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/api";
import { useAuth } from "../auth/AuthContext";

export default function LoginPage() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();

        try {

            setLoading(true);
            setError("");

            const token = await loginRequest(email, password);

            login(token);


            navigate("/app/readers");

        } catch (err) {

            setError("Email ou senha inválidos");

        } finally {

            setLoading(false);
        }
    }

    return (
        <div style={styles.container}>

            <form style={styles.form} onSubmit={handleSubmit}>

                <h1 style={styles.title}>
                    Login
                </h1>

                <div style={styles.field}>

                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />

                </div>

                <div style={styles.field}>

                    <label>Senha</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />

                </div>

                {
                    error &&
                    <p style={styles.error}>
                        {error}
                    </p>
                }

                <button
                    type="submit"
                    style={styles.button}
                    disabled={loading}
                >
                    {
                        loading
                            ? "Entrando..."
                            : "Entrar"
                    }
                </button>

            </form>

        </div>
    );
}

const styles = {

    container: {
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: "16px"
    },

    form: {
        width: "100%",
        maxWidth: "400px",
        backgroundColor: "#ffffff",
        padding: "32px",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
    },

    title: {
        textAlign: "center",
        margin: 0
    },

    field: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #cccccc",
        fontSize: "16px"
    },

    button: {
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#1e40af",
        color: "#ffffff",
        fontSize: "16px",
        cursor: "pointer"
    },

    error: {
        color: "red",
        margin: 0,
        fontSize: "14px"
    }
};