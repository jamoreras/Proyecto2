$(document).on('ready', function () {

    $(".btnRegistrarse").on('click', function (event) {
        event.preventDefault();
        addUser();
    });
    function addUser() {

        //insert to a database
        let usersDb = JSON.parse(localStorage.getItem('users')); //revisa si existe una lista de users en el local storage
        if (!usersDb) {
            usersDb = []; //si esta vacia la crea en blanco en un array
        }
        let maxID = 1
        usersDb.forEach((user) => {
            maxID = user.id + 1 // la recorre para buscar el maximoid
        })

        const user = { //crea un objeto usuario con los valores de las cajas de texto del form 
            id: maxID,
            name: $('.txtName').val(),
            lastName: $('.txtLastName').val(),
            address: $('.txtAddress').val(),
            address2: $('.txtAddress2').val(),
            country: $('.cmbCountry').children("option:selected").text(),
            city: $('.txtCity').val(),
            email: $('.txtEmail').val(),
            password: $('.txtPassword').val()
        }

        if (validate(user, usersDb)) {
            usersDb.push(user);// inserta el nuevo objeto en la lista
            localStorage.setItem('users', JSON.stringify(usersDb));// remplaza el obj usuario por la lista modificada
            window.location.href = "./login.html"
        }
    }

    function validateUserEmail(userList, email) {
        var validate = true;
        userList.forEach((user) => {
            if (user.email == email) {
                validate = false;
            }
        })
        return validate;
    }

    function validate(newUser, userList) {

        let valid = true;

        const validateEmail = (email) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };

        if (!newUser.name) {
            $("span.txtName").addClass("visible");
            $('.txtName').addClass("invalid");
            $('span.txtName').attr("aria-hidden", false);
            $('span.txtName').attr("aria-invalid", true);
            valid = false;
        }
        else {
            $("span.txtName").removeClass("visible");
            $('.txtName').removeClass("invalid");
            $('span.txtName').attr("aria-hidden", true);
            $('span.txtName').attr("aria-invalid", false);
        }
        if (!newUser.lastName) {
            $("span.txtLastName").addClass("visible");
            $('.txtLastName').addClass("invalid");
            $('span.txtLastName').attr("aria-hidden", false);
            $('span.txtLastName').attr("aria-invalid", true);
            valid = false;
        }
        else {
            $("span.txtLastName").removeClass("visible");
            $('.txtLastName').removeClass("invalid");
            $('span.txtLastName').attr("aria-hidden", true);
            $('span.txtLastName').attr("aria-invalid", false);
        }
        if (!newUser.address) {
            $("span.txtAddress").addClass("visible");
            $('.txtAddress').addClass("invalid");
            $('span.txtAddress').attr("aria-hidden", false);
            $('span.txtAddress').attr("aria-invalid", true);
            valid = false;
        }
        else {
            $("span.txtAddress").removeClass("visible");
            $('.txtAddress').removeClass("invalid");
            $('span.txtAddress').attr("aria-hidden", true);
            $('span.txtAddress').attr("aria-invalid", false);
        }
        if (!newUser.city) {
            $("span.txtCity").addClass("visible");
            $('.txtCity').addClass("invalid");
            $('span.txtCity').attr("aria-hidden", false);
            $('span.txtCity').attr("aria-invalid", true);
            valid = false;
        }
        else {
            $("span.txtCity").removeClass("visible");
            $('.txtCity').removeClass("invalid");
            $('span.txtCity').attr("aria-hidden", true);
            $('span.txtCity').attr("aria-invalid", false);
        }
        if (!validateEmail(newUser.email)) {
            $("span.txtEmail").text("Ingrese el correo con el siguiente formato correo@dominio.xx");
            $("span.txtEmail").addClass("visible");
            $('.txtEmail').addClass("invalid");
            $('span.txtEmail').attr("aria-hidden", false);
            $('span.txtEmail').attr("aria-invalid", true);
            valid = false;
        }
        else {
            if (!validateUserEmail(userList, newUser.email)) {
                $("span.txtEmail").text("Ya existe un usuario con este correo");
                $("span.txtEmail").addClass("visible");
                $('.txtEmail').addClass("invalid");
                $('span.txtEmail').attr("aria-hidden", false);
                $('span.txtEmail').attr("aria-invalid", true);
                valid = false;
            }
            else {
                $("span.txtEmail").removeClass("visible");
                $('.txtEmail').removeClass("invalid");
                $('span.txtEmail').attr("aria-hidden", true);
                $('span.txtEmail').attr("aria-invalid", false)
            }
        }
        if (!newUser.password) {
            $("span.txtPassword").addClass("visible");
            $('.txtPassword').addClass("invalid");
            $('span.txtPassword').attr("aria-hidden", false);
            $('span.txtPassword').attr("aria-invalid", true);
            valid = false;
        }
        else {
            $("span.txtPassword").removeClass("visible");
            $('.txtPassword').removeClass("invalid");
            $('span.txtPassword').attr("aria-hidden", true);
            $('span.txtPassword').attr("aria-invalid", false);
        }


        return valid;
    }


});
