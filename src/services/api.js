const API_URL = "http://localhost:8080";

export async function loginRequest(email, password) {

    const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if (!response.ok) {
        throw new Error("Invalid credentials");
    }

    return response.text();
}

export function getToken() {
    return localStorage.getItem("token");
}

export function saveToken(token) {
    localStorage.setItem("token", token);
}

export function removeToken() {
    localStorage.removeItem("token");
}

export async function authFetch(endpoint, options = {}) {

    const token = getToken();

    const response = await fetch(`${API_URL}${endpoint}`, {

        ...options,

        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        }
    });

    if (!response.ok) {
        throw new Error("Request failed");
    }

    return response;
}