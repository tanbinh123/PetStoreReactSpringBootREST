import React, { Component } from 'react';

import './App.css';
import UpdatePetLink from './UpdatePetLink';


class PetDisplay extends Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.handlePetSelection = this.handlePetSelection.bind(this);


  }

  handlePetSelection(event) {
    //console.log ("event below");
    //console.log(event);
    this.props.onPetSelected(this.props.petId, this.props.petName, this.props.petType);
  }
  
  render() {
    return (
    	<tr className="PetDisplay" onClick={this.handlePetSelection} >
      <td>{this.props.petId}</td>
    	<td>{this.props.petName}</td>
    	<td>{this.props.petType}</td>
    	</tr>
    	
    );
  }
}

export default PetDisplay;