import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import './App.css';
import Home from './pages/home/Home';
import Terminology from './pages/terminology/Terminology';
import MuscleGroups from './pages/muscle-groups/MuscleGroups';
import NotFound from './pages/404/404';

const App: React.FC = () => {
    return (

        <Router>
            <h1>W2W Fitness</h1>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/terminology">Terminology</Link>
                        </li>
                        <li>
                            <Link to="/muscle-groups">Muscle Groups</Link>
                        </li>
                    </ul>
                </nav>

                <Switch>
                    <Route path="/terminology">
                        <Terminology />
                    </Route>
                    <Route path="/muscle-groups">
                        <MuscleGroups />
                    </Route>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route>
                        <NotFound />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
