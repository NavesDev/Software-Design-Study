# Exercícios de Fixação: Programação Orientada a Objetos (OOP) em TypeScript

Estes exercícios foram projetados para consolidar os conceitos de OOP usando TypeScript.

Recomendamos que você crie um arquivo `.ts` para cada exercício (ex: `exercicio1.ts`) na pasta `oop/` e utilize o compilador do TypeScript ou `ts-node` para executá-los.

> [!IMPORTANT]
> **Regra de Testes:** Todos os métodos que contenham regras de negócio, validações ou cálculos complexos (métodos justificáveis) **devem obrigatoriamente possuir testes unitários** para validar seus diferentes fluxos de sucesso e falha (exceções).


## 📊 Progresso dos Exercícios
- [x] **Exercício 1:** Sistema de Produto e Estoque (Foco: Encapsulamento)
- [ ] **Exercício 2:** Processador de Pagamentos (Foco: Abstração e Polimorfismo)
- [ ] **Exercício 3:** Arena de RPG (Foco: Herança e Polimorfismo por Sobrescrita)
- [ ] **Exercício 4:** Validador de Senhas (Foco: Membros Estáticos)
- [ ] **Exercício 5:** Montagem de Computador (Foco: Composição vs Herança e Relações)
- [ ] **Exercício 6:** Envio de Mensagens Flexível (Foco: Sobrecarga de Métodos)

---

## 🎯 Exercício 1: Sistema de Produto e Estoque (Foco: Encapsulamento)

### Cenário
Você precisa construir um módulo para gerenciar produtos em um e-commerce. A integridade dos dados do produto é crítica: o preço nunca pode ser negativo, a quantidade em estoque não pode ficar abaixo de zero, e o desconto aplicado não pode exceder um limite máximo.

### Requisitos:
1. Crie uma classe `Produto`.
2. Adicione as seguintes propriedades privadas:
   - `_nome: string`
   - `_preco: number`
   - `_quantidadeEstoque: number`
   - `_descontoMaximo: number` (representado em porcentagem, ex: 0.30 para 30%, padrão deve ser 0.10)
3. Crie um `constructor` para inicializar o nome, o preço e a quantidade em estoque.
4. Implemente os seguintes **Getters** e **Setters**:
   - `nome`: Getter e Setter normais (com validação para não permitir nome vazio).
   - `preco`: Getter normal e Setter com validação (preço deve ser maior que zero).
   - `quantidadeEstoque`: Apenas Getter (não deve ser possível alterar o estoque diretamente de fora).
   - `descontoMaximo`: Getter e Setter com validação (o desconto máximo nunca pode ser maior que 0.50 ou 50%).
5. Crie os seguintes métodos públicos:
   - `adicionarEstoque(quantidade: number): void`: Valida se a quantidade é positiva e adiciona ao estoque.
   - `removerEstoque(quantidade: number): void`: Valida se há estoque suficiente e subtrai.
   - `calcularPrecoComDesconto(desconto: number): number`: Recebe uma porcentagem de desconto (ex: 0.15 para 15%). Valida se o desconto não é negativo e se não ultrapassa o `descontoMaximo`. Retorna o preço final calculado.

---

## 🎯 Exercício 2: Processador de Pagamentos (Foco: Abstração e Polimorfismo)

### Cenário
Sua plataforma de e-commerce agora aceita múltiplas formas de pagamento: **PIX**, **Cartão de Crédito** e **Boleto**. Cada forma de pagamento possui taxas diferentes e regras de processamento distintas.

### Requisitos:
1. Crie uma interface chamada `MetodoPagamento` com as seguintes assinaturas:
   - `processar(valor: number): void`
   - `obterComprovante(): string`
2. Crie a classe `PagamentoPix` que implementa `MetodoPagamento`:
   - Pix não tem taxas adicionais.
   - O comprovante deve conter uma chave Pix fictícia gerada e a confirmação imediata.
3. Crie a classe `PagamentoCartao` que implementa `MetodoPagamento`:
   - Deve receber a taxa de processamento no construtor (ex: 2% ou 0.02).
   - O método `processar` deve cobrar o valor original acrescido da taxa de cartão.
   - O comprovante deve conter o valor final cobrado (com a taxa) e um código de autorização simulado.
4. Crie a classe `PagamentoBoleto` que implementa `MetodoPagamento`:
   - Boleto tem uma taxa fixa de R$ 2,00 para emissão.
   - O comprovante deve incluir um código de barras fictício e avisar que o pagamento pode levar até 3 dias úteis para compensar.
5. Crie uma função externa ou uma classe gerenciadora chamada `ProcessadorPagamento`:
   - Deve conter uma função `executarPagamento(metodo: MetodoPagamento, valor: number): void` que processe o pagamento e imprima o comprovante na tela. *Aqui você aplicará o Polimorfismo!*

---

## 🎯 Exercício 3: Arena de RPG (Foco: Herança e Polimorfismo por Sobrescrita)

### Cenário
Você está desenvolvendo um jogo básico de RPG. Cada herói tem atributos base comuns (nome, pontos de vida, força), mas cada classe de herói (Guerreiro, Mago, Arqueiro) se comporta de forma diferente no combate.

### Requisitos:
1. Crie uma classe abstrata `Personagem`:
   - Propriedades protegidas (`protected`): `nome: string`, `vida: number`, `forca: number`.
   - Construtor que inicializa essas propriedades.
   - Método `receberDano(dano: number): void`: subtrai o dano da vida e exibe no console a vida restante.
   - Método abstrato `atacar(alvo: Personagem): void`.
