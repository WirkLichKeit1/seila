let api = "https://e016bfb4-74d4-4d1c-a0b3-22044a9a2089-00-1uygczbfi4zz0.kirk.replit.dev";

async function gerarHash(texto) {
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function login() {
    const nome = document.getElementById("nome").value;
    const senha = document.getElementById("nome").value;

    try {
        const response = await fetch(`${api}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, senha })
        });

        const data = await response.json();

        if (response.status === 200) {
            console.log("Sucesso ao fazer login");
            window.location.href = "listar.html";
        } else {
            console.log("dados inválidos");
        }
    } catch (e) {
        console.log("ERRO:", e);
    }
}