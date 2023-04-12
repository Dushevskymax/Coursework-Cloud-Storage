const fs = require('fs');
const PathService = require('./path-service.js');

class DirService {

    static #resultOfSearch = [];

    static #BASEDIR = PathService.getSourcePath();

    static async getSearchItems(itemName, PATH) {
        this.#resultOfSearch = [];
        await this.#searchItems(itemName, PATH);
        return this.#resultOfSearch;
    }

    static #sortItems(items) {
        let files = [];
        let folders = [];
        items.map(item => {
            item.dir ? folders.push(item) : files.push(item)
        })
        return folders.concat(files);
    }

    static #convertSize(size) {
        let i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'KB', 'MB', 'GB', 'TB'][i];
    }

    static async getDirInfo(PATH) {
        try {
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
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    static writeFile(PATH, data) {
        try {
            const buffer = new Buffer.from(data, 'binary');
            fs.writeFile(
                PATH,
                buffer,
                'utf8',
                (err) => {
                    if (err) return err;
                }
            )
            return true;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    static async newDirectory(PATH) {
        try {
            await fs.promises.mkdir(PATH);
            return true;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    static async deleteItem(PATH) {
        try {
            const isDir = fs.lstatSync(PATH).isDirectory();
            if (isDir) {
                await fs.promises.rm(PATH, { recursive: true });
            } else {
                await fs.promises.rm(PATH);
            }
            return true;
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    static async #searchItems(itemName, PATH) {
        try {
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
        } catch (err) {
            console.log(err);
            return err;
        }
    }


}

module.exports = DirService;
