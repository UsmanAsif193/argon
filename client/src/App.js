import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Page404 from './pages/Page404';
import ResetPage from './pages/ResetPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' exact element={<HomePage />} />
        <Route path='/reset/:token' exact element={<ResetPage />} />
        <Route path='/forgot-password' exact element={<ForgotPasswordPage />} />
        <Route path='/login' exact element={<LoginPage />} />
        <Route path='/sign-up' exact element={<SignUpPage />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
