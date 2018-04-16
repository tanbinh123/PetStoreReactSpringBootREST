import React, { Component } from 'react';

import './App.css';

import PetDisplay from './PetDisplay';
import PetAddForm from './PetAddForm';

class PetsDisplayContainer extends Component {

 constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      currPetName:'Enter pet name',
      currPetType:'DOG',
      currPetId:'0'
    };

    this.petAdditionHandler     = this.petAdditionHandler.bind(this);
    this.petUpdatedHander       = this.petUpdatedHander.bind(this);
    this.petFindHandler         = this.petFindHandler.bind(this);
    this.getPetsDataFromServer  = this.getPetsDataFromServer.bind(this);
    this.getUpdateUri           = this.getUpdateUri.bind(this);
    this.getDeleteUri           = this.getDeleteUri.bind(this);
    this.petSelectionHandler    = this.petSelectionHandler.bind(this);
  }

  getUpdateUri(pet) {

    if (pet.links && pet.links.length>0) {
         var linkObj = pet.links.find ( function(e) {return e.rel=='updateUri'});
         if (linkObj)
             return linkObj.href;
    }
    return null;

  }

  getUpdateUriUsingPetId(petId) {

    if (this.state.items && this.state.items.length>0) {
         var petObj = this.state.items.find ( function(e) {return e.petId==petId});
         if (petObj)
             return this.getUpdateUri(petObj);
    }
    return null;

  }

  getDeleteUri(pet) {
    if (pet.links && pet.links.length>0) {
         var linkObj = pet.links.find ( function(e) {return e.rel=='deleteUri'});
         if (linkObj)
             return linkObj.href;
    }
    return null;

  }
  
  getPetsDataFromServer() {
      fetch("/petstores/1/pets")
      .then(res => res.json())
      .then(
        (result) => {
          console.log("getPetsDataFromServer: "+result);
          this.setState({
            isLoaded: true,
            items: result
          });
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

  petAdditionHandler() {
    console.log ("petAdditionHandler called");
    this.getPetsDataFromServer();
  }

  petUpdatedHander(petId,updatedPetName,updatePetType) {
    console.log("PetsDisplayContainer:petUpdatedHander:");
    var petUpdateUri = this.getUpdateUriUsingPetId(petId);
    fetch (petUpdateUri,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            petName: updatedPetName,
            petType: updatePetType,
          })
        }     
    )
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          
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
       
    this.getPetsDataFromServer();
  }

  petFindHandler(petName) {
    console.log("PetsDisplayContainer:petFindHandler:");
      fetch("/petstores/1/pets?petName="+petName)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result
          });
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


  petSelectionHandler(petId, petName,petType) {
    console.log("petSelectionHandler called: petName="+petName+", petType="+petType+", petId="+petId);
              this.setState({
            currPetName: petName,
            currPetType: petType,
            currPetId:petId
          });

  }

  componentDidMount() {
    this.getPetsDataFromServer();
  }  

  render() {

    const petsRows = this.state.items.map((pet) =>
      <PetDisplay petId={pet.petId} petName={pet.petName} petType={pet.petType} petUpdUri={this.getUpdateUri(pet)} onPetSelected={this.petSelectionHandler}/> 
    );

    return (
      <div className="PetsDisplayContainer">
      <PetAddForm onPetAdded={this.petAdditionHandler} onPetUpdated={this.petUpdatedHander} onPetFind={this.petFindHandler} petId={this.state.currPetId} petName={this.state.currPetName} petType={this.state.currPetType}></PetAddForm>
      <br/>
      <table  border="1" align="center">
      <tr><th>Pet Id</th><th>Pet Name</th><th>Pet Type</th></tr>
      {petsRows}
      </table>
      </div>
      
    );
  }

} 


export default PetsDisplayContainer;
