import './App.css';
import React from 'react';
import Todo from './components/todo/Todo';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/register"  element={<Register/>}></Route>
        <Route exact path='/todo' element={< Todo />}></Route>
        <Route exact path='/login' element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;