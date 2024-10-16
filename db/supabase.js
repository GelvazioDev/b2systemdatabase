var client = false;
var SUPABASE_INSTANCE = callInstanceSupabase();

function getUrlApiSupabase() {
    return "https://pwtiifufusfauvabgczg.supabase.co";
}

function getTokenSupabase() {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dGlpZnVmdXNmYXV2YWJnY3pnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkxMTYzNTMsImV4cCI6MjA0NDY5MjM1M30.9ezZ6cRMDJAaphZt_2R8Xi33AExLxXQAFmGYs6xqPME";
}

function callInstanceSupabase() {
    if (!client) {
        let { createClient } = supabase;
        let url = getUrlApiSupabase();
        client = createClient(url, getTokenSupabase());
    }
    return client;
}

async function listarDados(tabela) {
    let aDados = await getAllDadosFromTabela(tabela);
    return aDados;
}

async function getAllDadosFromTabela(tabela) {
    let { data: aDadosRetorno, error } = await SUPABASE_INSTANCE
        .from(tabela)
        .select("*")
        // Ordenando pelo id de forma ascendente, do menor para o maior
        .order('id', { ascending: true });

    if (error) {
        alert("Erro:" + error);
    }

    const dados = aDadosRetorno;

    console.log(dados);

    return dados;
}

async function inserirUsuario() {

    const usunome_param = document.querySelector("#usunome").value;
    const usulogin_param = document.querySelector("#usulogin").value;
    const ususenha_param = document.querySelector("#ususenha").value;

    const { data, error } = await SUPABASE_INSTANCE
        .from('usuario')
        .insert([
            {
                usunome: usunome_param,
                usulogin: usulogin_param,
                ususenha: ususenha_param
            },
        ])
        .select();

    if (error) {
        alert("Erro ao inserir!" + JSON.stringify(error));
        return false;
    }

    alert("Usuario inserido: " + JSON.stringify(data));

    // APOS INSERIR USUARIO, ATUALIZA A LISTA NA TELA - CONSULTA
    listarDados('usuario');
}

async function excluirUsuario(usucodigo) {

    const { error } = await SUPABASE_INSTANCE
        .from('usuario')
        .delete()
        .eq('usucodigo', usucodigo);

    // APOS EXCLUIR USUARIO, ATUALIZA A LISTA NA TELA - CONSULTA
    listarDados('usuario');
}

async function updateUsuario(usucodigo) {
    usucodigo = parseInt(usucodigo);

    // const usucodigo = parseInt(document.querySelector("#combo_usuario").value);
    // const codigoatividade = parseInt(document.querySelector("#codigoatividade").value);
    // const statuscorrecao = document.querySelector("#statuscorrecao").checked ? "SIM" : "NAO";

    const usunome_param = document.querySelector("#usunome").value;
    const usulogin_param = document.querySelector("#usulogin").value;
    const ususenha_param = document.querySelector("#ususenha").value;

    const port = "usuario";
    const { data, error } = await SUPABASE_INSTANCE
        .from(port)
        .update([{
            usunome: usunome_param,
            usulogin: usulogin_param,
            ususenha: ususenha_param
        }])
        .eq('usucodigo', usucodigo)
        .select();

    // APOS ALTERAR USUARIO, ATUALIZA A LISTA NA TELA - CONSULTA
    listarDados('usuario');
}

async function getProdutoById(id) {

    let { data: produto, error } = await SUPABASE_INSTANCE
        .from('produto')
        .select("*")
        // Filters
        .eq('id', id);

    return produto;
}