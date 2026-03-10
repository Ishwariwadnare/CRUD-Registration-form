const express = require("express");
const mysql = require("mysql2");
const methodOverride = require("method-override");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Aadu@1616",
    database: "formcrud"
});

// -- Home Page --
app.get("/", (req, res) => {
    res.render("index");
});

// -- Create User --
app.post("/users", (req, res) => {
    let { name, email, city, password } = req.body;
    let q = "INSERT INTO users (name, email, city, password) VALUES (?,?,?,?)";

    db.query(q, [name, email, city, password], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Database Error");
        } else {
            // Redirect with success message
            res.redirect("/users?success=1");
        }
    });
});

// -- Show All Users --
app.get("/users", (req, res) => {
    // Get success query if present
    let success = req.query.success || null;

    let q = "SELECT * FROM users";
    db.query(q, (err, users) => {
        if (err) {
            console.log(err);
            res.send("Database Error");
        } else {
            res.render("users", { users, success });
        }
    });
});

// -- Delete User --
app.delete("/users/:id", (req, res) => {
    let { id } = req.params;
    let q = "DELETE FROM users WHERE id = ?";

    db.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Database Error");
        } else {
            res.redirect("/users");
        }
    });
});

// -- Edit Page--
app.get("/users/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = "SELECT * FROM users WHERE id = ?";

    db.query(q, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Database Error");
        } else {
            res.render("edit", { user: result[0] });
        }
    });
});

// -- Update User --
app.put("/users/:id", (req, res) => {
    let { id } = req.params;
    let { name, email, city, password } = req.body;

    let q = "UPDATE users SET name=?, email=?, city=?, password=? WHERE id=?";
    db.query(q, [name, email, city, password, id], (err, result) => {
        if (err) {
            console.log(err);
            res.send("Database Error");
        } else {
            res.redirect("/users");
        }
    });
});

// -- Start Server --
app.listen(3000, () => {
    console.log("Server running on port 3000");
});