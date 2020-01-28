import React from 'react';
import { Switch, Route } from 'react-router-dom'
//Components
import Header from './components/Header/Header'
import CommentList from './components/CommentList/CommentList'

function App() {

  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route path="/" component={CommentList} />
      </Switch>
    </React.Fragment >
  );
}

export default App
