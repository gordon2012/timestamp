var moment = require('moment');
var express = require('express');
var app = express();

var server = app.listen('8080', function()
{
	var port = server.address().port;
	console.log('App listening on port %s', port);
});


// ********
// adapted from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
// ********
filterInt = function(value)
{
	if(/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
		return Number(value);
	return 'NaN';
}
// ********


app.get('/', function(req, res)
{
	res.send('<h1>timestamp</h1><h2>a Basejump for freeCodeCamp by Gordon Doskas</h2>');
});


app.get('/:datetime?', function(req, res)
{
	var output = {unix: null, natural: null};
	var format = "MMMM D, YYYY"

	var path = decodeURI(req.path.substr(1));

	var num = filterInt(path);

	if(num === 'NaN')
	{
		var mDate = moment(path, format);
		if(mDate.isValid())
		{
			output.unix = mDate.unix();
			output.natural = path;
		}
	}
	else
	{
		output.unix = num;
		output.natural = moment.utc(num * 1000).format(format);
	}

	res.send(output);
});
