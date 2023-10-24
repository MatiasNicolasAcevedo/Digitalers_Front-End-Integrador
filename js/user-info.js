
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const headerUserInfo = document.getElementById("user-header-name");
const headerUserAction = document.getElementById("user-action");
const navBarLink = document.getElementById("nav-list");

headerUserInfo.innerText = currentUser ? currentUser.fullname : ""; // Se setea el nombre del usuario en el navbar.

if(currentUser) {
    headerUserAction.innerHTML = `<button class="btn btn-danger" onclick="logout()">Logout</button>`;

    if(currentUser.role == "ROLE_ADMIN") {
        const adminProductLink = document.createElement('li');
        adminProductLink.classList.add('nav-item');
        adminProductLink.id = 'nav-admin-product';

        const adminUserLink = document.createElement('li');
        adminUserLink.classList.add('nav-item');
        adminUserLink.id = 'nav-admin-user';

        const url = window.location.pathname;

        const link = document.createElement('a');
        link.classList.add('nav-link');
        if(url.includes('admin.html')) {
            link.classList.add('active');
        }
        link.href = '/pages/admin/admin.html';
        link.innerText = 'Product Admin';
        adminProductLink.appendChild(link);
        navBarLink.appendChild(adminProductLink);

        const linkUser = document.createElement('a');
        linkUser.classList.add('nav-link');
        if(url.includes('user-admin.html')) {
            linkUser.classList.add('active');
        }
        linkUser.href = '/pages/admin/user-admin.html';
        linkUser.innerText = 'User Admin';
        adminUserLink.appendChild(linkUser);
        navBarLink.appendChild(adminUserLink);
    }
} else {
    headerUserAction.innerHTML = `<a class="btn btn-primary" href="/pages/login/login.html">Login</a>`;
}

