import "./App.css"
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import ProfilePage from "./pages/Profile/ProfilePage";
import {Routes,Route, Navigate} from 'react-router-dom';
import { useSelector } from "react-redux";
function App() {
  const user=useSelector((state)=>state.AuthReducer.authData);
  return (
    <div className="App">
        <div className="blur" style={{top:'-10%', right:'0%'}}></div>
        <dir className="blur" style={{top:'36%',left:'-15%'}}></dir>
        <Routes>
          <Route 
            path="/" 
            element={user?<Navigate to="home"/>:<Navigate to="auth"/>} 
          />
          <Route 
            path="/home" 
            element={user?<Home/>:<Navigate to="../auth"/>} 
          />
          <Route 
            path="/auth" 
            element={user?<Navigate to="../home"/>:<Auth/>} 
          />
          <Route 
            path="/profile/:id" 
            element={user?<ProfilePage/>:<Navigate to="../auth"/>} 
          />
        </Routes> 
        {/* <Home/> */}
        {/* <ProfilePage/> */}
        {/* <Auth/> */}
    </div>
  );
}

export default App;
