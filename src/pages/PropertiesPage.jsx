import { useEffect, useState } from "react";
import { authFetch } from "../services/api";

export default function PropertiesPage() {

    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [identifierCode, setIdentifierCode] = useState("");

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        loadProperties();
    }, []);

    async function loadProperties() {

        const response = await authFetch("/properties");

        const data = await response.json();

        setProperties(data.content || []);
    }

    async function handleSubmit(event) {

        event.preventDefault();

        await authFetch("/properties", {
            method: "POST",
            body: JSON.stringify({
                address,
                city,
                identifierCode
            })
        });

        setAddress("");
        setCity("");
        setIdentifierCode("");

        loadProperties();
    }

    return (
        <div style={styles.container}>

            <h1>Propriedades</h1>

            <form onSubmit={handleSubmit} style={styles.form}>

                <input
                    placeholder="Endereço"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={styles.input}
                />

                <input
                    placeholder="Cidade"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={styles.input}
                />

                <input
                    placeholder="Código identificador"
                    value={identifierCode}
                    onChange={(e) => setIdentifierCode(e.target.value)}
                    style={styles.input}
                />

                <button style={styles.button}>
                    Cadastrar
                </button>

            </form>

            <table style={styles.table}>

                <thead>

                    <tr>
                        <th>ID</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>Código</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        properties.map(property => (

                            <tr key={property.id}>

                                <td>{property.id}</td>
                                <td>{property.address}</td>
                                <td>{property.city}</td>
                                <td>{property.identifierCode}</td>

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
    }
};