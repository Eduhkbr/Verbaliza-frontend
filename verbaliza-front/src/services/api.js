const API_URL = 'http://127.0.0.1:8000/api'; // URL do seu servidor Laravel (php artisan serve)

/**
 * Função genérica para fazer requisições POST para a nossa API.
 * @param {string} endpoint - O endpoint da API (ex: '/login').
 * @param {object} data - O corpo da requisição.
 * @returns {Promise<any>} - A resposta da API em formato JSON.
 */
export const post = async (endpoint, data) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data),
    });

    // Se a resposta não for 'ok' (ex: erro 401, 422, 500),
    // lemos a mensagem de erro da API e lançamos uma exceção.
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ocorreu um erro na requisição.');
    }

    // Se a resposta for bem-sucedida, retornamos os dados.
    return response.json();
};