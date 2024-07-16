import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Login';
import Register from './Register';
import Todo from './Todo';
import Navbar from './Navbar';


function App() {
  return (
    
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route  path='/' element={<Login />}/> 
        <Route  path='/login' element={<Login />}/> 
        <Route  path='/register' element={<Register />}/> 
        <Route  path='/todo' element={<Todo />}/> 
      </Routes>
    </BrowserRouter>
      
    
  );
}

export default App;
