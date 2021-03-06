import React from "react"
import { Row, Label, Input, Button } from 'reactstrap';
class CheckBox extends React.Component {
    constructor() {
        super();
        this.state = {
            checkboxes: [["",false]],
        }
        this.addOption = this.addOption.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleLabel = this.handleLabel.bind(this);
    }

    handleCheck(label, key, e) {
        e.preventDefault();
        const val = e.target.value;
        console.log(val+" "+key);
        let change1 = this.state.checkboxes;
        change1[key][1]= !change1[key][1];
        this.setState(change1);
        // console.log(this.state.checkboxes[key]);
        this.props.handleChange(label, this.state.checkboxes );
    }

    handleLabel(label, key, e) {
        e.preventDefault();
        const val = e.target.value;
        // console.log(val+" "+key);
        let change = this.state.checkboxes;
        change[key][0]= val;
        this.setState(change);
        // console.log(this.state.checkboxes[key]);
        this.props.handleChange(label, this.state.checkboxes );
    }
    addOption() {
        this.setState(prevState => ({ checkboxes: [...prevState.checkboxes, ["",false] ]}))
    }
    deleteBtn(key){
        let f = this.state.checkboxes
        f.splice(key,1);
        console.log(f);
        this.setState(f);
    }
    render() {
        return (
            <div>
                <Label style={{fontWeight:"bold"}}>{this.props.label}</Label><br/>
              {
              Object.keys(this.state.checkboxes).map((key, value) => {
                return <Row style={{width:"80%",margin:"auto"}}>
                <Input type="checkbox" checked={this.state.checkboxes[key][1]} onInput={this.handleCheck.bind(this, this.props.label, key)} />
                <Input  style={{width : "75%", margin: "auto"}} key={key} type="text" placeholder="Option" onChange={this.handleLabel.bind(this, this.props.label, key)} />
                <Button close onClick={this.deleteBtn.bind(this,key)} />
                </Row>
              })
              }
            <Button onClick={this.addOption} >Add option</Button>
          </div>
        )
    }
}
export default CheckBox