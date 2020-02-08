
function User(username, password, firstName, lastName, role) {
    this.username = username;
    this.password = password;
    this.id = id;
    this.firstName = firstName;
    this.lastName - lastName;
  
    this.setUsername = setUsername;
    this.getUsername = getUsername;
    // ...same for rest of properties…
    this.getPassword = getPassword;
    this.setPassword = setPassword;
    this.getFirstName = getFirstName;
    this.setFirstName = setFirstName;
    this.getLastName = getLastName;
    this.setLastName = setLastName;
  
    function setUsername(username) {
      this.username = username;
    }
    function getUsername() {
      return this.username;
    }
    // ...same for rest of properties…

    function setPassword(password){
        this.password = password;
    }

    function getPassword(){
        return this.password;
    }

    function setFirstName(firstName){
        this.firstName = firstName;
    }

    function getFirstName(){
        return this.firstName;
    }

    function setLastName(lastName){
        this.lastName = lastName;
    }

    function getLastName(){
        return this.lastName;
    }
  }
  