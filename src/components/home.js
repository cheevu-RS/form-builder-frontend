import React from 'react';
import { Card, Button } from 'reactstrap';
import '../css/style.css'
class Home extends React.Component {
    constructor(props) {
    super(props);
    this.changeRoute = this.changeRoute.bind(this);
  }
  changeRoute = (path) => {
    this.props.history.push(path);
  }
  
    render() {
        return (<div className="centered">
          <div ><Card style={{padding: "2vh"}}>
            <h1> Welcome to <br></br>Form builder</h1>
            <Card><Button onClick={this.changeRoute.bind(this,'/create')} >create form</Button></Card>
            <Card><Button onClick={this.changeRoute.bind(this,'/explore')}> view forms</Button></Card>
            </Card></div></div>
            )

    }
}
export default Home
