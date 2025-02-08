function checkAccount() {
    const username = localStorage.getItem('username');
    if (username) {
        alert('Bienvenue ' + username + '!');
        window.location.href = 'packs.html';
    } else {
        document.getElementById('userModal').style.display = 'block';
    }
}

function closeModal() {
    document.getElementById('userModal').style.display = 'none';
}

function saveUsername() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        closeModal();
        alert('Bienvenue ' + username + '!');
        window.location.href = 'packs.html';
    } else {
        alert('Veuillez entrer un nom d\'utilisateur.');
    }
}

window.onclick = function(event) {
    const modal = document.getElementById('userModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}