2. Crie la subclasse `Guerreiro` que herda de `Personagem`:
   - No construtor, chame o construtor do pai (`super`).
   - Sobrescreva o método `atacar(alvo: Personagem)`: O guerreiro causa um dano igual à sua `forca * 1.5` (bônus de força bruta). Exiba uma mensagem estilizada no console.
3. Crie a subclasse `Mago` que herda de `Personagem`:
   - Adicione uma propriedade privada `mana: number` no construtor do Mago (além dos parâmetros herdados).
   - Sobrescreva o método `atacar(alvo: Personagem)`:
     - Se o mago tiver `mana >= 10`, ele lança uma Bola de Fogo que causa dano igual a `forca * 2.5` e consome 10 de mana.
     - Se não tiver mana suficiente, ele dá um ataque fraco com seu cajado (dano igual a `forca * 0.5`) e recupera 5 de mana.
4. Crie a subclasse `Arqueiro` que herda de `Personagem`:
   - Adicione uma propriedade privada `flechas: number` no construtor.
   - Sobrescreva o método `atacar(alvo: Personagem)`:
     - Se tiver flechas, consome 1 flecha e causa um dano igual a `forca * 1.2` com chance de acerto crítico (dano dobrado caso um número aleatório seja favorável, use `Math.random()`).
     - Se não tiver flechas, avisa que está sem munição e não causa dano.
5. Crie um script de teste simulando uma batalha entre eles para ver o polimorfismo em ação.

---

## 🎯 Exercício 4: Validador de Senhas (Foco: Membros Estáticos)

### Cenário
Você precisa de uma classe utilitária de segurança que valide senhas do sistema. Como a classe não guarda estado nem precisa ser instanciada via `new`, todos os seus métodos devem ser estáticos.

### Requisitos:
1. Crie a classe `ValidadorSenha`.
2. Adicione os seguintes atributos estáticos:
   - `COMPRIMENTO_MINIMO: number = 8`
3. Crie os seguintes métodos estáticos:
   - `temNumero(senha: string): boolean`: Retorna true se a senha contém pelo menos um número.
   - `temLetraMaiuscula(senha: string): boolean`: Retorna true se a senha contém pelo menos uma letra maiúscula.
   - `validar(senha: string): boolean`: Retorna true se a senha cumpre todos os requisitos (tamanho mínimo, conter número e conter maiúscula). Caso contrário, exibe o motivo da falha e retorna false.

---

## 🎯 Exercício 5: Montagem de Computador (Foco: Composição vs Herança e Relações)

### Cenário
Você precisa modelar a estrutura de um computador para uma loja de informática física, entendendo a relação entre suas peças.

### Requisitos:
1. Crie a classe `Processador` que recebe o modelo (ex: "Intel i7") e a velocidade de clock (ex: 3.5) no construtor.
2. Crie a classe `DispositivoUSB` que recebe o nome do dispositivo (ex: "Mouse Sem Fio").
3. Crie a classe `Computador` que:
   - Recebe no construtor a marca do computador (ex: "Dell").
   - Instancia internamente o seu `Processador` no próprio construtor (relação de **Composição**: o processador morre com o computador).
   - Possui uma lista privada de agregados chamada `dispositivosConectados: DispositivoUSB[]`.
   - Possui o método `conectarUSB(disp: DispositivoUSB): void` (relação de **Agregação**: o dispositivo existe fora do computador e pode ser conectado/removido dinamicamente).
   - Possui o método `desligar(): void` que esvazia a lista de dispositivos conectados e "destrói" o computador (removendo as instâncias).

---

## 🎯 Exercício 6: Envio de Mensagens Flexível (Foco: Sobrecarga de Métodos)

### Cenário
Você precisa construir um centralizador de notificações que pode enviar mensagens por diferentes canais dependendo das informações que forem passadas.

### Requisitos:
1. Crie a classe `CentralNotificacoes`.
2. Implemente a **sobrecarga** para o método `enviar`:
   - Assinatura 1: `enviar(mensagem: string): void` -> Envia para o log padrão do console.
   - Assinatura 2: `enviar(mensagem: string, email: string): void` -> Simula o envio de um e-mail para o endereço passado.
   - Assinatura 3: `enviar(mensagem: string, telefone: number, usarWhatsapp: boolean): void` -> Se `usarWhatsapp` for true, envia via WhatsApp para o telefone, se não, envia por SMS padrão.
3. Crie a implementação única de `enviar` tratando todos os tipos de parâmetros que podem vir.

---

## 💡 Como testar seus exercícios localmente?

Se você não tem o TypeScript configurado globalmente, aqui está o passo a passo rápido para rodar seus códigos:

1. No terminal do projeto, inicialize um projeto npm (se não estiver inicializado):
   ```bash
   npm init -y
   ```
2. Instale o TypeScript e o `ts-node` (para rodar arquivos `.ts` diretamente):
   ```bash
   npm install -D typescript ts-node @types/node
   ```
3. Inicialize a configuração do TypeScript:
   ```bash
   npx tsc --init
   ```
4. Crie seus arquivos (ex: `exercicio1.ts`) e execute no terminal:
   ```bash
   npx ts-node exercicio1.ts
   ```
