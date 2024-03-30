import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import router from './Route';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import ScrollToTop from './ScrollToTop';
import './App.css'

function App() {
  return (
    // <Router>
    <div className='app'>

      <Navbar />
      <ScrollToTop />
      <Routes>
        {router.routes.map((route, index) => (
          <Route key={index + 'Router'} path={route.path} element={<div className="content">
            {route.element}
          </div>
          } />
        ))}
      </Routes>
      <Footer />
      {/* <ChatBuuble /> */}
    </div>
    // </Router>
  );
}
export default App;