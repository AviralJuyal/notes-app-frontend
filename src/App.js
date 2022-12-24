import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignUp from './pages/SignUp';
import Home from './pages/Home';

import NotesState from './context/notes/NotesState';

function App() {

  return (
    <>
    <NotesState>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
    </NotesState>
    </>
  );
}

export default App;
