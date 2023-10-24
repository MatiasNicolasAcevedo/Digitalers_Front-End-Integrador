
const usersSaved = JSON.parse(localStorage.getItem("users"));
const formularioRegisterHTML = document.getElementById("register-form");

// EVENTO SUBMIT DEL FORM REGISTRO.
formularioRegisterHTML.addEventListener("submit", (event) => {
    event.preventDefault();
    const elem = event.target.elements;
    console.log(elem);

    if(!elem.password.value == elem.repeat-password.value) {
        Swal.fire("Error en las contraseñas", "Las contraseñas no coinciden", "error");
        return;
    }

    // Se comprueba si existe el email.
    const checkUserIfExist = usersSaved.find((usuario) => {
        if(elem.email.value.trim() == usuario.email) {
            return true;
        }
        return false;
    });
    if(checkUserIfExist) {
        Swal.fire("El usuario ya existe", `Ya existe un usuario con el correo ${elem.email.value}`, "error");
        return;
    }
    
    const nuevoUsuario = {
        id: crypto.randomUUID(),
        fullname: elem.fullname.value,
        email: elem.email.value,
        password: elem.password.value,
        date: elem.date.value,
        province: elem.province.value,
        observation: elem.observation.value,
        role: 'ROLE_CLIENT'
    }
    usersSaved.push(nuevoUsuario);
    
    localStorage.setItem("users", JSON.stringify(usersSaved))

    Swal.fire("Registro Exitoso", "Usuario registrado con exito", "success");

    formularioRegisterHTML.reset();
    elem.fullname.focus();
});

