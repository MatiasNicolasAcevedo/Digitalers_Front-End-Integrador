
let productos = JSON.parse(localStorage.getItem("productos"));  // Obtenemos los productos del localStorage.
let idEditar; // Aux para saber si estamos editando(true) ó agregando(false) un producto.
const inputFiltrarHTML = document.getElementById("filtrar");  // Obtenemos el input de la busqueda del filtro.
const btn = document.querySelector('button.btn[type="submit"]');  // Obtenemos el boton submit del formulario.
const tableBodyHTML = document.querySelector("#table-body");  // Donde se pintan los productos.
const formularioProductoHTML = document.getElementById("formularioProducto");  // Obtenemos el formulario del modal.

pintarProductos(productos);  // Se pintan los productos por 1ra vez.
formularioProductoHTML.addEventListener('change', formValidity);  // Se escucha evento change en formulario, y se ejecuta funcion fomrValidity().

// AGREGAR - EDITAR PRODUCTOS
formularioProductoHTML.addEventListener('submit', (event) => {  // Se escucha evento submit del formulario.
    event.preventDefault();  // Evitar perder los datos con el comportamiento por defecto del evento.
    const elem = formularioProductoHTML.elements;  // Se obtiene una referencia a los elementos del formulario.
    let id = idEditar === undefined ? crypto.randomUUID() : idEditar;  // Si se crea un nuevo producto, se setea un crypto(agregar), si ya existe el id, se setea el mismo(editar). 

    // Se setea un producto a agregar con los datos del formulario.
    const nuevoProducto = {
        id: id,
        titulo: elem.titulo.value,
        descripcion: elem.descripcion.value,
        precio: elem.precio.valueAsNumber,
        imagen: elem.imagen.value,
        categoria: elem.categoria.value,
        fechaDeCreacion: obtenerFecha()
    }

    if(idEditar) {  // Si es true, estamos editando.
        const index = productos.findIndex(producto => {  // Se busca el indice del elemento a editar.
            return producto.id === idEditar;  // Hace return con el indice del elemento.
        });
        productos[index] = nuevoProducto;  // Se guarda el producto editado, en la misma posicion del elemento.
        idEditar = undefined;  // Luego de editar, se resetea la variable aux a undefined nuevamente.
        btn.innerText = "Agregar producto";  // Se vuelve el boton a su estado normal.
        btn.classList.remove('btn-success');  // Se remueve clase del boton.
    } else {
        productos.push(nuevoProducto);  // Si es false, agregamos el nuevo producto.
    }   

    Swal.fire({  // SweetAlert al usuario.
        icon: 'sucess',
        title: 'Producto agregado/modificado correctamente',
        text: 'El producto se actualizo o modifico correctamente!'
    });

    pintarProductos(productos);  // Se pintan los productos con datos actualizados.
    localStorage.setItem("productos", JSON.stringify(productos));  // Se guardan los datos en local storage.
    formularioProductoHTML.reset();  // Se resetea los campos del formulario.
    elem.titulo.focus();  // Focus al campo titulo del formulario.
});

// FUNCION PARA PINTAR PRODUCTOS + ACCIONES: borrar y editar.
function pintarProductos(arrayAPintar) {
    tableBodyHTML.innerHTML = "";  // Se borra el contenido cargado previamente del elemento html.

    arrayAPintar.forEach(function(producto, index) {  // Se recorren todos los elementos del array.
        tableBodyHTML.innerHTML +=  // Se agrega una fila por cada producto.(en el html con template literals).
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
    const busqueda = event.target.value.toLowerCase();  // Obtenemos el texto que se ingreso en el input.
    const resultado = productos.filter((producto) => {  // Se recorre el array de productos con filter.
        const titulo = producto.titulo.toLowerCase();  // Obtenemos el titulo, de cada producto.

        if(titulo.includes(busqueda)) {  // Comprueba si el titulo incluye el texto ingresado.
            return true;  // Si es verdadero, return true, se incluye el producto en el resulado final.
        } 
        return false;  // Si no contiene la busqueda retorna false, no se incluye en el resultado final.
    });
    pintarProductos(resultado);  // Mostramos el resultado del filtro.
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
        if(result.isConfirmed) {  // Si hace click en 'Borrar', se ejecuta el codigo.
            const indiceEncontrado = productos.findIndex((productoFindIndex) => {  // Se busca el indice del elemento a eliminar en el array.
                if(productoFindIndex.id === idABuscar) {  // Si coincide el id.
                    return true;  // Se retorna el indice del elemento de la busqueda.
                }
                return false;
            });
            productos.splice(indiceEncontrado, 1);  // Se elimina el producto.
            pintarProductos(productos);  // Se pinta la lista de productos actualizada.
            localStorage.setItem("productos", JSON.stringify(productos));  // Se guardan los datos en local storage.
            Swal.fire('Borrado!', 'Producto borrado correctamente', 'success');
        }
    });
}

// FUNCION PARA EDITAR PRODUCTO.
const editarProducto = function(idRecibido) {  // Se llama a la funcion con el id, al hacer click en el boton editar.
    formValidity();  // Validar formulario.
    console.log(`Editar elemento ${idRecibido}`);

    const productoEditar = productos.find((producto) => {  // Se recorre el array productos con find.
        if(producto.id === idRecibido) {  // Si el id coincide.
            return true;  // Se retorna el objeto encontrado.
        }
    });
    if(!productoEditar) return;  // Si no encontro nada(undefined). Hace return.

    idEditar = productoEditar.id;  // Guardamos el id del producto a editar.(idEditar ya deja de ser undefined).
    const elements = formularioProductoHTML.elements;  // Obtenemos los elementos del formularioProducto.

    // Seteamos el formulario con los datos del elemento a editar.
    elements.titulo.value = productoEditar.titulo;
    elements.precio.value = productoEditar.precio;
    elements.descripcion = productoEditar.descripcion;
    elements.imagen = productoEditar.imagen;
    elements.categoria.value = productoEditar.categoria;

    btn.innerText = "Editar producto";  // Cambia texto del boton agregar por editar.
    btn.classList.add("btn-success");  // Se agrega clase.
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
    btn.disabled = !formularioProductoHTML.checkValidity();  // si es valido devuelve true, en tonces con !, se invierte.
}



