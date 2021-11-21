import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NewAccount from './components/auth/NewAccount';
import Projects from './components/projects/Projects';

import ProjectState from './context/projects/projectState';
import TaskState from './context/tasks/taskState';
import AlertState from './context/alerts/alertState';
import AuthState from './context/auth/authState';
import tokenAuth from './config/tokenAuth';
import PrivateRoute from './components/routes/PrivateRoute';

// Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

function App() {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/new-account" component={NewAccount} />
                <PrivateRoute exact path="/projects" component={Projects} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
      </TaskState>
    </ProjectState>
  );
}

export default App;
