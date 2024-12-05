import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SignIn from './pages/signin'
import LandingPage from './pages/LandingPage'
import Contact from './pages/ContactUs'
import About from './pages/AboutUs'
import Dashboard from './pages/Dashboard'


function App() {
  

  return (
    <div className="min-h-screen flex flex-col">
    <BrowserRouter>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
    </div>
  )
}

export default App
