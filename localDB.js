/*
Remove button removes element from list
Figure out what route names are and how to make the RESTful
upload items to db when finished creating them
*/
console.log("Hello World");

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

function PopulateCard(cardID, newImg, newAlt, newName, speciesType, friendliness, BtnNumber, ArrayIndex){
	const child = cardID.children;
	child[0].src = newImg;
	child[0].alt = newAlt;
	console.log(newAlt)
	const stepChild = child[1].children;
	stepChild[0].innerHTML = newName;
	stepChild[1].innerHTML = speciesType;
	stepChild[2].innerHTML = friendliness;
	ButtonDictionary[BtnNumber] = ArrayIndex;
}

function NewAnimalObj (name, url, species, kindness, animalNum){
	this.name = name;
	this.url = url;
	this.species = species;
	this.kindness = kindness;
	this.animalNum = animalNum;
}


function StartupCardInfo(){
	for(var i = 0; i <= 2; i++){
		PopulateCard(cardList[i],
				AnimalArray[i].url,
				"This is a picture of " + AnimalArray[i].name + " animal of the species " + AnimalArray[i].species + ". This is a " + AnimalArray[i].kindness + " animal",
				AnimalArray[i].name,
				AnimalArray[i].species,
				AnimalArray[i].kindness,
				"card2",
				AnimalArray[i].animalNum
				);
	}
}


function SumbitNewAnimal(name, url,species,friend){
	const submittedName = name;
	const submittedURL = url;
	const submittedSpecies = species;
	const submittedFriendliness = friend;
	const dictItemName = "Hey_" + submittedName;
	AnimalArray.push(new NewAnimalObj(submittedName,submittedURL,submittedSpecies,submittedFriendliness,AnimalArray.count++));
	//AnimalArray[dictItemName] = new NewAnimalObj(submittedName,submittedURL,submittedSpecies,submittedFriendliness,AnimalArray.count++)); //AnimalArray.count++ adds one to the array count to make it easier to track each animal. Might run into an issue where the array count is one higher than it should be, but need to test that first.
	ResetForm();
}

function ResetForm(){
	console.log("Resetting the form")
	document.getElementById("PetForm").reset();
}

function ExportToDB(){
	console.log("Exporting the AnimalArray list")
}

function RemoveAnimal(indexName){
	// Have to remove item from the list... could use simple list and remove, but possibly can run into issues with array pointers
	// If I can get the item name from a dictionary and remove that instead, it would be more fruitful. Easier to control
	
	if(Btn == "Correct button id 1"){
		AnimalArray.removeAt(ButtonDictionary["Btn1"])
	}
	else if(Btn == "Correct button id 2"){
		AnimalArray.removeAt(ButtonDictionary["Btn1"])
	}
	else if(Btn == "Correct button id 3"){
		AnimalArray.removeAt(ButtonDictionary["Btn1"])
	}
	/* Removes element by 
		if (AnimalArray.hasOwnProperty(indexName)) {
			delete animalDictionary[indexName];
			console.log(`Removed ${indexName} from the dictionary.`);
		} else {
			console.log(`${indexName} not found in the dictionary.`);
		}
	*/
}

function CheckAndSubmit(){
	console.log("We clicked on the button");
	const petName = document.getElementById('Pet_Name');
	const profile = document.getElementById('ProfileURL');
	const species = document.getElementById('SpeciesFieldSet');
	
	const speciesField = species.querySelectorAll('input[type="radio"]');
	let speciesResult;
	
	  for (const species of speciesField) {
        if (species.checked) {
            speciesResult = species.value;
            break;
        }
    }
	
	
	let finalSpeciesText = "";
	switch(speciesResult){
			
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
			
	SumbitNewAnimal(petName.value, profile.value, finalSpeciesText, finalCheckboxText);
	console.log(AnimalArray);
	StartupCardInfo();
}

document.getElementById("PetForm").addEventListener("submit", function(event){
	event.preventDefault();
	alert("Form submitted");
	CheckAndSubmit();
	ResetForm();
});


// How image alt should go... "This is a picture of " + name + " animal of the species " + "species. This is a " + friendliness + " animal";

//StartupCardInfo();



PopulateCard(cardList[1],
				"images/Batman-Logo.png",
				"This is a picture of " + "Batman" + " animal of the species " + "Vengence" + ". This is a " + "Not Nice" + " animal",
				"Batman",
				 "Vengence" ,
				"Not Nice",
				"PetEl" + parseFloat(0).toString(),
				parseFloat(0)
				);