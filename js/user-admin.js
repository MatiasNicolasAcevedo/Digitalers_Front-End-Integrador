
let idEditar;
const tableUsers = document.getElementById("table-users");

let adminUsers = JSON.parse(localStorage.getItem("users"));
const formularioUsersHTML = document.getElementById("formularioUsuario");

pintarUsers(adminUsers);

// FUNCION SUBMIT MODAL USER ADMIN. AGREGAR - EDITAR USUARIO.
formularioUsersHTML.addEventListener("submit", (evt) => {
	evt.preventDefault();
	const el = formularioUsersHTML.elements;
	let id;
	if (idEditar) {
		id = idEditar;
	} else {
		id = crypto.randomUUID();
	}

	let nuevoUsuario = {
		id: id,
		fullname: el.name.value,
		email: el.email.value,
		password: el.password.value,
		role: el.role.value,
	};

	if (idEditar) {
		const index = adminUsers.findIndex((usuario) => {
			return usuario.id === idEditar;
		});
		adminUsers[index] = nuevoUsuario;
		idEditar = undefined;
		if (adminUsers[index].role === "ROLE_ADMIN") {
			nuevoUsuario.role === "ROLE_ADMIN";
			localStorage.setItem("currentUser", JSON.stringify(nuevoUsuario));
		}
	} else {
		adminUsers.push(nuevoUsuario);
	}

	Swal.fire({
		icon: "success",
		title: "Usuario modificado correctamente",
		text: "El Usuario se actualizo correctamente!",
	});

	pintarUsers(adminUsers);
	localStorage.setItem("users", JSON.stringify(adminUsers));
	formularioUsersHTML.reset();
	el.name.focus();
});

// FUNCION PARA PINTAR LOS USUARIOS.
function pintarUsers(array) {
	tableUsers.innerHTML = "";
	array.forEach(function (usuario, index) {
		tableUsers.innerHTML += 
            `<tr>
                <td class="table-title">${usuario.fullname}</td>
                <td class="table-email">${usuario.email}</td>
                <td class="table-password">${usuario.password}</td>
                <td class="table-role">${usuario.role}</td>
                <td >
                    <div class="d-flex gap-1 justify-content-center">
                        <button class="btn-delete btn btn-danger btn-sm" onclick="borrarUser('${usuario.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="btn btn-success btn-sm" onclick="editarUser('${usuario.id}')" data-bs-toggle="modal" data-bs-target="#formModal">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
	});
}

// FUNCION PARA BORRAR UN USUARIO. CON SWEET ALERT.
const borrarUser = (idABuscar) => {
	Swal.fire({
		title: "Desea borrar Usuario",
		icon: "error",
		text: "Realmente desea eliminar al Usuario?",
		showCloseButton: true,
		showCancelButton: true,
		cancelButtonText: "Cancelar",
		confirmButtonText: "Borrar",
	}).then((result) => {
		if (result.isConfirmed) {
			const indiceEncontrado = adminUsers.findIndex((userFindIndex) => {
				if (userFindIndex.id === idABuscar) {
					return true;
				}
				return false;
			});
			if (adminUsers[indiceEncontrado].role === "ROLE_ADMIN") {
				Swal.fire("Error!", "Cuenta Admin no puede ser eliminado", "danger");
				return;
			}
			adminUsers.splice(indiceEncontrado, 1);
			pintarUsers(adminUsers);
			localStorage.setItem("users", JSON.stringify(adminUsers));
			Swal.fire("Borrado!", "Usuario borrado correctamente", "success");
		}
	});
};

// FUNCION PARA SETEAR UN USUARIO EDITADO.
const editarUser = function (idRecibido) {
	const userEditar = adminUsers.find((usuario) => {
		if (usuario.id === idRecibido) {
			return true;
		}
	});

	if (!userEditar) return;
	idEditar = userEditar.id;

	const elements = formularioUsersHTML.elements;
	elements.name.value = userEditar.fullname;
	elements.email.value = userEditar.email;
	elements.password.value = userEditar.password;
	elements.role.value = userEditar.role;

	btn.innerText = "Editar Usuario";
	btn.classList.add("btn-success");
};




