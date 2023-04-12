import axios from 'axios';

export default class FileService {
    static async getFiles(path) {
        const response = await axios.get(`http://localhost:8000?path=${path}`);
        return response;
    }

    static async downloadSingleFile(fileName, path){
        if (fileName){
            axios({
                url: `http://localhost:8000/download?path=${path+fileName}`,
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

    static async uploadSingleFile(fileData, path){
        if (fileData.name){
            const formdata =  new FormData();
            formdata.append('file', fileData);
            const response = await axios.post(`http://localhost:8000/upload?path=${path}`, formdata, {})
            return response;
        }
    }
}
