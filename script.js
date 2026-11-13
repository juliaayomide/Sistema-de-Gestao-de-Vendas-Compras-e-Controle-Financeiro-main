const TEAM = ["Allan Neres Gomes", "Christian Barra dos Santos", "Diego da Veiga Balielo Ortigosa", "Erick Viana", "Gabriel Chaves Ribeiro", "Giovanna Nascimento dos Santos", "Guilherme Alves", "Gustavo Cruz Alves Nunes", "Julia Ayomide Canuto da Silva", "Kauan de Lima Freitas", "Maycon Moura da Silva", "Nikollas Paiva", "Pietro Tavares Camargo", "Rafael Enrico Barreto Ruvolo", "Thomas Anderson Nery dos Santos"];
const ROLE = "Integrante do Grupo 4 - modelagem e documentação do banco de dados";
const ADM = "Administrador (total); Vendedor (leitura/escrita); Financeiro (leitura)";
// Coluna: [atributo, descricao, tipo, constraints, privacidade, linhagem, rbac]
const TABLES = [
    {
        n: "cliente", d: "Armazena os clientes empresariais que realizam compras. Base do vínculo obrigatório de toda venda (RN01).", c: [
            ["id_cliente", "Identificador único do cliente, sem significado de negócio.", "INT", "[PK]", "N/A", "Origem: gerado pelo sistema no cadastro. Destino: venda.id_cliente.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["nome", "Nome ou razão social do cliente, usado no atendimento e na venda.", "VARCHAR(255)", "[NULL]", "DP", "Origem: cadastro pelo Vendedor/Administrador. Destino: consultas de venda e relatórios.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["cpf", "CPF do cliente, apenas dígitos (11 posições). Deve seguir necessidade e finalidade da LGPD (PR01).", "VARCHAR(11)", "[NULL]", "DP", "Origem: cadastro. Destino: identificação em vendas e notas fiscais.", "Administrador (leitura/escrita); Vendedor (leitura); Financeiro (leitura restrita)"],
            ["telefone", "Telefone de contato, incluindo DDD, usado no atendimento via WhatsApp.", "VARCHAR(14)", "[NULL]", "DP", "Origem: cadastro ou formulário alternativo. Destino: atendimento comercial.", "Administrador e Vendedor (leitura/escrita)"],
            ["email", "E-mail de contato, também canal alternativo de pedido (RNF11).", "VARCHAR(255)", "[NULL]", "DP", "Origem: cadastro ou formulário alternativo. Destino: atendimento comercial.", "Administrador e Vendedor (leitura/escrita)"]]
    },
    {
        n: "vendedor", d: "Registra os vendedores responsáveis pelo atendimento e pelo registro das vendas.", c: [
            ["id_vendedor", "Identificador único do vendedor.", "INT", "[PK]", "N/A", "Origem: gerado pelo sistema. Destino: venda.id_vendedor.", "Administrador (leitura/escrita); Vendedor e Financeiro (leitura)"],
            ["nome", "Nome do vendedor, exibido em vendas e relatórios.", "VARCHAR(255)", "[NULL]", "DP", "Origem: cadastro pelo Administrador. Destino: relatórios de vendas.", "Administrador (leitura/escrita); Vendedor e Financeiro (leitura)"],
            ["telefone", "Telefone de contato do vendedor.", "VARCHAR(14)", "[NULL]", "DP", "Origem: cadastro pelo Administrador. Destino: contato com clientes.", "Administrador (leitura/escrita); Vendedor (leitura)"]]
    },
    {
        n: "fornecedor", d: "Cadastro das empresas fornecedoras dos produtos revendidos e destinatárias das compras.", c: [
            ["id_fornecedor", "Identificador único do fornecedor.", "INT", "[PK]", "N/A", "Origem: gerado pelo sistema. Destino: produto.id_fornecedor e compra.id_fornecedor.", "Administrador (leitura/escrita); Vendedor e Financeiro (leitura)"],
            ["razao_social", "Razão social da empresa fornecedora.", "VARCHAR(255)", "[NULL]", "N/A", "Origem: cadastro pelo Administrador. Destino: consultas de produtos e compras.", "Administrador (leitura/escrita); Vendedor e Financeiro (leitura)"],
            ["cnpj", "CNPJ do fornecedor. Pessoa jurídica, fora do escopo de dado pessoal.", "VARCHAR(255)", "[NULL]", "N/A", "Origem: cadastro pelo Administrador. Destino: controle de compras.", "Administrador (leitura/escrita); Financeiro (leitura)"],
            ["contato", "Forma de contato com o fornecedor (nome, telefone ou e-mail), usada nos pedidos de reposição.", "VARCHAR(255)", "[NULL]", "DP", "Origem: cadastro pelo Administrador. Destino: pedido de produto ao fornecedor.", "Administrador (leitura/escrita); Vendedor (leitura)"]]
    },
    {
        n: "produto", d: "Catálogo de produtos comercializados, cada um associado a um fornecedor (RN08), com situação para novas vendas (RN09) e preços de custo e de venda.", c: [
            ["id_produto", "Identificador único do produto (código do produto, RN08).", "INT", "[PK]", "N/A", "Origem: gerado pelo sistema. Destino: item_venda.id_produto.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["id_fornecedor", "Fornecedor obrigatório do produto (RN08).", "INT", "[FK] fornecedor(id_fornecedor) [NOT NULL]", "N/A", "Origem: seleção no cadastro. Destino: relatórios por fornecedor.", "Administrador (leitura/escrita); Vendedor e Financeiro (leitura)"],
            ["nome", "Nome comercial obrigatório do produto (RN08).", "VARCHAR(255)", "[NOT NULL]", "N/A", "Origem: cadastro. Destino: site, vendas e relatórios.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["descricao", "Descrição detalhada do produto.", "VARCHAR(255)", "[NULL]", "N/A", "Origem: cadastro. Destino: catálogo e atendimento.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["ativo", "Indica se o produto está disponível para novas vendas; produtos inativos permanecem no histórico (RN09).", "BOOLEAN", "[NOT NULL] [DEFAULT TRUE]", "N/A", "Origem: ativação/descontinuação do produto. Destino: filtro do catálogo para novas vendas.", "Administrador (leitura/escrita); Vendedor (leitura); Financeiro (leitura)"],
            ["preco_custo", "Preço pago ao fornecedor por unidade; não pode ser negativo.", "DECIMAL(10,2)", "[NOT NULL] [CHECK >= 0]", "N/A", "Origem: cadastro/compras. Destino: cálculo de margem e fluxo de caixa.", "Administrador (leitura/escrita); Financeiro (leitura); Vendedor sem acesso"],
            ["preco_venda", "Preço de venda vigente. Copiado para item_venda.preco_unitario no momento da venda (RN04); não pode ser negativo.", "DECIMAL(10,2)", "[NOT NULL] [CHECK >= 0]", "N/A", "Origem: cadastro. Destino: item_venda.preco_unitario.", "Administrador (leitura/escrita); Vendedor e Financeiro (leitura)"]]
    },
    {
        n: "venda", d: "Registra cada venda vinculada a um cliente e a um vendedor, com data, valor total e situação.", c: [
            ["id_venda", "Identificador único da venda.", "INT", "[PK]", "N/A", "Origem: gerado pelo sistema. Destino: item_venda.id_venda e nota_fiscal.id_venda.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["id_cliente", "Cliente obrigatório que realizou a compra (RN01).", "INT", "[FK] cliente(id_cliente) [NOT NULL]", "N/A", "Origem: seleção no atendimento. Destino: relatórios por cliente.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["id_vendedor", "Vendedor obrigatório responsável pela venda (RN01).", "INT", "[FK] vendedor(id_vendedor) [NOT NULL]", "N/A", "Origem: usuário que registra a venda. Destino: relatórios por vendedor.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["data_hora", "Data e hora do registro da venda.", "DATETIME", "[NOT NULL]", "N/A", "Origem: gerado no registro. Destino: fluxo de caixa e faturamento por período.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["valor_total", "Total da venda: soma dos itens menos desconto (RN05); cálculo atualizado pela aplicação ou por rotina do banco.", "DECIMAL(10,2)", "[NOT NULL] [DEFAULT 0.00] [CHECK >= 0]", "N/A", "Origem: soma de quantidade × preco_unitario menos desconto. Destino: faturamento, fluxo de caixa e nota_fiscal.valor.", "Administrador (leitura/escrita); Vendedor e Financeiro (leitura)"],
            ["desconto", "Desconto monetário aplicado à venda; não pode ser negativo.", "DECIMAL(10,2)", "[NOT NULL] [DEFAULT 0.00] [CHECK >= 0]", "N/A", "Origem: negociação da venda. Destino: cálculo do valor_total.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["status", "Situação da venda: Iniciado, Em atendimento, Confirmado, Vendido ou Cancelado (RN06).", "VARCHAR(30)", "[NOT NULL] [DEFAULT 'Iniciado'] [CHECK]", "N/A", "Origem: fluxo de atendimento. Destino: relatórios e auditoria de status (PR07).", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"]]
    },
    {
        n: "item_venda", d: "Detalha os produtos de cada venda. A chave primária composta (id_venda, id_produto) identifica cada produto em uma venda; preço unitário histórico é preservado (RN04).", c: [
            ["id_venda", "Venda à qual o item pertence.", "INT", "[PK] [FK] venda(id_venda) [NOT NULL]", "N/A", "Origem: venda em registro. Destino: cálculo do total da venda.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["id_produto", "Produto vendido.", "INT", "[PK] [FK] produto(id_produto) [NOT NULL]", "N/A", "Origem: seleção do produto. Destino: ranking de produtos mais e menos vendidos.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["quantidade", "Quantidade vendida; deve ser maior que zero (RN03).", "INT", "[NOT NULL] [CHECK > 0]", "N/A", "Origem: pedido do cliente. Destino: valor_total e relatórios de saída.", "Administrador e Vendedor (leitura/escrita); Financeiro (leitura)"],
            ["preco_unitario", "Preço unitário gravado no momento da venda para preservar o histórico (RN04); não pode ser negativo.", "DECIMAL(10,2)", "[NOT NULL] [CHECK >= 0]", "N/A", "Origem: produto.preco_venda no momento da venda. Destino: valor_total e faturamento.", "Administrador (leitura); Vendedor (leitura/escrita na venda); Financeiro (leitura)"]]
    },
    {
        n: "nota_fiscal", d: "Registro fiscal vinculado a uma venda concluída (relação 1:1). Deve ser mantido pelo prazo legal (PR02) e não pode ser alterado após emissão (RN11).", c: [
            ["id_nota", "Identificador único da nota fiscal no banco.", "INT", "[PK]", "N/A", "Origem: gerado pelo sistema. Destino: controle fiscal.", "Administrador, Vendedor e Financeiro (leitura); Financeiro (escrita)"],
            ["id_venda", "Venda à qual a nota está vinculada; uma nota por venda.", "INT", "[FK] venda(id_venda) [UNIQUE] [NOT NULL]", "N/A", "Origem: venda concluída. Destino: auditoria fiscal.", "Administrador, Vendedor e Financeiro (leitura); Vendedor (inclusão)"],
            ["numero", "Número da nota fiscal. Deve ser único (RN11).", "VARCHAR(255)", "[UNIQUE] [NOT NULL]", "N/A", "Origem: emissão da nota. Destino: controle fiscal e financeiro.", "Administrador, Vendedor e Financeiro (leitura)"],
            ["chave", "Chave de acesso da nota fiscal (44 posições).", "VARCHAR(44)", "[NULL]", "N/A", "Origem: emissão da nota. Destino: consulta e auditoria fiscal.", "Administrador e Financeiro (leitura); Vendedor (leitura)"],
            ["data_emissao", "Data de emissão da nota fiscal.", "DATE", "[NULL]", "N/A", "Origem: emissão da nota. Destino: relatórios por período.", "Administrador, Vendedor e Financeiro (leitura)"],
            ["valor", "Valor da nota fiscal, coerente com o valor total da venda.", "DECIMAL(10,2)", "[NULL]", "N/A", "Origem: venda.valor_total. Destino: faturamento e fluxo de caixa.", "Administrador e Financeiro (leitura); Vendedor (leitura)"]]
    },
    {
        n: "compra", d: "Registra as compras realizadas junto aos fornecedores, base das saídas do fluxo de caixa (RN13).", c: [
            ["id_compra", "Identificador único da compra.", "INT", "[PK]", "N/A", "Origem: gerado pelo sistema. Destino: controle de compras.", "Administrador e Financeiro (leitura/escrita)"],
            ["id_fornecedor", "Fornecedor obrigatório da compra.", "INT", "[FK] fornecedor(id_fornecedor) [NOT NULL]", "N/A", "Origem: seleção no registro da compra. Destino: relatórios por fornecedor.", "Administrador e Financeiro (leitura/escrita)"],
            ["data_compra", "Data em que a compra foi realizada.", "DATE", "[NOT NULL]", "N/A", "Origem: registro da compra. Destino: fluxo de caixa por período.", "Administrador e Financeiro (leitura/escrita)"],
            ["valor_total", "Valor total pago na compra (saída financeira); não pode ser negativo.", "DECIMAL(10,2)", "[NOT NULL] [CHECK >= 0]", "N/A", "Origem: registro da compra. Destino: fluxo de caixa (entradas menos saídas, RN14).", "Administrador e Financeiro (leitura/escrita)"]]
    }
];
const BADGE = { DPS: ["dps", "[DPS]"], DP: ["dp", "[DP]"], "N/A": ["na", "[N/A]"] };
const $ = s => document.querySelector(s);
$("#teamList").innerHTML = TEAM.map(n => `<li><strong>${n}</strong> - ${ROLE}</li>`).join("");
$("#navList").innerHTML = TABLES.map(t => `<li data-t="${t.n}"><a href="#${t.n}">${t.n}</a></li>`).join("");
$("#dict").innerHTML = TABLES.map(t => `<section id="${t.n}" class="card" data-t="${t.n}"><h2>${t.n}</h2><p class="desc">${t.d}</p><div class="wrap"><table><thead><tr><th>Atributo</th><th>Descrição / Regra de Negócio</th><th>Tipo e Tamanho</th><th>Constraints</th><th>Privacidade (LGPD/GDPR)</th><th>Linhagem (Data Lineage)</th><th>Controle de Acesso (RBAC)</th></tr></thead><tbody>${t.c.map(r => `<tr data-c="${r[0]}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td><strong>${r[3]}</strong></td><td><span class="badge ${BADGE[r[4]][0]}">${BADGE[r[4]][1]}</span></td><td>${r[5]}</td><td>${r[6]}</td></tr>`).join("")}</tbody></table></div></section>`).join("");
// Busca em tempo real
$("#search").addEventListener("input", e => {
    const q = e.target.value.trim().toLowerCase(); let shown = 0;
    document.querySelectorAll("#dict section").forEach(s => {
        const tm = !q || s.dataset.t.includes(q); let rows = 0;
        s.querySelectorAll("tbody tr").forEach(r => { const ok = tm || r.dataset.c.includes(q); r.hidden = !ok; if (ok) rows++; });
        s.hidden = !rows; if (rows) shown++;
        document.querySelector(`#navList li[data-t="${s.dataset.t}"]`).hidden = !rows;
    });
    $("#empty").hidden = shown > 0;
});
// Tema claro/escuro
const root = document.documentElement, tb = $("#themeBtn");
function setTheme(t) { root.dataset.theme = t; tb.textContent = t === "dark" ? "Modo claro" : "Modo escuro"; try { localStorage.setItem("tema", t) } catch (e) { } }
let saved = null; try { saved = localStorage.getItem("tema") } catch (e) { }
setTheme(saved || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
tb.onclick = () => setTheme(root.dataset.theme === "dark" ? "light" : "dark");
// Menu mobile
$("#menuBtn").onclick = () => $("#sidebar").classList.toggle("open");
$("#navList").addEventListener("click", () => $("#sidebar").classList.remove("open"));
// Modal do DER com Panzoom
let pz = null;
const modal = $("#modal"), stage = $("#stage");
$("#derBtn").onclick = () => {
    modal.hidden = false;
    if (!pz) { pz = Panzoom($("#derImg"), { maxScale: 8, minScale: 0.5, contain: false }); stage.addEventListener("wheel", pz.zoomWithWheel); }
    pz.reset({ animate: false });
};
$("#zin").onclick = () => pz && pz.zoomIn();
$("#zout").onclick = () => pz && pz.zoomOut();
$("#zreset").onclick = () => pz && pz.reset();
$("#close").onclick = () => modal.hidden = true;
document.addEventListener("keydown", e => { if (e.key === "Escape") modal.hidden = true; });
