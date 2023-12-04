/*
Make sure dictionary and list are update properly
Figure out what route names are and how to make the RESTful
upload items to db when finished creating them
*/
console.log("Hello World");

const mongo = require('mongodb').MongoClient
const mongoUrl = 'mongodb://localhost:27017'
const dbName = 'animalGenerator'

mongo.connect(mongoUrl, (err, client) => {
 if (err) {
  console.error(err);
  return;
}
 console.log('Connected successfully to server');
 const db = client.db(dbName);
})

// Dictionary makes element easy to delete
// List makes element easy to find and use

// Grab child id from cards
let cardList = []
const card1 = document.getElementById("PetEl0");
const card2 = document.getElementById("PetEl1");
const card3 = document.getElementById("PetEl2");

cardList.push(card1)
cardList.push(card2)
cardList.push(card3)

let ButtonDictionary = {
  'card1': "Index1",
  'card2': "Index2",
  'card3': "Index3",
}

let AnimalArray = []
let AnimalDict = {}
let nameCount;
nameCount = 0;

function PopulateCard(cardID, newImg, newAlt, newName, speciesType, friendliness, ArrayIndex){
	const child = cardID.children;
	child[0].src = newImg;
	child[0].alt = newAlt;
	console.log(newAlt)
	const stepChild = child[1].children;
	stepChild[0].innerHTML = newName;
	stepChild[1].innerHTML = speciesType;
	stepChild[2].innerHTML = friendliness;
}

function NewAnimalObj (name, url, species, kindness, animalNum){
	this.name = name;
	this.url = url;
	this.species = species;
	this.kindness = kindness;
	this.animalNum = animalNum;
}

function ManageCardInfo(){
		for(var i = 0; i <= 2; i++){
		PopulateCard(
				cardList[i],
				AnimalArray[i].url,
				"This is a picture of the animal named " + AnimalArray[i].name + ". They're of the species " + AnimalArray[i].species + ". This is a " + AnimalArray[i].friendliness + " animal",
				AnimalArray[i].name,
				AnimalArray[i].species,
				AnimalArray[i].friendliness,
				);
	}
}

function StartupCardInfo(){
	for(var i = 0; i <= 2; i++){
		DefaultCardInfo(i);
	}
}


function SumbitNewAnimal(name, url,species,friend){
	const submittedName = name;
	const submittedURL = url;
	const submittedSpecies = species;
	const submittedFriendliness = friend;
	const dictItemName = "Hey_" + submittedName;
	
	AnimalArray.push({id: AnimalArray.length, name : submittedName, url : submittedURL, species: submittedSpecies, friendliness: submittedFriendliness});

	console.log(AnimalDict);
	console.log(AnimalArray[0].url);
	ResetForm();
}

function ResetForm(){
	console.log("Resetting the form")
	document.getElementById("PetForm").reset();
}

function ExportToDB(){
	console.log("Exporting the AnimalArray list")
}

function RemoveAnimal(btnIdentifier, cardNum){
	// Have to remove item from the list... could use simple list and remove, but possibly can run into issues with array pointers
	// If I can get the item name from a dictionary and remove that instead, it would be more fruitful. Easier to control
	
	// Get parent object
	 console.log("We clicked this button");
	const parentObj = btnIdentifier.parentElement;
	const childTitle = parentObj.children;
	
	let nameSearchBool;
	let targetArrayIndex;
	targetArrayIndex = -1;
	nameCount = 0;
	
	for(var i = 0; i < AnimalArray.length;i++){
		if(AnimalArray[i].name === childTitle[0].textContent){
			console.log("The dict array value is " + AnimalArray[i].id);
			targetArrayIndex = AnimalArray[i].id;
			AnimalArray.splice(targetArrayIndex,1);
			console.log(AnimalDict);
			console.log(AnimalArray);
		}
	}
	
	// Assign default card info
	DefaultCardInfo(cardNum);
	
	// Get every array index after the target and -1 from the tracked array index
	for(var e = targetArrayIndex; e < AnimalArray.length ;e++){
		AnimalArray[e].id = parseInt(AnimalArray[e].id) - 1;
		console.log("Array ele val is " + AnimalArray[e].id);
	}
	
	// Populate current index value with new card info
	
}

function CheckAndSubmit(){
	console.log("We clicked on the button");
	const petName = document.getElementById('Pet_Name');
	const profile = document.getElementById('ProfileURL');
	
	const species = document.getElementById('SpeciesFieldSet');
	const speciesField = species.querySelectorAll('input[type="radio"]');
	let speciesResult;
	let radioOptionSelected;
	let finalSpeciesText = "";
		
	console.log("The species option is " + speciesField);
	console.log("The species option is " + speciesField[0].value);
	console.log("The species option is " + speciesField[0].checked);

	
	  for (const species of speciesField) {
		  console.log(species.value);
		  console.log(species.checked);
        if (species.checked) 
		{
			radioOptionSelected = true;
            speciesResult = species.value;
			console.log("The species option is " + speciesResult);

			
			switch(speciesResult)
			{
				case "Dog":
					finalSpeciesText = "Dog";
					break;

				case "Cats":
					finalSpeciesText = "Cat";
					break;

				case "Birds":
					finalSpeciesText = "Bird";
					break;
			}
            break;
        }
	    else
		{
			radioOptionSelected = false;
			 break;
		}
    }
	
	console.log("The radio option is " + radioOptionSelected);
	
		const finalCheckbox = document.getElementById('PetFriendliness');

		let finalCheckboxText = "";
	
		if(finalCheckbox.checked)
		{
				finalCheckboxText = "They are friendly";
		}
	
		else
		{
				finalCheckboxText = "They are not friendly";
		}
	
	// Final check to confirm that profile value is a URL as intended. Performs a regex search to test if link is a proper URL. 
	// This won't totally resolve people inputting a link that's not an image, but it does prevent users from just spamming regular text

	const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
	
	//ValidateFieldSet();
	
	console.log(urlRegex.test(profile.value));
	
	if(urlRegex.test(profile.value)){
		console.log("This file is an image");
		
		if(radioOptionSelected === true){
			SumbitNewAnimal(petName.value, profile.value, finalSpeciesText, finalCheckboxText);
			console.log(AnimalArray);
			ManageCardInfo();
		}
		else{
			alert("Please select a species before continuing");
			return;
		}
	}
	else{
		alert("Please submit an appopriate url link");
		profile.value = "";
	}
}

function DefaultCardInfo(cardIndex)
{
	PopulateCard(
				cardList[cardIndex],
				"images/noAnimals.png",
				"No animals have been loaded for this card",
				"Pup Doe",
				 "None" ,
				"N/A",
				);
}

document.getElementById("PetForm").addEventListener("submit", function(event){
	event.preventDefault();
	CheckAndSubmit();
	ResetForm();
});

document.getElementById("Rmv0").addEventListener("click", function(){
	RemoveAnimal(document.getElementById("Rmv0"),0);
});

document.getElementById("Rmv1").addEventListener("click", function(){
	RemoveAnimal(document.getElementById("Rmv1"),1);
});

document.getElementById("Rmv2").addEventListener("click", function(){
	RemoveAnimal(document.getElementById("Rmv1"),2);
});

StartupCardInfo();