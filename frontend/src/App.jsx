import {Routes,Navigate,Route} from "react-router-dom"
import {useAuthStore} from "../src/store/useAuthStore.js"
import { useEffect } from "react";
// import Dashboard from "../src/pages/Dashboard.jsx";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import CreateQuizModal from "./pages/CreateQuizPage.jsx";
import ManualCreatePage from "./pages/ManualQuizPage.jsx";
import AICreatePage from "./pages/AIQuizPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import HistoryPage from "./pages/HistroyPage.jsx";
function App() {
  const {authUser,checkAuth,isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });
    if (isCheckingAuth) return null;

return (
    <Routes>
    <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <HomePage />} />
    <Route path="/signup" element={authUser ? <Navigate to="/dashboard" /> : <SignupPage />} />
    <Route path="/login" element={authUser ? <Navigate to="/dashboard" /> : <LoginPage />} />
    <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/" />}/>
    <Route path="/createquiz" element={authUser ? <CreateQuizModal /> : <Navigate to="/" />} />
    <Route path="/quiz/create/manual" element={authUser ? <ManualCreatePage /> : <Navigate to="/login" />} />
    <Route path="/quiz/create/ai" element={authUser ? <AICreatePage /> : <Navigate to="/login" />} />
    <Route path="/quiz/:id" element={<QuizPage/>} />
    <Route path="/quiz/:id/result" element={<ResultPage/>} />
    <Route path="/history" element={authUser ? <HistoryPage /> : <Navigate to="/" />} />
    </Routes>
  );
}
  

export default App
