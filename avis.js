//Attrubue une fonctionnalité à tous les boutons sélectionés 
export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
      piecesElements[i].addEventListener("click", async function (event) {

        const id = event.target.dataset.id;
        const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`); //Réponse HTTP de la requête
        const avis = await reponse.json();//Extraction des données qui sont au format JSON

        //event.target vise l'élément qui a déclenché de addEventListener
        //parentElement vise l'élément parent //C'est une propriété fournie par Javascript
        //Cette const vise l'élément parent de l'elément déclencheur
        const pieceElement = event.target.parentElement; 
        const avisElement = document.createElement("p");
        for (let i = 0; i < avis.length; i++) {
          avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire}</br>`;
        }
        pieceElement.appendChild(avisElement)
      });
    }
}