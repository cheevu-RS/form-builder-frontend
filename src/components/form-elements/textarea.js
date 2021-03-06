import React from "react"
import {Label, Input } from 'reactstrap';
class TextArea extends React.Component {
    handleChange(label,e) {
        e.preventDefault();
        const val = e.target.value;
        this.props.handleChange(label, val);
      }
    render() {
        return (
            <div>
                <Label style={{fontWeight:"bold"}}>{this.props.label}</Label>
                <Input
                    style={{width : "75%", margin: "auto"}}
                    type="textarea"
                    onChange={this.handleChange.bind(this,this.props.label)}
                    />
            </div>
        )
    }
}
export default TextArea