# ![Barcode_27025 (1)](https://github.com/user-attachments/assets/514e0888-b556-4e77-8f1d-1526204da492) Função: onInputDigitableLine 

Essa função é utilizada para processar e validar a entrada de uma linha digitável de boletos bancários.  
Com base no formato e nas regras de cálculo de módulos 10 e 11, a função valida os dados da linha digitável,  
extrai informações como a data de vencimento e o valor do boleto, e permite atualizar campos vinculados.

---

## 🧾 Parâmetros

### 🖊️ input
- **Tipo:** Elemento HTML (por exemplo, `<input>`)
- **Descrição:** O campo de entrada onde a linha digitável é inserida. A cor do texto do campo será alterada para indicar a validação (preto para válido, vermelho para inválido).
 
### 📆 callbackInputVencimento
- **Tipo:** Elemento HTML (opcional)
- **Descrição:** Um campo onde a data de vencimento do boleto será inserida, caso a linha digitável seja válida.
 
### 💵 callbackInputValor
- **Tipo:** Elemento HTML (opcional)
- **Descrição:** Um campo onde o valor do boleto será inserido, caso a linha digitável seja válida.

---

## ⚙️ Como Usar

### 1️⃣ Importando como Módulo (Recomendado)

Adicione o seguinte script em sua página HTML:

```html
<script type="module">
import 'https://cdn.jsdelivr.net/gh/GuGustavu/Boleto_Utils/index.js';
</script>

<input type="text" id="linha-digitavel" oninput="onInputDigitableLine(this, vencimentoInput, valorInput)">
<input type="text" id="vencimento" placeholder="Data de Vencimento">
<input type="text" id="valor" placeholder="Valor">
```

Certifique-se de que os IDs (`linha-digitavel`, `vencimento`, `valor`) correspondam aos elementos no HTML.

---

### 2️⃣. Usando Direto em JavaScript

Importe o módulo em seu JavaScript e chame a função diretamente:

```javascript
// Importando como módulo
import onInputDigitableLine from 'https://cdn.jsdelivr.net/gh/GuGustavu/Boleto_Utils/index.js';

// Elementos HTML
const input = document.getElementById('linha-digitavel');
const vencimentoInput = document.getElementById('vencimento');
const valorInput = document.getElementById('valor');

// Chamando a função
input.addEventListener('input', () => {
onInputDigitableLine(input, vencimentoInput, valorInput);
});
```
## 🔍 Como Funciona

1. **Reset de Valores:**
- Inicialmente, limpa os campos `callbackInputVencimento` e `callbackInputValor`, se fornecidos.

2. **Formatação e Validação:**
- A linha digitável é formatada pela função `formatDigitableLine`.
- É verificada a validade de segmentos da linha digitável utilizando os algoritmos de cálculo de módulo 10 e módulo 11.

3. **Extração de Informações:**
- Caso a linha digitável seja válida, a data de vencimento e o valor do boleto são calculados:
- **Data de Vencimento:** Calculada com base em uma data base padrão.
- **Valor do Boleto:** Extraído de um segmento específico da linha digitável.

4. **Atualização dos Campos:**
- Os campos fornecidos em `callbackInputVencimento` e `callbackInputValor` são atualizados com os valores extraídos.

---

## ✅ Regras de Validação

1. **Módulo 10:**
- Aplica-se a segmentos específicos da linha digitável.
- Verifica o dígito verificador (DV) contra o resultado calculado.

2. **Módulo 11:**
- Valida a linha digitável completa.
- Verifica o DV geral do boleto.

3. **Indicação Visual:**
- A cor do texto no campo `input` é alterada:
- Preto: Linha digitável válida.
- Vermelho: Linha digitável inválida.

---

## 📦 Dependências

### Funções Requeridas:
- `formatDigitableLine(input)`: Formata a linha digitável.
- `modulo10(segmento)`: Calcula o módulo 10 de um segmento.
- `modulo11(segmento)`: Calcula o módulo 11 de um segmento.
- `calcularVencimento(numero)`: Calcula a data de vencimento do boleto.
- `calcularValor(segmento)`: Calcula o valor do boleto a partir de sua linha digitável.

---

## 📚 Referências

- [Layout do Código de Barras - FEBRABAN](https://cmsarquivos.febraban.org.br/Arquivos/documentos/PDF/Layout%20-%20C%C3%B3digo%20de%20Barras%20ATUALIZADO.pdf)
- [Macoratti - Validação de Boletos](https://www.macoratti.net/07/10/net_bol.htm)
