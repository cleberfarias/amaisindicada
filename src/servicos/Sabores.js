import axios from "axios";

const saboresAPI = axios.create({ baseURL: "http://localhost:8080/bebidas" });

async function getSabores() {
    try {
        const response = await saboresAPI.get('/');
        return response.data;
    } catch (error) {
        // Aqui você pode tratar erros, imprimir no console, etc.
        console.error('Erro ao obter sabores:', error.message);
        throw error; // Rejeita a Promise para que o erro possa ser tratado no chamador, se necessário.
    }
}

export {
    getSabores
};