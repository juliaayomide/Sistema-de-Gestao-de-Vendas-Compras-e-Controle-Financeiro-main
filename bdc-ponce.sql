CREATE TABLE cliente (
    id_cliente INT PRIMARY KEY,
    nome VARCHAR(255),
    cpf VARCHAR(11),
    telefone VARCHAR(14),
    email VARCHAR(255)
);

CREATE TABLE vendedor (
    id_vendedor INT PRIMARY KEY,
    nome VARCHAR(255),
    telefone VARCHAR(14)
);

CREATE TABLE fornecedor (
    id_fornecedor INT PRIMARY KEY,
    razao_social VARCHAR(255),
    cnpj VARCHAR(255),
    contato VARCHAR(255)
);

CREATE TABLE produto (
    id_produto INT PRIMARY KEY,
    id_fornecedor INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    preco_custo DECIMAL(10,2) NOT NULL,
    preco_venda DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id_fornecedor),
    CHECK (preco_custo >= 0),
    CHECK (preco_venda >= 0)
);

CREATE TABLE venda (
    id_venda INT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_vendedor INT NOT NULL,
    data_hora DATETIME NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    desconto DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    status VARCHAR(30) NOT NULL DEFAULT 'Iniciado',
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_vendedor) REFERENCES vendedor(id_vendedor),
    CHECK (valor_total >= 0),
    CHECK (desconto >= 0),
    CHECK (status IN ('Iniciado', 'Em atendimento', 'Confirmado', 'Vendido', 'Cancelado'))
);

CREATE TABLE item_venda (
    id_venda INT NOT NULL,
    id_produto INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (id_venda, id_produto),
    FOREIGN KEY (id_venda) REFERENCES venda(id_venda),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto),
    CHECK (quantidade > 0),
    CHECK (preco_unitario >= 0)
);

CREATE TABLE nota_fiscal (
    id_nota INT PRIMARY KEY,
    id_venda INT NOT NULL UNIQUE,
    numero VARCHAR(255) NOT NULL UNIQUE,
    chave VARCHAR(44),
    data_emissao DATE,
    valor DECIMAL(10,2),
    FOREIGN KEY (id_venda) REFERENCES venda(id_venda),
    CHECK (valor IS NULL OR valor >= 0)
);

CREATE TABLE compra (
    id_compra INT PRIMARY KEY,
    id_fornecedor INT NOT NULL,
    data_compra DATE NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id_fornecedor),
    CHECK (valor_total >= 0)
);