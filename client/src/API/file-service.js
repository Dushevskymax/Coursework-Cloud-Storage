import axios from 'axios';

export default class FileService {

    static #API_URL = "http://localhost:8000/api";

    static async getFiles(path) {
        const response = await axios.get(`${this.#API_URL}/dirdata?path=${path}`,
            {
                headers:
                {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            }
        );
        return response;
    }

    static async downloadSingleFile(fileName, path) {
        if (fileName) {
            axios({
                url: `${this.#API_URL}/download?path=${path + fileName}`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
                },
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const href = URL.createObjectURL(response.data);
                const link = document.createElement('a');
                link.href = href;
                link.setAttribute('download', `${fileName}`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(href);
            })
        }
    }

    static async uploadSingleFile(fileData, path) {
        if (fileData.name && fileData.size < 2147483648) {
            const formdata = new FormData();
            formdata.append('file', fileData);
            const response = await axios.post(`${this.#API_URL}/upload?path=${path}`, formdata,
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
}
