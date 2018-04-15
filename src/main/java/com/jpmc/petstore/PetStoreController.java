package com.jpmc.petstore;

import java.util.Collection;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Link;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/petstores")
public class PetStoreController {
	
    @Autowired
    private PetStoreService petStoreService;
    @Autowired
    private PetService petService;    
 
    @RequestMapping(value = "/{petStoreId}", method = RequestMethod.GET)
    public PetStore getPetStoreById(@PathVariable String petStoreId) {
        return petStoreService.getPetStore(Integer.valueOf(petStoreId));
    }
    
    @RequestMapping(value = "/{petStoreId}/pets", method = RequestMethod.GET)
    public Collection<Pet> getPetsForStore(@PathVariable String petStoreId, @RequestParam Optional<String> petName) {
    	System.out.println("getPetsForStore called");
        //return petService.getAllPetsForStore(petStoreId);
    	Collection<Pet> pets = petService.getAllPetsForStore(Integer.valueOf(petStoreId));
    	if (petName.isPresent()) {
    		pets = pets.stream().filter(p->p.getPetName().equals(petName.get())).collect(Collectors.toList());
    	}
    	
    	for (Pet pet:pets) {
    		
    		StringBuilder b = new StringBuilder("/petstores/");
    		b.append(petStoreId);
    		b.append("/pets/");
    		b.append(pet.getPetId());
    		Link updateLink = new Link(b.toString(),"updateUri");
    		Link deleteLink = new Link(b.toString(),"deleteUri");
    		pet.add(updateLink,deleteLink);
    	}
    	return pets;
    }
    
    @RequestMapping(value = "/{petStoreId}/pets", method = RequestMethod.POST)
    public ResponseEntity<?> createPet(@PathVariable String petStoreId, @RequestBody Pet pet) {
    	
        //return petService.getAllPetsForStore(petStoreId);
    	System.out.println("createPet called");

    	try {
    		petService.addPet(Integer.valueOf(petStoreId), pet.getPetName(), pet.getPetType());
    			
    	} catch (Exception err) {
    		err.printStackTrace();
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    	}
    	return ResponseEntity.ok().build();
    	
    }
    
    @RequestMapping(value = "/{petStoreId}/pets/{petId}", method = RequestMethod.POST)
    public ResponseEntity<?> updatePet(@PathVariable String petStoreId,@PathVariable String petId, @RequestBody Pet pet) {
    	
        //return petService.getAllPetsForStore(petStoreId);
    	System.out.println("updatePet called");

    	try {
    		Optional<String> petIdOpt = Optional.ofNullable(petId);
    		if (petIdOpt.isPresent()) //indicates update
    			petService.updatePet(Integer.valueOf(petStoreId), Integer.valueOf(petId), pet.getPetName(), pet.getPetType());
    		else 
    			return ResponseEntity.badRequest().build();
    			
    	} catch (Exception err) {
    		err.printStackTrace();
    		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    	}
    	return ResponseEntity.ok().build();
    	
    }
    /*
    @RequestMapping(method = RequestMethod.GET)
    public List<PetStore> getAllPetStores() {
    	System.out.println("getAllPetStores called");
        List<PetStore> petStores = petStoreService.getAllPetStores();
        for (PetStore petStore : petStores) {
        	
            Link selfLink = ControllerLinkBuilder.linkTo(PetStoreController.class).slash(petStore.getPetStoreId()).withSelfRel();
            petStore.add(selfLink);
             
            if (petService.getAllPetsForStore(petStore.getPetStoreId()).size() > 0) {
                Collection<Pet> methodLinkBuilder = 
                		ControllerLinkBuilder.methodOn(PetStoreController.class).getPetsForStore(String.valueOf(petStore.getPetStoreId()),null);
                Link ordersLink = ControllerLinkBuilder.linkTo(methodLinkBuilder).withRel("allPets");
                petStore.add(ordersLink);
            }
        }
        return petStores;
    }
    */
    

    
    
    
    
}
