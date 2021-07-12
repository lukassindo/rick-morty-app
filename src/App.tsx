import { useState } from 'react';
import logo from './img/logo.png';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AllCharacters from './All';
import Favorites from './Favorites';
import Search from './Search';


const App = () => {
  // const queryClient = new QueryClient();
  const [search, setSearch] = useState('');
  
  const getData = (searchInfo:string) => {
    setSearch(searchInfo)
  }
  console.log(search);
  return (
    <div className="App">
      <Router>
        <header className="App-header container mx-auto px-4 py-10">
          <Link to="/">
            <img src={logo} className="App-logo" alt="Link to main page of app" />
          </Link>
          <Search getData={getData}/>
          <Link to="/favorites" >
              My Favorites
          </Link>
        </header>
        <main>
      
        <Switch>
          <Route exact path="/">
              <AllCharacters search ={search}/>
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
