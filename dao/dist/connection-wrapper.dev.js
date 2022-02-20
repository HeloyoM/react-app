"use strict";

var mysql = require("mysql2"); // Connection = קו תקשורת למסד הנתונים


var connection = mysql.createConnection({
    host: "localhost",
    // Computer
    user: "root",
    // Username
    password: "1234",
    // Password
    database: "vacations" // Database name

}); // Connect to the database: 

connection.connect(function(err) {
    if (err) {
        console.log("Failed to create connection + " + err);
        return;
    }

    console.log("We're connected to MySQL");
}); // One function for executing select / insert / update / delete: 

function execute(sql) {
    return new Promise(function(resolve, reject) {
        connection.execute(sql, function(err, result) {
            if (err) {
                // console.log("Error " + err);
                reject(err);
                return;
            }

            resolve(result);
        });
    });
}

function executeWithParameters(sql, parameters) {
    return new Promise(function(resolve, reject) {
        connection.execute(sql, parameters, function(err, result) {
            if (err) {
                //console.log("Error " + err);
                console.log("Failed interacting with DB, calling reject");
                reject(err);
                return true;
            }

            resolve(result);
        });
    });
}

module.exports = {
    execute: execute,
    executeWithParameters: executeWithParameters
};