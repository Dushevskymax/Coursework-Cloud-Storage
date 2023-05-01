const fs = require('fs');
const pathService = require('./path-service.js');

class DirService {

    #resultOfSearch;

    #BASEDIR;

    async saveFile(tmpPath, newPath) {
        const data = await fs.promises.readFile(tmpPath);
        await fs.promises.writeFile(newPath, data);
    }

    async getSearchItems(itemName, userId) {
        this.#BASEDIR = pathService.getSourcePath(userId);
        this.#resultOfSearch = [];
        await this.#searchItems(itemName, this.#BASEDIR);
        return this.#resultOfSearch;
    }

    #sortItems(items) {
        let files = [];
        let folders = [];
        items.map(item => {
            item.dir ? folders.push(item) : files.push(item)
        })
        return folders.concat(files);
    }

    #convertSize(size) {
        let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
    }

    async getDirData(PATH) {
        const files = await fs.promises.readdir(PATH);
        const items = files.map(item => {
            const isDir = fs.lstatSync(PATH + '/' + item).isDirectory();
            let size = 0;
            if (!isDir) {
                size = fs.statSync(PATH + '/' + item);
            }
            return {
                name: item,
                dir: isDir,
                size: this.#convertSize(size.size)
            }
        })
        return this.#sortItems(items);
    }

    async newDirectory(PATH) {
        await fs.promises.mkdir(PATH);
    }

    async deleteItem(PATH) {
        const isDir = fs.lstatSync(PATH).isDirectory();
        if (isDir) {
            await fs.promises.rm(PATH, { recursive: true });
        } else {
            await fs.promises.rm(PATH);
        }
    }

    async #searchItems(itemName, PATH) {
        const items = await fs.promises.readdir(PATH);
        for (let i = 0; i < items.length; i++) {
            const isDir = fs.lstatSync(PATH + '/' + items[i]).isDirectory();
            const itemNameToCompare = items[i].toLowerCase();
            const searchItemNameToCompare = itemName.toLowerCase();
            if (itemNameToCompare.includes(searchItemNameToCompare)) {
                let info = 0;
                if (!isDir) {
                    info = fs.statSync(PATH + '/' + items[i]);
                }
                const path = PATH + '/' + items[i];
                this.#resultOfSearch.push({
                    name: items[i],
                    dir: isDir,
                    size: this.#convertSize(info.size),
                    path: path.replace(this.#BASEDIR, '')
                })
            }
            if (isDir) {
                await this.#searchItems(itemName, PATH + '/' + items[i]);
            }
        }
    }


}

module.exports = new DirService();
