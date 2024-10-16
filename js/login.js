function onloadLogin() {
    var url_atual = window.location.href;
    if (url_atual.includes("http://127.0.0.1:5500/")) {
        // sessionStorage.setItem("token_logado", "54a80097f23822cb26b6d5a980968601")
        // window.location.href = `index.html`
        // return true
    }
}

function validaSessao(pagina) {
    const token_logado = sessionStorage.getItem("token_logado");
    if (token_logado == "54a80097f23822cb26b6d5a980968601") {
        // redireciona para a pagina home pois usuario ja esta logado
        atualizaMenu();

        // Atualiza a aba ativa
        pagina = pagina.slice(0, -5);

        document.querySelector("#aba-" + pagina + " a").classList.add("active");

        loadingPagina();
    } else {
        window.location.href = "login.html";
    }
}

function validaSessaoSemLogin(pagina) {
    // redireciona para a pagina home pois usuario ja esta logado
    atualizaMenu();

    // Atualiza a aba ativa
    pagina = pagina.slice(0, -5);
    document.querySelector("#aba-" + pagina + " a").classList.add("active");
    loadingPagina();
}

function loadingPagina() {
    setTimeout(() => {
        document.querySelector(".box-load").style.display = "none";
        document.querySelector(".content").style.display = "block";
    }, 1000);
}

function redirecionaPagina(pagina) {
    window.location.href = pagina;
}

function atualizaMenu() {
    var url_atual = window.location.href;
    let baseUrl = "https://b2systemdatabase.vercel.app/";
    if (url_atual.includes("http://127.0.0.1:5500/")) {
        baseUrl = "http://127.0.0.1:5500/";
    }

    const menu = ` <li id="aba-index">
                        <a href="index.html">
                            <i class='bx bx-grid-alt'></i>
                            <span class="links_name">Principal</span>
                        </a>
                    </li>
                    <li id="aba-produtos">
                        <a href="${baseUrl}produtos.html">
                            <i class='bx bx-box'></i>
                            <span class="links_name">Produtos</span>
                        </a>
                    </li>
                    <li id="aba-clientes">
                        <a href="${baseUrl}clientes.html">
                            <i class='bx bx-list-ul'></i>
                            <span class="links_name">Clientes</span>
                        </a>
                    </li>
                    <li id="aba-vendas">
                        <a href="${baseUrl}vendas.html">
                            <i class='bx bx-list-ul'></i>
                            <span class="links_name">Vendas</span>
                        </a>
                    </li>
                    <li id="aba-notasfiscais">
                        <a href="${baseUrl}notasfiscais.html">
                            <i class='bx bx-barcode'></i>
                            <span class="links_name">Notas Fiscais</span>
                        </a>
                    </li>
                    <li id="aba-relatorios">
                        <a href="relatorios.html">
                            <i class='bx bx-pie-chart-alt-2'></i>
                            <span class="links_name">Relatórios</span>
                        </a>
                    </li>
                    <li id="aba-configuracoes">
                        <a href="${baseUrl}configuracoes.html">
                            <i class='bx bx-cog'></i>
                            <span class="links_name">Configurações</span>
                        </a>
                    </li>
                    <li class="log_out">
                    <a href="${baseUrl}login.html" onclick="logout()">
                            <i class='bx bx-log-out'></i>
                            <span class="links_name">Sair</span>
                        </a>
                    </li>`;

    document.querySelector("#menu").innerHTML = menu;
}

function logout() {
    sessionStorage.setItem("token_logado", "");

    // Remove o token da sessao
    sessionStorage.removeItem("token_logado");

    // Remove all saved data from sessionStorage
    sessionStorage.clear();
}

async function login() {
    const email = document.querySelector("#login-email").value;
    const senha = document.querySelector("#login-senha").value;

    const body = {
        email: email,
        senha: senha,
    };

    let { data: aListaUsuario, error } = await SUPABASE_INSTANCE
        .from('usuario')
        .select("*")
        // Filters
        .eq('email', email)
        .eq('senha', senha);

    if (error) {
        alert('Erro ao logar no sistema!' + error);
        return false;
    }

    if (aListaUsuario.length == 0) {
        alert('Usuário ou senha inválido!');
        return false;
    }

    // usuario.then(function (data) {
    aListaUsuario.forEach(function (data, key) {
        console.log(data);

        const nome = data.nome;

        // SETA O TOKEN
        sessionStorage.setItem(
            "token_logado",
            "54a80097f23822cb26b6d5a980968601"
        );

        // SETA O USUARIO LOGADO
        sessionStorage.setItem("usuario_logado", nome);

        // REDIRECIONA PARA A HOME
        window.location.href = "index.html";
    });
}

function gravaRegistroLogin() {
    // chama a api de cadastro de login
    const nome = document.querySelector("#cadastro-nome").value;
    const email = document.querySelector("#cadastro-email").value;
    const senha = document.querySelector("#cadastro-senha").value;

    const body = {
        usunome: nome,
        usuemail: email,
        ususenha: senha,
        usutoken: "token",
        usuativo: 1,
    };

    callApi("POST", "usuarios", body, function (data) {
        // pega os dados de token retornados e seta na sessao do navegador
        sessionStorage.setItem("token_logado", data.usutoken);

        // redireciona para a pagina home
        window.location.href = "home.html";
    });
}

function resetsenha() {
    const email = document.querySelector("#login-email").value;
    const senha = document.querySelector("#login-senha").value;
    const senha2 = document.querySelector("#login-senha2").value;

    if (senha == "" || senha2 == "") {
        alert("Informe os dois campos de senha!");
        return false;
    }

    if (senha !== senha2) {
        alert("Senha não confere!");
        return false;
    }
    const body = {
        usuemail: email,
        ususenha: senha,
    };

    callApi("POST", "resetpassword", body, function (data) {
        // Remove all saved data from sessionStorage
        sessionStorage.clear();

        // redireciona para a pagina de login
        window.location.href = "index.html";
    });
}
