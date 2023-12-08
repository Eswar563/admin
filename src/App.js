import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Login from '../src/components/Login/login.jsx'
import Home from '../src/components/Home/home.jsx'
import ProtectedRoute from '../src/components/ProtectedRoute/ProtectedRoute.jsx'
import NotFound from '../src/components/NotFound/NotFound.jsx'
import './App.css'

const App = () => (

  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="not-found" />
    </Switch>
  </BrowserRouter>
)

export default App