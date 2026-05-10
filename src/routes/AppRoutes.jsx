import {
    BrowserRouter,
    Navigate,
    Route,
    Routes
} from "react-router-dom";
import ReadersPage from "../pages/ReadersPage";

import LoginPage from "../pages/LoginPage";
import ClientsPage from "../pages/ClientsPage";
import PropertiesPage from "../pages/PropertiesPage";
import MetersPage from "../pages/MetersPage";

import ProtectedRoute from "../auth/ProtectedRoute";

import AppLayout from "../layouts/AppLayout";


function InstallationsPage() {
    return <h1>Instalações</h1>;
}

function MeasurementsPage() {
    return <h1>Medições</h1>;
}

export default function AppRoutes() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/login"
                    element={<LoginPage />}
                />

                <Route
                    path="/app"
                    element={
                        <ProtectedRoute>
                            <AppLayout />
                        </ProtectedRoute>
                    }
                >

                    <Route
                        path="readers"
                        element={<ReadersPage />}
                    />

                    <Route
                        path="clients"
                        element={<ClientsPage />}
                    />

                    <Route
                        path="properties"
                        element={<PropertiesPage />}
                    />

                    <Route
                        path="meters"
                        element={<MetersPage />}
                    />

                    <Route
                        path="installations"
                        element={<InstallationsPage />}
                    />

                    <Route
                        path="measurements"
                        element={<MeasurementsPage />}
                    />

                </Route>

                <Route
                    path="*"
                    element={<Navigate to="/login" />}
                />

            </Routes>

        </BrowserRouter>
    );
}