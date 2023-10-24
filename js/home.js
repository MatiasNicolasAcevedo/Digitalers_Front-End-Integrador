
let productosPrimerInicio = [
    {
        id: "e27dea38-7125-11ee-b962-0242ac120002",
        imagen: "/assets/images/card1.jpg",
        titulo: "Introducción a la Programación en Java",
        descripcion: "Este curso introductorio te llevará a través de los fundamentos de la programación utilizando Java.",
        fechaDeCreacion: "17/01/2023",
        precio: 2500,
        categoria: "java"
    },
    {
        id: "fb8bafb0-7125-11ee-b962-0242ac120002",
        imagen: "/assets/images/card2.jpg",
        titulo: "Programación Orientada a Objetos en Java",
        descripcion: "En este curso, profundizarás en los principios de la programación orientada a objetos(POO) aplicados en Java.",
        fechaDeCreacion: "10/02/2023",
        precio: 3500,
        categoria: "java"
    },
    {
        id: "03d2c0aa-7126-11ee-b962-0242ac120002",
        imagen: "/assets/images/card3.jpg",
        titulo: "Desarrollo de Aplicaciones de Consola en Java",
        descripcion: "Aprende a construir aplicaciones de consola interactivas en Java. Trabajar con flujos de entrada/salida.",
        fechaDeCreacion: "22/03/2023",
        precio: 3500,
        categoria: "java"
    },
    {
        id: "0cfa2132-7126-11ee-b962-0242ac120002",
        imagen: "/assets/images/card4.png",
        titulo: "Introducción a JavaFX para Interfaces Gráficas",
        descripcion: "JavaFX es crucial para el desarrollo de interfaces gráficas modernas en Java.",
        fechaDeCreacion: "01/04/2023",
        precio: 4999,
        categoria: "java"
    },
    {
        id: "173729f6-7135-11ee-b962-0242ac120002",
        imagen: "/assets/images/card5.jpg",
        titulo: "Conexión a Bases de Datos con JDBC",
        descripcion: "Descubre cómo interactuar con bases de datos desde aplicaciones Java utilizando JDBC.",
        fechaDeCreacion: "25/05/2023",
        precio: 7500,
        categoria: "base-de-datos"
    },
    {
        id: "1dd9442e-7135-11ee-b962-0242ac120002",
        imagen: "/assets/images/card6.png",
        titulo: "Introducción a Spring Framework",
        descripcion: "Spring es un marco de trabajo esencial en el desarrollo de aplicaciones Java.",
        fechaDeCreacion: "20/06/2023",
        precio: 8999,
        categoria: "framework"
    },
    {
        id: "241753ee-7135-11ee-b962-0242ac120002",
        imagen: "/assets/images/card7.png",
        titulo: "Desarrollo de Aplicaciones Web con Spring MVC",
        descripcion: "Aprende a construir aplicaciones web interactivas y dinámicas, utilizando Spring MVC.",
        fechaDeCreacion: "06/07/2023",
        precio: 14999,
        categoria: "framework"
    },
    {
        id: "29783fba-7135-11ee-b962-0242ac120002",
        imagen: "/assets/images/card8.jpg",
        titulo: "Desarrollo de Aplicaciones RESTful con Spring Boot",
        descripcion: "En este curso descubrirás cómo desarrollar servicios web RESTful utilizando Spring Boot.",
        fechaDeCreacion: "24/12/2023",
        precio: 29999,
        categoria: "framework"
    }
];

if(localStorage.getItem("productos") == null) {
    localStorage.setItem("productos", JSON.stringify(productosPrimerInicio));
}

const productos = JSON.parse(localStorage.getItem("productos"));  
const cardContainer = document.getElementById("card-container");

productos.forEach((prod) => {
    cardContainer.innerHTML += 
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
});

/*

<article class="product-card">
    <div class="card-header">
        <figure>
            <img src="/assets/images/card1.jpg" alt="Logo-card-1">
        </figure>
    </div>
    <div class="card-main">
        <h2>Introducción a la Programación en Java</h2>
        <div class="card-description">
            <p>
                Este curso introductorio te llevará a través de los fundamentos de la programación utilizando Java.
            </p>
        </div>
        <div class="card-prices">
            <div class="card-date">17/01/2023</div>
            <div class="card-price neon">$2500</div>
        </div>
    </div>
    <div class="card-footer">
        <a href="/pages/product/description.html?identificador=aashdgadhgajs" class="boton"><i class="fas fa-link"></i> Ver más</a>
        <a href="#" class="boton"><i class="fa-solid fa-cart-shopping"></i> Comprar</a> 
    </div>
</article>

*/
