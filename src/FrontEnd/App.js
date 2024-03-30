import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import router from './Route';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import ScrollToTop from './ScrollToTop';

function App() {
  return (
    // <Router>
    <div>

      <Navbar />
      <ScrollToTop/>
      <Routes>
        {router.routes.map((route, index) => (
          <Route key={index + 'Router'} path={route.path} element={route.element} />
        ))}
      </Routes>
      <Footer />
      {/* <ChatBuuble /> */}
      </div>
    // </Router>
  );
}
export default App;