  var deck = [];
  var playerArr=[];
  var imgArr=[];
var players=1;
 // socket.emit('fromClient', {id: 'newPlayer'}); // send fromClient message to server

var round=1;	


  function dealCard(){
	 // console.log("hello");
		//for(var i =0;i<playerArr.length;i++){
	  document.getElementById("one").disabled = true;
	  document.getElementById("two").disabled = false;
	  document.getElementById("demo2").innerHTML = "Round " + (round);
	  playerArr[0].showHand();
		//}
	  
	}
  function newRound(){
	  
	  round++;
	  document.getElementById("demo2").innerHTML = "Round " + (round);
	  document.getElementById("demo").innerHTML = "Discarding Card ";
	  console.log(round);
	  if(round==3){
		  playerArr[0].calculateScore;
		  
		  document.getElementById("demo").innerHTML = "Score "+playerArr[0].combo;
		  document.getElementById("two").disabled = true;
	  }
		var g=0;
		while(g<5){
			document.body.removeChild(imgArr[g]);
			g++;
		}
		imgArr=[];
	  var x; 
	  var y=playerArr[0].array.length;
	  for(var i = 0;i<y;i++){
		  x= playerArr[0].array.pop();
		  console.log("popping "+ x);
		  playerArr[0].removeCard(x);
	  }
	  console.log(playerArr[0].array);
	  playerArr[0].array.splice(0,5)

	  playerArr[0].draw();	  
	  playerArr[0].showHand();
	  playerArr[0].calculateScore;
  }
  function sortArr(arr){
	  var n = arr.length;
      for (var i=1; i<n; ++i)
      {
          var key = arr[i];
          var j = i-1;

          /* Move elements of arr[0..i-1], that are
             greater than key, to one position ahead
             of their current position */
          while (j>=0 && arr[j] > key)
          {
              arr[j+1] = arr[j];
              j = j-1;
          }
          arr[j+1] = key;
      }
  }
  function reDeal(number){
	  
		var b=false;
	  console.log(number);
	  for(var v = 0;v<5;v++){
		  if(number==playerArr[0].array[v]){
			  b=true;
			  playerArr[0].array.splice(v,1);
		  }
		  
	  }
	  if(b==false){
		  playerArr[0].array.push(number);
	  }
	  sortArr(playerArr[0].array);


	  document.getElementById("demo").innerHTML = "Discarding Card " + (playerArr[0].array);
	  
	  console.log(playerArr[0].array);
	  
	  //playerArr[0].removeCard(number);
  }
  
function player(id,score){
  this.id=id;
  this.array=[];
   this.hand = drawHand();
   this.score;
   this.flush=false;
   this.straightFlush=false;
   this.straight=false;
   this.royal=false;
   this.chop=false;
   this.fullHouse=false;
   this.triple=false;
   this.twoPair=false;
   this.pair=false;
   this.combo;
   this.calculateScore=function(){//finds if royal->pair is true
	   this.royal=royal(this.hand);
	   this.chop=chop(this.hand);
	   this.triple=triple(this.hand);
	   this.fullHouse=fullHouse(this.hand);
	   this.flush=flush(this.hand);
	   this.twoPair=twoPair(this.hand);
	   this.straight=straight(this.hand);
	this.pair=pair(this.hand);
	if(this.straight==true&&this.flush==true){
		this.straightFlush=true;
	}
	this.combination();
   };
   this.combination=function(){//determines the highest winning combo in players hand //fullhouse vs triple vs double
	if(this.royal==true){
		this.combo="Royal Flush";
		this.score = 10;
		}else if(this.straightFlush==true){
			this.score=9;this.combo="Straight Flush";
		}else if(this.chop==true){
			this.score=8;this.combo="4 of a Kind";
		}else if(this.fullHouse==true){
			this.score=7;this.combo="Full House";
		}else if(this.flush==true){
			this.score=6;this.combo="Flush";
		}else if(this.straight==true){
			this.score=5;this.combo="Straight";
		}
		else if(this.triple==true){
			this.score=4;this.combo="Triple";
		}else if(this.twoPair==true){
			this.score=3;this.combo="Two Pairs";
		}
		else if(this.pair==true){
			this.score=2;this.combo="Pair";
		}else{ this.score =1;this.combo="No Combo";}
	};
	this.resetBoolean=function(){
		   this.flush=false;
		   this.straightFlush=false;
		   this.straight=false;
		   this.royal=false;
		   this.chop=false;
		   this.fullHouse=false;
		   this.triple=false;
		   this.twoPair=false;
		   this.pair=false;
	};
   this.showHand=function(){
		  var i =0;
		  while(i<5){
			  var img = document.createElement("img");
			  imgArr.push(img);
			  img.width=125;
			  img.height=182;
			  img.src= "cards\"" +
			  		+playerArr[0].hand[i].value +
			  		+"_of_"+playerArr[0].hand[i].suit+".png";
				 img.src= "cards/"+playerArr[0].hand[i].value+ 
					 		"_of_"+playerArr[0].hand[i].suit+".png";
				 
					 		document.body.appendChild(img);
				 i++;
		  }
   };
   this.removeCard=function(number){
	   
	   this.hand.splice(number, 1);
   }
   this.draw=function(){
	   while(this.hand.length!=5){
			  //hand.push(deck.pop());
			  x=randomCard();
			 this.hand.push(deck.splice(x,1)[0]);
		  }
		  this.hand.sort(compare);
		  
   }
   
}//end of player constructor
	function drawHand(){
		var hand =[];
		var x;
		
		  while(hand.length!=5){
			  //hand.push(deck.pop());
			  x=randomCard();
			 hand.push(deck.splice(x,1)[0]);
		  }
		  hand.sort(compare);
		  return hand;
	}
