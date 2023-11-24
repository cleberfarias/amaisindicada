import axios from "axios";

const favoritosAPI = axios.create({ baseURL: "http://localhost:8080/favoritos" });

async function getFavoritos() {
    try {
        const response = await favoritosAPI.get('/');
        return response.data;
    } catch (error) {
        
        console.error('Erro ao obter Favoritos:', error.message);
        throw error; 
    }
}

export {
    getFavoritos
};