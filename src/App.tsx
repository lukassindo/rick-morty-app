
import logo from './img/logo.png';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import All from './All';
import Favorites from './Favorites';
import { ThemeContext, favorites } from './contexts/contexts';
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <div className="App">
      <Router>
      <header className="App-header">

        
        
            <Link to="/">
              <img src={logo} className="App-logo" alt="Link to main page of app" />
            </Link>
            <Link to="/favorites" >
                My Favorites
            </Link>
        
      </header>
      <main>
      
        <Switch>
          <Route exact path="/">
            <QueryClientProvider client={queryClient}>
              <All/>
            </QueryClientProvider>
          </Route>
          <Route path="/favorites">
            <Favorites/>  
          </Route>
        </Switch>
        
      </main>
      </Router>
    </div>
  );
}

export default App;
