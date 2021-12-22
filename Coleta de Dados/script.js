//Calcula desvio padrão
desvioPadrao = (lista) => {
    var media = 0;
    var varianca = 0;

    for (var i = 0; i < lista.length; i++) {
        media += lista[i]
    }

    media = media / lista.length

    for (i = 0; i < lista.length; i++) {
        varianca += Math.pow(media - lista[i], 2);
    }
    varianca = varianca / lista.length;

    return ([Math.sqrt(varianca), media])
}


//Insertion Sort

insertionSort = (array, pos) => {
    let vetor = [...array];
    let numeroTrocas = 0;
    let numeroComparacoes = 0;
    let tempoExecucao = 0;
    let result = []
    let timestamp = Date.now()

    for (outer = 1; outer < vetor.length; outer++) {

        for (inner = 0; inner < outer; inner++) {

            if (vetor[outer] < vetor[inner]) {

                numeroTrocas++;
                const [element] = vetor.splice(outer, 1);
                vetor.splice(inner, 0, element);
            }
            numeroComparacoes++;
        }
    }
    let timestampEnd = Date.now()

    result.push(numeroComparacoes, numeroTrocas, vetor, timestampEnd - timestamp)
    return result
}



//Selection Sort

selectionSort = (array, pos) => {
    let vetor = [...array];
    let n = vetor.length;
    let numeroTrocas = 0;
    let numeroComparacoes = 0;
    let tempoExecucao = 0;
    //console.log(vetor)
    let result = []
    let timestamp = Date.now()

    for (let i = 0; i < n; i++) {
        let min = i;


        for (let j = i + 1; j < n; j++) {

            if (vetor[j] < vetor[min]) {
                min = j;
            }
            numeroComparacoes++
        }
        if (min != i) {
            //  console.log(vetor)
            let tmp = vetor[i];
            vetor[i] = vetor[min];
            vetor[min] = tmp;
            numeroTrocas++
            // console.log("chegou")      //    console.log(vetor)

        }

        numeroComparacoes++
    }
    let timestampEnd = Date.now()

    result.push(numeroComparacoes, numeroTrocas, vetor, timestampEnd - timestamp)
    return result
}



//Merge Sort

mergeSort = (array) => {
    let vetor = [...array];
    let numeroTrocas = 0;
    let numeroComparacoes = 0;
    let result = []
    let sortr

    let timestamp = Date.now()

    if (vetor.length < 2) {
        return vetor
    }
    numeroComparacoes++
    const mid = Math.floor(vetor.length / 2)
    const smallOne = vetor.slice(0, mid)
    const smallTwo = vetor.slice(mid)

    sortr = sort(mergeSort(smallOne), mergeSort(smallTwo), numeroTrocas, numeroComparacoes)

    let timestampEnd = Date.now()

    result.push(sortr[0], sortr[1], vetor, timestampEnd - timestamp)

    return result
}

sort = (smallOne, smallTwo, trocas, comparacoes) => {
    const sorted = []
    let result = []

    while (smallOne.length && smallTwo.length) {
        trocas++
        if (smallOne[0] <= smallTwo[0]) {
            sorted.push(smallOne.shift())

        } else {
            sorted.push(smallTwo.shift())
        }
        comparacoes += 2
    }

    result.push(comparacoes, trocas)
    const output = [...sorted, ...smallOne, ...smallTwo]

    return result
}



//Heap Sort
const buildMaxHeap = (arr) => {
    let i = Math.floor(arr.length / 2 - 1);

    while (i >= 0) {
        heapify(arr, i, arr.length);
        i -= 1;
    }
}

const heapify = (heap, i, max) => {
    let index;
    let leftChild;
    let rightChild;

    while (i < max) {
        index = i;
        leftChild = 2 * i + 1;

        rightChild = leftChild + 1;

        if (leftChild < max && heap[leftChild] > heap[index]) {
            index = leftChild;
        }

        if (rightChild < max && heap[rightChild] > heap[index]) {
            index = rightChild;
        }

        if (index === i) {
            return;
        }

        swap(heap, i, index);

        i = index;
    }
}

const swap = (arr, firstItemIndex, lastItemIndex) => {

    const temp = arr[firstItemIndex];

    arr[firstItemIndex] = arr[lastItemIndex];
    arr[lastItemIndex] = temp;
}

const heapSort = (array, pos) => {
    let vetor = [...array];
    let numeroComparacoes = 0
    let numeroTrocas = 0
    let result = []
    let timestamp = Date.now()

    buildMaxHeap(vetor);
    numeroComparacoes++

    lastElement = vetor.length - 1;

    while (lastElement > 0) {
        numeroComparacoes++
        swap(vetor, 0, lastElement);
        numeroTrocas++
        heapify(vetor, 0, lastElement);
        numeroTrocas++
        numeroComparacoes += 4
        lastElement -= 1;
    }
    let timestampEnd = Date.now()

    result.push(numeroComparacoes, numeroTrocas, vetor, timestampEnd - timestamp)
    return result
}



