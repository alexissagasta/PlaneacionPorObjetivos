
function agregarColapsable() {
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}

function hacerColapsable(id) {
  var coll = document.getElementById(id);
  if (coll.getAttribute("class") == "collapsible") {
    coll.setAttribute("class", "collapsible active");
  } else {
    coll.setAttribute("class", "collapsible");
  }
  var content = coll.nextElementSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + "px";
  }
}

function randomInt() {
  intr = Math.random();
  console.log(intr);
  return intr;
}

nombresAreasEnfoque = [];
async function getData() {
  //
  const response = await fetch("/areasDeEnfoque", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  const data = await response.json();

  const lts = data;

  lts.forEach(lt => {

    const nombre = lt.nombre;
    nombresAreasEnfoque.push(nombre);

  });
}

function agregarAreadeEnfoque() {
  idSelect = randomInt();
  id = randomInt();
  idP = randomInt();
  idC = randomInt();
  const form = document.createElement('form');
  opcionesAreasDeEnfoque = [];
  for (let i = 0; i < nombresAreasEnfoque.length; i++) {
    opcion = "<option value=" + JSON.stringify(nombresAreasEnfoque[i]) + ">" + nombresAreasEnfoque[i] + "</option>";
    opcionesAreasDeEnfoque.push(opcion);
  }
  form.innerHTML = `
        
          <label for="AreasDeEnfoque">Áreas De Enfoque:</label>
          <select name="AreasDeEnfoque" id=`+ idSelect + `>
            <optgroup label="AreasDeEnfoque">
              `+ opcionesAreasDeEnfoque + `
              
            </optgroup>
          </select>
          <button onClick = seleccionAreaEnfoque(`+ idSelect + `,` + idP + `)> Seleccionar </button>
          <br><br>
  
          
        `;
  const div = document.createElement('div');
  div.className = 'agregado';
  div.innerHTML = `
        <button class="collapsible" id=`+ id + ` onclick="hacerColapsable(this.id)">Área de enfoque</button>
        
        <div class="content" style = "text-align:center" id=`+ idC + `>
          `+ form.innerHTML + `
          <p style = "text-align:center;display:inline-block" contenteditable="true" id=`+ idP + `> --- </p>
          <button style = "text-align:center" onClick = agregarAreaDeEnfoque(`+ idP + `)> Agregar nuevo </button>
          </div>
        `;

  document.getElementById('ejemploAreadeEnfoque').appendChild(div);
}


async function agregarAreaDeEnfoque(idP) {

  yeah = document.getElementById(idP).textContent;

  areaDeEnfoque = {
    nombre: yeah
  }
  //
  const response = await fetch("/areaDeEnfoque", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    body: JSON.stringify(areaDeEnfoque)


  });
  return response.json()
}

function seleccionAreaEnfoque(idSelect, idP) {
  var areaseleccionada = document.getElementById(idSelect).value;

  var yeah = document.getElementById(idP);
  yeah.innerHTML = areaseleccionada;

  yeah.style.maxHeight = 150 + "px";
}

function agregarObjetivo() {
  id = randomInt();
  const div = document.createElement('div');
  div.className = 'agregado';
  div.innerHTML = `
        <button class="collapsible" id=`+ id + ` onclick="hacerColapsable(this.id)">Objetivo</button>
          <div class="content">
            <p contenteditable="true">Aumentar en un 50% el porcentaje de recompra de los clientes
          actuales, en los productos más vendidos de la librería durante el año 2022</p>
          </div>
        `;
  document.getElementById('ejemploObjetivo').appendChild(div);
}



this.onload = agregarColapsable(), getData();