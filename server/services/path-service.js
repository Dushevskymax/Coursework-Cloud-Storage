const BASEDIR = process.env.BASEDIR;

class PathService {

    getPath(reqQuery) {
        return reqQuery.path;
    }

    getFullPath(reqQuery, userId) {
        return `${BASEDIR}/${userId}/${reqQuery.path}`;
    }

    getSourcePath(userId) {
        return `${BASEDIR}/${userId}`;
    }
}


module.exports = new PathService();