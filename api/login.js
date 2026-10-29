// Vercel Serverless Function: POST /api/login
// LAB ONLY. Enable explicitly in a Vercel Preview environment using
// NOVATECH_LAB_ENABLED=true. Never enable on Production.
const DEMO_USERS = Object.freeze({
    "student-demo": { password: "ClassLab2026!", role: "employee" },
    "admin-demo": { password: "DemoOnly2026!", role: "admin" }
});

module.exports = function handler(req, res) {
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Vary", "Content-Type");

    if (process.env.NOVATECH_LAB_ENABLED !== "true" || process.env.VERCEL_ENV === "production") {
        return res.status(404).send("NOT_FOUND");
    }

    if (req.method !== "POST") {
        res.setHeader("Allow", "POST");
        return res.status(405).send("METHOD_NOT_ALLOWED");
    }

    // Vercel parses application/x-www-form-urlencoded into req.body.
    // Also accept JSON for convenient manual testing.
    let body = req.body;
    if (typeof body === "string") {
        try {
            body = body.trim().startsWith("{")
                ? JSON.parse(body)
                : Object.fromEntries(new URLSearchParams(body));
        } catch {
            body = {};
        }
    }
    if (!body || typeof body !== "object") body = {};

    const user = typeof body.user === "string" ? body.user.trim() : "";
    const pass = typeof body.pass === "string" ? body.pass : "";

    if (!user || !pass || user.length > 128 || pass.length > 256) {
        return res.status(400).send("BAD_REQUEST");
    }

    const account = DEMO_USERS[user];
    if (!account || account.password !== pass) {
        // Stable failure marker for authorized classroom exercises:
        // Hydra's http-post-form module can match F=LOGIN_FAIL.
        return res.status(401).send("LOGIN_FAIL");
    }

    // These are demo-only identities; this response is not a secure session.
    return res.status(200).json({ status: "LOGIN_OK", role: account.role });
};
