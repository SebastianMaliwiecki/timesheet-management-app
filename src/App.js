import './App.css';
import Signup from './components/Signup.jsx';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import { AuthProvider } from './context/AuthContext.jsx';
import RedirectDash from './components/RedirectDash';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Switch>
            <RedirectDash exact path="/" component={Dashboard} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