function createPlayer(count){
	console.log("hi")
	var newPlayer = new player(count,0);
	console.log("THe deck length is "+deck.length);
	//drawHand();
	console.log("After "+deck.length);
	playerArr.push(newPlayer);
	 socket.emit('sendPlayer', { id: playerArr });
	players++;
}
function card(value, suit){
this.value = value; 
this.suit = suit;
}
function createDeck(){
var count;
var count2;
var x;
for(count2=0;count2<4;count2++){
  if(count2==0){
x="spades";
	 // x="spades";
  }else if(count2==1){
    x="diamonds";
	 // x="spades";
  }
  else if(count2==2){
    x="clubs";
	 // x="spades";
  }
  else{
    x="hearts";
	  //x="spades";
  }
for(count=1; count<14;count++){

var newCard = new card(count,x);
deck.push(newCard);
}//end for count
}//end for count 2 
}//end createDeck

function randomCard(){
  return Math.floor(Math.random()* deck.length);
}
function royal(hand){
	var i=0;
	a = hand[i];
	b= hand[i+1];
	c = hand[i+2];
	d = hand[i+3];
	e = hand[i+4];
	if(a.value==1&&a.value==(b.value-9)&&b.value==(c.value-1)&&c.value==(d.value-1)&d.value==(e.value-1)){//ace = 1
		if(a.suit==b.suit&&b.suit==c.suit&&c.suit==d.suit&d.suit==e.suit){
			return true;
		}
		}else return false;
}
function flush(hand){
	var i=0;
	a = hand[i];
	b= hand[i+1];
	c = hand[i+2];
	d = hand[i+3];
	e = hand[i+4];
	if(a.suit==b.suit&&b.suit==c.suit&&c.suit==d.suit&d.suit==e.suit){
	return true;
	}else return false;
}
function straight(hand){
	var i=0;
	a = hand[i];
	b= hand[i+1];
	c = hand[i+2];
	d = hand[i+3];
	e = hand[i+4];
	if(a.value==(b.value-1)&&b.value==(c.value-1)&&c.value==(d.value-1)&d.value==(e.value-1)||(a.value==1&&a.value==(b.value-9)&&b.value==(c.value-1)&&c.value==(d.value-1)&d.value==(e.value-1))){ //accounts for 10-A and 1-5
		return true;
		}else return false;
}

function chop(hand){
	var i=0;
	a = hand[i];
	b= hand[i+1];
	d = hand[i+3];
	e = hand[i+4];
	if(a.value==d.value||b.value==e.value){
		return true;
	}else return false;
}

function fullHouse(hand){
	var i=0;
	a = hand[i];
	b= hand[i+1];
	c = hand[i+2];
	d = hand[i+3];
	e = hand[i+4];
	if((a.value==c.value&&d.value==e.value)||(a.value==b.value&&c.value==e.value)){
		return true;
	}else return false;
}
function triple(hand){
	var i=0;
	a = hand[i];
	b= hand[i+1];
	c = hand[i+2];
	d = hand[i+3];
	e = hand[i+4];
	if(a.value==c.value||b.value==d.value||c.value==e.value){
		return true;
	}else return false;
}
function twoPair(hand){
	var i=0;
	a = hand[i];
	b= hand[i+1];
	c = hand[i+2];
	d = hand[i+3];
	e = hand[i+4];
	console.log(a.value+","+b.value+","+c.value+","+d.value+","+e.value+",");
	console.log(a.suit+","+b.suit+","+c.suit+","+d.suit+","+e.suit+",");
	if((a.value==b.value&&c.value==d.value)||(b.value==c.value&&d.value==e.value)||(a.value==b.value&&d.value==e.value)){
		return true;
	}else return false;
}
function pair(hand){
	for(var j=0;j<hand.length;j++){
		console.log(hand[j].value+',');
	}
	
	var i=0;
	a = hand[i];
	b= hand[i+1];
	c = hand[i+2];
	d = hand[i+3];
	e = hand[i+4];
	if(a.value==b.value||b.value==c.value||c.value==d.value||d.value==e.value){
		return true;
	}else return false;
	}

function compare(a,b) {//used to sort cards by value
	  if (a.value < b.value)
	    return -1;
	  if (a.value > b.value)
	    return 1;
	  return 0;
	}
