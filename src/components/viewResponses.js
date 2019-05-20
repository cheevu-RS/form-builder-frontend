import React from 'react';
import axios from 'axios';
import PNotify from 'pnotify/dist/es/PNotify';
import { Label} from 'reactstrap';
class ViewResponses extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        forms: [],
        fields: [],
        responses: [],
        name: "",
        desc: ""
    };
    this.changeRoute = this.changeRoute.bind(this);
    this.splitFUn = this.splitFUn.bind(this);
  }
  componentDidMount(){
    let formId = this.props.location['pathname'].split(':')[1];
    // console.log(formId)
    console.log(typeof({"formId":formId}));
    axios.post('http://aaveg.net:6801/getResponses',{"formId":formId})
      .then((response) => {
        // console.log(response);
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
            let form = this.state.forms;
            let field = this.state.fields;
            let response = this.state.responses;
            // console.log(res['data'])
            
            form  = res['data']['forms']
            console.log(typeof(form));
            this.setState({forms: form});

            field  = res['data']['fields'].slice(2)
            // console.log(field);
            this.setState({fields: field});

            response  = res['data']['responses']
            // console.log(response);
            this.setState({responses: response});

            let name = this.state.name;
            name = form[0]
            this.setState({name: name})

            let desc = this.state.desc;
            desc = form[1]
            this.setState({desc:desc})

            
            form  = res['data']['forms'].slice(2); 
            console.log(form);
            this.setState({forms: form});

            console.log(this.state)
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
  splitFUn(text){
      let text1 = text.replace(/\[/g, '').replace(/\]/g, '').replace(/"/g,"").split(',')
      // console.log(text1);
      return text1;
  }
  render()
  {
      return <div class="mainDiv">
          <h1>{this.state.name}</h1>
          <h3>{this.state.desc}</h3>
          <hr style={{border: "4px solid blue;" }}/>
          <h3>Responses</h3>
          <hr style={{border: "4px solid blue;" }}/>
          {
          Object.keys(this.state.forms.filter(x => x)).map((key) => {
                    if (this.state.fields[key] === 'CheckBox')
                    {   
                      let res = this.splitFUn(this.state.forms[key]);
                      return <div>
                          <h1>{res[0]}</h1><hr style={{border: "4px solid blue;" }}/>
                          { 
                            Object.keys(this.state.responses).map((keys) => {
                              return <div><Label>
                              {
                                Object.keys(this.splitFUn(this.state.responses[keys][key])).map((t)=>{
                                    console.log(this.splitFUn(this.state.responses[keys][key])[t]);
                                    if(this.splitFUn(this.state.responses[keys][key])[t].replace(/ /g,'') === "True")
                                    return <div>{res[parseInt(t)+1]}</div>
                                })
                              }
                              <hr style={{border: "4px solid blue;" }}/>
                              </Label>
                              </div>
                            })
                          }
                          
                        </div>  
                    }
                    else
                    {
                        return <div>
                          <h1>{this.state.forms[key]}</h1><hr style={{border: "4px solid blue;" }}/>
                          {
                            Object.keys(this.state.responses).map((keys) => {
                              return (<div>
                                {this.state.responses[keys][key]}
                                </div>)
                            })
                          } 
                          <hr style={{border: "4px solid blue;" }}/>
                        </div>
                    }
          })
          }
      </div>
  }
    
}
export default ViewResponses
