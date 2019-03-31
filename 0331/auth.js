

function User(email, password){
    this.email = email;
    this.password = password;
}


var users = [];

users.push(new User('home@naver.com', '123'))
users.push(new User('home@naver.com', '123'))

function login (email, password){
    for(var i =0; i< users.length; i++){
        if(users[i].email === email && users[i].password === password){
            return true;
        }
    }
    return false;
}

module.exports = {
    login
}

