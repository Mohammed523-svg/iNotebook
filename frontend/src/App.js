import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/noteState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <NavBar />
          <Alert />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<SignUp/>}/>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
