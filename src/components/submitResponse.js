import React from 'react';
import axios from 'axios';
import PNotify from 'pnotify/dist/es/PNotify';
import TextBox from './form-elements/textbox'

import TextArea from './form-elements/textarea'
import { Label, Form, Input} from 'reactstrap';
class SubmitResponse extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      name: "",
      desc: "",
      fields: ["",""],
    }
    this.checks = this.checks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount(){
    let formId = this.props.location['pathname'].split(':')[1];
    axios.post('/getFields',{"data":formId})
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
          let f = this.state.fields;
          let name = this.state.name;
          let desc = this.state.desc;
          name = res['data'][0][0];
          this.setState({name:name});
          desc = res['data'][1][0];
          this.setState({desc:desc});
          
          f = res['data'].slice(2);
          let k = [];
          Object.keys(f).map((key)=> {
            k.push([f[key][0],f[key][1],""])
          })
          this.setState({fields: k});
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        console.log("fin");
      });
  }
  checks(key ,key1, e){
      e.preventDefault();
      // console.log(val+" "+key+" "+key1);
      let change1 = this.state.fields;
      // console.log(change1)
      // console.log(typeof(change1[key][2]))
      if (change1[key][2] === "")
      {
        change1[key][2] = [];
        change1[key][2][key1]=true;
      }
      else
      change1[key][2][key1]= !change1[key][2][key1];
      this.setState({fields:change1});
  }
  handleChange(label, value) {
    const f = this.state.fields;
    Object.keys(f).map((key) => {
      if(f[key][0] === label)
      {
        let a = f[key];
        a[2]=value;
        this.setState({a});
        console.log(f[key][2]); 
      }
    })
  }
  handleSubmit(){
    let ans = []
    let formId = this.props.location['pathname'].split(':')[1];
    Object.keys(this.state.fields).map((key) => {
      ans.push(this.state.fields[key][2])
    });
    const data = {"formID":formId,"fields":this.state.fields};
    console.log(data);
    axios.post('/submitResponse',data)
      .then(function (response) {
        // handle success
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
        {PNotify.alert({
          type:"success",
          title: "Success",
          text:  res['mess'],
        });
      }
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(() => {
        // always executed
        console.log("fin");
      });
  }


  render(){
    let checks
    return (<div style={{"margin":"4vh",textAlign: "center"}} class="mainDiv">
              <h1>{this.state.name}</h1>     
              <h3>{this.state.desc}</h3>
              {  
                Object.keys(this.state.fields).map((key) => {
                  
                  if(this.state.fields[key][1] === "TextBox")
                  return <div>
                    <TextBox handleChange={this.handleChange} label={this.state.fields[key][0]} />
                  </div>
                  else if(this.state.fields[key][1] === "TextArea")
                  return <div>
                    <TextArea handleChange={this.handleChange} label={this.state.fields[key][0]} />
                  </div>
                  else if(this.state.fields[key][1] === "CheckBox")
                  {
                    checks = JSON.parse(this.state.fields[key][0])
                    console.log(checks)
                    return <div>
                    <Label><h3>{checks[0]}</h3></Label><br></br>
                    {
                     Object.keys(checks[1]).map((key1) => {
                       return <div>
                       <input type="checkbox" onInput={this.checks.bind(this, key, key1)}/>
                       <Label>{checks[1][key1]}</Label>
                      </div>
                     }) 
                      
                    }
                    </div>
                  }
                  return null
              })
              }
              <Input onClick={this.handleSubmit} type="submit" value="Save Response" /> 
            </div>
          )
  }
    
}
export default SubmitResponse