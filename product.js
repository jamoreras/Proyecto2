$(document).on('ready', function () {
    let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
    const urlParams = new URLSearchParams(window.location.search);//obtiene todos los parametros de la url
    var editProductId = urlParams.get("id");//Obtiene el valor del parametro id
    if (editProductId) {
        let productsDb = JSON.parse(localStorage.getItem('products'));
        var existe = false;
        productsDb.forEach((product) => {
            if (editProductId == product.id) {
                if (product.ownerId == userLoggedIn[0].id) {
                    $('.txtName').val(product.name),
                        $('.txtDescription').val(product.description),
                        $('.txtUrl').val(product.url),
                        $('.txtTrade').val(product.trade),
                        $('.editandoProducto').text("Editando producto # " + product.id)
                } else {
                    history.back();// por si quieren cambiar el id del url
                    //window.location.href = "./dashboard.html";
                }
                existe = true;
            }
        });
        if (!existe) {
            history.back();
            // window.location.href = "./dashboard.html";
        }

    }

    $(".btnGuardarProducto").on('click', function (event) {
        event.preventDefault(); //evita el evento del form


        if (urlParams.get("id"))//si tiene id que viene del url llama la funcion editar
        {
            editProduct(urlParams.get("id"))//toma el valor del parametro id
        } else {

            addProduct();
        }
    });
    function addProduct() {

        //insert to a database

        let productsDb = JSON.parse(localStorage.getItem('products')); //revisa si existe una lista de products en el local storage
        if (!productsDb) {
            productsDb = []; //si esta vacia la crea en blanco en un array
        }
        let maxID = 1
        productsDb.forEach((product) => {
            maxID = product.id + 1 // la recorre para buscar el maximoid
        })

        const product = { //crea un objeto usuario con los valores de las cajas de texto del form 
            id: maxID,
            name: $('.txtName').val(),
            description: $('.txtDescription').val(),
            url: $('.txtUrl').val(),
            trade: $('.txtTrade').val(),
            ownerId: userLoggedIn[0].id //el dueno del articulo va ser el usuario que este loggeado
        }

        if (validate(product)) {
            productsDb.push(product);// inserta el nuevo objeto en la lista
            localStorage.setItem('products', JSON.stringify(productsDb));// mete el producto en la lista en forma de string
            window.location.href = "./dashboard.html";
        }
    }
    //
    function editProduct(id) { //recive un id
        //edit to a database
        const products = JSON.parse(localStorage.getItem('products'));
        var validarEditar = false;

        if (products) {
            products.forEach((product) => {
                if (product.id == id) {
                    product.name = $('.txtName').val();
                    product.description = $('.txtDescription').val();
                    product.url = $('.txtUrl').val();
                    product.trade = $('.txtTrade').val();
                    if (validate(product)) {
                    validarEditar= true;
                    }
                }
            }
            );
            if (validarEditar) {
                localStorage.setItem('products', JSON.stringify(products));//no le hace push porque lo esta editando
                window.location.href = "./dashboard.html";
            }
        }
    }

    function validate(newProduct) {//pone las casillas en rojo si estan en blanco

        let valid = true;

        if (!newProduct.name) {
            $("span.txtName").addClass("visible");
            $('.txtName').addClass("invalid");
            valid = false;
        }
        else {
            $("span.txtName").removeClass("visible");
            $('.txtName').removeClass("invalid");
        }
        if (!newProduct.description) {
            $("span.txtDescription").addClass("visible");
            $('.txtDescription').addClass("invalid");
            valid = false;
        }
        else {
            $("span.txtDescription").removeClass("visible");
            $('.txtDescription').removeClass("invalid");
        }
        if (!newProduct.url) {
            $("span.txtUrl").addClass("visible");
            $('.txtUrl').addClass("invalid");
            valid = false;
        }
        else {
            $("span.txtUrl").removeClass("visible");
            $('.txtUrl').removeClass("invalid");
        }
        if (!newProduct.trade) {
            $("span.txtTrade").addClass("visible");
            $('.txtTrade').addClass("invalid");
            valid = false;
        }
        else {
            $("span.txtTrade").removeClass("visible");
            $('.txtTrade').removeClass("invalid");
        }
        return valid;
    }


});
