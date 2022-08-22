$(document).on('ready', function () {//el ejecuta el codigo hasta que el doc cargue por completo

    $(".btnIngresar").on('click', function (event) {
        event.preventDefault(); // previene el submit del formulario, para que no lo mande por el url
        login();
    });
    function login() {

        //json parce transforma string a objeto
        let usersDb = JSON.parse(localStorage.getItem('users')); //revisa si existe una lista de users
        let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')); //revisa si existe un user loggeado 
        if (userLoggedIn) {//booleano 
            window.location.href = "./dashboard.html"
        }
        else {
            userLoggedIn = []//cambia la variable ''null'' por un arreglo vacio
        }


        const userLogIn = { //crea un objeto usuario con los valores de las cajas de texto del form 
            id: null,
            email: $('.txtEmail').val(),
            password: $('.txtPassword').val(),
            name: null
        }
            //verifica que todo se cumpla para poder loggearse
        if (validate(userLogIn, usersDb)) { //valida si el usuario esta en el local storage y si cumple el formato del correo
            userLoggedIn.push(userLogIn); //json stringify pasa de objeto a string
            localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedIn));// agrega el obj usuario al loggearse
            window.location.href = "./dashboard.html"
        }
    }

    function validateUserLogIn(userList, userLogIn) { //valida que user y password sean correctos
        var validate = false;
        userList.forEach((user) => {
            if (user.email == userLogIn.email) {// comparo que email sea igual
                if (user.password == userLogIn.password) {//comparo que password sea igual
                    userLogIn.name = user.name; //agrego id y nombre al objeto del usuario logeandose
                    userLogIn.id = user.id;
                    validate = true;
                }
            }
        })
        return validate;
    }

    function validate(userLogIn, userList) {

        let valid = true;

        const validateEmail = (email) => {// valida si tiene formato de correo
            return String(email)
                .toLowerCase()
                .match(// match retorna un booleano
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };


        if (!validateEmail(userLogIn.email)) {
            $("span.txtEmail").text("Ingrese el correo con el siguiente formato correo@dominio.xx");
            $("span.txtEmail").addClass("visible");
            $('.txtEmail').addClass("invalid");
            valid = false;
        }
        else {
            $("span.txtEmail").removeClass("visible");
            $('.txtEmail').removeClass("invalid");

            if (!validateUserLogIn(userList, userLogIn)) {
                $("span.logIn").addClass("visible");
                $('.logIn').addClass("invalid");
                valid = false;
            }
            else {
                $("span.logIn").removeClass("visible");
                $('.logIn').removeClass("invalid");
            }
        }
        if (!userLogIn.password) {
            $("span.txtPassword").addClass("visible");
            $('.txtPassword').addClass("invalid");
            valid = false;
        }
        else {
            $("span.txtPassword").removeClass("visible");
            $('.txtPassword').removeClass("invalid");
        }

        return valid;
    }


});
