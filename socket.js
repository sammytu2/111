let app = require('http').createServer(); // create HTTP server
let io = require('socket.io')(app, {path: '/socket.io'}); // bind Socket to HTTP server
app.listen(3000); // listen on port 3000
console.log('Listening for connections on port 3000');

app.maxConnections = 6;
var player =0;
var id;
var masterDeck=[];
var masterPlayerArr=[];
io.on('connection', function(socket) {
	
	   console.log('Player connected');
	   //Sender Stuff
	   if(player==0){
		   socket.emit('firstPlayer', { id: player });
		   id=0;   
	   }//emit sends an event to 1 socket // socketID is the name of the event
	   
	   if(player!=0){
		   socket.emit('newUser', { id: masterDeck });
		   socket.emit('sendToClientPlayers', { id: masterPlayerArr });
		   socket.in('my-room').emit('fromServer', {id: 'Here comes player #'+player});
		   id=player;
	   }
	  
	  // socket.emit('playerCount', { id: player });
	
	   socket.join('my-room'); // join the socket into the room called 'my-room'
	    // send to all clients in room
	  
	   player++;
	   
	   
	   
	   
	   
	   
	   
	   //Receive Stuff
	   socket.on('fromClient', function(data) { // listen for fromClient message
	      console.log('Received ' + data.id + ' from client'); // single client "bar" = data.id
	   });
	   socket.on('Send Card Value', function(data) { // listen for fromClient message
		      console.log('Received ' + data.id + ' from deck'); // single client "bar" = data.id
		      console.log(masterDeck.length+"before length");
		      masterDeck=data.id;
		      console.log(masterDeck.length+"after length");
		   });
	   socket.on('sendPlayer', function(data) { // listen for fromClient message
		      console.log('Received ' + data.id + ' from player Arr'); // single client "bar" = data.id
		    //  console.log(masterPlayerArr.length+"before length");
		      if(player=0){
		      masterPlayerArr=data.id;
		      }
		     // console.log(masterPlayerArr.length+"after length");
		   });
	});