console.log("Hello World");

// Dictionary makes element easy to delete
// List makes element easy to find and use

// Grab child id from cards
const card1 = document.getElementById("PetEl1");
const card2 = document.getElementById("PetEl2");
const card1 = document.getElementById("PetEl3");

let ButtonDictionary = {
  'card1': "Index1",
  'card2': "Index2",
  'card3': "Index3",
}

let AnimalArray = []

function PopulateCard(cardID, newImg, newAlt, newName, speciesType, friendliness, BtnNumber, ArrayIndex){
	const child = cardID.children;
	child[0].src = newImg;
	child[0].altKey = newAlt;
	child[1].innerHTML = newName;
	child[2].innerHTML = speciesType;
	child[3].innerHTML = friendliness;
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
	for(var i = 0; i < 3; i++){
		PopulateCard("card" + i.toString(),
				NewAnimalObj[i].url,
				"This is a picture of " + NewAnimalObj[i].name + " animal of the species " + NewAnimalObj[i].species + ". This is a " + NewAnimalObj[i].kindness + " animal",
				NewAnimalObj[i].name,
				NewAnimalObj[i].species,
				NewAnimalObj[i].kindness,
				"card2",
				NewAnimalObj[i].animalNum
				);
	}
}


function SumbitNewAnimal(){
	const submittedName = "";
	const submittedURL = "";
	const submittedSpecies = "";
	const submittedFriendliness = "";
	const dictItemName = "Hey_" + submittedName;
	AnimalArray.push(new NewAnimalObj(submittedName,submittedURL,submittedSpecies,submittedFriendliness,AnimalArray.count++));
	//AnimalArray[dictItemName] = new NewAnimalObj(submittedName,submittedURL,submittedSpecies,submittedFriendliness,AnimalArray.count++)); //AnimalArray.count++ adds one to the array count to make it easier to track each animal. Might run into an issue where the array count is one higher than it should be, but need to test that first.
	ResetForm();
}

function ResetForm(){
	console.log("Resetting the form")
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

// How image alt should go... "This is a picture of " + name + " animal of the species " + "species. This is a " + friendliness + " animal";

StartupCardInfo();