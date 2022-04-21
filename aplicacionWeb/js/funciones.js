
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

let cantPlanes;
async function getConfig() {
  //
  var nombEmpresa = "todas";
  const response = await fetch("/configuracion/todas", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    }
  })
  const data = await response.json();

  const lts = data;
  cantPlanes = lts.cantPlanes;
  
}

function agregarAreadeEnfoque() {
  numero = parseInt(cantPlanes, 10);
  idSelect = "idSelect"+ cantPlanes;
  id = "id"+ cantPlanes;
  idP = "idP"+ cantPlanes;
  idC = "idC"+ cantPlanes;
  idObjetivo = "idObjetivo"+ cantPlanes;
  idPlan = "idPlan"+ cantPlanes;
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

  /*En este apartado inicia para agregar OBJETIVOS con el mismo botón */
  const div2 = document.createElement('div');
  div2.className = 'agregado';
  div2.innerHTML = `
        <button class="collapsible" id=`+ idObjetivo + ` onclick="hacerColapsable(this.id)">Objetivo</button>
          <div class="content">
            <p contenteditable="true">Aumentar en un 50% el porcentaje de recompra de los clientes
          actuales, en los productos más vendidos de la librería durante el año 2022</p>
          </div>
        `;
  document.getElementById('ejemploObjetivo').appendChild(div2);

  /*En este apartado inicia para agregar PLANES DE ACCIÓN con el mismo botón*/

  const div3 = document.createElement('div');
  div3.className = 'agregado';
  div3.innerHTML = `
          <button class="collapsible" id=`+ idPlan + ` onclick="hacerColapsable(this.id)">Plan de acción</button>
          <div class="content">
            <form>
              <label for="encargados">Encargado:</label>
              <select name="encargados" id="encargados">
                <optgroup label="Encargados">
                  <option value="luis">Luis</option>
                  <option value="mario">Mario</option>
                </optgroup>
              </select>
              <br><br>
            </form>
            <p contenteditable="false">Acciones:</p>
            <p contenteditable="false">Contactar mercadologo</p>
            <p contenteditable="false">Hacer listado de clientes frecuentes</p>
            <p contenteditable="false">Clasificar libros mas vendidos</p>
            <p contenteditable="false">Recursos:</p>
            <p contenteditable="false">50,000 pesos</p>
            <p contenteditable="false">3 empleados</p>
            <p contenteditable="false">Tiempo:</p>
            <p contenteditable="false">12 meses</p>
            <p contenteditable="false">Indicadores:</p>
            <p contenteditable="false">Porcentaje de ventas de libros del 2021</p>
          </div>
            
            `

            document.getElementById('ejemploPlanesAccion').appendChild(div3);

            numero--;
            updateCantPlanes(JSON.stringify(numero));
}

//Función que sirve para actualizar el numero de planes en la base de datos que se encuentra en ese momento
async function updateCantPlanes(numero){

  cantPlanes = {
    cantPlanes: numero
  }
  var nombEmpresa = "todas";
  const response = await fetch("/configuracion/todas", {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    body: JSON.stringify(cantPlanes)


  });
  return response.json()

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


this.onload = agregarColapsable(), getData();