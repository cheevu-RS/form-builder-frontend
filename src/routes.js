import React  from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
// import SubmitResponse from './components/submitResponse'
// import ViewResponses from './components/viewResponses'
import CreateForm from './components/createForm'
// import ExploreForms from './components/exploreForms'
// import PageNotFound from './components/pageNotFound'
import Home from './components/home'


class Routes extends React.Component{
  render(){
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path={'/submitResponse/:formName'} component={SubmitResponse}/> */}
          {/* <Route path={'/viewResponses/:formName'} component={ViewResponses}/> */}
          <Route exact path={'/create'} component={CreateForm} />
          {/* <Route exact path={'/explore'} component={ExploreForms} /> */}
          <Route exact path={'/'} component={Home} />
          {/* <Route component={PageNotFound} /> */}
        </Switch>
      </BrowserRouter>
    );
  }
};
export default Routes