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
import ScrollToTop from './components/ScrollToTop';
import DetailProduct from './pages/DetailProduct';

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Router>
          {/* thanh menu */}
          <Navbar />
          {/* thanh cuộn */}
          <ScrollToTop />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/creativity" element={<Creativity />} />
              <Route path="/quality" element={<Quality />} />

              <Route path="/detail/:id" element={<DetailProduct />} />

              {/* Login and Register */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Admin */}
              <Route path="/admin" element={<AdminProduct />} />

              {/* xử  lí khi người dùng nhập tào lao đá vô trang này  lỗi 404 */}
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
