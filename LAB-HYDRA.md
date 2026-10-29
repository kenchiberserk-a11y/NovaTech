# NovaTech — laboratorio de login para Hydra

> **Solo laboratorio autorizado.** Usa un deployment de Preview aislado, cuentas ficticias y datos sintéticos. No habilites este endpoint en Production ni lo uses contra cuentas o servicios ajenos.

## Qué cambia

- La interfaz existente se conserva.
- El navegador envía `user` y `pass` por POST a `/api/login`.
- `api/login.js` responde `200` con JSON y `LOGIN_OK` en el campo `status` si las credenciales de demo son correctas.
- Los intentos fallidos responden `401` con el texto `LOGIN_FAIL`, marcador útil para una práctica de Hydra.
- El endpoint responde `404` si el laboratorio no está habilitado o si Vercel indica que el entorno es Production.

## Habilitar en Vercel Preview

1. En el proyecto de Vercel, abre **Settings → Environment Variables**.
2. Añade `NOVATECH_LAB_ENABLED=true) solo para el entorno **Preview**; no lo asignes a Production.
3. Crea/actualiza el deployment Preview de esta rama y confirma que la URL es la esperada antes de probar.
4. Comprueba que `POST /api/login` devuelve `LOGIN_FAIL` con una contraseña incorrecta. Si devuelve `404`, el flag no está activo en ese Preview.

## Cuentas ficticias

- Empleado: usuario `student-demo`, contraseña `ClassLab2026!`
- Administrador de demostración: usuario `admin-demo`, contraseña `DemoOnly2026!`

No reutilices estas contraseñas en ningún otro sistema. No contienen datos ni identidades reales.

## Verificar el endpoint

Sustituye `PREVIEW_HOST` por el hostname exacto del deployment de Preview, sin `https://`.

```sh
curl -i https://PREVIEW_HOST/api/login \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data 'user=student-demo&pass=incorrecta'
```

El resultado esperado para credenciales incorrectas es HTTP `401` y cuerpo `LOGIN_FAIL`.

## Práctica controlada con Hydra

Ejecuta la prueba únicamente contra el hostname Preview de este laboratorio, con una lista pequeña de contraseñas ficticias creada para la clase:

```sh
hydra -l student-demo -P ./passwords-demo.txt PREVIEW_HOST \
  https-post-form \
  "/api/login:user=^USER^&pass=^PASS^:F=LOGIN_FAIL" \
  -V
```

No apuntes este comando al dominio de producción ni a otros hosts. La respuesta diferenciada está diseñada para el ejercicio; no representa una autenticación segura.

## Limitaciones intencionales

Esta función **no crea una sesión autenticada**: el frontend solo muestra el panel tras una respuesta correcta. El panel y sus datos siguen siendo una maqueta pública, no recursos protegidos. No almacenes datos reales ni uses este endpoint como autenticación de producción. Antes de cualquier uso real, reemplázalo por un proveedor de identidad, sesiones seguras, autorización en servidor, limitación de intentos y auditoría.
