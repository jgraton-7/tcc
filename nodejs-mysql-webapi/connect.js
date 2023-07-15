const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'Tomada'
  });


connection.query(
    'SELECT * FROM `table` WHERE `name` = "Page" AND `age` > 45',
    function(err, results, fields) {
        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    }
);

function selectAll(){
    connection.query(
        'SELECT * FROM tbl_usuario',
        function(err, results, fields) {
            console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
            return results;
        }
    );
}

function AddUser(){
    connection.query(
        'INSERT INTO tbl_usuario (nome_usuario,email_usuario,senha_usuario,tipo_usuario,) VALUES (value_1,value_2,...)''
    )
}


module.exports = {
    selectAll
}

