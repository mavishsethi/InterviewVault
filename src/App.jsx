
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Navbar from "./components/Navbar";
import NavbarInternal from "./components/NavbarInternal";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AddExperience from "./components/AddExperience";
import Explore from "./components/Explore";
import ExperienceDetail from "./components/ExperienceDetail";
import Login from "./components/Login";
import Signup from "./components/Signup";
import OAuthRedirect from "./components/OAuthRedirect";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const location = useLocation();
  const path = location.pathname;

  const noLayoutPages = ["/login", "/signup"];
  const internalPages = ["/add", "/explore", "/experience/:id"];

  const isInternal = internalPages.some((pattern) =>
    matchPath(pattern, path)
  );
  const isNoLayout = noLayoutPages.includes(path);

  return (
    <>
      {!isNoLayout && (isInternal ? <NavbarInternal /> : <Navbar />)}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<PrivateRoute><Explore /></PrivateRoute>} />
        <Route path="/add" element={<PrivateRoute><AddExperience /></PrivateRoute>} />
        <Route path="/experience/:id" element={<ExperienceDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/oauth" element={<OAuthRedirect />} />
      </Routes>

      {!isNoLayout && <Footer />}
    </>
  );
}

export default App;
