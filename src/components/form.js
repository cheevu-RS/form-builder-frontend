import React from "react"
import TextBox from './textbox'
import CheckBox from './checkbox'
import TextArea from './textarea'
import { Form, Input} from 'reactstrap';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
class Form1 extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      fields : [
          ["Name of Form","TextBox",""],
          ["Description","TextArea",""],
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

  }
    addButton(type){
        this.setState(prevState => ({ fields: [...prevState.fields, [this.state.newLabel,type]]}))
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
    deleteBtn(label){
        
    }
    handleSubmit(event) {
        // console.log(this.state.fields);
        event.preventDefault();
        Object.keys(this.state.fields).map((key) => {
          console.log(this.state.fields[key]);
        });
      }
    handleChange(label, value) {
      // console.log(this.state.fields);
      const f = this.state.fields;
      Object.keys(f).map((key) => {
        if(f[key][0] === label)
        {
          let a = f[key];
          a[2]=value;
          this.setState({a});
          // console.log(f[key][2]);
          // console.log(this.state.fields)
        }
      })
    }
    render() {
        return (
        <Form>
            {   
                Object.keys(this.state.fields).map((key) => {
                        if(this.state.fields[key][1] === "TextBox" && this.state.fields[key][0]!=="")
                        return <TextBox handleChange={this.handleChange} label={this.state.fields[key][0]} />
                        else if(this.state.fields[key][1] === "TextArea" && this.state.fields[key][0]!=="")
                        return <TextArea handleChange={this.handleChange} label={this.state.fields[key][0]} />
                        else if(this.state.fields[key][1] === "CheckBox" && this.state.fields[key][0]!=="")
                        return <CheckBox handleChange={this.handleChange} label={this.state.fields[key][0]} />
                        return null
            })
            }
            {/* <input type="button" value="add more" onClick={this.addButton.bind(this)}></input> */}
            <Input type="text" placeholder="newLabel" onChange={this.newLabelChange.bind(this)} value={this.state.newLabel} />
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                Add another input
                </DropdownToggle>
                <DropdownMenu>
                <DropdownItem onClick={this.addButton.bind(this,"TextBox")}>Text Box</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.addButton.bind(this,"CheckBox")}>CheckBox</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown><br></br>
            <Input onClick={this.handleSubmit} type="submit" value="Submit" /> 
        </Form>
        )
    }
}
export default Form1