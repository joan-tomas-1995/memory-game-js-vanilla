let mainContainer = document.querySelector(".container");
let movimientos = document.querySelector(".movimientos");
let reset = document.querySelector(".reset");
let cerrar = document.querySelector(".cerrar");
let finalJuego = document.querySelector(".container-final-juego");
let tiempo = document.querySelector(".tiempo");
let minutos = document.getElementById("min");
let segundos = document.getElementById("seg");
let tiempoFin = document.getElementById("tiempo-fin");
let tamaño = document.getElementById("select-tamaño");
let tamañoValue = document.getElementById("select-tamaño").value;
let titulo = document.querySelector(".titulo");
let contMovimientos = document.querySelector(".container-movimientos");

movimientos.textContent = 0;

tamaño.addEventListener("change", (event) => {
  tamañoValue = event.target.value;
  console.log(tamañoValue);
  desorderImagenes();
  empezarJuego();
  if (tamañoValue == 20) {
    mainContainer.style.gridTemplateColumns = "repeat(5, 1fr)";
  }
  if (tamañoValue == 12 || tamañoValue == 16) {
    mainContainer.style.gridTemplateColumns = "repeat(4, 1fr)";
  }
  movimientos.textContent = 0;
  stopInterval();
  minutos.innerHTML = "0:";
  segundos.innerHTML = "00";
});

//ARRAY ORDENADO CON LAS IMAGENES DOS VECES
function createArrayImages(numParejas) {
  let arrayImages = [];
  for (let i = 1; i <= numParejas; i++) {
    arrayImages.push(`Imagenes\\image${i}.png`);
    arrayImages.push(`Imagenes\\image${i}.png`);
  }
  return arrayImages;
}

function desorderImagenes() {
  mainContainer.innerHTML = "";
  for (let i = 0; i < tamañoValue; i++) {
    mainContainer.innerHTML += `<div class="table class${i + 1}">
    <img style="display: none" src="" alt="${i + 1}" />
  </div>`;
  }
  let tables = document.querySelectorAll(".table");
  // ARRAY DESORDENADO VACIO
  let arrayImagesDesordenado = [];
  // CREA ARRAY DE IMAGENES CON EL TAMAÑO CORRECTO
  let numParejas = tamañoValue / 2;
  let arrayImages = createArrayImages(numParejas);

  // DESORDENAR ARRAY CON SORT Y RANDOM
  arrayImages.sort(() => Math.random() - 0.5);

  // LLENAMOS EL ARRAY DESORDENADO
  for (let i = 0; i < tamañoValue; i++) {
    arrayImagesDesordenado.push(arrayImages[i]);
  }

  // LLENAMOS LAS TABLAS CON LAS IMAGENES YA DESORDENADAS
  for (let i = 0; i < tamañoValue; i++) {
    tables[i].querySelector("img").src = arrayImagesDesordenado[i];
  }
  console.log(arrayImagesDesordenado);
}

