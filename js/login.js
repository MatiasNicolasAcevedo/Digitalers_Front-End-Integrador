
const userInicio = [
    {
        id: '1',
        fullname: 'Matias Acevedo',
        email: 'admin@admin.com',
        password: 'admin',
        date: '17/01/92',
        province: 'Cordoba',
        observation: 'Java Back-end Developer.',
        role: 'ROLE_ADMIN'
    },
    {
        id: '2',
        fullname: 'Elena Rodriguez',
        email: 'elena@email.com',
        password: 'alfabeta',
        date: '05/08/88',
        province: 'Mendoza',
        observation: 'Front-end Developer.',
        role: 'ROLE_CLIENT'
    },
    {
        id: '3',
        fullname: 'Juan Pérez',
        email: 'juan@email.com',
        password: 'alfabeta',
        date: '12/04/89',
        province: 'Tucuman',
        observation: 'Database Administrator.',
        role: 'ROLE_CLIENT'
    },
    {
        id: '4',
        fullname: 'Laura Sanchez',
        email: 'laura@email.com',
        password: 'alfabeta',
        date: '21/11/95',
        province: 'ValenCatamarcacia',
        observation: 'UX/UI Designer.',
        role: 'ROLE_CLIENT'
    }
];

if(localStorage.getItem("users") == null) { 
    localStorage.setItem("users", JSON.stringify(userInicio));
}
const users = JSON.parse(localStorage.getItem("users"));  // De string a objeto.
const loginForm = document.getElementById("login");  // Traer el formulario.

// EVENTO SUBMIT FORM LOGIN
if(loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();  // Evitar perder datos con el comportamiento por defecto del evento submit.
    
        const emailInput = event.target.elements.email.value;  // Obtenemos el email enviado en el fomrulario.
        const passwordInput = event.target.elements.password.value;  // Obtenemos el password enviado en el formulario.
    
        const userExist = users.find(user => {  // Recorremos los users guardados.
            if(user.email == emailInput.trim()) {  // Si coincide con el email del input, retorna ese usuario.
                return true;
            }
        });
    
        if(!userExist || userExist.password != passwordInput) {  // Si el usuario no existe ó el password es distinto.
            Swal.fire("Login incorrecto", "Los datos ingresados son incorrectos", "error");
            return;
        }
        
        Swal.fire("Login Correcto", "En breve será redireccionado", "success");  // Mostramos que esta todo correcto.
        delete userExist.password;  // Borramos el password para que no se vea en el local storage.
        localStorage.setItem("currentUser", JSON.stringify(userExist));  // Se guarda con la key "currentUser", el usuario acaba de hacer login(userExist).
    
        setTimeout(function() {
            window.location.href = '/index.html';  // Se ejecutará una redirección a la página "/index.html".
        }, 2000);  // Después de un retraso de 2 seg.
    });
}

// Funcion para cerrar la sesión de un usuario.
function logout() {
    localStorage.removeItem("currentUser");  // Eliminar este objeto indica que el usuario ha cerrado sesión.
    setTimeout(function() {
        window.location.href = "/index.html";  // Se ejecutará una redirección a la página "/index.html".
    }, 500); 
}




