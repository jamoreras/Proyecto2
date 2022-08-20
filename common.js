function validateUserLoggedIn() {
    var validate = true;
    let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn')); //revisa si existe una lista de users en el local storage 
    if (!userLoggedIn) {
            if (!(window.location.pathname == "/Workshops/Proyecto2/registro.html") 
            && !(window.location.pathname == "/Workshops/Proyecto2/cambalaches.html") 
            && !(window.location.pathname == "/Workshops/Proyecto2/index.html")
            && !(window.location.pathname == "/Workshops/Proyecto2/login.html")){
                window.location.href = "./login.html"
            }
        }
        else{
            $('.userNameLogged').text(userLoggedIn[0].name)
            $('.bienvenidoNavBar').removeClass("d-none");
            $('.loggeado').removeClass("d-none");
            $('.desloggeado').addClass("d-none");
        }
}
validateUserLoggedIn();

function logOut(){
    localStorage.setItem('userLoggedIn', JSON.stringify(null));
    $('.bienvenidoNavBar').addClass("d-none");
    $('.desloggeado').removeClass("d-none");
    $('.loggeado ').addClass("d-none");
    window.location.href = "./login.html"
}
function getProductOwnerName(ownerId) {
    var name = "";
    let users = JSON.parse(localStorage.getItem('users'));
    users.forEach((user) => {
        if (ownerId == user.id) {
            name = user.name;
        }
    });
    return name;
}
