import React from 'react';
import axios from 'axios';
import PNotify from 'pnotify/dist/es/PNotify';
import { Button } from 'reactstrap';
class ExploreForms extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
     forms: [],
    };
    this.changeRoute = this.changeRoute.bind(this);
  }
  componentDidMount(){
    axios.get('/getForms')
      .then((response) => {
        console.log(response);
        let res = JSON.parse(response['data']);
        if(res['code'] === 0)
        {
          PNotify.alert({
          type:"error",
          title: "Error",
          text:  res['mess'],
        });
        }
        else if(res['code'] === 1)
        {
            let f = this.state.forms;
            // console.log(f);
            // console.log("hii");
            // console.log(res['data']);
            f = res['data'];
            // console.log(f);
            this.setState({forms: f});
            // console.log(this.state.forms)
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        console.log("fin");
      });
  }
  changeRoute = (path) => {
    this.props.history.push(path);
  }
  render()
  {
      return <div style={{"margin":"4vh",textAlign: "center"}} class="mainDiv">
          {
          Object.keys(this.state.forms).map((key) => {
              console.log(this.state.forms)
            return <div>
                Form {key} - {this.state.forms[key]} 
                <Button style={{"margin":"4vh"}} onClick={this.changeRoute.bind(this,'/submitResponse/:'+this.state.forms[key])} >submit</Button>
                <Button onClick={this.changeRoute.bind(this,'/viewResponses/:'+this.state.forms[key])} >view responses</Button>
            </div>
          })
          }
      </div>
  }
    
}
export default ExploreForms