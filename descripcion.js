$(document).on('ready', function () {
    const urlParams = new URLSearchParams(window.location.search);
    let userLoggedIn = JSON.parse(localStorage.getItem('userLoggedIn'));
    var editId = urlParams.get("id");
    if (editId) {
        let productsDb = JSON.parse(localStorage.getItem('products'));
        productsDb.forEach((product) => {
            if (editId == product.id) {
                $('.txtName').text(product.name);
                $('.txtOwner').text(getProductOwnerName(product.owner));
                $('.txtDescription').text(product.description);
                $('.txtUrl').attr('src', product.url);
                $('.txtTrade').text(product.trade);
            }
        });
    }
});