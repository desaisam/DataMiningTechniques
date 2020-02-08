
(function () {
    var $usernameFld, $psswdFld;
    var $removeBtn, $editBtn, $createBtn;
    var $firstNameFld, $lastNameFld, $roleFld;
    var $userRowTemplate, $tablebody;
    var userService = new AdminUserServiceClient();
    $(main);

    function main() {

        $usernameFld = $("#usernameFld");
        $psswdFld = $("#passwordFld");
        $firstNameFld = $("#firstNameFld");
        $roleFld = $("#roleFld");
        $lastNameFld = $("#lastNameFld");

        $userRowTemplate = $(".wbdv-template.wbdv-user");
        $formTemplate = $(".wbdv-form");
        $tablebody = $(".wbdv-tbody");
        $searchBtn = $('.wbdv-search');
        $createBtn = $(".wbdv-create");
        $editBtn = $(".wbdv-edit");
        $updateBtn = $(".wbdv-update");
        $removeBtn = $(".wbdv-remove");
        $(findAllUsers);
        $createBtn.click(createUser);
        $removeBtn.click(deleteUser);

    }

    function createUserObject() {
        let username = $usernameFld.val()
        let password = $psswdFld.val()
        let firstName = $firstNameFld.val()
        let lastName = $lastNameFld.val()
        let role = $roleFld.val()
        let userObj = {
            "id": Math.floor((Math.random() * 100) + 1),
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "role": role
        }

        return userObj;
    }
    function createUser() {

        let userObj = createUserObject();
        userService.createUser(userObj).then(function (value) {
            renderUser(value)
        });
        $usernameFld.val("");
        $psswdFld.val("");
        $roleFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");


    }
    function findAllUsers() {
        userService.findAllUsers().then(renderUsers)
    }
    function findUserById() {
        userService.findUserById.then(renderUser);
    }
    function deleteUser() {
        let deleteId = $(event.currentTarget).attr("id");
        // console.log(deleteId);
        
        userService.deleteUser(deleteId);
        let button = $(event.currentTarget);
        let tableRow = button.parents(".wbdv-template");
        tableRow.remove();

        $usernameFld.val("");
        $psswdFld.val("");
        $roleFld.val("");
        $firstNameFld.val("");
        $lastNameFld.val("");
    }
    function selectUser() {
        let userId = $(event.currentTarget).attr("id");
        let trow = $(event.currentTarget).parents(".wbdv-template.wbdv-user");
        $usernameFld.val((trow.find(".wbdv-username").text()));
        $psswdFld.val((trow.find(".wbdv-password").text()));
        $firstNameFld.val((trow.find(".wbdv-first-name").text()));
        $lastNameFld.val((trow.find(".wbdv-last-name").text()));
        $roleFld.val((trow.find(".wbdv-role").text()));
        $updateBtn.attr("id", userId);
        $updateRowId = userId;
        $formTemplate.find(".wbdv-update").click(updateUser);
    }
    function updateOneUser(user) {
        let updatedUser = $userRowTemplate.clone();
        let rowId = $("#" + user.id);
        let trow = rowId.parents(".wbdv-template");
        trow.find(".wbdv-username").html(user.username);
        trow.find(".wbdv-password").html(user.password);
        trow.find(".wbdv-first-name").html(user.firstName);
        trow.find(".wbdv-last-name").html(user.lastName);
        trow.find(".wbdv-role").html(user.role);
        $firstNameFld.val("");
        $usernameFld.val("");
        $psswdFld.val("");
        $lastNameFld.val("");
        $roleFld.val("");
    }
    function updateUser() {
        let userId = $(event.currentTarget).attr("id");
        console.log(userId);
        let username = $usernameFld.val();
        let password = $psswdFld.val();
        let firstName = $firstNameFld.val();
        let lastName = $lastNameFld.val();
        let role = $roleFld.val();

        let updatedUser = {
            "id": userId,
            "username": username,
            "password": password,
            "firstName": firstName,
            "lastName": lastName,
            "role": role
        }
        userService.updateUser(userId, updatedUser).then(function (data) {
            updateOneUser(data)
        });
    }
    function searchUser(user) {
        let findUser = createUserObject();
        let searchThisObject = "username=" + findUser.username
            + "&password=" + findUser.password
            + "&firstName=" + findUser.firstName
            + "&lastName=" + findUser.lastName
            + "&role=" + findUser.role;
        userService
            .searchThisUser(searchThisObject)
            .then(function (value) {
                renderThisUser(value);
            });


    }

    function renderThisUser(users){
		$tablebody.children(".wbdv-template.wbdv-user").remove();
		renderUsers(users);
		
		
	}

    function renderUser(user) {

        let newUser = $userRowTemplate.clone();
        newUser.removeClass("wbdv-hidden");
        newUser.find(".wbdv-username").html(user.username);
        newUser.find(".wbdv-password").html(user.password);
        newUser.find(".wbdv-first-name").html(user.firstName);
        newUser.find(".wbdv-last-name").html(user.lastName);
        newUser.find(".wbdv-role").html(user.role);

        $editBtn.click(selectUser);

        let deleteId = user._id;
       // console.log("Checking for the ID" + deleteId);
        
        newUser.find(".wbdv-remove").attr("id", deleteId).click(deleteUser);

        newUser.find('.wbdv-edit').attr("id",  user._id).click(selectUser);
        $searchBtn.click(searchUser);
        $tablebody.append(newUser);
        
    }
    function renderUsers(users) {
        for (let u in users) {
            let user = users[u]
            renderUser(user);
        }
    }


  
})();
