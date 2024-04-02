import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import router from './Route';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import ScrollToTop from './ScrollToTop';
import './App.css'
import ChatBubble from './QF/Enya';

function App() {
  return (
    // <Router>
    <div>

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
      <ChatBubble/>
    </div>
    // </Router>
  );
}
export default App;