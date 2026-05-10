import { useEffect, useState } from "react";
import { authFetch } from "../services/api";

export default function ClientsPage() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");

    const [clients, setClients] = useState([]);

    const [error, setError] = useState("");

    useEffect(() => {
        loadClients();
    }, []);

    async function loadClients() {

        try {

            const response = await authFetch("/clients");

            const data = await response.json();

            setClients(data);

        } catch (err) {

            setError("Erro ao carregar clientes");
        }
    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            await authFetch("/clients", {
                method: "POST",
                body: JSON.stringify({
                    name,
                    email,
                    cpf
                })
            });

            setName("");
            setEmail("");
            setCpf("");

            loadClients();

        } catch (err) {

            setError("Erro ao cadastrar cliente");
        }
    }

    return (
        <div style={styles.container}>

            <h1>Clientes</h1>

            <form onSubmit={handleSubmit} style={styles.form}>

                <input
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={styles.input}
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={styles.input}
                />

                <input
                    placeholder="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    style={styles.input}
                />

                <button style={styles.button}>
                    Cadastrar
                </button>

            </form>

            {
                error &&
                <p style={styles.error}>
                    {error}
                </p>
            }

            <table style={styles.table}>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>CPF</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        clients.map(client => (

                            <tr key={client.id}>

                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.cpf}</td>

                            </tr>
                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        gap: "24px"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "400px"
    },
    input: {
        padding: "12px",
        border: "1px solid #cccccc",
        borderRadius: "8px"
    },
    button: {
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#2563eb",
        color: "#ffffff"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse"
    },
    error: {
        color: "red"
    }
};