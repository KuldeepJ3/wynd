import { BrowserRouter, Routes, Route } from 'react-router-dom'

import ProtectedRoutes from './Components/ProtectedRoutes'
import Signup from './pages/signup';
import Login from './pages/Login';
import Home from './pages/Home'
import { UserProvider } from './Context/UserContext.jsx';

function App(){
  return(
    <>
      <UserProvider>
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={ <Signup /> }/>
                <Route path='/login' element={ <Login />} />

                <Route path='/home' element={
                  <ProtectedRoutes>
                    <Home />
                  </ProtectedRoutes>
                } />
            </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  )
}

export default App;