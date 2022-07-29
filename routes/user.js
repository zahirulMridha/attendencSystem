const router = require("express").Router();
const userController = require("../controller/user");
const createController = require("../controller/authController");
/*
  user crud operation
- 1 Get User /users ok
- 2 Get User by Id /users/userId ok
- 3 Create User /users
- 4.1(patch) Update User  /users/userId  
     $when update some property of user
- 4.2(put) Update User  /users/userId    
     $if have not user create new user or update
- 5 Delete User  /users/userId
*/
/*
//  TODO: get users have some works
- [ ] Update security
- [ ]  filter
- [ ]  sort
- [ ]  pagination
- [ ]  select
*/
// get user by id
router.get("/:userId", userController.getUserByIdController);
// user update by id
router.patch("/:userId", userController.userUpdateController);
// user delete by id
router.delete("/:userId", userController.userDeleteController);
// Create User
router.post("/", createController.registerController);
// get all users
router.get("/", userController.getUsersController);

// TODO:  router.put("/:userId", () => {});

module.exports = router;
