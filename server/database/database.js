const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const fs = require("fs");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "yashu24577",
  database: "books",
});

db.connect((err) => {
  if (err) {
    console.log("error connecting to the database");
  } else {
    console.log("database connected");
  }

  db.query("CREATE DATABASE IF NOT EXISTS books", (err) => {
    if (err) {
      console.log("error creating database", err);
    } else {
      console.log("database created");
    }
  });

  db.query("USE books", (err) => {
    if (err) {
      console.log("error using database", err);
    } else {
      console.log("using database");
    }

    const sqlFile = fs.readFileSync("./schema.sql", "utf-8");
    const statements = sqlFile.split(";");

    statements.forEach((statement) => {
      if (statement.trim()) {
        db.query(statement, (err) => {
          if (err) {
            console.log("error executing statement", err);
            return;
          }
        });
      }
    });
    console.log("database schema setup completed");
  });
});

exports.register = (req, res) => {
  const sentEmail = req.body.email;
  const sentName = req.body.name;
  const sentPassword = req.body.password;

  const sql = "INSERT INTO userauth(name, email, password) VALUES (?,?,?)";
  const values = [sentName, sentEmail, sentPassword];

  db.query(sql, values, (err, res) => {
    if (err) {
      res.send(err);
    } else {
      console.log("user has been created succesfully");
    }
  });
};

exports.login = (req, res) => {
  const sentLoginEmail = req.body.loginEmail;
  const sentLoginPassword = req.body.loginPassword;

  const sql = "select * from userauth where email = ? && password = ?";
  const values = [sentLoginEmail, sentLoginPassword];

  db.query(sql, values, (err, results) => {
    if (err) {
      res.send(err);
    }
    if (results.length > 0) {
      const email = results[0].loginEmail;
      const token = jwt.sign({ role: "user", email: email }, "jwt_secret_key", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      return res.json({ loginstatus: true });
    } else {
      res.send({ message: `credentials don't match` });
    }
  });
};

exports.adminregister = (req, res) => {
  const sentEmail = req.body.email;
  const sentName = req.body.name;
  const sentPassword = req.body.password;

  const sql = "INSERT INTO adminauth(name, email, password) VALUES (?,?,?)";
  const values = [sentName, sentEmail, sentPassword];

  db.query(sql, values, (err, res) => {
    if (err) {
      res.send(err);
    } else {
      console.log("admin has been created succesfully");
    }
  });
};

exports.adminlogin = (req, res) => {
  const sentLoginEmail = req.body.loginEmail;
  const sentLoginPassword = req.body.loginPassword;

  const sql = "select * from adminauth where email = ? && password = ?";
  const values = [sentLoginEmail, sentLoginPassword];

  db.query(sql, values, (err, results) => {
    if (err) {
      res.send(err);
    }
    if (results.length > 0) {
      const email = results[0].loginEmail;
      const token = jwt.sign(
        { role: "admin", email: email },
        "jwt_secret_key",
        {
          expiresIn: "1d",
        }
      );
      res.cookie("token", token);
      return res.json({ loginstatus: true });
    } else {
      res.send({ message: `credentials don't match` });
    }
  });
};

exports.getAllAdmins = (req, res) => {
  const query = "SELECT * FROM adminauth";
  db.query(query, (err, results) => {
    if (err) {
      res.status(404).json({
        message: "admin data not found",
      });
    }
    res.status(200).json(results);
  });
};

exports.editAdminData = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  const query = "UPDATE adminauth SET ? WHERE id = ?";
  db.query(query, [updatedData, id], (err) => {
    if (err) {
      res.json({ message: "admin data not updated" });
    }
    res.json({ message: "admin data updated successfully" });
  });
};

exports.deleteAdmin = (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM adminauth WHERE id = ?";
  db.query(query, id, (err) => {
    if (err) {
      res.json({ message: "error deleting admin" });
    }
    res.json({ message: "admin deleted successfully" });
  });
};

exports.getallusers = (req, res) => {
  const query = "SELECT * FROM userauth";
  db.query(query, (err, users) => {
    if (err) {
      res.status(404).json({ message: "error sending users", err });
    }
    res.status(200).json(users);
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM userauth WHERE id = ?";
  db.query(query, userId, (err) => {
    if (err) {
      res.json({ message: "error deleting user", err });
    }
    res.json({ message: "user deleted successfully" });
  });
};

exports.getallbooks = (req, res) => {
  const getAllBooks = "SELECT * FROM books";
  db.query(getAllBooks, (err, books) => {
    if (err) {
      console.log("error fetching book data", err);
    }
    res.status(200).json(books);
  });
};

exports.createBook = (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const genre = req.body.genre;
  const publication_year = req.body.publication_year;

  const insertQuery =
    "INSERT INTO books(title , author, genre, publication_year) VALUES (?,?,?,?)";
  const values = [title, author, genre, publication_year];

  db.query(insertQuery, values, (err) => {
    if (err) {
      console.log("error creating book", err);
      return;
    }
    res.status(200).json({ message: "book created successfully" });
  });
};

exports.getBookById = (req, res) => {
  const bookId = req.params.id;
  const query = "SELECT * FROM books WHERE id = ?";
  db.query(query, bookId, (err, book) => {
    if (err) {
      res.status(404).json({ message: "book not found" });
      return;
    }
    res.status(200).json(book);
  });
};

exports.updateBook = (req, res) => {
  const bookId = req.params.id;
  const updatedData = req.body;

  const query = "UPDATE books SET ? WHERE id = ?";

  db.query(query, [updatedData, bookId], (err) => {
    if (err) {
      console.log("Error updating book:", err);
      res.status(500).json({ message: "Error updating book" });
    } else {
      res.status(200).json({ message: "Book updated successfully" });
    }
  });
};

exports.deleteBook = (req, res) => {
  const bookId = req.params.id;
  const query = "DELETE FROM books where id = ?";

  db.query(query, bookId, (err) => {
    if (err) {
      res.json({ message: "error deleting book" });
    }
    res.json({ message: "book deleted successfully" });
  });
};
