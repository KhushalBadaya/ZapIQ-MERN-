import {Routes,Navigate,Route} from "react-router-dom"
import {useAuthStore} from "../src/store/useAuthStore.js"
import { useEffect } from "react";
// import Dashboard from "../src/pages/Dashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
function App() {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });
    if (isCheckingAuth) return null;

return (
    <Routes>
<<<<<<< Updated upstream
     <Route path="/" element={<HomePage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/login" element={<LoginPage/>} />
=======
     <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <HomePage />} />
    <Route path="/signup" element={authUser ? <Navigate to="/dashboard" /> : <SignupPage />} />
    <Route path="/login" element={authUser ? <Navigate to="/dashboard" /> : <LoginPage />} />
    <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/" />}/>
    <Route path="/createquiz" element={<CreateQuizModal/>} />
    <Route path="/createquiz/manual" element={<ManualCreatePage/>} />
    <Route path="/createquiz/ai" element={<AICreatePage/>} />
    <Route path="/playquiz" element={<PlayQuizPage/>} />
    <Route path="/result" element={<ResultPage/>} />
>>>>>>> Stashed changes
    </Routes>
  );
}
  

export default App
