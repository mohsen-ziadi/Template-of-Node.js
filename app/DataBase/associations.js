// Associations
const User = require("./models/user");
const Image = require("./models/image");


User.hasMany(Image);
Image.belongsTo(User);


// User.belongsToMany(Image, {
//   through: "user_image",
//   as: "images",
//   onUpdate: "CASCADE",
//   onDelete: "CASCADE",
// });
// Image.belongsToMany(User, {
//   through: "user_image",
//   as: "users",
//   onUpdate: "CASCADE",
//   onDelete: "CASCADE",
// });







