import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Registration from './components/registration';
import Login from './components/login';
import Main from './components/main';
import Profile from './components/profile';

function App() {
  return (
    <div className="App">
      <Header/>
      <div className='wrapper'>
        <div className='container'>
          <Routes>
            <Route path="/" element={<Registration/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/main" element={<Main/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
