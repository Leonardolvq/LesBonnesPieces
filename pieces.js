
// Récupération des pièces depuis le fichier JSON
const reponse = await fetch('pieces-autos.json');
const pieces = await reponse.json();

function genererPieces (pieces) {
    for (let i = 0; i < pieces.length; i++) {

    const article = pieces[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionFiches = document.querySelector(".fiches");
    // Création d’une balise dédiée à une pièce automobile
    const pieceElement = document.createElement("article");
    // Création des balises 
    const imageElement = document.createElement("img");
    imageElement.src = article.image;
    const nomElement = document.createElement("h2");
    nomElement.innerText = article.nom;
    const prixElement = document.createElement("p");
    prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
    const categorieElement = document.createElement("p");
    categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
    const stockElement = document.createElement("p");
    stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";
    
    // On rattache la balise article a la section Fiches
    sectionFiches.appendChild(pieceElement);
    // On rattache l’image à pieceElement (la balise article)
    pieceElement.appendChild(imageElement);
    pieceElement.appendChild(nomElement);
    pieceElement.appendChild(prixElement);
    pieceElement.appendChild(categorieElement);
    //Ajout des éléments au DOM pour l'exercice
    pieceElement.appendChild(descriptionElement);
    pieceElement.appendChild(stockElement);

 }
}
 
genererPieces(pieces);

 const boutonTrierCroissant = document.querySelector(".btn-trier-croissant");
 boutonTrierCroissant.addEventListener("click", function() {
    //Copie du tableau original
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function(a, b) {
        //Le return est négatif donc le trie est croissant
        return a.prix - b.prix;
    });
    console.log(pieces);
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
  });

 const boutonTrierDecroissant = document.querySelector(".btn-trier-decroissant");
 boutonTrierDecroissant.addEventListener("click", function() {
    //Copie du tableau original
    const piecesOrdonnees = Array.from(pieces);
    piecesOrdonnees.sort(function (a, b) {
        //Le return est positif donc le trie est décroissant
        return b.prix - a.prix;
    });
    console.log(pieces)
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesOrdonnees);
 });

 const boutonFiltrerAbordables = document.querySelector(".btn-filtrer-abordables");
 boutonFiltrerAbordables.addEventListener("click", function() {
    const piecesFiltrees = pieces.filter(function (pieces) {
        //return uniqument les prix inférieurs ou égaux à 35
        return pieces.prix <= 35;
    });
    console.log(piecesFiltrees)
    // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
   document.querySelector(".fiches").innerHTML = "";
   genererPieces(piecesFiltrees);
 });

 const btnFiltrerDescription = document.querySelector(".btn-filtrer-description");
 btnFiltrerDescription.addEventListener("click", function() {
    const piecesDescription = pieces.filter(function (pieces) {
        //return uniqument les pieces.disponibiliité = true
        return pieces.description;
    });
    console.log(piecesDescription);
    // Effacement de l'écran et regénération de la page avec les pièces filtrées uniquement
   document.querySelector(".fiches").innerHTML = "";
   genererPieces(piecesDescription);
 });


const nomPieces = pieces.map(pieces => pieces.nom);

//Parcourt le tableau de la fin vers le début
for (let i = pieces.length -1; i >= 0; i--) {
    if(pieces[i].prix > 35){
        //Supprime les éléments [i] au prix suprérieur à 35 (1 à la fois why???)
        nomPieces.splice(i,1);
    }
}

const elementsAbordables = document.createElement("ul");

for (let i = 0; i < nomPieces.length; i++) {
    const nomElement = document.createElement("li");
    nomElement.innerText = nomPieces[i];
    elementsAbordables.appendChild(nomElement);
}

document.querySelector(".abordables").appendChild(elementsAbordables)

//Création d'une nouvelle liste avec seulement nom + prix + disponibilité
const piecesDispo = pieces.map(pieces => ({
    disponibilite: pieces.disponibilite,
    nom: pieces.nom,
    prix: pieces.prix,
}));
//Suppression des éléments : disponiblité = false
for (let i = pieces.length - 1; i >= 0 ; i--) {
    if(!pieces[i].disponibilite) {
        piecesDispo.splice(i,1);
    }
}

//Création liste ul
const listeDispo = document.createElement("ul");
//Création éléments li
//Ajout du contenu nom + prix aux éléments li
//Liaison entre liste ul et éléments li
for (let i = 0; i < piecesDispo.length; i++) {
    const elementDispo = document.createElement("li");
    elementDispo.innerText = `${piecesDispo[i].nom} ${piecesDispo[i].prix}€`;
    listeDispo.appendChild(elementDispo);
}
//Liaison liste ul à div .disponibles
document.querySelector(".disponibles").appendChild(listeDispo)
 

const inputPrixMax = document.getElementById("prix-max");
inputPrixMax.addEventListener("input", function(){
    const piecesFiltrees = pieces.filter(function(piece){
        return piece.prix <= inputPrixMax.value;
    });
    document.querySelector(".fiches").innerHTML = "";
    genererPieces(piecesFiltrees);
  });
 