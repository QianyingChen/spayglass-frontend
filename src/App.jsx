import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Error } from './pages/Error';
import { Home } from "./pages/Home"; 
import { Goals } from './pages/Goals';
import { Navbar } from './components/NavBar';
import { Profile } from './pages/Profile';
// import { Provider } from 'react-redux';
// import store from './store';

const App = () => {
  return (
    // <Provider store={store}>
       <BrowserRouter>
          <Navbar />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/goals" element={<Goals />} />
              <Route path="/userinfo" element={<Profile />} />
              <Route path="*" element={<Error />} />
          </Routes>        
      </BrowserRouter>
      // </Provider>
  )
}

export default App;

