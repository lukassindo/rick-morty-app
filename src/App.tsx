import React,{ useState } from 'react';
import logo from './img/logo.png';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import AllCharacters from './All';
import Favorites from './Favorites';
import Search from './Search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";

library.add(faStar);

const App = ():JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const [clear, setClear] = useState<boolean>(false)
  
  const getData = (searchInfo:string) => {
    setSearch(searchInfo)
  }

  const clearData = (search: string) => {
    setClear(!clear);
    setSearch(search);
  }

  return (
    <div className="App font-primary">
      <Router>
        <header className="App-header flex flex-col md:flex-row justify-between items-center container mx-auto px-4 py-10">
          <Link to="/" onClick={()=> clearData('')} className="mb-2">
            <img src={logo}  className="App-logo" alt="Link to main page of app" />
          </Link>
          <Search getData={getData}/>
          <Link to="/favorites" className="text-sm favorites mb-2" onClick={()=> setSearch('')} >
            <FontAwesomeIcon icon="star"/>
            My Favorites 
          </Link>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              <AllCharacters search ={search} clear={clear}/>
            </Route>
            <Route path="/favorites">
              <Favorites/>  
            </Route>
          </Switch>
          {search && <Redirect to="/" />}
        </main>
      </Router>
    </div>
  );
}

export default App;
