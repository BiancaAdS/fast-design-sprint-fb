import axios from 'axios'

export const atividadesEtapa = axios.create({
    baseURL: 'https://api-atividades-fds.vercel.app/atividades'
});

