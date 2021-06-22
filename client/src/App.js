import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RegisterScreen from './components/screens/RegisterScreen';
import ProtectedScreen from './components/screens/Protected';

const App = () => {
    return (
        <Router>
            <div className="app">
                <Switch>
                    {/* <Route exact path="/login" component={LoginScreen}/> */}
                    <Route exact path="/register" component={RegisterScreen}/>
                    <Route exact path="/protected" component={ProtectedScreen}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
