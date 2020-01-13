
export function getUser() {
    return JSON.parse(localStorage.getItem('userDetails'));
}

export function setUser(user) {
    localStorage.setItem("userDetails", JSON.stringify(user))
}

export function logoutUser() {
    localStorage.removeItem("userDetails");
}

export function validateEmail(email) {
    // eslint-disable-next-line
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
