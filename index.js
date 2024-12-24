function formatDigitableLine(input) {
    input.title = "Formato: AAABC.CCCCX-DDDDD.DDDDDY-EEEEE.EEEEEZ-K-UUUUVVVVVVVVVV"
    input.placeholder = "Insira da linha digitável"

    let _ = input.value.replace(/\D/g, '');

    input.value = _.slice(0, 5) + (_.length > 5 ? '.' : '') +
        _.slice(5, 10) + (_.length > 10 ? '-' : '') +
        _.slice(10, 15) + (_.length > 15 ? '.' : '') +
        _.slice(15, 21) + (_.length > 21 ? '-' : '') +
        _.slice(21, 26) + (_.length > 26 ? '.' : '') +
        _.slice(26, 32) + (_.length > 32 ? '-' : '') +
        _.slice(32, 33) + (_.length > 33 ? '-' : '') +
        _.slice(33, 47);

    return input.value.replace(/\D/g, '')

}

function formatBarcode(input) {
    input.title = "Formato: AAAXBBBBCCCCCCCCCCDDDDDEEEEEEEEEEFFFFFFFFFF"
    input.placeholder = "Escaneie o código de barras"

    input.value = input.value.replace(/\D/g, '').slice(0, 43);

    return input.value
}

function calcularVencimento(dias) {
    if (dias < 1) {
        return null;
    }
    else {
        const dataBase1 = new Date('1997-10-07');
        const dataBase2 = new Date('2022-05-29');
        const dataCorte = new Date('2025-02-23');

        if (new Date() >= dataCorte || dias <= 1000) {
            dataBase2.setDate(dataBase2.getDate() + dias); // Corrigido
            dataBase2.toISOString().split('T')[0];
            return dataBase2.toLocaleDateString('pt-BR');

        }
        else {
            dataBase1.setDate(dataBase1.getDate() + dias); // Corrigido
            dataBase1.toISOString().split('T')[0];
            return dataBase1.toLocaleDateString('pt-BR');
        }
    }
}

function calcularValor(string) {
    return (string / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    })
}

function modulo10(numero) {
    let multi = 2;
    let acumula = 0;

    for (let posicao1 = numero.length - 1; posicao1 >= 0; posicao1--) {
        let resultado = parseInt(numero.charAt(posicao1)) * multi;

        let resultadoStr = resultado.toString();
        for (let posicao2 = resultadoStr.length - 1; posicao2 >= 0; posicao2--) {
            acumula += parseInt(resultadoStr.charAt(posicao2));
        }

        multi = (multi === 2) ? 1 : 2;
    }

    let dac = acumula % 10;
    dac = 10 - dac;

    if (dac === 10) { dac = 0; }

    return dac;
}

function modulo11(numero) {
    var codigoBarras = numero.slice(0, 3) + numero.slice(3, 4) + numero.slice(32, 33) + numero.slice(33, 38) + numero.slice(38, 48) + numero.slice(4, 9) + numero.slice(10, 20) + numero.slice(21, 31)
    let stringValidator = codigoBarras.slice(0, 4) + codigoBarras.slice(5)

    let arrayFator = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4]
    const reversedString = stringValidator.split('').reverse()
    let valor = 0

    reversedString.forEach((element, index) => { valor += arrayFator[index] * element });

    var DAC = (11 - (valor - (Math.floor(valor / 11) * 11)))
    if (DAC == 0) { return 0 }
    else if (DAC == 10 || DAC == 11) { return 1 }
    else { return DAC }
}

export default function onInputDigitableLine(input, callbackInputVencimento, callbackInputValor) {
    callbackInputVencimento ? (callbackInputVencimento.value = '') : null;
    callbackInputValor ? (callbackInputValor.value = '') : null;

    let isValid = true;
    input.style.color = 'black';

    let _ = formatDigitableLine(input);

    validarModulo({ start: 0, end: 9 }, modulo10);
    validarModulo({ start: 10, end: 20 }, modulo10);
    validarModulo({ start: 21, end: 31 }, modulo10);

    if (validarModulo({ start: 0, end: 47 }, modulo11)) {
        var vencimento = calcularVencimento(Number(_.slice(33, 37)));
        console.log(`Data de vencimento é: ${vencimento}`);

        var valor = calcularValor(_.slice(37, 47));
        console.log(`Valor do boleto é ${valor}`);

        callbackInputVencimento ? (callbackInputVencimento.value = vencimento) : null;
        callbackInputValor ? (callbackInputValor.value = valor) : null;
    }

    function validarModulo(intervalo, moduloFunc) {

        switch (moduloFunc) {
            case modulo10:
                if (_.length <= intervalo.end) return false;

                let DV10result = moduloFunc(_.slice(intervalo.start, intervalo.end));
                let DVcase = _.slice(intervalo.end, intervalo.end + 1)

                if (DV10result == DVcase) return true

                input.style.color = 'red'; isValid = false;

            case modulo11:
                if (_.length != 47) return false;

                let DV11result = moduloFunc(_.slice(intervalo.start, intervalo.end));
                let DVline = _.slice(32, 33)

                if (DV11result == DVline) return true;

                input.style.color = 'red'; isValid = false;
        }

        return false;
    }

    
    //referência: https://www.macoratti.net/07/10/net_bol.htm e https://cmsarquivos.febraban.org.br/Arquivos/documentos/PDF/Layout%20-%20C%C3%B3digo%20de%20Barras%20ATUALIZADO.pdf
}

window.onInputDigitableLine = onInputDigitableLine;