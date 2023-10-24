
const user = JSON.parse(localStorage.getItem("currentUser"));

if(!user || user.role != 'ROLE_ADMIN') {
    window.location.href = '/index.html';
}


