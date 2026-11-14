"use strict";

let lignes = 0;

const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

let total_points = 0;

init();

function init() {
   
    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}

function doInsert(nom, prenom, points) {
    
    total_points += points;

    lignes++;
    const num = lignes;

    doInsertRowTable(num, nom, prenom, points);

    update_summary();
}

function update_summary() {
    
    const element_lignes = document.getElementById("p1");

   
    const element_points = document.getElementById("p3");

    // (slide 91)
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
}

function consoleTableau() {
    console.log(persons);
}

function doNewData() {
    
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    
    const nom = elt_nom.value.trim();
    const prenom = elt_prenom.value.trim();
    
    const points = parseInt(elt_points.value);

 
    // Number.isNaN(points) vaut true si le champ points est vide
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        // Boîte d'alerte du BOM : window.alert (slide 116)
        alert("Formulaire incomplet !");
    } else {
        // Insérer dans le tableau HTML
        doInsert(nom, prenom, points);

        // Insérer aussi dans le tableau "persons" : push d'un objet {nom, prenom, points} (slides 38 et 40)
        persons.push({ nom: nom, prenom: prenom, points: points });

        // Vider les champs pour préparer une autre saisie (slide 93)
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}


function doInsertRowTable(num, nom, prenom, points) { // Déclaration de fonction avec paramètres (slide 45)

    const table = document.getElementById("table_body");

    const row = document.createElement("tr");

    row.setAttribute("class", "row");

    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;


    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox"); 
    col5.append(checkbox);

    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    row.append(col1, col2, col3, col4, col5);

    table.append(row);
}
