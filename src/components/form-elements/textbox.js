import React from "react"
import { Label, Input} from 'reactstrap';
class TextBox extends React.Component {
    handleChange(label,e) {
        e.preventDefault();
        const val = e.target.value;
        this.props.handleChange(label, val);
      }
    render() {
        return (
            <div>
                <Label>{this.props.label}</Label>
                <Input 
                    type="text"
                    onChange={this.handleChange.bind(this,this.props.label)}
                />
            </div>
        )
    }
}
export default TextBox