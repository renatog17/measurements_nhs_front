import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function AppLayout() {

    return (
        <div style={styles.container}>

            <Sidebar />

            <main style={styles.content}>
                <Outlet />
            </main>

        </div>
    );
}

const styles = {

    container: {
        display: "flex"
    },

    content: {
        marginLeft: "260px",
        padding: "24px",
        width: "100%"
    }
};