//Quick Sort
function partition(arr, start, end, trocas, comparacoes) {
    let result = []

    const pivotValue = arr[end];
    let pivotIndex = start;
    for (let i = start; i < end; i++) {

        if (arr[i] < pivotValue) {
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            trocas++
            pivotIndex++;
        }
        comparacoes++
    }

    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]]

    trocas++

    result.push(pivotIndex, comparacoes, trocas)

    return result;
};

function quickSort(arr) {
    stack = [];
    let vetor = [...arr]
    var numeroTrocas = 0
    var numeroComparacoes = 0
    let result = []
    let timestamp = Date.now()
    stack.push(0);
    stack.push(vetor.length - 1);

    while (stack[stack.length - 1] >= 0) {
        numeroComparacoes++
        end = stack.pop();
        start = stack.pop();
        pivotIndex = partition(vetor, start, end, numeroTrocas, numeroComparacoes);

        numeroComparacoes = pivotIndex[1]
        numeroTrocas = pivotIndex[2]

        if (pivotIndex[0] - 1 > start) {
            stack.push(start);
            stack.push(pivotIndex[0] - 1);
        }
        numeroComparacoes++


        if (pivotIndex[0] + 1 < end) {
            stack.push(pivotIndex[0] + 1);
            stack.push(end);
        }
        numeroComparacoes++
    }
    let timestampEnd = Date.now()
    result.push(numeroComparacoes, numeroTrocas, vetor, timestampEnd - timestamp)
    return result
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Method {
    constructor() {
        this.comparacoes = []
        this.medComparacoes = 0
        this.desComparacoes = 0
        this.trocas = []
        this.medTrocas = 0
        this.desTrocas = 0
        this.tempo = []
        this.medTempo = 0
        this.desTempo = 0
    }

}

function Sort() {

    let insertionRan = [new Method(), new Method(), new Method(), new Method(), new Method()]
    let insertionCres = [new Method(), new Method(), new Method(), new Method(), new Method()]
    let insertionDecres = [new Method(), new Method(), new Method(), new Method(), new Method()]

    let selectionRan = [new Method(), new Method(), new Method(), new Method(), new Method()]
    let selectionCres = [new Method(), new Method(), new Method(), new Method(), new Method()]
    let selectionDecres = [new Method(), new Method(), new Method(), new Method(), new Method()]

    let heapRan = [new Method(), new Method(), new Method(), new Method(), new Method()]
    let heapCres = [new Method(), new Method(), new Method(), new Method(), new Method()]
    let heapDecres = [new Method(), new Method(), new Method(), new Method(), new Method()]

    let mergeRan = [new Method(), new Method(), new Method(), new Method(), new Method()]
    let mergeCres = [new Method(), new Method(), new Method(), new Method(), new Method()]
    let mergeDecres = [new Method(), new Method(), new Method(), new Method(), new Method()]

    let quickRan = [new Method(), new Method(), new Method(), new Method(), new Method()]
    let quickCres = [new Method(), new Method(), new Method(), new Method(), new Method()]
    let quickDecres = [new Method(), new Method(), new Method(), new Method(), new Method()]

    let array800 = []
    array800 = [
        "insertionRan:",
        insertionRan[0],
        "insertionCres:",
        insertionCres[0],
        "insertionDecres:",
        insertionDecres[0],
        "selectionRan:",
        selectionRan[0],
        "selectionCres:",
        selectionCres[0],
        "selectionDecres:",
        selectionDecres[0],
        "heapRan:",
        heapRan[0],
        "heapCres:",
        heapCres[0],
        "heapDecres:",
        heapDecres[0],
        "mergeRan:",
        mergeRan[0],
        "mergeCres:",
        mergeCres[0],
        "mergeDecres:",
        mergeDecres[0],
        "quickRan:",
        quickRan[0],
        "quickCres:",
        quickCres[0],
        "quickDecres:",
        quickDecres[0],

    ]

    let array2000 = []
    array2000 = [
        "insertionRan:",
        insertionRan[1],
        "insertionCres:",
        insertionCres[1],
        "insertionDecres:",
        insertionDecres[1],
        "selectionRan:",
        selectionRan[1],
        "selectionCres:",
        selectionCres[1],
        "selectionDecres:",
        selectionDecres[1],
        "heapRan:",
        heapRan[1],
        "heapCres:",
        heapCres[1],
        "heapDecres:",
        heapDecres[1],
        "mergeRan:",
        mergeRan[1],
        "mergeCres:",
        mergeCres[1],
        "mergeDecres:",
        mergeDecres[1],
        "quickRan:",
        quickRan[1],
        "quickCres:",
        quickCres[1],
        "quickDecres:",
        quickDecres[1]
    ]

    let array16000 = []
    array16000 = [
        "insertionRan:",
        insertionRan[2],
        "insertionCres:",
        insertionCres[2],
        "insertionDecres:",
        insertionDecres[2],
        "selectionRan:",
        selectionRan[2],
        "selectionCres:",
        selectionCres[2],
        "selectionDecres:",
        selectionDecres[2],
        "heapRan:",
        heapRan[2],
        "heapCres:",
        heapCres[2],
        "heapDecres:",
        heapDecres[2],
        "mergeRan:",
        mergeRan[2],
        "mergeCres:",
        mergeCres[2],
        "mergeDecres:",
        mergeDecres[2],
        "quickRan:",
        quickRan[2],
        "quickCres:",
        quickCres[2],
        "quickDecres:",
        quickDecres[2]
    ]

    let array42000 = []
    array42000 = [
        "insertionRan:",
        insertionRan[3],
        "insertionCres:",
        insertionCres[3],
        "insertionDecres:",
        insertionDecres[3],
        "selectionRan:",
        selectionRan[3],
        "selectionCres:",
        selectionCres[3],
        "selectionDecres:",
        selectionDecres[3],
        "heapRan:",
        heapRan[3],
        "heapCres:",
        heapCres[3],
        "heapDecres:",
        heapDecres[3],
        "mergeRan:",
        mergeRan[3],
        "mergeCres:",
        mergeCres[3],
        "mergeDecres:",
        mergeDecres[3],
        "quickRan:",
        quickRan[3],
        "quickCres:",
        quickCres[3],
        "quickDecres:",
        quickDecres[3]
    ]

    let array58000 = []
    array58000 = [
        "insertionRan:",
        insertionRan[4],
        "insertionCres:",
        insertionCres[4],
        "insertionDecres:",
        insertionDecres[4],
        "selectionRan:",
        selectionRan[4],
        "selectionCres:",
        selectionCres[4],
        "selectionDecres:",
        selectionDecres[4],
        "heapRan:",
        heapRan[4],
        "heapCres:",
        heapCres[4],
        "heapDecres:",
        heapDecres[4],
        "mergeRan:",
        mergeRan[4],
        "mergeCres:",
        mergeCres[4],
        "mergeDecres:",
        mergeDecres[4],
        "quickRan:",
        quickRan[4],
        "quickCres:",
        quickCres[4],
        "quickDecres:",
        quickDecres[4]]


    let arrayRan1 = [];
    let arrayRan12 = [];
    let arrayRan13 = [];
    let arrayRan14 = [];
    let arrayRan15 = [];

    let arrayRan2 = [];
    let arrayRan22 = [];
    let arrayRan23 = [];
    let arrayRan24 = [];
    let arrayRan25 = [];

    let arrayRan3 = [];
    let arrayRan32 = [];
    let arrayRan33 = [];
    let arrayRan34 = [];
    let arrayRan35 = [];

    let arrayRan4 = [];
    let arrayRan42 = [];
    let arrayRan43 = [];
    let arrayRan44 = [];
    let arrayRan45 = [];

    let arrayRan5 = [];
    let arrayRan52 = [];
    let arrayRan53 = [];
    let arrayRan54 = [];
    let arrayRan55 = [];


    let arrayCres1 = [];
    let arrayCres12 = [];
    let arrayCres13 = [];
    let arrayCres14 = [];
    let arrayCres15 = [];

    let arrayCres2 = [];
    let arrayCres22 = [];
    let arrayCres23 = [];
    let arrayCres24 = [];
    let arrayCres25 = [];

    let arrayCres3 = [];
    let arrayCres32 = [];
    let arrayCres33 = [];
    let arrayCres34 = [];
    let arrayCres35 = [];

    let arrayCres4 = [];
    let arrayCres42 = [];
    let arrayCres43 = [];
    let arrayCres44 = [];
    let arrayCres45 = [];

    let arrayCres5 = [];
    let arrayCres52 = [];
    let arrayCres53 = [];
    let arrayCres54 = [];
    let arrayCres55 = [];


    let arrayDecres1 = [];
    let arrayDecres12 = [];
    let arrayDecres13 = [];
    let arrayDecres14 = [];
    let arrayDecres15 = [];

    let arrayDecres2 = [];
    let arrayDecres22 = [];
    let arrayDecres23 = [];
    let arrayDecres24 = [];
    let arrayDecres25 = [];

    let arrayDecres3 = [];
    let arrayDecres32 = [];
    let arrayDecres33 = [];
    let arrayDecres34 = [];
    let arrayDecres35 = [];

    let arrayDecres4 = [];
    let arrayDecres42 = [];
    let arrayDecres43 = [];
    let arrayDecres44 = [];
    let arrayDecres45 = [];

    let arrayDecres5 = [];
    let arrayDecres52 = [];
    let arrayDecres53 = [];
    let arrayDecres54 = [];
    let arrayDecres55 = [];

    for (let i = 0; i < 800; i++) {
        arrayRan1.push(getRandom(0, 9999));
        arrayRan12.push(getRandom(0, 9999));
        arrayRan13.push(getRandom(0, 9999));
        arrayRan14.push(getRandom(0, 9999));
        arrayRan15.push(getRandom(0, 9999));

        arrayCres1.push(getRandom(0, 9999));
        arrayCres12.push(getRandom(0, 9999));
        arrayCres13.push(getRandom(0, 9999));
        arrayCres14.push(getRandom(0, 9999));
        arrayCres15.push(getRandom(0, 9999));

        arrayDecres1.push(getRandom(0, 9999));
        arrayDecres12.push(getRandom(0, 9999));
        arrayDecres13.push(getRandom(0, 9999));
        arrayDecres14.push(getRandom(0, 9999));
        arrayDecres15.push(getRandom(0, 9999));
    }

    for (let i = 0; i < 2000; i++) {
        arrayRan2.push(getRandom(0, 9999));
        arrayRan22.push(getRandom(0, 9999));
        arrayRan23.push(getRandom(0, 9999));
        arrayRan24.push(getRandom(0, 9999));
        arrayRan25.push(getRandom(0, 9999));

        arrayCres2.push(getRandom(0, 9999));
        arrayCres22.push(getRandom(0, 9999));
        arrayCres23.push(getRandom(0, 9999));
        arrayCres24.push(getRandom(0, 9999));
        arrayCres25.push(getRandom(0, 9999));

        arrayDecres2.push(getRandom(0, 9999));
        arrayDecres22.push(getRandom(0, 9999));
        arrayDecres23.push(getRandom(0, 9999));
        arrayDecres24.push(getRandom(0, 9999));
        arrayDecres25.push(getRandom(0, 9999));
    }

    for (let i = 0; i < 16000; i++) {
        arrayRan3.push(getRandom(0, 9999));
        arrayRan32.push(getRandom(0, 9999));
        arrayRan33.push(getRandom(0, 9999));
        arrayRan34.push(getRandom(0, 9999));
        arrayRan35.push(getRandom(0, 9999));

        arrayCres3.push(getRandom(0, 9999));
        arrayCres32.push(getRandom(0, 9999));
        arrayCres33.push(getRandom(0, 9999));
        arrayCres34.push(getRandom(0, 9999));
        arrayCres35.push(getRandom(0, 9999));

        arrayDecres3.push(getRandom(0, 9999));
        arrayDecres32.push(getRandom(0, 9999));
        arrayDecres33.push(getRandom(0, 9999));
        arrayDecres34.push(getRandom(0, 9999));
        arrayDecres35.push(getRandom(0, 9999));
    }

    for (let i = 0; i < 42000; i++) {
        arrayRan4.push(getRandom(0, 9999));
        arrayRan42.push(getRandom(0, 9999));
        arrayRan43.push(getRandom(0, 9999));
        arrayRan44.push(getRandom(0, 9999));
        arrayRan45.push(getRandom(0, 9999));

        arrayCres4.push(getRandom(0, 9999));
        arrayCres42.push(getRandom(0, 9999));
        arrayCres43.push(getRandom(0, 9999));
        arrayCres44.push(getRandom(0, 9999));
        arrayCres45.push(getRandom(0, 9999));

        arrayDecres4.push(getRandom(0, 9999));
        arrayDecres42.push(getRandom(0, 9999));
        arrayDecres43.push(getRandom(0, 9999));
        arrayDecres44.push(getRandom(0, 9999));
        arrayDecres45.push(getRandom(0, 9999));
    }

    for (let i = 0; i < 58000; i++) {
        arrayRan5.push(getRandom(0, 9999));
        arrayRan52.push(getRandom(0, 9999));
        arrayRan53.push(getRandom(0, 9999));
        arrayRan54.push(getRandom(0, 9999));
        arrayRan55.push(getRandom(0, 9999));

        arrayCres5.push(getRandom(0, 9999));
        arrayCres52.push(getRandom(0, 9999));
        arrayCres53.push(getRandom(0, 9999));
        arrayCres54.push(getRandom(0, 9999));
        arrayCres55.push(getRandom(0, 9999));

        arrayDecres5.push(getRandom(0, 9999));
        arrayDecres52.push(getRandom(0, 9999));
        arrayDecres53.push(getRandom(0, 9999));
        arrayDecres54.push(getRandom(0, 9999));
        arrayDecres55.push(getRandom(0, 9999));
    }

    function ordena(array, op) {
        if (op == 1) {
            array.sort(function (a, b) {
                return a - b;
            })
        } else {
            array.sort(function (a, b) {
                return b - a;
            })
        }

    }

    ordena(arrayCres1, 1)
    ordena(arrayCres12, 1)
    ordena(arrayCres13, 1)
    ordena(arrayCres14, 1)
    ordena(arrayCres15, 1)

    ordena(arrayCres2, 1)
    ordena(arrayCres22, 1)
    ordena(arrayCres23, 1)
    ordena(arrayCres24, 1)
    ordena(arrayCres25, 1)

    ordena(arrayCres3, 1)
    ordena(arrayCres32, 1)
    ordena(arrayCres33, 1)
    ordena(arrayCres34, 1)
    ordena(arrayCres35, 1)

    ordena(arrayCres4, 1)
    ordena(arrayCres42, 1)
    ordena(arrayCres43, 1)
    ordena(arrayCres44, 1)
    ordena(arrayCres45, 1)

    ordena(arrayCres5, 1)
    ordena(arrayCres52, 1)
    ordena(arrayCres53, 1)
    ordena(arrayCres54, 1)
    ordena(arrayCres55, 1)


    ordena(arrayDecres1, 0)
    ordena(arrayDecres12, 0)
    ordena(arrayDecres13, 0)
    ordena(arrayDecres14, 0)
    ordena(arrayDecres15, 0)

    ordena(arrayDecres2, 0)
    ordena(arrayDecres22, 0)
    ordena(arrayDecres23, 0)
    ordena(arrayDecres24, 0)
    ordena(arrayDecres25, 0)

    ordena(arrayDecres3, 0)
    ordena(arrayDecres32, 0)
    ordena(arrayDecres33, 0)
    ordena(arrayDecres34, 0)
    ordena(arrayDecres35, 0)

    ordena(arrayDecres4, 0)
    ordena(arrayDecres42, 0)
    ordena(arrayDecres43, 0)
    ordena(arrayDecres44, 0)
    ordena(arrayDecres45, 0)

    ordena(arrayDecres5, 0)
    ordena(arrayDecres52, 0)
    ordena(arrayDecres53, 0)
    ordena(arrayDecres54, 0)
    ordena(arrayDecres55, 0)

    function calcula(array, metodo, objeto) {
        var resultado = []
        let estatisticas = []

        switch (metodo) {
            case 0:
                resultado.push(insertionSort(array[0]), insertionSort(array[1]), insertionSort(array[2]), insertionSort(array[3]), insertionSort(array[4]))
                objeto.comparacoes.push(resultado[0][0], resultado[1][0], resultado[2][0], resultado[3][0], resultado[4][0])
                estatisticas = desvioPadrao(objeto.comparacoes)
                objeto.desComparacoes = estatisticas[0]
                objeto.medComparacoes = estatisticas[1]

                objeto.trocas.push(resultado[0][1], resultado[1][1], resultado[2][1], resultado[3][1], resultado[4][1])
                estatisticas = desvioPadrao(objeto.trocas)
                objeto.desTrocas = estatisticas[0]
                objeto.medTrocas = estatisticas[1]

                objeto.tempo.push(resultado[0][3], resultado[1][3], resultado[2][3], resultado[3][3], resultado[4][3])
                estatisticas = desvioPadrao(objeto.tempo)
                objeto.desTempo = estatisticas[0]
                objeto.medTempo = estatisticas[1]
                break

            case 1:
                resultado.push(selectionSort(array[0]), selectionSort(array[1]), selectionSort(array[2]), selectionSort(array[3]), insertionSort(array[4]))
                objeto.comparacoes.push(resultado[0][0], resultado[1][0], resultado[2][0], resultado[3][0], resultado[4][0])
                estatisticas = desvioPadrao(objeto.comparacoes)
                objeto.desComparacoes = estatisticas[0]
                objeto.medComparacoes = estatisticas[1]

                objeto.trocas.push(resultado[0][1], resultado[1][1], resultado[2][1], resultado[3][1], resultado[4][1])
                estatisticas = desvioPadrao(objeto.trocas)
                objeto.desTrocas = estatisticas[0]
                objeto.medTrocas = estatisticas[1]

                objeto.tempo.push(resultado[0][3], resultado[1][3], resultado[2][3], resultado[3][3], resultado[4][3])
                estatisticas = desvioPadrao(objeto.tempo)
                objeto.desTempo = estatisticas[0]
                objeto.medTempo = estatisticas[1]
                break

            case 2:
                resultado.push(heapSort(array[0]), heapSort(array[1]), heapSort(array[2]), heapSort(array[3]), heapSort(array[4]))
                objeto.comparacoes.push(resultado[0][0], resultado[1][0], resultado[2][0], resultado[3][0], resultado[4][0])
                estatisticas = desvioPadrao(objeto.comparacoes)
                objeto.desComparacoes = estatisticas[0]
                objeto.medComparacoes = estatisticas[1]

                objeto.trocas.push(resultado[0][1], resultado[1][1], resultado[2][1], resultado[3][1], resultado[4][1])
                estatisticas = desvioPadrao(objeto.trocas)
                objeto.desTrocas = estatisticas[0]
                objeto.medTrocas = estatisticas[1]

                objeto.tempo.push(resultado[0][3], resultado[1][3], resultado[2][3], resultado[3][3], resultado[4][3])
                estatisticas = desvioPadrao(objeto.tempo)
                objeto.desTempo = estatisticas[0]
                objeto.medTempo = estatisticas[1]
                break

            case 3:
                resultado.push(mergeSort(array[0]), mergeSort(array[1]), mergeSort(array[2]), mergeSort(array[3]), mergeSort(array[4]))
                objeto.comparacoes.push(resultado[0][0], resultado[1][0], resultado[2][0], resultado[3][0], resultado[4][0])
                estatisticas = desvioPadrao(objeto.comparacoes)
                objeto.desComparacoes = estatisticas[0]
                objeto.medComparacoes = estatisticas[1]

                objeto.trocas.push(resultado[0][1], resultado[1][1], resultado[2][1], resultado[3][1], resultado[4][1])
                estatisticas = desvioPadrao(objeto.trocas)
                objeto.desTrocas = estatisticas[0]
                objeto.medTrocas = estatisticas[1]

                objeto.tempo.push(resultado[0][3], resultado[1][3], resultado[2][3], resultado[3][3], resultado[4][3])
                estatisticas = desvioPadrao(objeto.tempo)
                objeto.desTempo = estatisticas[0]
                objeto.medTempo = estatisticas[1]
                break

            case 4:
                resultado.push(quickSort(array[0]), quickSort(array[1]), quickSort(array[2]), quickSort(array[3]), quickSort(array[4]))
                objeto.comparacoes.push(resultado[0][0], resultado[1][0], resultado[2][0], resultado[3][0], resultado[4][0])
                estatisticas = desvioPadrao(objeto.comparacoes)
                objeto.desComparacoes = estatisticas[0]
                objeto.medComparacoes = estatisticas[1]

                objeto.trocas.push(resultado[0][1], resultado[1][1], resultado[2][1], resultado[3][1], resultado[4][1])
                estatisticas = desvioPadrao(objeto.trocas)
                objeto.desTrocas = estatisticas[0]
                objeto.medTrocas = estatisticas[1]

                objeto.tempo.push(resultado[0][3], resultado[1][3], resultado[2][3], resultado[3][3], resultado[4][3])
                estatisticas = desvioPadrao(objeto.tempo)
                objeto.desTempo = estatisticas[0]
                objeto.medTempo = estatisticas[1]
                break
        }
    }

    var arrayRan = []
    var arrayCres = []
    var arrayDecres = []


    //insertion Sort
    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan1, arrayRan12, arrayRan13, arrayRan14, arrayRan15)
    arrayCres.push(arrayCres1, arrayCres12, arrayCres13, arrayCres14, arrayCres15)
    arrayDecres.push(arrayDecres1, arrayDecres12, arrayDecres13, arrayDecres14, arrayDecres15)

    calcula(arrayRan, 0, array800[1])
    calcula(arrayCres, 0, array800[3])
    calcula(arrayDecres, 0, array800[5])


    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan2, arrayRan22, arrayRan23, arrayRan24, arrayRan25)
    arrayCres.push(arrayCres2, arrayCres22, arrayCres23, arrayCres24, arrayCres25)
    arrayDecres.push(arrayDecres2, arrayDecres22, arrayDecres23, arrayDecres24, arrayDecres25)

    calcula(arrayRan, 0, array2000[1])
    calcula(arrayCres, 0, array2000[3])
    calcula(arrayDecres, 0, array2000[5])

    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan3, arrayRan32, arrayRan33, arrayRan34, arrayRan35)
    arrayCres.push(arrayCres3, arrayCres32, arrayCres33, arrayCres34, arrayCres35)
    arrayDecres.push(arrayDecres3, arrayDecres32, arrayDecres33, arrayDecres34, arrayDecres35)

    calcula(arrayRan, 0, array16000[1])
    calcula(arrayCres, 0, array16000[3])
    calcula(arrayDecres, 0, array16000[5])


    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan4, arrayRan42, arrayRan43, arrayRan44, arrayRan45)
    arrayCres.push(arrayCres4, arrayCres42, arrayCres43, arrayCres44, arrayCres45)
    arrayDecres.push(arrayDecres4, arrayDecres42, arrayDecres43, arrayDecres44, arrayDecres45)

    calcula(arrayRan, 0, array42000[1])
    calcula(arrayCres, 0, array42000[3])
    calcula(arrayDecres, 0, array42000[5])


    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan5, arrayRan52, arrayRan53, arrayRan54, arrayRan55)
    arrayCres.push(arrayCres5, arrayCres52, arrayCres53, arrayCres54, arrayCres55)
    arrayDecres.push(arrayDecres5, arrayDecres52, arrayDecres53, arrayDecres54, arrayDecres55)

    calcula(arrayRan, 0, array58000[1])
    calcula(arrayCres, 0, array58000[3])
    calcula(arrayDecres, 0, array58000[5])


    //selection Sort
    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan1, arrayRan12, arrayRan13, arrayRan14, arrayRan15)
    arrayCres.push(arrayCres1, arrayCres12, arrayCres13, arrayCres14, arrayCres15)
    arrayDecres.push(arrayDecres1, arrayDecres12, arrayDecres13, arrayDecres14, arrayDecres15)

    calcula(arrayRan, 1, array800[7])
    calcula(arrayCres, 1, array800[9])
    calcula(arrayDecres, 1, array800[11])
    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan2, arrayRan22, arrayRan23, arrayRan24, arrayRan25)
    arrayCres.push(arrayCres2, arrayCres22, arrayCres23, arrayCres24, arrayCres25)
    arrayDecres.push(arrayDecres2, arrayDecres22, arrayDecres23, arrayDecres24, arrayDecres25)

    calcula(arrayRan, 1, array2000[7])
    calcula(arrayCres, 1, array2000[9])
    calcula(arrayDecres, 1, array2000[11])
    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan3, arrayRan32, arrayRan33, arrayRan34, arrayRan35)
    arrayCres.push(arrayCres3, arrayCres32, arrayCres33, arrayCres34, arrayCres35)
    arrayDecres.push(arrayDecres3, arrayDecres32, arrayDecres33, arrayDecres34, arrayDecres35)

    calcula(arrayRan, 1, array16000[7])
    calcula(arrayCres, 1, array16000[9])
    calcula(arrayDecres, 1, array16000[11])
    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan4, arrayRan42, arrayRan43, arrayRan44, arrayRan45)
    arrayCres.push(arrayCres4, arrayCres42, arrayCres43, arrayCres44, arrayCres45)
    arrayDecres.push(arrayDecres4, arrayDecres42, arrayDecres43, arrayDecres44, arrayDecres45)

    calcula(arrayRan, 1, array42000[7])
    calcula(arrayCres, 1, array42000[9])
    calcula(arrayDecres, 1, array42000[11])
    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan5, arrayRan52, arrayRan53, arrayRan54, arrayRan55)
    arrayCres.push(arrayCres5, arrayCres52, arrayCres53, arrayCres54, arrayCres55)
    arrayDecres.push(arrayDecres5, arrayDecres52, arrayDecres53, arrayDecres54, arrayDecres55)

    calcula(arrayRan, 1, array58000[7])
    calcula(arrayCres, 1, array58000[9])
    calcula(arrayDecres, 1, array58000[11])
    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan1, arrayRan12, arrayRan13, arrayRan14, arrayRan15)
    arrayCres.push(arrayCres1, arrayCres12, arrayCres13, arrayCres14, arrayCres15)
    arrayDecres.push(arrayDecres1, arrayDecres12, arrayDecres13, arrayDecres14, arrayDecres15)

    calcula(arrayRan, 2, array800[13])
    calcula(arrayCres, 2, array800[15])
    calcula(arrayDecres, 2, array800[17])


    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan2, arrayRan22, arrayRan23, arrayRan24, arrayRan25)
    arrayCres.push(arrayCres2, arrayCres22, arrayCres23, arrayCres24, arrayCres25)
    arrayDecres.push(arrayDecres2, arrayDecres22, arrayDecres23, arrayDecres24, arrayDecres25)

    calcula(arrayRan, 2, array2000[13])
    calcula(arrayCres, 2, array2000[15])
    calcula(arrayDecres, 2, array2000[17])

    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan3, arrayRan32, arrayRan33, arrayRan34, arrayRan35)
    arrayCres.push(arrayCres3, arrayCres32, arrayCres33, arrayCres34, arrayCres35)
    arrayDecres.push(arrayDecres3, arrayDecres32, arrayDecres33, arrayDecres34, arrayDecres35)

    calcula(arrayRan, 2, array16000[13])
    calcula(arrayCres, 2, array16000[15])
    calcula(arrayDecres, 2, array16000[17])



    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan4, arrayRan42, arrayRan43, arrayRan44, arrayRan45)
    arrayCres.push(arrayCres4, arrayCres42, arrayCres43, arrayCres44, arrayCres45)
    arrayDecres.push(arrayDecres4, arrayDecres42, arrayDecres43, arrayDecres44, arrayDecres45)

    calcula(arrayRan, 2, array42000[13])
    calcula(arrayCres, 2, array42000[15])
    calcula(arrayDecres, 2, array42000[17])



    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan5, arrayRan52, arrayRan53, arrayRan54, arrayRan55)
    arrayCres.push(arrayCres5, arrayCres52, arrayCres53, arrayCres54, arrayCres55)
    arrayDecres.push(arrayDecres5, arrayDecres52, arrayDecres53, arrayDecres54, arrayDecres55)

    calcula(arrayRan, 2, array58000[13])
    calcula(arrayCres, 2, array58000[15])
    calcula(arrayDecres, 2, array58000[17])


    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan1, arrayRan12, arrayRan13, arrayRan14, arrayRan15)
    arrayCres.push(arrayCres1, arrayCres12, arrayCres13, arrayCres14, arrayCres15)
    arrayDecres.push(arrayDecres1, arrayDecres12, arrayDecres13, arrayDecres14, arrayDecres15)

    calcula(arrayRan, 3, array800[19])
    calcula(arrayCres, 3, array800[21])
    calcula(arrayDecres, 3, array800[23])


    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan2, arrayRan22, arrayRan23, arrayRan24, arrayRan25)
    arrayCres.push(arrayCres2, arrayCres22, arrayCres23, arrayCres24, arrayCres25)
    arrayDecres.push(arrayDecres2, arrayDecres22, arrayDecres23, arrayDecres24, arrayDecres25)

    calcula(arrayRan, 3, array2000[19])
    calcula(arrayCres, 3, array2000[21])
    calcula(arrayDecres, 3, array2000[23])

    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan3, arrayRan32, arrayRan33, arrayRan34, arrayRan35)
    arrayCres.push(arrayCres3, arrayCres32, arrayCres33, arrayCres34, arrayCres35)
    arrayDecres.push(arrayDecres3, arrayDecres32, arrayDecres33, arrayDecres34, arrayDecres35)

    calcula(arrayRan, 3, array16000[19])
    calcula(arrayCres, 3, array16000[21])
    calcula(arrayDecres, 3, array16000[23])


    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan4, arrayRan42, arrayRan43, arrayRan44, arrayRan45)
    arrayCres.push(arrayCres4, arrayCres42, arrayCres43, arrayCres44, arrayCres45)
    arrayDecres.push(arrayDecres4, arrayDecres42, arrayDecres43, arrayDecres44, arrayDecres45)

    calcula(arrayRan, 3, array42000[19])
    calcula(arrayCres, 3, array42000[21])
    calcula(arrayDecres, 3, array42000[23])


    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan5, arrayRan52, arrayRan53, arrayRan54, arrayRan55)
    arrayCres.push(arrayCres5, arrayCres52, arrayCres53, arrayCres54, arrayCres55)
    arrayDecres.push(arrayDecres5, arrayDecres52, arrayDecres53, arrayDecres54, arrayDecres55)

    calcula(arrayRan, 3, array58000[19])
    calcula(arrayCres, 3, array58000[21])
    calcula(arrayDecres, 3, array58000[23])

    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan1, arrayRan12, arrayRan13, arrayRan14, arrayRan15)
    arrayCres.push(arrayCres1, arrayCres12, arrayCres13, arrayCres14, arrayCres15)
    arrayDecres.push(arrayDecres1, arrayDecres12, arrayDecres13, arrayDecres14, arrayDecres15)

    calcula(arrayRan, 4, array800[25])
    calcula(arrayCres, 4, array800[27])
    calcula(arrayDecres, 4, array800[29])


    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan2, arrayRan22, arrayRan23, arrayRan24, arrayRan25)
    arrayCres.push(arrayCres2, arrayCres22, arrayCres23, arrayCres24, arrayCres25)
    arrayDecres.push(arrayDecres2, arrayDecres22, arrayDecres23, arrayDecres24, arrayDecres25)

    calcula(arrayRan, 4, array2000[25])
    calcula(arrayCres, 4, array2000[27])
    calcula(arrayDecres, 4, array2000[29])

    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan3, arrayRan32, arrayRan33, arrayRan34, arrayRan35)
    arrayCres.push(arrayCres3, arrayCres32, arrayCres33, arrayCres34, arrayCres35)
    arrayDecres.push(arrayDecres3, arrayDecres32, arrayDecres33, arrayDecres34, arrayDecres35)

    calcula(arrayRan, 4, array16000[25])
    calcula(arrayCres, 4, array16000[27])
    calcula(arrayDecres, 4, array16000[29])


    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan4, arrayRan42, arrayRan43, arrayRan44, arrayRan45)
    arrayCres.push(arrayCres4, arrayCres42, arrayCres43, arrayCres44, arrayCres45)
    arrayDecres.push(arrayDecres4, arrayDecres42, arrayDecres43, arrayDecres44, arrayDecres45)

    calcula(arrayRan, 4, array42000[25])
    calcula(arrayCres, 4, array42000[27])
    calcula(arrayDecres, 4, array42000[29])


    arrayRan = []
    arrayCres = []
    arrayDecres = []

    arrayRan.push(arrayRan5, arrayRan52, arrayRan53, arrayRan54, arrayRan55)
    arrayCres.push(arrayCres5, arrayCres52, arrayCres53, arrayCres54, arrayCres55)
    arrayDecres.push(arrayDecres5, arrayDecres52, arrayDecres53, arrayDecres54, arrayDecres55)

    calcula(arrayRan, 4, array58000[25])
    calcula(arrayCres, 4, array58000[27])
    calcula(arrayDecres, 4, array58000[29])

    console.log("Array 800:\n")
    console.log(array800)
    console.log("Array 2000:\n")
    console.log(array2000)
    console.log("Array 16000:\n")
    console.log(array16000)
    console.log("Array 42000:\n")
    console.log(array42000)
    console.log("Array 58000:\n")
    console.log(array58000)

}

Sort()