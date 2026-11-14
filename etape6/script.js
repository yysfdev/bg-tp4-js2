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


    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        alert("Formulaire incomplet !");
    } else {

        doInsert(nom, prenom, points);

        persons.push({ nom: nom, prenom: prenom, points: points });

        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}


function deleteRow() {

    if (lignes === 0) {
        alert("Le tableau est vide !"); 
        return; 
    }

    const table = document.querySelector("#table_body");
    const checked = table.querySelectorAll(".col_chkbox input:checked");

    if (checked.length === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
    }

    if (!confirm("Voulez-vous vraiment supprimer " + checked.length + " ligne(s) ?")) {
        return;
    }

    const rows = table.querySelectorAll("tr");


    //sert à retrouver le bon index dans persons
    let removed = 0;
    rows.forEach((row, i) => {
        const chk = row.querySelector(".col_chkbox input"); // slide 76

        if (chk.checked) { 
            const pts = parseInt(row.cells[3].innerText);

            total_points -= pts;          
            lignes--;                     
            row.remove();                 
            persons.splice(i - removed, 1); 
            removed++;
        }
    });


    table.querySelectorAll("tr").forEach((row, i) => {
        row.cells[0].innerText = i + 1; // slides 82 et 91
    });

    // Étape 7 : mise à jour du résumé, puis message de succès
    update_summary();
    alert(removed + " ligne(s) supprimée(s) avec succès !");
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
