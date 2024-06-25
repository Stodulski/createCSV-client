import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import "./index.css";

import { Home } from "./pages/home";
import { Login } from "./pages/login";

function App() {
    const token = localStorage.getItem("token");
    const expirationTime = localStorage.getItem("expirationTime");

    var isAuthenticated = !!localStorage.getItem("token");

    if (token && expirationTime) {
        const expirationTimeInt = parseInt(expirationTime, 10);
        if (new Date().getTime() < expirationTimeInt) {
            isAuthenticated = true;
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("expirationTime");
            isAuthenticated = false;
        }
    } else {
        isAuthenticated = false;
    }

    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={<Login />}></Route>
                {isAuthenticated ? (
                    <Route exact path="/" element={<Home />}></Route>
                ) : (
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                )}
            </Routes>
        </Router>
    );
}

export default App;
