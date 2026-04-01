import {Routes,Navigate,Route} from "react-router"
import {useAuthStore} from "../src/store/useAuthStore.js"
import { useEffect } from "react";
// import Dashboard from "../src/pages/Dashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
function App() {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });
    if (isCheckingAuth) return null;

return (
    <Routes>
     <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage/>} />
    <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
  );
}


export default App
