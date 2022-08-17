$(document).on('ready', function () {


    $(".btnIngresar").on('click', function (event) {

        event.preventDefault();
        login();



    });
    function login() {

        //insert to a database
        let usersDb = JSON.parse(localStorage.getItem('users'));
        let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')); //revisa si existe una lista de users en el local storage
        if (userLoggedIn) {
            window.location.href = "./index.html"
        }
        else{
            userLoggedIn = []
        }
        
        
        const userLogIn = { //crea un objeto usuario con los valores de las cajas de texto del form 
            email: $('.txtEmail').val(),
            password: $('.txtPassword').val(),
            name:null
        }

        if (validate(userLogIn,usersDb)){
            userLoggedIn.push(userLogIn);
            localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedIn));// remplaza el obj usuario por la lista modificada
            window.location.href = "./index.html"
        }
    }

    function validateUserLogIn(userList, userLogIn) {
        var validate = false;
        userList.forEach((user) => {
            if (user.email == userLogIn.email){
                if (user.password == userLogIn.password){
                    userLogIn.name= user.name
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
