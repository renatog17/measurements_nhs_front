import { useEffect, useState } from "react";
import { authFetch } from "../services/api";

export default function MetersPage() {

    const [serialNumber, setSerialNumber] = useState("");
    const [maxVolume, setMaxVolume] = useState("");
    const [actualVolume, setActualVolume] = useState("");

    const [meters, setMeters] = useState([]);

    useEffect(() => {
        loadMeters();
    }, []);

    async function loadMeters() {

        const response = await authFetch("/meters");

        const data = await response.json();

        setMeters(data.content || []);
    }

    async function handleSubmit(event) {

        event.preventDefault();

        await authFetch("/meters", {
            method: "POST",
            body: JSON.stringify({
                serialNumber,
                maxVolume: Number(maxVolume),
                actualVolume: Number(actualVolume)
            })
        });

        setSerialNumber("");
        setMaxVolume("");
        setActualVolume("");

        loadMeters();
    }

    return (
        <div style={styles.container}>

            <h1>Medidores</h1>

            <form onSubmit={handleSubmit} style={styles.form}>

                <input
                    placeholder="Serial"
                    value={serialNumber}
                    onChange={(e) => setSerialNumber(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="number"
                    placeholder="Volume máximo"
                    value={maxVolume}
                    onChange={(e) => setMaxVolume(e.target.value)}
                    style={styles.input}
                />

                <input
                    type="number"
                    placeholder="Volume atual"
                    value={actualVolume}
                    onChange={(e) => setActualVolume(e.target.value)}
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
                        <th>Serial</th>
                        <th>Máximo</th>
                        <th>Atual</th>
                    </tr>

                </thead>

                <tbody>

                    {
                        meters.map(meter => (

                            <tr key={meter.id}>

                                <td>{meter.id}</td>
                                <td>{meter.serialNumber}</td>
                                <td>{meter.maxVolume}</td>
                                <td>{meter.actualVolume}</td>

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