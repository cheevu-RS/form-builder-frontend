import React from "react"
import TextBox from './form-elements/textbox'
import CheckBox from './form-elements/checkbox'
import TextArea from './form-elements/textarea'
import { Form, Input} from 'reactstrap';
import {Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import PNotify from 'pnotify/dist/es/PNotify';
class CreateForm extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      fields : [["","FORMID","formid"]
          // ["Name of Form","TextBox",""],
          // ["Description","TextArea",""],
        ],
      dropdownOpen: false,
      newLabel: "",
    };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addButton = this.addButton.bind(this);
    this.newLabelChange = this.newLabelChange.bind(this);
    this.deleteBtn = this.deleteBtn.bind(this);
    this.changeFormID = this.changeFormID.bind(this);

  }
    changeFormID(){
      let a = this.state.fields
      a[0][0]= Math.random().toString(36).substring(2, 15);
      this.setState(a);
    }
    addButton(type){
      if(this.state.newLabel === "")
        {
          console.log(this.state.newLa)
          PNotify.alert({
            type:"error",
            title: "Error",
            text: "Cannot create new field with empty label",
          });
        }
      else
        this.setState(prevState => ({ fields: [...prevState.fields, [this.state.newLabel,type,'']]}))
    }
    toggle() {
        this.setState({
          dropdownOpen: !this.state.dropdownOpen
        });
      }
    newLabelChange(e){
        let change = {};
        change["newLabel"] = e.target.value;
        this.setState(change);
    }
    deleteBtn(key){
        let f = this.state.fields
        f.splice(key,1);
        console.log(f);
        this.setState(f);
    }
    handleSubmit(event) {
        // console.log(this.state.fields);
        event.preventDefault();
        console.log(this.state.fields);
        let f=0
        Object.keys(this.state.fields).map((key) => {
          if(this.state.fields[key][2] === "")
          {PNotify.alert({
            type:"error",
            title: "Error",
            text:  "Field '"+this.state.fields[key][0]+"' is empty",
          });
          f=1}
        });
        const axios = require('axios');
        if(f === 0)
        { 
          /*
          convert state to single quotes, so as to use in json object
          */
          // let state = JSON.stringify(this.state.fields)
          // let newState = state.replace(/"/g, "'");
          // console.log(newState);

          // let data = '{"id":"'+Math.random().toString(36).substring(2, 15)+'","data":"'+newState+'"}'
          // console.log(data);
          axios.post('/create_form', this.state.fields)
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
              console.log(response);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
            .finally(() => {
              // always executed
              this.changeFormID();
              console.log("fin");
            });
        }
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
    render() {
        return (<div>
        <div className="jumbotron">
        <h1>Create Form</h1>
        </div>
        <Form>
            {   
                Object.keys(this.state.fields).map((key) => {
                    if(this.state.fields[key][1] === "TextBox")
                    return <div>
                      <TextBox handleChange={this.handleChange} label={this.state.fields[key][0]} />
                      <Input type="button" value="Remove" onClick={this.deleteBtn.bind(this,key)} />
                    </div>
                    else if(this.state.fields[key][1] === "TextArea")
                    return <div>
                     <TextArea handleChange={this.handleChange} label={this.state.fields[key][0]} />
                    <Input type="button"value="Remove" onClick={this.deleteBtn.bind(this,key)} />
                    </div>
                    else if(this.state.fields[key][1] === "CheckBox")
                    return <div>
                    <CheckBox handleChange={this.handleChange} label={this.state.fields[key][0]} />
                    <Input type="button" value="Remove" onClick={this.deleteBtn.bind(this,key)} />
                    </div>
                    return null
            })
            }

            <Input type="text" placeholder="newLabel" onChange={this.newLabelChange.bind(this)}/>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                Add another input
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem onClick={this.addButton.bind(this,"TextBox")}>Text Box</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.addButton.bind(this,"TextArea")}>Text Area</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.addButton.bind(this,"CheckBox")}>CheckBox</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown><br></br>
            <Input onClick={this.handleSubmit} type="submit" value="Save Form" /> 
        </Form>
        </div>
        )
    }
}
export default CreateForm