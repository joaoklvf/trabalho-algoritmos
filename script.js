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
    let delay = 1;
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
    let delay = 1;
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
    let y = l;
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
    let delay = 1;
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
    let delay = 1;
    await quickSort(0, bars.length - 1, delay);
    pintarBarrasFinalizadas();
}

async function Heapfiy(n, i, d) {
    pintarBarrasPadrao();
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2; // rgt
    let barraSelecionada = $(bars[i]);
    let barraPosterior;
    let barraTres;
    let container = $("#espacoBarras");
    barraSelecionada.css("background-color", corSelecionada);
    if (r < n) {
        barraTres = $(bars[r]);
        barraTres.css("background-color", corMudando);
    }
    if (l < n) {
        barraPosterior = $(bars[l]);
        barraPosterior.css("background-color", corMudando);
    }
    await Sleep(d / 3.0)
    if (l < n && parseInt($(bars[l]).attr("name")) > parseInt($(bars[largest]).attr("name")))
        largest = l;
    if (r < n && parseInt($(bars[r]).attr("name")) > parseInt($(bars[largest]).attr("name")))
        largest = r;

    if (largest != i) {
        let t = $(bars[i]);
        bars[i] = $(bars[largest]);
        bars[largest] = t;
        container.html(bars);;
        barraSelecionada.css("background-color", corSelecionada);
        if (r < n) barraTres.css("background-color", corMudando);
        if (l < n) barraPosterior.css("background-color", corMudando);
        await Sleep(d / 3.0);    
        container.html(bars);
        await Heapfiy(n, largest, d);
    }
    container.html(bars);;
}

async function HeapSort() {
    let delay = 1;
    let n = bars.length;
    let container = $("#espacoBarras");

    for (let i = Math.floor(n / 2); i >= 0; i--) {
        await Heapfiy(n, i, delay);
    }

    for (let i = bars.length - 1; i > 0; i--) {
        let t = bars[0]; // Swaping
        bars[0] = bars[i];
        bars[i] = t;

        container.html(bars);;
        await Heapfiy(i, 0, delay);
    }
    pintarBarrasFinalizadas();
} 
