const INTERVALE_ERREUR = 1000;

let partieEnCours = false;
let tourJoueur1 = true;
let coups = 0;
let Tableau = [];


/* fonction afin de desactiver ce button lors du chargement de la page */
function initalisation()
{
    document.getElementById("terminerPartie").disabled = true;
}

/* verifie que les deux noms son differentes */

function debuterPartie()
{
    // Verification de la saisie des noms.
    // Creation et utilisation d'une autre
    // fonction pour effectuer la verification
    if (validerNoms()) {
        document.getElementById("debuterPartie").disabled = true;
        document.getElementById("terminerPartie").disabled = false;

        document.getElementById("txtJoueur1").disabled = true;
        document.getElementById("txtJoueur2").disabled = true;

        for (cnt = 1; cnt < 10; cnt++) {
           document.getElementById("cellule" + cnt).className = "";
           document.getElementById("cellule" + cnt).innerHTML = "";
            
        }

        document.getElementById("resultat").innerHTML = ""; 
        
        Tableau[1] = Tableau[2] =Tableau[3] = Tableau[4] =Tableau[5] = Tableau[6] =Tableau[7] = Tableau[8] = Tableau[9] = 0;

        partieEnCours = true;
        tourJoueur1 = true;
        coups = 0;
        preparerTourJoueur();
    }
}

function validerNoms()
{
    try {
        //Recuperation des noms saisies
        let nomJoueur1 = document.getElementById("txtJoueur1").value;
        let nomJoueur2 = document.getElementById("txtJoueur2").value;
        //Creation d'une variable pour afficher nos mesages
        let message;
        //On efface les messages qui ont ete affiches
        message = document.getElementById("joueur1").innerHTML = "";
        message = document.getElementById("joueur2").innerHTML = "";
        //Si le nom de joueur 1 est vide.
        if (nomJoueur1.trim().length ===0) {
            message = document.getElementById("joueur1");
            message.innerHTML = "Saisir le nom du premier joueur.";
            message.style.color = "red";
            return false;
        }
        //Si le nom de joueur 2 est vide.
        else if (nomJoueur2.trim().length == 0) {
            message = document.getElementById("joueur2");
            message.innerHTML = "Saisir le nom du deuxieme joueur.";
            message.style.color = "red";
            return false;
        }
        //si les deux noms sont identiques
        else if (nomJoueur1.trim().toLowerCase() === nomJoueur2.trim().toLowerCase()) {
            let message = document.getElementById("joueur2");
            message.innerHTML = "Les deux joueurs ne peuvent pas avoir le meme nom";
            message.style.color = "red";
            return false;
        }

        return true;

    } 
    catch (erreur) {
        traiterErreur(erreur);
    }
}

function preparerTourJoueur()
{
    try {
        if (tourJoueur1) {
            document.getElementById("txtJoueur1").className = "joueurActif";
            document.getElementById("txtJoueur2").className = "";
        }
        else
        {
            document.getElementById("txtJoueur1").className = "";
            document.getElementById("txtJoueur2").className = "joueurActif";
        }
    } catch (error) {
        traiterErreur(error);
    }
}
function validerClicCellule(numero) 
{
    try {
        if (partieEnCours) {
            if (document.getElementById("cellule" + numero).innerHTML != "") {
                document.getElementById("cellule" + numero).className = "celluleinvalide";
                setTimeout(function(){
                    document.getElementById("cellule" + numero).className = "";}
                    ,INTERVALE_ERREUR)
            } else {
                tourJoueur1 ?
                document.getElementById("cellule" + numero).innerHTML = "X" :
                document.getElementById("cellule" + numero).innerHTML = "O";
                document.getElementById("cellule" + numero).style.fontSize = "50px";

                tourJoueur1 ? 
                document.getElementById("cellule" + numero).style.color = "navy" :
                document.getElementById("cellule" + numero).style.color = "orange";
                
                enregistrerInfos(numero);
                coups++;
                verifierGagnant(); 
            }
        } 
    } catch (error) {
        traiterErreur(error);
    }    
}

function enregistrerInfos(numero) 
{
    Tableau[numero] = (tourJoueur1 ? "X" : "O");
}

function verifierGagnant() 
{
   
        if (Tableau[1] == Tableau[2] && Tableau[1] == Tableau[3] && Tableau[1] != 0) 
        {
            identifierGagnant(1,2,3);
        }
        else if (Tableau[4] == Tableau[5] && Tableau[4] == Tableau[6] && Tableau[4] != 0) 
        {
            identifierGagnant(4,5,6);
        }
        else if (Tableau[7] == Tableau[8] && Tableau[7] == Tableau[9] && Tableau[7] != 0) 
        {
            identifierGagnant(7,8,9);
        }
        else if (Tableau[1] == Tableau[4] && Tableau[1] == Tableau[7] && Tableau[1] != 0) 
        {
            identifierGagnant(1,4,7);
        }
        else if (Tableau[2] == Tableau[5] && Tableau[2] == Tableau[8] && Tableau[2] != 0) 
        {
            identifierGagnant(2,5,8);
        }
        else if (Tableau[3] == Tableau[6] && Tableau[3] == Tableau[9] && Tableau[3] != 0) 
        {
            identifierGagnant(3,6,9);
        }
        else if (Tableau[3] == Tableau[5] && Tableau[3] == Tableau[7] && Tableau[3] != 0) 
        {
            identifierGagnant(3,5,7);
        }
        else if (Tableau[1] == Tableau[5] && Tableau[1] == Tableau[9] && Tableau[1] != 0) 
        {
            identifierGagnant(1,5,9);
        }
        else if (coups == 9) 
        {
            document.getElementById("resultat").innerHTML = "Partie nulle !";    
            terminerPartie();
        }
        else
        {
            tourJoueur1 ? tourJoueur1 = false : tourJoueur1 = true;
            preparerTourJoueur()
        }
      
}

function identifierGagnant(cellule1,cellule2,cellule3) 
{
    let message = "";

    document.getElementById("cellule" + cellule1).className = "cellulegagnante";   
    document.getElementById("cellule" + cellule2).className = "cellulegagnante";   
    document.getElementById("cellule" + cellule3).className = "cellulegagnante";
    
    tourJoueur1 ?
    message += document.getElementById("txtJoueur1").value :
    message += document.getElementById("txtJoueur2").value;
    
    message += " a gagne la partie.";
    document.getElementById("resultat").innerHTML = message;

    terminerPartie();
}

function terminerPartie() 
{
    try {
        document.getElementById("txtJoueur1").disabled = false;
        document.getElementById("txtJoueur2").disabled = false;

        document.getElementById("txtJoueur1").className = "";
        document.getElementById("txtJoueur2").className = "";

        partieEnCours = false;

        document.getElementById("debuterPartie").disabled = false;
        document.getElementById("terminerPartie").disabled = true;

    } catch (error) {
        traiterErreur(error);
    }    
}
function traiterErreur(err) {
    alert("Une erreur s'est produite sur la page web: " + err);
}