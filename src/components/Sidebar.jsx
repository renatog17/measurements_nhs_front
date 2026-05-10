import { Link } from "react-router-dom";

export default function Sidebar() {

    return (
        <aside style={styles.sidebar}>

            <h2 style={styles.title}>
                Medições
            </h2>

            <nav style={styles.nav}>

                <Link style={styles.link} to="/app/readers">
                    Leituristas
                </Link>

                <Link style={styles.link} to="/app/clients">
                    Clientes
                </Link>

                <Link style={styles.link} to="/app/properties">
                    Propriedades
                </Link>

                <Link style={styles.link} to="/app/meters">
                    Medidores
                </Link>

                <Link style={styles.link} to="/app/installations">
                    Instalações
                </Link>

                <Link style={styles.link} to="/app/measurements">
                    Medições
                </Link>

            </nav>

        </aside>
    );
}

const styles = {

    sidebar: {
        width: "260px",
        height: "100vh",
        backgroundColor: "#1e293b",
        color: "#ffffff",
        padding: "24px",
        boxSizing: "border-box",
        position: "fixed",
        left: 0,
        top: 0
    },

    title: {
        marginTop: 0
    },

    nav: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
    },

    link: {
        color: "#ffffff",
        textDecoration: "none",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: "#334155"
    }
};