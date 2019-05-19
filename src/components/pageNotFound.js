import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { Container, Row } from 'reactstrap';
import '../css/style.css'
class PageNotFound extends React.Component {
    constructor(props) {
    super(props);
    this.changeRoute = this.changeRoute.bind(this);
  }
  changeRoute = (path) => {
    this.props.history.push(path);
  }
  
    render() {
        return (<div className="centered">
          <div ><Card style={{padding: "2vh",textAlign:"center"}}>
            <h1> Sorry!<br></br>The page you requested could not be found</h1>
            </Card></div></div>
            )

    }
}
export default PageNotFound
