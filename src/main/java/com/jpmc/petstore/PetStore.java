package com.jpmc.petstore;

import org.springframework.hateoas.ResourceSupport;

public class PetStore extends ResourceSupport {
    private int petStoreId;
    private String petStoreName;
    
	public int getPetStoreId() {
		return petStoreId;
	}
	public void setPetStoreId(int petStoreId) {
		this.petStoreId = petStoreId;
	}
	public String getPetStoreName() {
		return petStoreName;
	}
	public void setPetStoreName(String petStoreName) {
		this.petStoreName = petStoreName;
	}
	
    
}
