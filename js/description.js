
const productos = JSON.parse(localStorage.getItem("productos"));  
const cardContainer = document.getElementById("card-container");

const url = new URL(window.location.href);
const identificador = url.searchParams.get("identificador");

const prod = productos.find((producto) => {
    if(producto.id === identificador) {
        return true;
    }
});

cardContainer.innerHTML = 
        `<article class="product-card">
            <div class="card-header">
                <figure>
                    <img src="${prod.imagen}" alt="${prod.titulo}">
                </figure>
            </div>
            <div class="card-main">
                <h2>${prod.titulo}</h2>
                <div class="card-description">
                    <p>${prod.descripcion}</p>
                </div>
                <div class="card-prices">
                    <div class="card-date">${prod.fechaDeCreacion}</div>
                    <div class="card-price neon">$${prod.precio}</div>
                </div>
            </div>
            <div class="card-footer">
                <a href="/pages/product/description.html?identificador=e27dea38-7125-11ee-b962-0242ac120002" class="boton"><i class="fas fa-link"></i> Ver más</a>
                <a href="#" class="boton"><i class="fa-solid fa-cart-shopping"></i> Comprar</a> 
            </div>
        </article>`;
