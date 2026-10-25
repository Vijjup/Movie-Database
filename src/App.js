import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Navbar from './components/Navbar'
import Popular from './components/Popular'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import SingleMoviePage from './components/SingleMoviePage'
import SearchedMovies from './components/SearchedMovies'
import './App.css'

// write your code here
const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Popular} />
      <Route exact path="/top-rated" component={TopRated} />
      <Route exact path="/upcoming" component={Upcoming} />
      <Route exact path="/movie/:id" component={SingleMoviePage} />
      <Route exact path="/search" component={SearchedMovies} />
      <Redirect to="/popular" />
    </Switch>
  </BrowserRouter>
)

export default App
