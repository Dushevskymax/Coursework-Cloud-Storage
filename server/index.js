require('dotenv').config()
const express = require('express');
const formidable = require('formidable');
const fs = require('fs');
const DirService = require('./services/dir-service.js');
const PathService = require('./services/path-service.js');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json({ limit: 1048576 }));
app.use(express.urlencoded({ extended: false, limit: 1048576 }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, X-Requested-With, content-type', true);
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.listen(PORT, () => console.log(`PORT: ${PORT}`));

app.delete('/delete', async (req, res) => {
    if (req.query) {
        const PATH = PathService.getFullPath(req.query);
        const result = await DirService.deleteItem(PATH);
        if (result === true) {
            res.json({ err: false });
        } else {
            res.json({ err: result });
        }
    }
});

app.get('/search', async (req, res) => {
    const result = await DirService.getSearchItems(req.query.name, PathService.getSourcePath());
    res.json({ items: result });
})

app.get('/download', async (req, res) => {
    res.download(PathService.getFullPath(req.query));
});

app.post('/new', async (req, res) => {
    const PATH = PathService.getFullPath(req.query);
    const result = await DirService.newDirectory(PATH);
    if (result) {
        res.end();
    } else {
        res.status(500).json({err: result});
        res.end();
    }
});

app.post('/upload', async (req, res) => {
    const form = formidable({
        uploadDir: PathService.getFullPath(req.query),
        maxFileSize: 1024 * 1024 * 1024,
    })

    form.parse(req, (err, fields, files) =>{
        if (err) {
            next(err)
            return;
        }

        for ([key, value] of Object.entries(files)) {
           fs.renameSync(form.uploadDir+'/'+value.newFilename, form.uploadDir+'/'+value.originalFilename);
           res.end();
        }
    });
})

app.get('/', async (req, res) => {
    const PATH = PathService.getFullPath(req.query);
    const items = await DirService.getDirInfo(PATH);
    res.json({ path: PathService.getPath(req.query), files: items });
})
