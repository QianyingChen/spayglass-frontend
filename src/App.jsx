import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Error } from './pages/Error';
// import { AppNav } from './components/AppNav';

export default function App() {
  return (
      <BrowserRouter>
          {/* <AppNav /> */}
          <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/" element={< />} /> */}
              <Route path="*" element={<Error />} />
          </Routes>
          
      </BrowserRouter>
  )
}

