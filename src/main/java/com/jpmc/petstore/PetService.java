package com.jpmc.petstore;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.TreeMap;

import org.springframework.stereotype.Service;

@Service
public class PetService {

	//Map(petStoreId->Map(petId->Pet))
	static TreeMap<Integer,TreeMap<Integer,Pet>> petStoresDb = new TreeMap<>();

	public Collection<Pet> getAllPetsForStore(int petStoreId) {
		TreeMap<Integer,Pet> petsDb = petStoresDb.get(petStoreId);
		return petsDb.values();
		
	}
	

	
	public int addPet (int petStoreId, String name, PetType petType) throws Exception {
		
		TreeMap<Integer,Pet> petsDb = petStoresDb.get(petStoreId);
		if (petsDb==null) {
			throw new Exception (String.format("PetStore with id[%s] not found in the database", String.valueOf(petStoreId)));
		}
		Pet pet = petsDb.lastEntry()==null?null:petsDb.lastEntry().getValue();
		int nextId = -1;
		
		if (pet==null)
			nextId=1;
		else
			nextId = pet.getPetId()+1;
		
		
		 pet = new Pet();
		 pet.setPetId(nextId);
		 pet.setPetName(name);
		 pet.setPetType(petType);
		 petsDb.put(nextId, pet);
		 petStoresDb.put(petStoreId, petsDb);
		 return pet.getPetId();
		
		
	}
	
	public void updatePet (int petStoreId, int petId, String petName, PetType petType) throws Exception {
		
		
		TreeMap<Integer,Pet> petsDb = petStoresDb.get(petStoreId);
		if (petsDb==null) {
			throw new Exception (String.format("PetStore with id[%s] not found in the database", String.valueOf(petStoreId)));
		}
		
		Pet pet =petsDb.get(petId);
		if (pet==null) {
			throw new Exception (String.format("Pet with id[%s] not found in the database", String.valueOf(petId)));
		}
		
		Optional<String> opt = Optional.ofNullable(petName);
		if (opt.isPresent()) {
			pet.setPetName(petName);
		}
		Optional<PetType> petTypeOpt = Optional.ofNullable(petType);
		if (opt.isPresent())
			pet.setPetType(petTypeOpt.get());
		
		
	}
	
	
	
	static {
		int i=1;
		//For the demo, simply create one pet store with no pets
		petStoresDb.put(i, new TreeMap<Integer,Pet>());
		
		
	}

}
