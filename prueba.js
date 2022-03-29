import { db } from "./firebase.js"
import { addDoc, collection } from "@firebase/firestore";
import fetch from "node-fetch";


const API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=12'


const fetch1 = async (api1) => {
    const peticion = await fetch(api1)
    const resp = await peticion.json()
    subir(resp.results)
}


const subir = (pelicula) => {
    pelicula.forEach(pelicula => {
        const { id, title, overview, poster_path, vote_average } = pelicula
        const peliculas2 = {
            descripcion: overview,
            id: id,
            imagen: 'https://image.tmdb.org/t/p/w1280' + poster_path,
            titulo: title,
            voto: vote_average
        }
        addDoc(collection(db, "Peliculas"), peliculas2)
            .then(res => {
                console.log('funciono')
            })
            .catch(e => {
                console.log(e);
            })
    });
}

fetch1(API)
