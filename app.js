var path = require('path')
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');
app.set(path.resolve(__dirname, 'views'));


app.get('/', (req, res) => {
	res.render('index');
});

app.post('/add', bodyParser.json(),(req, res) => {
	insert_database(req.body);
});

app.use(express.static(path.resolve(__dirname, 'public')));

app.listen(process.env.PORT || 1337);

//
const Connection = require('tedious').Connection;
const Request = require('tedious').Request;
const TYPES = require('tedious').TYPES;

// Create connection to database
const config = {
	userName: 'sqlserver', 
	password: 'EciConu20181', 
	server: 'conuwebapp.database.windows.net', 
	options: {
		database: 'WebAppSqlServer', 
		encrypt: true
	}
};

const connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', err => {
	err ? console.log(err) : "";
});

function query_database(){
	// Read all rows from table
	const query = 'SELECT * FROM Guest';
	request = new Request(query, (err, rowCount, rows) => {
		console.log(rowCount + ' row(s) returned');
		process.exit();
	});
	request.on('row', columns => {
		columns.forEach(column => {
			console.log("%s\t%s", column.metadata.colName, column.value);
		});
	});
	connection.execSql(request);
}

function insert_database(parameters){
	const query = "INSERT INTO Guest (GuestName, GuestSecondName, GuestPhone, GuestEnterprise, GuestAddress, GuestEmail) VALUES (@name, @sname, @phone, @etps, @adrs, @email);";
	request = new Request(query, err => {
		if (err) {console.log(err);};
	});
	request.addParameter('name', TYPES.NVarChar, parameters.name);
	request.addParameter('sname', TYPES.NVarChar , parameters.sname);
    request.addParameter('phone', TYPES.NVarChar, parameters.phone);
    request.addParameter('etps', TYPES.NVarChar,parameters.etps);
    request.addParameter('adrs', TYPES.NVarChar,parameters.adrs);
    request.addParameter('email', TYPES.NVarChar,parameters.email);
    connection.execSql(request);
}
