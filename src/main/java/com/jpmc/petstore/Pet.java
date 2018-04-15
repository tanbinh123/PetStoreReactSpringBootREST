package com.jpmc.petstore;

import org.springframework.hateoas.ResourceSupport;

public class Pet extends ResourceSupport {
    private int  petId;
    private String  petName;
    private PetType petType;
    
	public int getPetId() {
		return petId;
	}
	public void setPetId(int petId) {
		this.petId = petId;
	}
	public String getPetName() {
		return petName;
	}
	public void setPetName(String petName) {
		this.petName = petName;
	}
	public PetType getPetType() {
		return petType;
	}
	public void setPetType(PetType petType) {
		this.petType = petType;
	}
}
