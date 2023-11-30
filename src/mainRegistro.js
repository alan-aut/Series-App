import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import { MostrarListaRefrescos } from "./app/CRUDRadiofrecuencias.js";
import { revisaSesion } from "./app/revisaSesion.js";
import { auth, db } from "./app/firebase.js";
import './app/iniciaSesionEmailAndPass.js'
import './app/iniciaSesionFacebook.js'
import './app/iniciaSesionGoogle.js'
import './app/formularioRegistro.js'
import './app/subirRefresco.js'
import './app/cierreSesion.js'

onAuthStateChanged(auth, async (usuario) => {
    if (usuario) {
        const currentPath = window.location.pathname;

        if (currentPath === '/src/index.html') {
            // Si el usuario está en el index, muestra la lista de manualidades
            const querySnapshot = await getDocs(collection(db, 'Refrescos'))
            MostrarListaRefrescos(querySnapshot.docs);
        } else if (currentPath === '/src/Subir Manualidades.html') {
            // Si el usuario está en la interfaz "Subir Manualidades.html", no muestra nada
            MostrarListaRefrescos([]);  // Puedes ajustar esto según tu lógica
        }
    } else {
        MostrarListaRefrescos([]);  // Puedes ajustar esto según tu lógica
    }
    revisaSesion(usuario);
});
