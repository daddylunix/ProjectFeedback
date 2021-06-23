import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
    Login,
    Register,
    Protected
} from './pages'

const App = () => {
    return (
        <Router>
            <div className="app">
                <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/protected" component={Protected}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
