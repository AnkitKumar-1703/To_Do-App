const bcrypt = require('bcrypt');
async function checkPassword(password, hashedPassword) {
    const match = await bcrypt.compare(password, hashedPassword);
    // console.log(match);
    
    return match;
}
module.exports = { checkPassword };