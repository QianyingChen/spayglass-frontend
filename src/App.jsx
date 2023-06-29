import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { Home } from "./pages/Home"; 
// import { Goals } from './pages/Goals';
import { CreateGoal } from './components/CreateGoal';
import { Navbar } from './components/NavBar';
import { Profile } from './pages/Profile';


const App = () => {
  return (
       <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/goals" element={<Goals />} /> */}
              <Route path="/goals" element={<CreateGoal />} />
              <Route path="/userinfo" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
          </Routes>        
      </BrowserRouter>

  )
}

export default App;

