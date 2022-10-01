import './App.css';
import Home from './Home/Home';
import Login from './Login/Login';
import Signup from './Signup/Signup';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