function empezarJuego() {
  let tables = document.querySelectorAll(".table");
  //lastClickedImage en null para empezar
  let lastClickedImage = null;
  let CartasAcertadas = [];

  for (let i = 0; i < tables.length; i++) {
    //LE PONEMOS ADD EVENT LISTENER A TODAS LAS TABLAS CADA VUELTA DE BUCLE
    tables[i].addEventListener("click", function () {
      //LE AÑADIMOS LA CLASE PARA QUE GIRE LA CARTA
      //DESPUES DE MEDIO SEGUNDO LE QUITAMOS LA CLASE

      //COGEMOS LA IMG DE CADA TABLA CADA VUELTA DE BUCLE
      let clickedImage = tables[i].querySelector("img");
      //LE PONEMOS DISPLAY BLOCK A CADA IMG PARA QUE NO SE VEA
      clickedImage.style.display = "block";
      //SI LASCLICKED ES NULL LE ASIGNAMOS LA IMAGEN QUE HEMOS HECHO CLICK
      if (lastClickedImage === null) {
        movimientos.innerHTML = parseInt(movimientos.innerHTML) + 1;
        lastClickedImage = clickedImage;
        console.log("Carta1");

        //SI LAS IMAGENES SON IGUALES
      } else if (
        clickedImage.src === lastClickedImage.src &&
        clickedImage.alt !== lastClickedImage.alt
      ) {
        console.log(CartasAcertadas);
        console.log("Bien");
        //SET TIME OUT PARA QUE SE VEAN Y LAS DEJAMOS EN BLOCK
        clickedImage.style.display = "block";
        lastClickedImage.style.display = "block";
        //LE AÑADIMOS UNA CLASE PARA QUE SE QUEN GIRDAS LAS DOS TALBAS
        clickedImage.classList.add("monstrada");
        lastClickedImage.classList.add("monstrada");
        if (
          !CartasAcertadas.includes(lastClickedImage.src) &&
          !CartasAcertadas.includes(clickedImage.src)
        ) {
          CartasAcertadas.push(lastClickedImage.src);
          CartasAcertadas.push(clickedImage.src);
        }
        lastClickedImage = null;
      } else {
        clickedImage.classList.add("carta-erronea");
        lastClickedImage.classList.add("carta-erronea");
        console.log("Carta 2");
        //SI LAS DOS IMAGENES NO SON IGUALES, LES PONEMOS DISPLAY NONE
        setTimeout(() => {
          clickedImage.style.display = "none";
          lastClickedImage.style.display = "none";
          clickedImage.classList.remove("carta-erronea");
          lastClickedImage.classList.remove("carta-erronea");

          //ASIGNAMOS NULL A LAST CLICKED IMAGE PARA EMPEZAR CON EL IF
          lastClickedImage = null;
        }, 500);
      }
      if (CartasAcertadas.length === parseInt(tamañoValue)) {
        final();
      }

      console.log(CartasAcertadas);
    });
  }

  mainContainer.addEventListener("click", contador, { once: true });
}

//LANZAMOS LAS FUNCIONES PARA EMPEZAR EL JUEGO
desorderImagenes();
empezarJuego();

//RESET BOTON

reset.addEventListener("click", function () {
  console.log("reset");
  titulo.style.filter = "none";
  mainContainer.style.filter = "none";
  contMovimientos.style.filter = "none";
  for (let i = 0; i < tamaño; i++) {
    tables[i].querySelector("img").classList.remove("monstrada");
    tables[i].querySelector("img").style.display = "none";
  }

  //EMPEZAMOS EL JUEGO
  desorderImagenes();
  empezarJuego();
  //RESET DE TEMPORIZADOR
  stopInterval();
  minutos.innerHTML = "0:";
  segundos.innerHTML = "00";
  //RESET DE MOVIMIENTOS
  min = movimientos.textContent = 0;
  //CERRAR PANTALLA FINAL
  finalJuego.style.visibility = "hidden";
});

//CERRAR PANTALLA FINAL

cerrar.addEventListener("click", function () {
  console.log("cerrada");
  finalJuego.style.visibility = "hidden";
});

//TIEMPO DE JUEGO

let intervalId;

function contador() {
  let contador = 0;
  let m = 0;
  let minu = "0:" + m;
  intervalId = setInterval(function () {
    contador++;
    segundos.innerHTML = contador;
    minutos.innerHTML = minu;
    if (contador === 9) {
      minu = m + ":";
    }
    if (contador === 59) {
      contador = 0;
      m += 1;
      minu = m + ":" + "0";
    }
  }, 1000);
}

function stopInterval() {
  clearInterval(intervalId);
}

//FUNCION FINAL PARTIDA

function final() {
  finalJuego.style.visibility = "visible";
  minutos.innerHTML = minutos.textContent;
  segundos.innerHTML = segundos.textContent;
  stopInterval();
  titulo.style.filter = "blur(5px)";
  mainContainer.style.filter = "blur(5px)";
  contMovimientos.style.filter = "blur(5px)";
}
