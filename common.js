function validateUserLoggedIn() {
    var validate = true;
    let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')); //revisa si existe una lista de users en el local storage
        if (!userLoggedIn) {
            if (!(window.location.pathname == "/Workshops/Proyecto2/registro.html")){
                window.location.href = "./login.html"
            }
        }
}
validateUserLoggedIn();