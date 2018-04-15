package com.jpmc.petstore;



import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class PetStoreService {

	public PetStore getPetStore(int petStoreId) {
		// TODO Auto-generated method stub
		for (PetStore c:petStores) {
			if (c.getPetStoreId()==petStoreId)
				return c;
		}
		return null;
	}

	public List<PetStore> getAllPetStores() {
	
		return petStores;
	}
	
	
	static List<PetStore> petStores = new ArrayList<>();
	static {
		int i = 1;
		while (i<=2) {
			PetStore petStore = new PetStore();
			petStore.setPetStoreId(i);
			
			petStore.setPetStoreName("PetStoreName-"+petStore.getPetStoreId());
			petStores.add(petStore);
			++i;
		}
	}

}
