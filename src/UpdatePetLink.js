import React, { Component } from 'react';

import './App.css';

class UpdatePetLink extends Component {

  constructor(props) {
    super(props);
    //this.state = {};
    this.state        = {updatePetLink:this.props.updatePetLink};

    this.handleClick = this.handleClick.bind(this);
  }
  componentWillReceiveProps(nextProps){
        if(nextProps.updatePetLink){
            this.setState({petName:nextProps.petName});
        }
        

  }
  handleClick(event) {
    this.props.onUpdateClick();
  }
  render() {
    return (
    	<a className="UpdatePetLink" href={this.state.updatePetLink}>Update</a>
    );
  }
}

export default UpdatePetLink;