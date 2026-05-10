import { useEffect, useState } from "react";
import { authFetch } from "../services/api";

export default function ReadersPage() {

    const [name, setName] = useState("");
    const [employeeCode, setEmployeeCode] = useState("");

    const [readers, setReaders] = useState([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        loadReaders();
    }, []);

    async function loadReaders() {

        try {

            setLoading(true);

            const response = await authFetch("/readers");

            const data = await response.json();

            setReaders(data);

        } catch (err) {

            console.error(err);

            setError("Erro ao carregar leitores");

        } finally {

            setLoading(false);
        }
    }

    async function handleSubmit(event) {

        event.preventDefault();

        try {

            setError("");

            await authFetch("/readers", {

                method: "POST",

                body: JSON.stringify({
                    name,
                    employeeCode
                })
            });

            setName("");
            setEmployeeCode("");

            loadReaders();

        } catch (err) {

            console.error(err);

            setError("Erro ao cadastrar leitor");
        }
    }

    return (
        <div style={styles.container}>

            <h1>
                Leituristas
            </h1>

            <form
                onSubmit={handleSubmit}
                style={styles.form}
            >

                <div style={styles.field}>

                    <label>
                        Nome
                    </label>

                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={styles.input}
                        required
                    />

                </div>

                <div style={styles.field}>

                    <label>
                        Código do funcionário
                    </label>

                    <input
                        value={employeeCode}
                        onChange={(e) => setEmployeeCode(e.target.value)}
                        style={styles.input}
                        required
                    />

                </div>

                <button
                    type="submit"
                    style={styles.button}
                >
                    Cadastrar
                </button>

            </form>

            {
                error &&
                <p style={styles.error}>
                    {error}
                </p>
            }

            {
                loading
                    ? <p>Carregando...</p>
                    : (
                        <table style={styles.table}>

                            <thead>

                                <tr>

                                    <th style={styles.th}>
                                        ID
                                    </th>

                                    <th style={styles.th}>
                                        Nome
                                    </th>

                                    <th style={styles.th}>
                                        Código
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {
                                    readers.map((reader) => (

                                        <tr key={reader.id}>

                                            <td style={styles.td}>
                                                {reader.id}
                                            </td>

                                            <td style={styles.td}>
                                                {reader.name}
                                            </td>

                                            <td style={styles.td}>
                                                {reader.employeeCode}
                                            </td>

                                        </tr>
                                    ))
                                }

                            </tbody>

                        </table>
                    )
            }

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
        gap: "16px",
        maxWidth: "400px"
    },

    field: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },

    input: {
        padding: "12px",
        borderRadius: "8px",
        border: "1px solid #cccccc"
    },

    button: {
        padding: "12px",
        border: "none",
        borderRadius: "8px",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        cursor: "pointer"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse"
    },

    th: {
        textAlign: "left",
        padding: "12px",
        borderBottom: "1px solid #cccccc"
    },

    td: {
        padding: "12px",
        borderBottom: "1px solid #eeeeee"
    },

    error: {
        color: "red"
    }
};