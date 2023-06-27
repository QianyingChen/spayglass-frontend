import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error } from './pages/Error';
import { Home } from "./pages/Home"; 
import { Goals } from './pages/Goals';
import { Navbar } from './components/NavBar';
import { Profile } from './pages/Profile';


const App = () => {
  return (
       <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/userinfo" element={<Profile />} />
              <Route path="*" element={<Error />} />
          </Routes>        
      </BrowserRouter>

  )
}

export default App;

