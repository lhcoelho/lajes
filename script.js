// constantes para cálculo de lajes
//[beta, mx, my, nx, ny, km] para cada um dos "casos"
var beta = ["beta", 1, 0.4, 1, 0.2, 0.5, 1];
var mx = ["mx", 8, 128 / 9, 128 / 9, 24, 24, 24, 8, 128 / 9, 24];
var my = ["my", 8, 8, 128 / 9, 8, 128 / 9, 24];
var nx = ["nx", 10 ** 20, 8, 8, 12, 12, 12, 10 ** 20, 8, 12];
var ny = ["ny", 10 ** 20, 10 ** 20, 8, 10 ** 20, 8, 12];
var km = ["kM", 1.2, 0.96, 0.96, 0.72, 0.72, 0.72, 1.2, 0.96, 0.72];

//dados de entrada
var caso;
var lx;
var ly;
var q;
var lambda;

function calcular() {
  entradaDeDados();
  if (isNaN(lx) || isNaN(ly) || isNaN(q)) {
    var resultado = document.getElementById("resultado");
    resultado.innerHTML =
      "</br></br><h4><b>digite todos os dados de entrada</b></h4>";
  } else {
    calcularMomentos();
    calcularReacoes();
  }
}

function entradaDeDados() {
  var casoApoio = document.getElementById("caso");

  caso = parseFloat(casoApoio.value);

  var vaoX = document.getElementById("Lx");
  lx = parseFloat(vaoX.value.replace(",", "."));

  var vaoY = document.getElementById("Ly");
  ly = parseFloat(vaoY.value.replace(",", "."));

  var carga = document.getElementById("Q");
  q = parseFloat(carga.value.replace(",", "."));
}

function calcularMomentos() {
  lambda = ly / lx;
  var kx = lambda ** 4 / (lambda ** 4 + beta[caso]);
  var ky = 1 - kx;
  //calculo dos momentos
  if (caso > 6 && caso < 10) {
    var Mx = (q * lx ** 2) / mx[caso];
    var My = 0;
    var Xx = (-q * lx ** 2) / nx[caso];
    var Xy = 0;
  } else {
    var Mx =
      (kx / mx[caso]) *
      (1 - (20 * kx) / (3 * mx[caso] * lambda ** 2)) *
      q *
      lx ** 2;
    var My =
      ((ky * lambda ** 2) / my[caso]) *
      (1 - (20 * ky * lambda ** 2) / (3 * my[caso])) *
      q *
      lx ** 2;
    var Xx = -(kx / nx[caso]) * q * lx ** 2;
    var Xy = -((ky * lambda ** 2) / ny[caso]) * q * lx ** 2;
  }
  var resultado = document.getElementById("resultado");
  resultado.innerHTML =
    "</br> <h2> Resultados </h2>" +
    "<b>Mx= " +
    Mx.toFixed(2).toString().replace(".", ",") +
    "kN.m/m</br>My= " +
    My.toFixed(2).toString().replace(".", ",") +
    "kN.m/m</br>Xx= " +
    Xx.toFixed(2).toString().replace(".", ",") +
    "kN.m/m</br>Xy= " +
    Xy.toFixed(2).toString().replace(".", ",") +
    "kN.m/m</b>";
}

function calcularReacoes() {
  //casos 1, 6 e 7
  if (caso == 1 || caso == 6 || caso == 7) {
    var Rx = (1 - 0.5 / lambda) * 0.5 * q * lx;
    var Ry = 0.25 * q * lx;
    resultado.innerHTML =
      resultado.innerHTML +
      "</br></br><b>Rx =" +
      Rx.toFixed(2).toString().replace(".", ",") +
      "kN/m</br>" +
      "Ry= " +
      Ry.toFixed(2).toString().replace(".", ",") +
      "kN/m</br></b>";
  }

  //casos 2 e 8
  if (caso == 2 || caso == 8) {
    if (lambda < 0.732) {
      var RxE = 0.433 * lambda * q * lx;
      var RxA = RxE / Math.sqrt(3);
      var Ry = (0.5 - 0.342 * lambda) * lambda * q * lx;
    } else {
      var RxE = (0.5 - 0.183 / lambda) * 1.268 * q * lx;
      var RxA = RxE / Math.sqrt(3);
      var Ry = 0.183 * q * lx;
    }
    resultado.innerHTML =
      resultado.innerHTML +
      "</br></br><b>RxE =" +
      RxE.toFixed(2).toString().replace(".", ",") +
      "kN/m</br>" +
      "RxA= " +
      RxA.toFixed(2).toString().replace(".", ",") +
      "kN/m</br>" +
      "Ry= " +
      Ry.toFixed(2).toString().replace(".", ",") +
      "kN/m</br></b>";
  }

  // caso 3
  if (caso == 3) {
    var RxE = (1 - 0.5 / lambda) * 0.634 * q * lx;
    var RxA = RxE / Math.sqrt(3);
    var RyE = 0.317 * q * lx;
    var RyA = RyE / Math.sqrt(3);

    resultado.innerHTML =
      resultado.innerHTML +
      "</br></br><b>RxE =" +
      RxE.toFixed(2).toString().replace(".", ",") +
      "kN/m</br>" +
      "RxA= " +
      RxA.toFixed(2).toString().replace(".", ",") +
      "kN/m</br>" +
      "RyE= " +
      RyE.toFixed(2).toString().replace(".", ",") +
      "kN/m</br>" +
      "RyA= " +
      RyA.toFixed(2).toString().replace(".", ",") +
      "kN/m</br></b>";
  }

  // casos 4 e 9
  if (caso == 4 || caso == 9) {
    if (lambda < 1 / Math.sqrt(3)) {
      var Rx = 0.433 * lambda * q * lx;
      var Ry = (0.5 - 0.433 * lambda) * lambda * q * lx;
    } else {
      var Rx = (0.5 - 0.144 / lambda) * q * lx;
      var Ry = 0.144 * q * lx;
    }
    resultado.innerHTML =
      resultado.innerHTML +
      "</br></br><b>Rx =" +
      Rx.toFixed(2).toString().replace(".", ",") +
      "kN/m</br>" +
      "Ry= " +
      Ry.toFixed(2).toString().replace(".", ",") +
      "kN/m</br></b>";
  }
  if (caso == 5) {
    if (lambda < 0.789) {
      var Rx = 0.317 * lambda * q * lx;
      var RyE = (1 - 0.634 * lambda) * 0.634 * lambda * q * lx;
      var RyA = RyE / Math.sqrt(3);
    } else {
      var Rx = (0.5 - 0.197 / lambda) * q * lx;
      var RyE = 0.25 * q * lx;
      var RyA = RyE / Math.sqrt(3);
    }
    resultado.innerHTML =
      resultado.innerHTML +
      "</br></br><b>Rx =" +
      Rx.toFixed(2).toString().replace(".", ",") +
      "kN/m</br>" +
      "RyE= " +
      RyE.toFixed(2).toString().replace(".", ",") +
      "kN/m</br>" +
      "RyA= " +
      RyA.toFixed(2).toString().replace(".", ",") +
      "kN/m</br></b>";
  }
}