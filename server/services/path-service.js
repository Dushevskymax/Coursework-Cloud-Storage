const BASEDIR = process.env.BASEDIR;

class PathService {

    static getPath(reqQuery) {
        if ('path' in reqQuery) {
            return reqQuery.path;
        }
    }

    static getFullPath(reqQuery) {
        if ('path' in reqQuery) {
            return BASEDIR + reqQuery.path;
        }
    }

    static getSourcePath() {
        return BASEDIR;
    }
}


module.exports = PathService;