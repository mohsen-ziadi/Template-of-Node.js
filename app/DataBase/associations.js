// Associations
const User = require("./models/user");
const Image = require('../Database/models/image'); 



User.hasMany(Image);
Image.belongsTo(User);









