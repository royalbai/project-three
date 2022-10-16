import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import Account from './Components/Account';
import { Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute';


function App() {

  return (
    <div className="App wrapper">
      <h1>Fitness Planner</h1>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default App;
