
const userInicio = [
    {
        fullname: 'Matias Acevedo',
        email: 'admin@admin.com',
        id: '1',
        password: 'admin',
        role: "ROLE_ADMIN"
    },
    {
        fullname: 'Pepito Flores',
        email: 'pepito.flores@example.com',
        id: '2',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
    {
        fullname: 'John Doe',
        email: 'john.doe@example.com',
        id: '3',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
    {
        fullname: 'Jennifer Taylor',
        email: 'jennifer.taylor@example.com',
        id: '4',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
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




