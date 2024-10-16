var form = document.getElementById("dph");
document.getElementById("domain").focus();
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}

function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    var domain = document.getElementsByName("domain")[0].value;
    var passwordField = document.getElementsByName("password")[0];
    var password = passwordField.value;
    passwordField.value = "";
    var hashField = document.getElementsByName("hash")[0];

    hashField.value = calculate_hash_from(domain, password, true);
    hashField.focus();
    hashField.select();

    // You must return false to prevent the default form behavior
    return false;
}
