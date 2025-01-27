import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './pages/Home';
import Discover from './pages/Discover';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Navbar from "./components/Navbar";
import AdminProduct from './pages/AdminProduct';
import AboutUs from './pages/AboutUs';
import Creativity from './pages/Creativity';
import Quality from './pages/Quality';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {

  return (
    <>
        <div className="flex flex-col min-h-screen">
        <Router>
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/creativity" element={<Creativity />} />
              <Route path="/quality" element={<Quality />} />

              {/* Login and Register */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminProduct />} />

              {/* Add the 404 route at the end to catch all unmatched routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </Router>
      </div>
    </>
  )
}

export default App
