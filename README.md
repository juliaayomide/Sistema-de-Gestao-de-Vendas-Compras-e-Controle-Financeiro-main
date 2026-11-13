# Sistema de Gestão de Vendas, Compras e Controle Financeiro

Projeto acadêmico de modelagem de banco de dados para a Ponce Comércio e Representações LTDA (Ponce Aplicação de Tecnologia). O sistema documenta clientes, vendedores, fornecedores, produtos, vendas, itens vendidos, notas fiscais e compras, considerando uma operação de revenda sem estoque físico próprio.

## Conteúdo da pasta

| Arquivo/pasta | Descrição |
|---|---|
| `index.html` | Página do dicionário de dados e apresentação do projeto. |
| `style.css` | Estilos responsivos, incluindo temas claro e escuro. |
| `script.js` | Dados do dicionário e interações da página: busca, navegação, tema e visualização ampliável do DER. |
| `bdc-ponce.sql` | DDL MySQL para criação das oito tabelas do modelo. |
| `assets/der.png` | Diagrama exibido no site, com a chave composta de `item_venda` e sem relação direta entre venda e compra. |
| `DER_Ponce_Enxuto.pdf` | Versão PDF separada do diagrama. |
| `docs/Especificacao_Requisitos_Regras_Negocio_BD.pdf` | Especificação revisada em PDF, disponível para download na página. |
| `docs/Especificacao_Requisitos_Regras_Negocio_BD.docx` | Arquivo editável da especificação revisada. |

## Como abrir

Abra `index.html` em um navegador. A página usa a biblioteca Panzoom 4.5.1 pelo CDN do jsDelivr para ampliar e mover o diagrama; esse recurso requer conexão com a internet. A criação do banco deve ser feita executando `bdc-ponce.sql` em MySQL 8.0.16 ou posterior, versão que aplica as restrições `CHECK`.

## Modelo de dados

O DDL cria estas tabelas:

- `cliente` e `vendedor`: cadastros associados às vendas.
- `fornecedor`: cadastro referenciado por produtos e compras.
- `produto`: catálogo com fornecedor, nome e preços obrigatórios; preços não negativos e indicador de disponibilidade.
- `venda`: vinculada obrigatoriamente a um cliente e a um vendedor; registra desconto e aceita os status `Iniciado`, `Em atendimento`, `Confirmado`, `Vendido` e `Cancelado`.
- `item_venda`: associação entre venda e produto, com chave primária composta (`id_venda`, `id_produto`), quantidade positiva e preço unitário não negativo.
- `nota_fiscal`: associada a no máximo uma nota por venda, com número obrigatório e único.
- `compra`: registro de compra vinculado a um fornecedor.

Os IDs não usam `AUTO_INCREMENT`; seus valores devem ser fornecidos por quem inserir os registros.

## Regras e limites de implementação

O DDL aplica chaves primárias e estrangeiras, campos obrigatórios e verificações de domínio descritas acima. Algumas regras da especificação precisam de lógica adicional e **não são garantidas apenas pelo DDL atual**: exigir ao menos um item e nota fiscal antes de concluir uma venda; atualizar `venda.valor_total` a partir dos itens e descontos; validar transições entre status; copiar automaticamente o preço do produto para o item; impedir alterações ou exclusões de nota emitida; gerar e estornar lançamentos financeiros; e produzir o fluxo de caixa por período. Essas regras devem ser implementadas e testadas na aplicação, em procedimentos, triggers ou views, conforme o caso.

As permissões RBAC e as classificações de privacidade exibidas no dicionário são documentação; a página estática não autentica usuários nem aplica controle de acesso. `DER_Ponce_Enxuto.pdf` foi exportado a partir da mesma imagem `assets/der.png` usada pelo site.

A página e a especificação identificam Data Owners e Data Stewards como papéis acadêmicos propostos para esta atividade. Atribuições corporativas reais precisam de validação da equipe e da empresa.

## Equipe

Os integrantes e as informações do projeto estão listados na página `index.html`.
