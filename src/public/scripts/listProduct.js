async function getProds() {
    let url = './api/productos';
    try {
        let res = await fetch(url);
        console.log(res);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}


async function renderProds() {
    let prods = await getProds();
    let html = '';
    prods.forEach(producto => {
        let htmlSegment = `<div class="user">
                            <img src="${producto.urlFotoProducto}" >
                            <h2>${producto.firstName} ${producto.lastName}</h2>
                            <div class="email"><a href="email:${producto.email}">${producto.email}</a></div>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('#contenedor');
    container.innerHTML = html;
}


(function () {
    renderProds();
})();