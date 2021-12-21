let bars = [];
const corPadrao = "#fd0081", corMudando = "#431f91", corFinalizada = "#8ef511", corSelecionada = "yellow";

async function inicializar() {
    let size = parseInt($("#customRange").val());
    if (bars.length != size) {
        definirBarras(size);
    }
}

$(() => inicializar());

$("#customRange").on("input", inicializar);


function reset() {
    location.reload();
}

function pintarBarrasFinalizadas() {
    $(".bar").css("background-color", "green");
}

function pintarBarrasPadrao() {
    $(".bar").css("background-color", "");
}

function definirBarras(n = -1) {
    bars = [];
    n = n < 0 ? Math.random() * 20 : n;
    for (let i = 0; i < n; i++) {
        let num = Math.floor(2 + Math.random() * 98);
        bars.push(`<div class="bar" id="${i}" name="${num}" style="height:${num}%"></div>`);
    }
    $("#espacoBarras").html(bars);
    $("#customRangeValue").html(`Tamanho do array: ${n}`)
}

function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function MapRange(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

async function SelectionSort() {
    let delay = 200;
    let container = $("#espacoBarras");
    for (let i = 0; i < bars.length; i++) {
        let mn_ind = i;
        let barraSelecionada = $(bars[i]).attr("id");
        $(`#${barraSelecionada}`).css("background-color", corSelecionada);

        for (let j = i + 1; j < bars.length; j++) {
            let barraPosterior = $(bars[j]).attr("id");
            $(`#${barraPosterior}`).css("background-color", corMudando);
            let a = parseInt($(bars[mn_ind]).attr("name"));
            let b = parseInt($(bars[j]).attr("name"));
            if (a > b) mn_ind = j;
            await Sleep(delay / 5.0);
            $(`#${barraPosterior}`).css("background-color", corPadrao);
        }

        let barraPosterior = $(bars[mn_ind]).attr("id");
        $(`#${barraPosterior}`).css("background-color", corSelecionada);
        await Sleep(2 * delay / 5.0);

        let tmp = bars[mn_ind];
        bars[mn_ind] = bars[i];
        bars[i] = tmp;

        container.html(bars);
        await Sleep(2 * delay / 5.0);
        $(`#${barraSelecionada}`).css("background-color", corPadrao);
        $(`#${barraPosterior}`).css("background-color", corPadrao);
    }
    pintarBarrasFinalizadas();
}

async function InsertionSort() {
    let delay = 200;
    let container = $("#espacoBarras");
    for (let i = 1; i < bars.length; i++) {
        let j = i - 1;
        let barraChave = $(bars[i]);
        let barraSelecionada = $(bars[i]).attr("id");
        $(`#${barraSelecionada}`).css("background-color", corSelecionada);
        let barraPosterior = $(bars[j]).attr("id");
        $(`#${barraPosterior}`).css("background-color", corMudando);
        while (j >= 0 && parseInt($(bars[j]).attr("name")) > parseInt(barraChave.attr("name"))) {
            $(`#${barraPosterior}`).css("background-color", corPadrao);
            barraPosterior = $(bars[j]).attr("id");
            $(`#${barraPosterior}`).css("background-color", corMudando);
            await Sleep(delay);
            bars[j + 1] = bars[j];
            j--;
        }

        bars[j + 1] = barraChave;
        container.html(bars);
        $(`#${barraSelecionada}`).css("background-color", corSelecionada);
        $(`#${barraPosterior}`).css("background-color", corMudando);
        await Sleep(delay * 3.0 / 5);
        $(`#${barraSelecionada}`).css("background-color", corPadrao);
        $(`#${barraPosterior}`).css("background-color", corPadrao);
    }
    pintarBarrasFinalizadas();
}

function rebaixarBarras(l, r) {
    let temp = bars[r];
    for (let i = r - 1; i >= l; i--) {
        bars[i + 1] = bars[i];
    }
    bars[l] = temp;
}


async function merge(l, m, r, d) {
    let i = l;
    let j = m + 1;
    let container = $("#espacoBarras");
    while (i < j && j <= r) {
        let barraSelecionada = $(bars[i]).attr("id");
        $(`#${barraSelecionada}`).css("background-color", corSelecionada);
        let barraPosterior = $(bars[j]).attr("id");
        $(`#${barraPosterior}`).css("background-color", corMudando);
        let a = parseInt($(bars[j]).attr("name"));
        let b = parseInt($(bars[i]).attr("name"));

        if (a > b) i++;
        else {
            rebaixarBarras(i, j);
            i++; j++;
        }
        await Sleep(d / 2.0);
        container.html(bars);
        $(`#${barraSelecionada}`).css("background-color", corSelecionada);
        $(`#${barraPosterior}`).css("background-color", corMudando);
        $(`#${barraSelecionada}`).css("background-color", corPadrao);;
        $(`#${barraPosterior}`).css("background-color", corPadrao);
    }
}


async function mergeSort(l, r, d) {
    if (l < r) {
        let m = parseInt(l + (r - l) / 2);
        await mergeSort(l, m, d);
        await mergeSort(m + 1, r, d);
        await merge(l, m, r, d);
    }
}


async function MergeSort() {
    let delay = 200;
    await mergeSort(0, bars.length - 1, delay);
    pintarBarrasFinalizadas();
}

async function Partition(l, r, d) {
    let i = l - 1;
    let j = l;
    let container = $("#espacoBarras");
    let barraChave = $(bars[r]);
    barraChave.css("background-color", corSelecionada);
    for (j = l; j < r; j++) {
        let a = parseInt($(bars[j]).attr("name"));
        let b = parseInt($(bars[r]).attr("name"));
        if (a < b) {
            i++;
            let barraSelecionada = $(bars[i]).attr("id")
            let barraPosterior = $(bars[j]).attr("id");
            $(`#${barraSelecionada}`).css("background-color", corMudando);
            $(`#${barraPosterior}`).css("background-color", corMudando);

            let temp = bars[i];
            bars[i] = bars[j];
            bars[j] = temp;

            await Sleep(d / 3.0);
            container.html(bars);
            $(`#${barraSelecionada}`).css("background-color", corMudando);
            $(`#${barraPosterior}`).css("background-color", corMudando);
            barraChave.css("background-color", corSelecionada);
            await Sleep(d / 3.0)
            $(`#${barraSelecionada}`).css("background-color", corPadrao);;
            $(`#${barraPosterior}`).css("background-color", corPadrao);
        }
    }

    let temp = bars[i + 1];
    bars[i + 1] = bars[r];
    bars[r] = temp;

    container.html(bars);;
    barraChave.css("background-color", corSelecionada);
    await Sleep(d / 3.0);
    barraChave.css("background-color", corPadrao);
    return i + 1;
}

async function quickSort(l, r, d) {
    if (l < r) {
        let p = await Partition(l, r, d);
        await quickSort(l, p - 1, d);
        await quickSort(p + 1, r, d);
    }
}


async function QuickSort() {
    let delay = 200;
    await quickSort(0, bars.length - 1, delay);
    pintarBarrasFinalizadas();
}

async function heapConstrutor(qtdCasas, posicao) {
    pintarBarrasPadrao();
    let paiAnalisado = posicao;
    let esquerda = 2 * posicao + 1; //pois a casa um vale 0
    let direita = 2 * posicao + 2;
    let barraSelecionada = $(bars[posicao]);
    let barraPosterior;
    let barraTres;
    let container = $("#espacoBarras");
    barraSelecionada.css("background-color", corSelecionada);
    if (direita < qtdCasas) {
        barraTres = $(bars[direita]);
        barraTres.css("background-color", corMudando);
    }
    if (esquerda < qtdCasas) {
        barraPosterior = $(bars[esquerda]);
        barraPosterior.css("background-color", corMudando);
    }
    await Sleep(68);
    //realiza troca
    if (esquerda < qtdCasas && parseInt($(bars[esquerda]).attr("name")) > parseInt($(bars[paiAnalisado]).attr("name")))
        paiAnalisado = esquerda;
    if (direita < qtdCasas && parseInt($(bars[direita]).attr("name")) > parseInt($(bars[paiAnalisado]).attr("name")))
        paiAnalisado = direita;

    if (paiAnalisado != posicao) {
        let t = $(bars[posicao]);
        bars[posicao] = $(bars[paiAnalisado]);
        bars[paiAnalisado] = t;
        container.html(bars);;
        barraSelecionada.css("background-color", corSelecionada);
        if (direita < qtdCasas) barraTres.css("background-color", corMudando);
        if (esquerda < qtdCasas) barraPosterior.css("background-color", corMudando);
        await Sleep(68);    
        container.html(bars);
        await heapConstrutor(qtdCasas, paiAnalisado);
    }
    container.html(bars);;
}

async function HeapSort() {
    let delay = 200;
    let n = bars.length; //tamanho do vetor
    let container = $("#espacoBarras");
    //Math.floor -> retorna menor numero inteiro
    for (let i = Math.floor(n / 2); i >= 0; i--) {
        await heapConstrutor(n, i, delay);
    }

    for (let i = bars.length - 1; i > 0; i--) {
        let t = bars[0];
        bars[0] = bars[i];
        bars[i] = t;

        container.html(bars);;
        await heapConstrutor(i, 0, delay);
    }
    pintarBarrasFinalizadas();
} 


/*
m = último valor
o índice 1 é a raiz da árvore;
o pai de qualquer índice  f  é  f/2  (é claro que 1 não tem pai);
o filho esquerdo de um índice  p  é  2p  (esse filho só existe se 2p ≤ m );
o filho direito de  p  é  2p+1  (esse filho só existe se 2p+1 ≤ m ).
*/