$(document).on('ready', function () {
    const urlParams = new URLSearchParams(window.location.search);  //?id=1 obtiene los parametros del url
    var productId = urlParams.get("id"); // obtiene el valor del parametro id
    if (productId) {
        let productsDb = JSON.parse(localStorage.getItem('products'));// se trae de local storage la lista de productos
        var existe = false;
        productsDb.forEach((product) => {//recorre la lista
            if (productId == product.id) { //si el id que viene del url es igual a uno de la lista le muestra los datos
                $('.txtName').text(product.name);
                $('.txtOwner').text('Ofrecido por: ' + getProductOwnerName(product.ownerId));
                $('.txtDescription').text(product.description);
                $('.txtUrl').attr('src', product.url);
                $('.txtTrade').text(product.trade);
                existe = true;
            }

        });
        if (!existe) {
            //window.location.href = "./index.html";
            history.back();
        }
    } else {
        //window.location.href = "./index.html";
        history.back();
    }
});