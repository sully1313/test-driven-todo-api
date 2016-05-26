// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
   { _id: 1, task: 'Laundry', description: 'Wash clothes' },
   { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
   { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {

});

app.get('/api/todos', function index(req, res) {
  res.json({todos: todos});
});

app.post('/api/todos', function create(req, res) {
  var newTodo = req.body;

  if (todos.length > 0) {
    newTodo._id = todos[todos.length - 1]._id + 1;
  } else {
    newTodo._id = 1;
  }

  todos.push(newTodo);

  res.json(newTodo);
});

app.get('/api/todos/:id', function show(req, res) {
  var todoId = parseInt(req.params.id);

  var foundTodo = todos.filter(function (todo) {
  return todo._id == todoId;
  })[0];

res.json(foundTodo);
});

app.put('/api/todos/:id', function update(req, res) {
   var id = parseInt(req.params.id);
   var updateTask = todos.filter(function(todo){
     return todo._id == id;
   })[0];
   updateTask.task = req.body.task;
   updateTask.description = req.body.description;
   res.json(updateTask);
});

app.delete('/api/todos/:id', function destroy(req, res) {
  var todoId = parseInt(req.params.id);
  var removeTask = todos.filter(function(todo){
    return todo._id == todoId;
  })[0];
  todos.splice(todos.indexOf(removeTask), 1);
  res.json(removeTask);
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
