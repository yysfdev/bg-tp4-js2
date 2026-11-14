"use strict"; 

let lignes = 0;

const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

let total_points = 0;

init();
initBonus();

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
    // parseInt convertit un texte en entier (donne NaN si le champ est vide)
    const points = parseInt(elt_points.value);

    // Saisie contrôlée : condition if...else (slide 42), opérateurs logiques || et === (slide 41)
    // Number.isNaN(points) vaut true si le champ points est vide
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        // Boîte d'alerte du BOM : window.alert (slide 116)
        alert("Formulaire incomplet !");
    } else {
        // Insérer dans le tableau HTML
        doInsert(nom, prenom, points);

        
        persons.push({ nom: nom, prenom: prenom, points: points });

      
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}


/** Supprime les lignes cochées (du DOM et du tableau persons). */
function deleteRow() {

    // Étape 1 : tableau vide ?
    if (lignes === 0) {
        alert("Le tableau est vide !"); // slide 116
        return; // sortie de la fonction (slide 45)
    }

    // Étape 2 : récupérer le tableau et les checkbox cochées
    // querySelector / querySelectorAll avec sélecteur CSS (slides 76 à 78)
    const table = document.querySelector("#table_body");
    const checked = table.querySelectorAll(".col_chkbox input:checked");

    // Étape 3 : aucune checkbox cochée ?
    if (checked.length === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
    }

    // Étape 4 : confirmation (window.confirm, pop-up du BOM, slide 116)
    if (!confirm("Voulez-vous vraiment supprimer " + checked.length + " ligne(s) ?")) {
        return; // on quitte la fonction
    }

    const rows = table.querySelectorAll("tr");

    let removed = 0;
    rows.forEach((row, i) => {
        const chk = row.querySelector(".col_chkbox input"); 

        if (chk.checked) { // propriété checked (slide 93)
            
            const pts = parseInt(row.cells[3].innerText);

            total_points -= pts;          
            lignes--;                    
            row.remove();                 
            persons.splice(i - removed, 1); 
            removed++;
        }
    });

    table.querySelectorAll("tr").forEach((row, i) => {
        row.cells[0].innerText = i + 1; 
    });

    document.getElementById("chk_all").checked = false; // décocher "tout sélectionner"

    // Étape 7 : mise à jour du résumé puis message de succès
    update_summary();
    alert(removed + " ligne(s) supprimée(s) avec succès !");
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

/*BONUS : 3 fonctionnalités supplémentaires*/


function initBonus() {
    // Fonctionnalité 1 : case "tout sélectionner" (événement change, addEventListener, slides 135-136 et 139)
    document.getElementById("chk_all").addEventListener("change", (e) => {
        const boxes = document.querySelectorAll("#table_body .col_chkbox input"); // slide 76
        boxes.forEach((box) => { box.checked = e.target.checked; });               // slides 44 et 93
    });

    // Fonctionnalité 2 : touche Entrée dans un champ du formulaire = clic sur Ajouter
    // (événement keydown, e.key, slide 139)
    const fields = document.querySelectorAll(".form_field"); // slide 76
    fields.forEach((field) => {
        field.addEventListener("keydown", (e) => {
            if (e.key === "Enter") { doNewData(); } // slide 42
        });
    });

    // Fonctionnalité 3 : recherche en direct par nom / prénom
    // (événement input ; masquage avec la propriété style, slide 95)
    document.getElementById("search").addEventListener("input", (e) => {
        const text = e.target.value.trim().toLowerCase();
        document.querySelectorAll("#table_body tr").forEach((row) => {
            const nom = row.cells[1].innerText.toLowerCase();
            const prenom = row.cells[2].innerText.toLowerCase();
            const visible = nom.includes(text) || prenom.includes(text);
            row.style.display = visible ? "" : "none";
        });
    });
}
