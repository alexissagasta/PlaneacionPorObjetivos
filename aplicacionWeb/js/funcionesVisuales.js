
// Método que sirve para abrir y cerrar botones
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
// Método que sirve para 
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

//Funcion que se encarga de asiganar el valor el elemento idSelectAreas que tiene en 
//ese momento al elemento idPAreaDeEnfoque
function seleccionAreaEnfoque(idSelectAreas, idPAreaDeEnfoque) {
    var areaseleccionada = document.getElementById(idSelectAreas).value;
    var yeah = document.getElementById(idPAreaDeEnfoque);
    yeah.innerHTML = areaseleccionada;
    yeah.style.maxHeight = yeah.scrollHeight + "px";
}