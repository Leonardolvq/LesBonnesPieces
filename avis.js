//Attrubue une fonctionnalité à tous les boutons sélectionés 
export function ajoutListenersAvis() {
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i < piecesElements.length; i++) {
      piecesElements[i].addEventListener("click", async function (event) {

        const id = event.target.dataset.id;
        const reponse = await fetch(`http://localhost:8081/pieces/${id}/avis`); //Réponse HTTP de la requête
        const avis = await reponse.json();//Extraction des données qui sont au format JSON
        window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis))
        //event.target vise l'élément qui a déclenché de addEventListener
        //parentElement vise l'élément parent //C'est une propriété fournie par Javascript
        //Cette const vise l'élément parent de l'elément déclencheur
        const pieceElement = event.target.parentElement;
        afficherAvis(pieceElement, avis)
      });
    }
}

export function afficherAvis(pieceElement, avis){
  const avisElement = document.createElement("p");
  for (let i = 0; i < avis.length; i++) {
    avisElement.innerHTML += `${avis[i].utilisateur}: ${avis[i].commentaire}</br>`;
  }
  pieceElement.appendChild(avisElement)
}

export function ajoutListenerEnvoyerAvis() {
  const formulaireAvis = document.querySelector(".formulaire-avis")
    formulaireAvis.addEventListener("submit", function (event) {
      event.preventDefault();
      //Création de l'objet avis qui prend en compte les valeurs du formulaire
      const avis = {
        //On vise la valeur de l'élément parent de l'élément déclencheur du Listener (en tant que string)
        //parseInt transforme la valeur string en valeur number
        pieceId : parseInt(event.target.querySelector("[name=piece-id").value),
        utilisateur: event.target.querySelector("[name=utilisateur]").value,
        commentaire: event.target.querySelector("[name=commentaire]").value,
        nbEtoiles: event.target.querySelector("[name=nbEtoiles]").value,
      }
        // Création de la charge utile au format JSON
        const chargeUtile = JSON.stringify(avis);
        // Appel de la fonction fetch avec toutes les informations nécessaires
        fetch("http://localhost:8081/avis/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: chargeUtile
        });
    });
}

/*
      let chargeUtile = window.localStorage.getItem("avis", avis);
      if (avis === null) {
        const avis = {
              //On vise la valeur de l'élément parent de l'élément déclencheur du Listener (en tant que string)
              //parseInt transforme la valeur string en valeur number
              pieceId : parseInt(event.target.querySelector("[name=piece-id").value),
              utilisateur: event.target.querySelector("[name=utilisateur]").value,
              commentaire: event.target.querySelector("[name=commentaire]").value,
              nbEtoiles: event.target.querySelector("[name=nbEtoiles]").value,
            }
              // Création de la charge utile au format JSON
              const chargeUtile = JSON.stringify(avis);

              window.localStorage.setItem("avis", avis);
      } else {
        avis = JSON.parse(avis);
      }*/