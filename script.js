// script.js con localStorage
const malla = {
  "1": [
    "Fundamentos de Matemáticas",
    "Programación Básica",
    "Física I",
    "Hardware y Software",
    "Inglés I",
    "Técnicas de Investigación"
  ],
  "2": [
    ["Cálculo I", ["Fundamentos de Matemáticas"]],
    ["Programación I", ["Programación Básica"]],
    ["Física II", ["Física I"]],
    ["Sistemas Digitales I", ["Hardware y Software"]],
    ["Inglés II", ["Inglés I"]],
    "Estructuras Discretas"
  ],
  "3": [
    ["Programación II", ["Programación I"]],
    ["Sistemas Digitales II", ["Sistemas Digitales I"]],
    ["Sistemas Operativos I", ["Programación I"]],
    ["Circuitos Eléctricos I", ["Física II"]],
    ["Redes I", ["Hardware y Software"]]
  ],
  "4": [
    ["Taller de Sistemas Operativos I", ["Sistemas Operativos I"]],
    ["Campos Electromagnéticos", ["Física II"]],
    ["Base de Datos I", ["Programación II"]],
    ["Instalación y Certificación de Redes", ["Redes I"]],
    "Álgebra Lineal",
    ["Electrónica I", ["Circuitos Eléctricos I"]]
  ],
  "5": [
    ["Sistemas Operativos II", ["Taller de Sistemas Operativos I"]],
    ["Redes II", ["Instalación y Certificación de Redes"]],
    ["Circuitos Eléctricos II", ["Circuitos Eléctricos I"]],
    ["Análisis de Sistemas y Señales", ["Campos Electromagnéticos"]],
    ["Fundamentos de Sistemas de Comunicación", ["Análisis de Sistemas y Señales"]],
    "Estadística Descriptiva"
  ],
  "6": [
    ["Taller de Sistemas Operativos II", ["Sistemas Operativos II"]],
    ["Administración de RB I", ["Base de Datos I"]],
    ["Redes III", ["Redes II"]],
    ["Tecnologías Inalámbricas", ["Redes II"]],
    ["Antenas y Propagación", ["Fundamentos de Sistemas de Comunicación"]],
    ["Estadística Inferencial", ["Estadística Descriptiva"]]
  ],
  "7": [
    "Sistemas de Comunicaciones Ópticas",
    "Telefonía Digital I",
    ["Redes IV", ["Redes III"]],
    ["Seguridad en Redes", ["Redes III"]],
    "Radiocomunicaciones I",
    "Seguridad Informática I",
    "Electiva 1"
  ],
  "8": [
    ["Redes Inalámbricas y Móviles", ["Redes III", "Tecnologías Inalámbricas"]],
    ["Radiocomunicaciones II", ["Radiocomunicaciones I"]],
    "Emprendedurismo",
    "Electiva 2",
    "Electiva 3"
  ],
  "9": [
    "Electiva 4",
    "Electiva 5",
    "Modalidades de grado y prácticas profesionales"
  ]
};

let aprobados = new Set(JSON.parse(localStorage.getItem("materiasAprobadas")) || []);

function guardarEstado() {
  localStorage.setItem("materiasAprobadas", JSON.stringify([...aprobados]));
}

function crearRamo(nombre, requisitos = []) {
  const btn = document.createElement("button");
  btn.classList.add("ramo");
  btn.textContent = nombre;

  function actualizarEstado() {
    const habilitado = requisitos.every(req => aprobados.has(req));
    if (aprobados.has(nombre)) {
      btn.className = "ramo estado-aprobado";
      btn.disabled = true;
    } else if (habilitado) {
      btn.className = "ramo estado-habilitado";
      btn.disabled = false;
    } else {
      btn.className = "ramo estado-bloqueado";
      btn.disabled = true;
    }
  }

  btn.addEventListener("click", () => {
    aprobados.add(nombre);
    guardarEstado();
    actualizarMalla();
  });

  actualizarEstado();
  return { nombre, btn, actualizarEstado };
}

let botones = [];

function actualizarMalla() {
  botones.forEach(({ actualizarEstado }) => actualizarEstado());
}

const container = document.getElementById("malla");

for (let semestre in malla) {
  const titulo = document.createElement("div");
  titulo.textContent = `Semestre ${semestre}`;
  titulo.className = "semestre-titulo";
  container.appendChild(titulo);

  for (let ramoData of malla[semestre]) {
    let nombre, requisitos = [];
    if (typeof ramoData === "string") {
      nombre = ramoData;
    } else {
      [nombre, requisitos] = ramoData;
    }

    const ramoObj = crearRamo(nombre, requisitos);
    botones.push(ramoObj);
    container.appendChild(ramoObj.btn);
  }
}

actualizarMalla();
