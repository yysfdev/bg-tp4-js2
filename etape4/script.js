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

function doInsertRowTable(num, nom, prenom, points) { 

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
    checkbox.setAttribute("type", "checkbox"); // setAttribute (slide 107)
    col5.append(checkbox);

    
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    //append() (slide 98)
    row.append(col1, col2, col3, col4, col5);

    table.append(row);
}
