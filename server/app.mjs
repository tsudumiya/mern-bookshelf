import path from 'path';
import express from 'express';
import apiRoutes from './api-routes/index.mjs';
import env from 'dotenv';
import './helpers/db.mjs';
env.config();

const app = express();
const port = process.env.PORT || 8080;

app.use('/', express.static('build'));
app.use(express.json());

// CORS
// import cors from 'cors';
// app.use(
//     cors({
//         origin: '*',
//     })
// );

// API
app.use('/api', apiRoutes);

app.get('*', function (req, res) {
    const indexHtml = path.resolve('build', 'index.html');
    res.sendFile(indexHtml);
});

// 経路(パス)が見つからない場合にここに来る
app.use((req, res) => {
    res.status(404).json({ msg: '404 NOT FOUND' });
});

// エラー
app.use(function (err, req, res, next) {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ msg: '不正なエラーが発生しました' });
});

app.listen(port, () => {
    console.log(`Server Start: http://localhost:${port}`);
});
