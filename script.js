const users = {
    jperez: {
        password: "Trabajo2026!",
        role: "employee"
    },
    alopez: {
        password: "RH2026#",
        role: "employee"
    },
    mtorres: {
        password: "Soporte2026$",
        role: "employee"
    },
    admin: {
        password: "admin",
        role: "admin"
    }
};

function login() {
    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value;

    if (users[user] && users[user].password === pass) {
        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        document.getElementById("welcome").innerText = "Bienvenido " + user;
        document.getElementById("error").innerText = "";

        let files = "";

        if (users[user].role === "admin") {
            files = `
                <div class="admin-alert">
                    ⚠ MFA DESHABILITADO<br>
                    ⚠ Intentos ilimitados
                </div>
                <div class="file">📄 clientes.csv</div>
                <div class="file">📄 empleados.csv</div>
                <div class="file">📄 contratos.pdf</div>
                <div class="file">📄 nomina_2026.xlsx</div>
                <div class="file">📄 respaldo_finanzas.zip</div>
            `;
        } else {
            files = `
                <div class="file">📄 Manual del Empleado.pdf</div>
                <div class="file">📄 Calendario.pdf</div>
            `;
        }

        document.getElementById("fileArea").innerHTML = files;
    } else {
        document.getElementById("error").innerText = "Usuario o contraseña incorrectos";
    }
}

function showSection(id) {
    document.querySelectorAll(".section").forEach((sec) => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function logout() {
    location.reload();
}
