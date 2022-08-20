$(document).on('ready', function () {//el ejecuta el codigo hasta que el doc cargue por completo

    $(".btnIngresar").on('click', function (event) {
        event.preventDefault(); // previene el submit del formulario, para que no lo mande por el url
        login();
    });
    function login() {

        //json parce transforma string a objeto
        let usersDb = JSON.parse(localStorage.getItem('users')); //revisa si existe una lista de users
        let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')); //revisa si existe un user loggeado d-none
        if (userLoggedIn) {//booleano 
            window.location.href = "./dashboard.html"
        }
        else{
            userLoggedIn = []//cambia la variable ''null'' por un arreglo vacio
        }
        
        
        const userLogIn = { //crea un objeto usuario con los valores de las cajas de texto del form 
            id:null,
            email: $('.txtEmail').val(),
            password: $('.txtPassword').val(),
            name:null
        }

        if (validate(userLogIn,usersDb)){ //valida si el usuario esta en el local storage y si cumple el formato del correo
            userLoggedIn.push(userLogIn); //json stringify pasa de objeto a string
            localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedIn));// agrega el obj usuario al loggearse
            window.location.href = "./dashboard.html"
        }
    }

    function validateUserLogIn(userList, userLogIn) {
        var validate = false;
        userList.forEach((user) => {
            if (user.email == userLogIn.email){
                if (user.password == userLogIn.password){
                    userLogIn.name= user.name;
                    userLogIn.id=user.id;
                    validate = true;
                }
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

   
        if (!validateEmail(newUser.email)) {
            $("span.txtEmail").text("Ingrese el correo con el siguiente formato correo@dominio.xx");
            $("span.txtEmail").addClass("visible");
            $('.txtEmail').addClass("invalid");
            $('span.txtEmail').attr("aria-hidden", false);
            $('span.txtEmail').attr("aria-invalid", true);
            valid = false;
        }
        else{
            $("span.txtEmail").removeClass("visible");
            $('.txtEmail').removeClass("invalid");
            $('span.txtEmail').attr("aria-hidden", true);
            $('span.txtEmail').attr("aria-invalid", false)

            if(!validateUserLogIn(userList, newUser))
            {
                $("span.logIn").addClass("visible");
                $('.logIn').addClass("invalid");
                $('span.logIn').attr("aria-hidden", false);
                $('span.logIn').attr("aria-invalid", true);
                valid = false;
            }
            else
            {
                $("span.logIn").removeClass("visible");
                $('.logIn').removeClass("invalid");
                $('span.logIn').attr("aria-hidden", true);
                $('span.logIn').attr("aria-invalid", false);
            }
        }
        if (!newUser.password) {
            $("span.txtPassword").addClass("visible");
            $('.txtPassword').addClass("invalid");
            $('span.txtPassword').attr("aria-hidden", false);
            $('span.txtPassword').attr("aria-invalid", true);
            valid = false;
        }
        else{
            $("span.txtPassword").removeClass("visible");
            $('.txtPassword').removeClass("invalid");
            $('span.txtPassword').attr("aria-hidden", true);
            $('span.txtPassword').attr("aria-invalid", false);
        }


        return valid;
      }
      

});
