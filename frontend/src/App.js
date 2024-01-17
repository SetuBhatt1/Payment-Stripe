import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from './components/Navbar';
// allows our entire app to sit closer to middle screen  i.e wrap entire app
import { Container } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Store from './pages/Store';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import CartProvider from './CartContext';

//localhost:3000 -> HOME
//localhost:3000/success -> SUCCESS

function App() {
  return (
    <CartProvider>
      <Container>
        <NavbarComponent />
        <BrowserRouter>
          <Routes>
            <Route index element={<Store />} />
            <Route path='/success' element={<Success />} />
            <Route path='/cancel' element={<Cancel />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </CartProvider>
  );
}

export default App;
