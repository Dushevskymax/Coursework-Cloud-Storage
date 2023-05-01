import axios from 'axios';

export default class DirService {

    static #API_URL = "http://localhost:8000/api";

    static async removeItem(itemName, path) {
        if (itemName) {
            const response = await axios.delete(`${this.#API_URL}/delete?path=${path + itemName}`,
                {
                    headers:
                    {
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            return response;
        }
    }

    static async newFolder(folderName, path) {
        if (folderName) {
            const response = await axios.post(`${this.#API_URL}/newdir?path=${path + folderName}`, null,
                {
                    headers:
                    {
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            )
            return response;
        }
    }

    static async searchItems(itemName) {
        if (itemName) {
            const response = await axios.get(`${this.#API_URL}/search?name=${itemName}`,
                {
                    headers:
                    {
                        "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                    }
                }
            );
            return response;
        }
    }
}