import axios from 'axios'

export const atividadesEtapa = axios.create({
    baseURL: 'api-atividades/'
});

