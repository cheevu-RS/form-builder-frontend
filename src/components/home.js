import React from 'react';
class Home extends React.Component {
    constructor(props) {
    super(props);
    this.changeRoute = this.changeRoute.bind(this);
  }
  changeRoute = (path) => {
    this.props.history.push(path);
  }
    render() {
        return (<div>
            Click here to create forms<br />
            <input type="button" value="createForm" onClick={this.changeRoute.bind(this,'/create')} />
            </div>)
    }
}
export default Home