import React from 'react'
import {  BrowserRouter,Route,Router,Routes} from 'react-router-dom';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import {   useAppSelector } from './store';



function RouterPage() {
   
        
        const isLogin = useAppSelector(state => state.auth.isAuth)

        return(<BrowserRouter>
          <Routes>
              <Route path='/' element={isLogin ? <Home/> : <Login/>}/>
              <Route path='/login' element={<Login/>}/>
           
          </Routes>
      </BrowserRouter>);
      
      
}

export default RouterPage