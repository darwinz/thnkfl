import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Appreciation from "./pages/Appreciation/Appreciation";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import { useGetUser } from "./hooks";
import "./output.css";

function App() {
  // eslint-disable-next-line
  const [{ user, isLoading, isError }, dispatch] = useGetUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/appreciations" element={user ? <Appreciation user={user} dispatch={dispatch} /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/appreciations" /> : <Login dispatch={dispatch}/>} />
        <Route exact path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
