

function showProductFormModal(e) {

    const modalElement =
        document.getElementById("productModal");

    if (!modalElement)
        return;

    const modal =
        bootstrap.Modal.getOrCreateInstance(modalElement);

    modal.show();
}

function productSaved(e) {

    console.log("Complete:", e);
    console.log("Server data:", e.data);

    if (!e.data?.result) {
        return;
    }

    const modalElement =
        document.getElementById("productModal");

    if (modalElement) {

        bootstrap.Modal
            .getOrCreateInstance(modalElement)
            .hide();
    }

    refreshProducts();
}
function productDeleted(e) {

    console.log("Complete:", e);
    console.log("Server data:", e.data);

    if (!e.data?.result) {
        return;
    }

    alert(e.data?.message);

    refreshProducts();
}
function refreshProducts() {

    const refreshButton =
        document.getElementById("refreshProducts");

    if (!refreshButton)
        return;

    refreshButton.click();
}