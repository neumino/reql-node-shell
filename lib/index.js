var r = require('rethinkdb');
var Connection = require('./connection.js');
var Result = require('./result.js');

// Save connect
r._connect = r.connect;

// Overwrite connect
r.connect = function(args) {
    args = args || {};

    var connection = new Connection(r);

    r._connect(args, function(error, conn) {
        if (error) {
            throw error;
        }
        else {
            connection.connection = conn;
        }
    });

    return connection;
}

var TermBase = r.expr(1).constructor.__super__.constructor.__super__;

// Save run in _run
TermBase._run = TermBase.run;

// Overwrite run
TermBase.run = function() {
    var result = new Result();
    if (arguments.length === 0) {
        if (r._defaultConnection == null) {
            var error = new Error("Set a default connection with `repl` or provide a connection.");
            console.log(error.message);
        }
        else {
            result.setStart();
            this._run(r._defaultConnection.connection, function(error, res) {
                result.setEnd();
                if (error) {
                    result.setStatus("error")
                    console.log(error.message);
                }
                else {
                    result.setStatus("ready")
                    result.set(result, res);
                }
            });
        }
    }
    else if (arguments.length == 1) {
        var connection = arguments[0];

        result.setStart();
        this._run(connection.connection, function(error, res) {
            result.setEnd();
            if (error) {
                result.setStatus("error")
                console.log(error.message);
            }
            else {
                result.setStatus("ready")
                result.set(res);
            }
        });
    }
    return result;
}


module.exports = r;
