import {BrowserRouter} from "react-router-dom";
import {useAuth} from "./hooks/auth.hook";
import {useRoutes} from "./routes/routes";
import {AuthContext} from "./context/AuthContext";
import 'materialize-css';
import 'materialize-css/dist/js/materialize';
import './App.css';

function App() {
  const {token, userId, login, logout} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);
  return (
      <AuthContext.Provider value = {{
        token, userId, login, logout, isAuthenticated
      }}>
        <BrowserRouter>
          <div className="container">
            {routes}
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
  );
};

export default App;
