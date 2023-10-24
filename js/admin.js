
let productos = JSON.parse(localStorage.getItem("productos")); 
let idEditar;
const inputFiltrarHTML = document.getElementById("filtrar"); 
const btn = document.querySelector('button.btn[type="submit"]');
const tableBodyHTML = document.querySelector("#table-body");
const formularioProductoHTML = document.getElementById("formularioProducto");

pintarProductos(productos); 
formularioProductoHTML.addEventListener('change', formValidity);

// AGREGAR - EDITAR PRODUCTOS
formularioProductoHTML.addEventListener('submit', (event) => {  
    event.preventDefault();
    const elem = formularioProductoHTML.elements;
    let id = idEditar === undefined ? crypto.randomUUID() : idEditar;

    const nuevoProducto = {
        id: id,
        titulo: elem.titulo.value,
        descripcion: elem.descripcion.value,
        precio: elem.precio.valueAsNumber,
        imagen: elem.imagen.value,
        categoria: elem.categoria.value,
        fechaDeCreacion: obtenerFecha()
    }

    if(idEditar) {
        const index = productos.findIndex(producto => { 
            return producto.id === idEditar;
        });
        productos[index] = nuevoProducto;
        idEditar = undefined;  
        btn.innerText = "Agregar producto"; 
        btn.classList.remove('btn-success');
    } else {
        productos.push(nuevoProducto); 
    }   

    Swal.fire({ 
        icon: 'sucess',
        title: 'Producto agregado/modificado correctamente',
        text: 'El producto se actualizo o modifico correctamente!'
    });

    pintarProductos(productos);
    localStorage.setItem("productos", JSON.stringify(productos)); 
    formularioProductoHTML.reset(); 
    elem.titulo.focus(); 
});

// FUNCION PARA PINTAR PRODUCTOS + ACCIONES: borrar y editar.
function pintarProductos(arrayAPintar) {
    tableBodyHTML.innerHTML = "";

    arrayAPintar.forEach(function(producto, index) { 
        tableBodyHTML.innerHTML +=  
            `<tr class="fila">
                <td class="table-image"><img src="${producto.imagen}" alt="${producto.titulo}"></td>
                <td class="table-title">${producto.titulo}</td>
                <td class="table-description">${producto.descripcion}</td>
                <td class="table-price">$${producto.precio}</td>
                <td class="table-category">${producto.categoria}</td>
                <td >
                    <div class="d-flex gap-1">
                        <button class="btn-delete btn btn-danger btn-sm" onclick="borrarProducto('${producto.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="btn btn-success btn-sm" onclick="editarProducto('${producto.id}')" data-bs-toggle="modal" data-bs-target="#formModal">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
    });
}

// FUNCION PARA FILTRAR PRODUCTOS.
inputFiltrarHTML.addEventListener('keyup', (event) => {
    const busqueda = event.target.value.toLowerCase();  
    const resultado = productos.filter((producto) => {  
        const titulo = producto.titulo.toLowerCase();

        if(titulo.includes(busqueda)) {
            return true;
        } 
        return false;
    });
    pintarProductos(resultado);
});

// FUNCION PARA BORRAR PRODUCTO.
const borrarProducto = (idABuscar) => {
    Swal.fire({
        title: 'Desea borrar producto',
        icon: 'error',
        text: 'Realmente desea eliminar el producto?',
        showCloseButton: true,
        showCancelButton: true,
        cancelButtonText: 'Cancela',
        confirmButtonText: 'Borrar'
    }).then((result) => {
        if(result.isConfirmed) {
            const indiceEncontrado = productos.findIndex((productoFindIndex) => {
                if(productoFindIndex.id === idABuscar) {
                    return true;
                }
                return false;
            });
            productos.splice(indiceEncontrado, 1);
            pintarProductos(productos);
            localStorage.setItem("productos", JSON.stringify(productos));
            Swal.fire('Borrado!', 'Producto borrado correctamente', 'success');
        }
    });
}

// FUNCION PARA EDITAR PRODUCTO.
const editarProducto = function(idRecibido) {
    formValidity();
    console.log(`Editar elemento ${idRecibido}`);

    const productoEditar = productos.find((producto) => {
        if(producto.id === idRecibido) {
            return true;
        }
    });
    if(!productoEditar) return;

    idEditar = productoEditar.id;
    const elements = formularioProductoHTML.elements;
    elements.titulo.value = productoEditar.titulo;
    elements.precio.value = productoEditar.precio;
    elements.descripcion = productoEditar.descripcion;
    elements.imagen = productoEditar.imagen;
    elements.categoria.value = productoEditar.categoria;

    btn.innerText = "Editar producto";
    btn.classList.add("btn-success");
}

// FUNCION PARA OBTENER UNA FECHA(al crear un nuevo producto).
function obtenerFecha() {
    const fecha = new Date();
    let mes = fecha.getMonth() + 1;
    if (mes < 10) {
        mes = '0' + mes;
    }
    let dia = fecha.getDate();
    if (dia < 10) {
        dia = '0' + dia;
    }
    const year = fecha.getFullYear();

    const fechaFormateada = `${year}-${mes}-${dia}`;
    return fechaFormateada;
}

// VALIDAR FORMULARIO.
function formValidity() {
    btn.disabled = !formularioProductoHTML.checkValidity();
}



