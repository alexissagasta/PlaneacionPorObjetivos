nombresAreasEnfoque = [];
nombresObjetivos = [];
async function obtenerAreas() {
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
      const objetivos = lt.objetivos;
      nombresAreasEnfoque.push(nombre);
      objetivos.forEach(lt => { nombresObjetivos.push(lt) });
  
    });
}


async function crearTablaAreas(idAreas) {
    await obtenerAreas()
  
    // Se crea el formulario para seleccionar en elcargado del plan 
    //por ahora se establece un valor pre establecido ya que no se
    //manejan usuarios aun
    
  
    // Tabla de contenido para llenar las acciones al momento de seleccionar un plan de acción
    let areasTodas = "<table class=center style =  background-color:#FFFFFF ><tr class=cabecera style = contenteditable:false ><td></td></tr>";
    for (let i = 0; i < nombresAreasEnfoque.length; i++) {
        areasTodas += "<tr><td contenteditable=false style=text-align:center >" + nombresAreasEnfoque[i] + "</td></tr>";
    }
    areasTodas += "</table>"
  
    //Se cambia el contenido de los elementos acciones, recursos, encargados e indicadores
    document.getElementById(idAreas).innerHTML = areasTodas;
    
  }

  this.onload = crearTablaAreas("tablaAreas");

