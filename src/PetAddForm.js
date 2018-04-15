import React, { Component } from 'react';

import './App.css';


class PetAddForm extends Component {

  constructor(props) {
    super(props);
    //this.state = {petName:'Enter pet name',petType:'DOG'};
    //this.state = {petName:'Enter pet name'}
    //this.state = {petName:'',petType:'DOG'}
    this.state        = {petId:'0',petName:this.props.petName,petType:this.props.petType};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleFind = this.handleFind.bind(this);
    this.createNewPet = this.createNewPet.bind(this);

  }
  componentWillReceiveProps(nextProps){
        if(nextProps.petName !== this.props.petName){
            this.setState({petName:nextProps.petName});
        }
        if(nextProps.petType !== this.props.petType){
            this.setState({petType:nextProps.petType});
        }

        if(nextProps.petId !== this.props.petId){
            this.setState({petId:nextProps.petId});
        }

  }
  createNewPet() {
    console.log("createNewPet called");
    fetch ("/petstores/1/pets",
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            petName: this.state.petName,
            petType: this.state.petType,
          })
        }     
    )
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({petName:'Enter pet name',petType:'DOG'});
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }

  handleChange(event) {
    const target = event.target;
    console.log("target.type is "+target.type);
    if (target.type == 'text')
      this.setState({petName: event.target.value});

    if (target.type=='select-one')
      this.setState({petType: event.target.value});

    event.preventDefault();
  }

  handleSubmit(event) {
    console.log ("Pet Name Entered Was "+this.state.petName);
    console.log ("Pet Type Selected Was "+this.state.petType);
    console.log (event.target);
    this.createNewPet();
    this.props.onPetAdded();
    

    event.preventDefault();
  }

  handleUpdate(event) {

    if (this.state.petId==0) {
      alert('Please select a pet from table below, reenter new values and click update pet');

    }
    else {
      this.props.onPetUpdated(this.state.petId,this.state.petName,this.state.petType);
    }
    


    
    event.preventDefault();

  }

  handleFind(event) {

    this.props.onPetFind(this.state.petName);
    event.preventDefault();

  }

  render() {

    //const nameOfPet = this.props.petName;
    //const typeOfPet = this.props.petType;
    return (
    	
      <form  className="PetAddForm">
        <label>
          Pet Name:
          <input  value={this.state.petName} type="text" name="petName" onChange={this.handleChange}/>
        </label>
        <label>
          Pet Type:
          <select value={this.state.petType} onChange={this.handleChange} name="petType">
            <option value="DOG">DOG</option>
            <option value="CAT">CAT</option>
    
          </select>
        </label>
        
        <button name="add"    type="button" onClick={this.handleSubmit}>Add Pet</button>
        <button name="update" type="button" onClick={this.handleUpdate}>Update Pet</button>
        <button name="find"   type="button" onClick={this.handleFind}>Find Pet By Name</button>


      </form>
    	
    );
  }
}

export default PetAddForm;