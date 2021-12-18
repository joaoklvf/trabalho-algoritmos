let bars = [];

async function setup() {
    let size = parseInt($("#customRange").val());
    if (bars.length != size) {
        generateBars(size);
    }
}

$(() => setup());

$("#customRange").on("input", setup);

function reset() {
    location.reload();
}

function Finished_Sorting() {
    $(".bar").each(function() {
        $(this).css("background-color", "green");
    });
}

function generateBars(n = -1) {
    bars = [];
    n = n < 0 ? Math.random() * 20 : n;
    for (let i = 0; i < n; i++) {
        let num = Math.floor(2 + Math.random() * 98);
        bars.push(`<div class="bar" id="${i}" name="${num}" style="height:${num}%"></div>`);
    }
    $("#espacoBarras").html(bars);
}

function Sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function MapRange(value, in_min, in_max, out_min, out_max) {
    return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

async function SelectionSort() {
    let delay = $("#rangeVelocidade").val();

    let container = $("#espacoBarras");
    for (let i = 0; i < bars.length; i++) {
        let mn_ind = i;    
        $(`#${$(bars[i]).attr("name")}`).css("background-color", "blue");
        for (let j = i + 1; j < bars.length; j++) {
            $(`#${$(bars[j]).attr("name")}`).css("background-color", "yellow");
            let a = parseInt($(bars[mn_ind]).attr("name"));
            let b = parseInt($(bars[j]).attr("name"));
            if (a > b) mn_ind = j;
            await Sleep(delay / 5.0);
            $(`#${$(bars[j]).attr("name")}`).css("background-color", "#fd0081");
        }

        $(`#${$(bars[mn_ind]).attr("name")}`).css("background-color", "blue");
        await Sleep(2 * delay / 5.0);

        let tmp = bars[mn_ind];
        bars[mn_ind] = bars[i];
        bars[i] = tmp;

        container.html(bars);
        await Sleep(2 * delay / 5.0);
        $(`#${$(bars[i]).attr("name")}`).css("background-color", "#fd0081");
        $(`#${$(bars[mn_ind]).attr("name")}`).css("background-color", "#fd0081");
    }
    Finished_Sorting();
}

async function InsertionSort() {
    let delay = Disable_The_Input();
    let container = document.getElementById("container");
    for (let i = 1; i < bars.length; i++) {
        let j = i - 1;
        let key = bars[i];
        let curr_id = key.split('id="')[1].split('"')[0];
        let nxt_ele = bars[j].split('id="')[1].split('"')[0];
        document.getElementById(curr_id).style.backgroundColor = selected;
        let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
        beep(100, sound, delay)
        while (j >= 0 && parseInt(bars[j].split(/[:%]/)[1]) > parseInt(key.split(/[:%]/)[1])) {
            document.getElementById(nxt_ele).style.backgroundColor = def;
            nxt_ele = bars[j].split('id="')[1].split('"')[0];
            document.getElementById(nxt_ele).style.backgroundColor = chng;
            await Sleep(delay);
            bars[j + 1] = bars[j];
            j--;
        }

        bars[j + 1] = key;
        container.innerHTML = bars.join('');
        document.getElementById(curr_id).style.backgroundColor = selected;
        document.getElementById(nxt_ele).style.backgroundColor = chng;
        await Sleep(delay * 3.0 / 5);
        document.getElementById(curr_id).style.backgroundColor = def;
        document.getElementById(nxt_ele).style.backgroundColor = def;
    }
    Finished_Sorting();
}

function Slide_down(l, r) {
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

    while (i < j && j <= r) {
        let curr_id = bars[j].split('id="')[1].split('"')[0];
        let nxt_ele = bars[i].split('id="')[1].split('"')[0];
        document.getElementById(curr_id).style.backgroundColor = selected;
        document.getElementById(nxt_ele).style.backgroundColor = chng;
        let a = parseInt(bars[j].split(/[:%]/)[1]);
        let b = parseInt(bars[i].split(/[:%]/)[1]);

        if (a > b) i++;
        else {
            Slide_down(i, j);
            i++; j++;
        }
        await Sleep(d / 2.0);
        container.innerHTML = bars.join('');
        document.getElementById(curr_id).style.backgroundColor = selected;
        document.getElementById(nxt_ele).style.backgroundColor = chng;
        let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
        beep(100, sound, d)
        await Sleep(d / 2.0);
        document.getElementById(curr_id).style.backgroundColor = def;
        document.getElementById(nxt_ele).style.backgroundColor = def;
        sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
        beep(100, sound, d)
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
    let delay = Disable_The_Input();
    await mergeSort(0, bars.length - 1, delay);
    Finished_Sorting();
}

async function Partition(l, r, d) {
    let i = l - 1;
    let j = l;
    let id = bars[r].split('id="')[1].split('"')[0];
    document.getElementById(id).style.backgroundColor = selected;
    for (j = l; j < r; j++) {
        let a = parseInt(bars[j].split(/[:%]/)[1]);
        let b = parseInt(bars[r].split(/[:%]/)[1]);
        if (a < b) {
            i++;
            let curr_id = bars[i].split('id="')[1].split('"')[0];
            let nxt_ele = bars[j].split('id="')[1].split('"')[0];
            document.getElementById(curr_id).style.backgroundColor = chng;
            document.getElementById(nxt_ele).style.backgroundColor = chng;

            let temp = bars[i];
            bars[i] = bars[j];
            bars[j] = temp;

            await Sleep(d / 3.0);
            container.innerHTML = bars.join('');
            document.getElementById(curr_id).style.backgroundColor = chng;
            document.getElementById(nxt_ele).style.backgroundColor = chng;
            document.getElementById(id).style.backgroundColor = selected;
            let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
            beep(100, sound, d)
            await Sleep(d / 3.0)
            document.getElementById(curr_id).style.backgroundColor = def;
            document.getElementById(nxt_ele).style.backgroundColor = def;
        }
    }

    let temp = bars[i + 1];
    bars[i + 1] = bars[r];
    bars[r] = temp;

    container.innerHTML = bars.join(' ');
    document.getElementById(id).style.backgroundColor = selected;
    await Sleep(d / 3.0);
    document.getElementById(id).style.backgroundColor = def;
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
    let delay = Disable_The_Input();
    await quickSort(0, bars.length - 1, delay);
    Finished_Sorting();
}

async function Heapfiy(n, i, d) {
    let largest = i;
    let l = 2 * i + 1; // lft
    let r = 2 * i + 2; // rgt
    let curr_id = bars[i].split('id="')[1].split('"')[0];
    let nxt_ele;
    let id3;

    document.getElementById(curr_id).style.backgroundColor = selected;
    if (r < n) {
        id3 = bars[r].split('id="')[1].split('"')[0];
        document.getElementById(id3).style.backgroundColor = chng;
    }
    if (l < n) {
        nxt_ele = bars[l].split('id="')[1].split('"')[0];
        document.getElementById(nxt_ele).style.backgroundColor = chng;
    }
    await Sleep(d / 3.0)
    if (l < n && parseInt(bars[l].split(/[:%]/)[1]) > parseInt(bars[largest].split(/[:%]/)[1]))
        largest = l;
    if (r < n && parseInt(bars[r].split(/[:%]/)[1]) > parseInt(bars[largest].split(/[:%]/)[1]))
        largest = r;

    if (largest != i) {
        let t = bars[i]; bars[i] = bars[largest]; bars[largest] = t;
        container.innerHTML = bars.join(' ');
        document.getElementById(curr_id).style.backgroundColor = selected;
        let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
        beep(100, sound, d)
        if (r < n) document.getElementById(id3).style.backgroundColor = chng;
        if (l < n) document.getElementById(nxt_ele).style.backgroundColor = chng;
        await Sleep(d / 3.0)
        container.innerHTML = bars.join(' ');
        await Heapfiy(n, largest, d);
    }
    container.innerHTML = bars.join(' ');
}

async function HeapSort() {
    let delay = Disable_The_Input();
    let n = bars.length;
    for (let i = n / 2 - 1; i >= 0; i--) // Build the heap
        await Heapfiy(n, i, delay);

    for (let i = n - 1; i >= 0; i--) {
        let t = bars[0]; // Swaping
        bars[0] = bars[i];
        bars[i] = t;

        container.innerHTML = bars.join(' ');
        await Heapfiy(i, 0, delay);
    }
    Finished_Sorting();
} 
