import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Cart from './pages/cart.jsx';
import ProtectedRoutes from './Components/ProtectedRoutes';
import Signup from './pages/signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { UserProvider } from './Context/UserContext.jsx';
import Profile from './pages/Profile.jsx';
import Explore from './pages/explore.jsx';
import CustomCursor from './Components/CustomCursor.jsx';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

if (process.env.NODE_ENV === 'production') disableReactDevTools()

function App() {
  return (
      <BrowserRouter>
        <UserProvider>
          <Routes>
            {/* Public Routes */}
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />

            {/* Protected Routes */}
            <Route path='/' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
            <Route path='/profile' element={<ProtectedRoutes><Profile /></ProtectedRoutes>} />
            <Route path='/explore' element={<ProtectedRoutes><Explore /></ProtectedRoutes>} />
            <Route path='/cart' element={<ProtectedRoutes><Cart /></ProtectedRoutes>} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
  );
}

export default App;