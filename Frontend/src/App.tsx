// import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SplashScreen from './components/SplashScreen';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import { UserProvider } from './components/UserContext';

function App() {
  return (
    <Router>
      <div className="App">
        <main>
          <UserProvider>
            <Routes>
              <Route path="/" element={<SplashScreen />} />
              <Route path="/signup" element={<SignUpPage/>} />
              <Route path="/signin" element={<SignInPage />} />
            </Routes>
          </UserProvider>
        </main>
      </div>
    </Router>
  );
}

export default App;
