/*
Computerized Algorithimic Testing
-----------------------------------
cat.js
@author Owen Chen

Generalized Algorithm where developer provides a test bank. Maybe json file

inputs: Test bank, json file with card data
	Card attributes:
		- difficulty
		- subject/section

	
Algorithm

1. Request next candidate. Set D=0, L=0, H=0, and R=0. 
	D = Item difficulty. L = items taken. H = difficultiesTotal R= response score
2. Find next item near difficulty, D.
	Search in item bank for closest item near D
3. Set D at the actual calibration of that item.
	Set d = that item. 
1. Administer that item.
	Prompt that question
2. Obtain a response.
	Get a response from user
3. Score that response.
	Score the response
4. Counttheitemstaken:L=L+1
	Global variable L. 
5. Add the difficulties used: H = H + D
	Global variable totalDifficulties
6. If response incorrect, update item difficulty: D = D - 2/L

7. If response correct, update item difficulty: D = D + 2/L

8. If response correct, count right answers: R = R + 1
9. If not ready to decide to pass/fail, Go to step 2.

10. If ready to decide pass/fail, calculate wrong answers: W = L - R
11. Estimate measure: B = H/L + log(R/W)
12. Estimate standard error of the measure: S = [L/(R*W)]
13. Compare B with pass/fail standard T.
14. If(T-S)<B<(T+S),gotostep2.
15. If(B-S)>T,thenpass.
16. If(B+S)<T,thenfail.


References:
- Computer-Adaptive Testing:
A Methodology Whose Time Has Come.

*/

var fs = require('fs');
var readline = require('readline');
var readlineSync = require('readline-sync');


//JSON card bank

//Variables
// D = difficulty
// L = items taken
// H = Difficulties used
// R = Right answers 

var D = 0,
	L = 0,
	H = 0,
	R = 0;

var student = {
	name: "Owen",
	ability: 25,
}; //Student Object
var item = "";

// var itemBank = []; // Item Bank to choose from
// var candidateBank = []; //student Test bank

// Dummy Data =====================================================
var itemBank = [ 
	{
		question: "test1",
		answer: "1",
		difficulty: 9
	},
	{
		question: "test3",
		answer: "1",		
		difficulty: 92
	},
	{
	  	question: "test4: This is a question",
	  	answer: "1",		
	  	difficulty: 19
	},		
	{
		question: "test2",
		answer: "1",	
		difficulty: 14
	}
]; // Item Bank to choose from

var candidateBank = [
	{
		name: "Owen",
		ability: 25
	},

	{
	 	name: "Chris",
	 	ability: 15
	}	

]; //student Test bank

// Dummy Data ====================================================================




/**
@Item properties:
Json
{
	question: "String",
	difficulty: Integer,
}

**/




/**
Request next candidate
-----
Initialize variables of that user to 0
From test bank, find next item closest to the difficulty D.

Set user's D to the actual D value of that item.
@param User
**/

var begin = function(){
	// St 1) Prompt for next candidate 
	var nextCandidate = candidateBank[0];

	D = 0;
	L = 0;
	H = 0;
	R = 0;

	// St 2) Find closest difficulty
	var closestItem = findItemInBank(nextCandidate.ability);
	// St 3) Set D at the actual calibration of that item
	D = closestItem.difficulty;
	console.log(D);

	// St 4-5) Administer the Item. Continue steps in here
	var response = administerItem(closestItem);
	// console.log(response);

	// St 6) Score this response. 1 = right, 0 - wrong.
	
	var score = scoreResponse(response, closestItem);
	console.log(score);

	// St 7) Total items taken
	L += 1;

	// St 8) Add total difficulties used
	H = H + D;


	// St 9) If response incorrect, D = D - 2/L
	if (score == 0){
		console.log(D + "\n Before");
		D = D - 2 / L;
		console.log(D);
	}

	// St 10) If response is correct, D = D + 2/L
	if (score == 1){
		console.log("Correct ");
		D = D + 2/L;
		R += 1; // Update right count
	}
	



};



/**
@findItemInBank
@param D = target difficulty
Returns the item with the closest difficulty as the passed in parameter D.
**/

var findItemInBank = function(D){
	minVal = 999;
	minItem = "";
	for (item in itemBank){
		var difference = Math.abs(D - itemBank[item].difficulty)
		if (difference < minVal){
			minVal = difference;
			minItem = itemBank[item];
		}
	}

	return minItem
}

/**
@administerItem
@param item -> dictionary of question and difficulty

Gives the user the question, recieves a response.
**/

var administerItem = function(item){
	var question = item.question;
	return getUserPrompt(question, item); //Asynchronous call

}

/**
@getUserPrompt
@param question

Prompts the user with the question. Synchronous version with readlineSync
**/

var getUserPrompt = function(question, item){

	var answer = readlineSync.question(question + '\n' );

	console.log("Your answer is: \n");

	return answer;

	 
}



/**
@scoreResponse
@params reply - Reply from command Line
			- Item - Current dictionary object with the item
Scores the response 
**/

var scoreResponse = function(response, item){
	console.log("Scoring response");
	if (response != item.answer){
		console.log("WRONG");
		return 0;
	}

	else {
		console.log("Correct");
		return 1;
	}
	
};


/**
@IRTAlgorithm
Function is Pi(Theta) = P(Xi = 1 | Theta) = ((Theta - Di) / (1 + (Theta - Di))).

Theta = probability of getting question i correct
Xi = Question i
Di = difficulty of question i

**/


var IRTAlgorithm = function(){

}


// ======================TEST CASES========================= //

begin();




// findITEMINBANK Testing
// result = findItemInBank(23);
// console.log("Item difficulty closest to 23");
// console.log(result.difficulty);
// console.log(result.question);




