const express = require("express");
const app = express();

const router = express.Router();
const database = require("./../database/database");

router.route("/user-login").post(database.login);
router.route("/register").post(database.register);
router.route("/admin-login").post(database.adminlogin);

router
  .route("/dashboard/manage-books/books")
  .get(database.getallbooks)
  .post(database.createBook);

router
  .route("/dashboard/manage-books/books/:id")
  .get(database.getBookById)
  .delete(database.deleteBook)
  .put(database.updateBook);

router.route("/dashboard/manage-users/users").get(database.getallusers);
router.route("/dashboard/manage-users/users/:id").delete(database.deleteUser);

router
  .route("/dashboard/admin")
  .get(database.getAllAdmins)
  .post(database.adminregister);
router
  .route("/dashboard/admin/:id")
  .delete(database.deleteAdmin)
  .put(database.editAdminData);

module.exports = router;
