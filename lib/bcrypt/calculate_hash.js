// Call this script via: node ${SCRIPTNAME} "calculate_hash_from('${DOMAIN}', '${PASSWORD}');"
// Remember to have 'bcryptjs' installed first (npm install bcryptjs)

var SALT_LENGTH = 22;
var FILL_CHAR = "X";
var ALGORITHM = "2a"; // Algorithm Identifier (BCrypt, UTF8 encoded password, null terminated)
var COST_FACTOR = "12"; // Cost Factor (e.g. 2^10 = 1,024 rounds)
var HASH_LENGTH = 12;

function shortenDomain(domain) {
    return domain.slice(0, SALT_LENGTH - 1);
}

function replaceInvalidCharacters(domain) {
    return domain.replace(/-/g, "/");
}

function fillUnusedSpace(domain) {
    var amountToFill = SALT_LENGTH - domain.length + 1;
    return domain + Array(amountToFill).join(FILL_CHAR);
}

function prepareDomain(domain) {
    domain = shortenDomain(domain);
    domain = replaceInvalidCharacters(domain);
    domain = fillUnusedSpace(domain);

    return domain;
}

// Call this one
function calculate_hash_from(domain, password, forBrowser) {
    // for Node.js or for browser?
    // Ensure to include bcrypt.js via a HTML script-element

    var bcrypt = forBrowser ? dcodeIO.bcrypt : require("bcryptjs");
    var preparedDomain = prepareDomain(domain);

    var salt = "$" + ALGORITHM + "$" + COST_FACTOR + "$" + preparedDomain;
    var hash = bcrypt.hashSync(password, salt).slice(29).slice(0, HASH_LENGTH);

    return hash;
}

if (typeof process === "undefined") {
    console.log("This is not Node.js");
} else {
    console.log(eval(process.argv[2]));
}
