// ======================================
// Premium Loader
// ======================================

const loader = document.getElementById("loader");

const loaderFill = document.getElementById("loader-fill");

const loaderPercent = document.getElementById("loader-percent");

let progress = 0;

const loading = setInterval(() => {

    progress++;

    loaderFill.style.width = progress + "%";

    loaderPercent.textContent = progress + "%";

    if(progress >= 100){

        clearInterval(loading);

        setTimeout(() => {

            loader.classList.add("hide");

        },400);

    }

},20);