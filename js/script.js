let api = "https://e016bfb4-74d4-4d1c-a0b3-22044a9a2089-00-1uygczbfi4zz0.kirk.replit.dev";

async function listar() {
    const usersDiv = document.getElementById("users");
    usersDiv.innerHTML = "<p>Carregando usuários...</p>";

    try {
        const response = await fetch(`${api}/listar`, { method: "GET" });
        const data = await response.json();

        if (response.status === 200) {
            console.log("resposta da API:", data);
            console.log("sucesso ao buscar users");
            if (data.length === 0) {
                usersDiv.innerHTML = "<p>Nenhum usuário encontrado.</p>";
                return;
            }

            const usersArray = data.success || [];

            usersDiv.innerHTML = "";
            usersArray.forEach(user => {
                const div = document.createElement("div");
                div.classList.add("user-item");
                div.innerHTML = `
                    <strong>ID:</strong> ${user.id}<br>
                    <strong>Nome:</strong> ${user.nome}<br>
                    <strong>Email:</strong> ${user.email}<br>
                    <strong>Senha:</strong> ${user.senha}
                `;
                usersDiv.appendChild(div);
            });
        } else {
            console.log("Erro ao buscar users");
            usersDiv.innerHTML = "<p>Erro ao carregar usuários.</p>";
        }
    } catch (e) {
        console.log("ERRO:", e);
    }
}

async function gerarHash(texto) {
    const encoder = new TextEncoder();
    const data = encoder.encode(texto);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

async function cadastrar() {
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const hash = await gerarHash(senha);
    console.log("hash gerado:", hash);
    try {
        const response = await fetch(`${api}/cadastrar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha: hash })
        });
        
        data = await response.json();


        if (response.status === 200) {
            console.log("cadastro realizado com sucesso");
            document.querySelector("form").reset();
            listar();
        } else {
            console.log("erro ao cadastrar");
        }

    } catch (e) {
        console.log("ERRO:", e)
    }
}