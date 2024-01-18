function onInit(func) {
    document.addEventListener("DOMContentLoaded", func)
}

function randomInteger(min = 0, max = 1){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomUniqueID() {
    return "ID"+randomInteger(0, 2**52)
}