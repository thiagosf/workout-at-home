import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import {
  Home,
  ExercisesList,
  NotFound,
  WorkoutLayout,
  Onboarding,
  SavedLists
} from './components/Pages'

function App({ store }) {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/onboarding">
            <Onboarding />
          </Route>
          <Route path="/exercises-list">
            <ExercisesList />
          </Route>
          <Route path="/workout">
            <WorkoutLayout />
          </Route>
          <Route path="/saved-lists">
            <SavedLists />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
