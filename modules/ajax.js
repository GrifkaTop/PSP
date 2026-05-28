class Ajax {
    async get(url) {
        try {
            const response = await fetch(url);
            const data = response.status !== 204 ? await response.json() : null;
            return { data, status: response.status };
        } catch (e) {
            console.error('Ошибка запроса GET:', e);
            return { data: null, status: 0 };
        }
    }

    async post(url, body) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = response.status !== 204 ? await response.json() : null;
            return { data, status: response.status };
        } catch (e) {
            console.error('Ошибка запроса POST:', e);
            return { data: null, status: 0 };
        }
    }

    async patch(url, body) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            const data = response.status !== 204 ? await response.json() : null;
            return { data, status: response.status };
        } catch (e) {
            console.error('Ошибка запроса PATCH:', e);
            return { data: null, status: 0 };
        }
    }

    async delete(url) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            const data = response.status !== 204 ? await response.json() : null;
            return { data, status: response.status };
        } catch (e) {
            console.error('Ошибка запроса DELETE:', e);
            return { data: null, status: 0 };
        }
    }
}

export const ajax = new Ajax();
