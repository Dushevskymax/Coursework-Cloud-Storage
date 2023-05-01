import axios from 'axios';

export default class AuthService {
    static #API_URL = "http://localhost:8000/api";

    static async login(formValue) {
        try {
            const response = await axios.post(`${this.#API_URL}/login`, formValue,
                {
                    headers:
                        { "Content-Type": "application/json" }
                }
            );
            const body = await response.data;
            localStorage.setItem('accessToken', body.accessToken);
            return body.user;
        } catch (e) {
            console.log(e);
        }
    }

    static async registration(formValue) {
        try {
            const response = await axios.post(`${this.#API_URL}/registration`, formValue,
                {
                    headers:
                        { "Content-Type": "application/json" }
                }
            );
            return response;
        } catch (e) {
            console.log(e);
        }
    }

    static logout() {
        localStorage.removeItem('accessToken');
    }
}