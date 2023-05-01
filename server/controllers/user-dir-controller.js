const dirService = require("../services/dir-service");
const pathService =  require("../services/path-service");

class UserDirController {
    async getSearchItems(req, res, next) {
        try {
            const name = req.query.name;
            const user = req.user;
            const foundItems = await dirService.getSearchItems(name, user.id);
            return res.json({items: foundItems});
        } catch (e) {
            next(e);
        }
    }

    async getDirData(req, res, next) {
        try {
            const reqQuery = req.query;
            const user = req.user;
            const path = pathService.getFullPath(reqQuery, user.id);
            const items = await dirService.getDirData(path);
            return res.json({
                path: pathService.getPath(reqQuery),
                files: items
            });
        } catch (e) {
            next(e);
        }
    }

    async deleteItem(req, res, next) {
        try {
            const reqQuery = req.query;
            const user = req.user;
            const path = pathService.getFullPath(reqQuery, user.id);
            await dirService.deleteItem(path);
            return res.json({message: 'Done!'})
        } catch (e) {
            next(e);
        }
    }

    async newDirectory(req, res, next) {
        try {
            const reqQuery = req.query;
            const user = req.user;
            const path = pathService.getFullPath(reqQuery, user.id);
            await dirService.newDirectory(path);
            return res.json({message: 'Done!'})
        } catch (e) {
            next(e);
        }
    }

    async downloadFile(req, res, next) {
        try {
            const reqQuery = req.query;
            const user = req.user
            const path = pathService.getFullPath(reqQuery, user.id);
            return res.download(path);
        } catch (e) {
            next(e);
        }
    }

    async uploadFile(req, res, next) {
        try {
            const {name, path} = req.files.file;
            const user = req.user;
            const reqQuery = req.query;
            const newPath = `${pathService.getFullPath(reqQuery, user.id)}/${name}`;
            await dirService.saveFile(path, newPath);
            return res.json({message: 'Done!'})
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserDirController();