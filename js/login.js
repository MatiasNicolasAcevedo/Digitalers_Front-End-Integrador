
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
const users = JSON.parse(localStorage.getItem("users"));
const loginForm = document.getElementById("login");

// EVENTO SUBMIT FORM LOGIN
if(loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
    
        const emailInput = event.target.elements.email.value
        const passwordInput = event.target.elements.password.value;
    
        const userExist = users.find(user => {  
            if(user.email == emailInput.trim()) {  
                return true;
            }
        });
    
        // Se comprueba si el usuario no existe ó el password es distinto.
        if(!userExist || userExist.password != passwordInput) {  
            Swal.fire("Login incorrecto", "Los datos ingresados son incorrectos", "error");
            return;
        }
        
        Swal.fire("Login Correcto", "En breve será redireccionado", "success");
        delete userExist.password;
        localStorage.setItem("currentUser", JSON.stringify(userExist));
    
        setTimeout(function() {
            window.location.href = '/index.html';
        }, 2000);
    });
}

// Funcion para cerrar la sesión de un usuario.
function logout() {
    localStorage.removeItem("currentUser");
    setTimeout(function() {
        window.location.href = "/index.html";
    }, 500); 
}




