// NovaTech: autenticación de demostración mediante el endpoint /api/login.
// Solo usar en un deployment de Preview aislado y con cuentas ficticias.
document.getElementById("loginForm").addEventListener("submit", login);

async function login(event) {
    event.preventDefault();

    const user = document.getElementById("user").value.trim();
    const pass = document.getElementById("pass").value;
    const error = document.getElementById("error");
    const button = document.querySelector("#loginForm button");

    error.textContent = "";
    button.disabled = true;

    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
            body: new URLSearchParams({ user, pass }).toString()
        });

        if (!response.ok) {
            error.textContent = "Usuario o contraseña incorrectos";
            return;
        }

        const result = await response.json();
        if (result.status !== "LOGIN_OK") {
            error.textContent = "No se pudo iniciar sesión";
            return;
        }

        document.getElementById("loginScreen").style.display = "none";
        document.getElementById("dashboard").style.display = "block";
        document.getElementById("welcome").innerText = "Bienvenido " + user;

        let files = "";
        if (result.role === "admin") {
            files = `
                <div class="admin-alert">
                    ⚠ Cuenta de demostración<br>
                    ⚠ Datos ficticios del laboratorio
                </div>
                <div class="file">📄 clientes-demo.csv</div>
                <div class="file">📄 empleados-demo.csv</div>
                <div class="file">📄 contratos-demo.pdf</div>
                <div class="file">📄 nomina-demo.xlsx</div>
                <div class="file">📄 respaldo-demo.zip</div>
            `;
        } else {
            files = `
                <div class="file">📄 Manual del Empleado.pdf</div>
                <div class="file">📄 Calendario.pdf</div>
            `;
        }
        document.getElementById("fileArea").innerHTML = files;
    } catch (err) {
        error.textContent = "No se pudo conectar con el endpoint de autenticación";
    } finally {
        button.disabled = false;
    }
}

function showSection(id) {
    document.querySelectorAll(".section").forEach((sec) => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
}

function logout() {
    location.reload();
}
