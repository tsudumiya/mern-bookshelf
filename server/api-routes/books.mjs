import express from 'express';
import { body, validationResult } from 'express-validator';
import Book from '../models/book.mjs';
import { error } from 'console';
import { requestErrorHandler } from '../helpers/helper.mjs';
import { getAllBooks, getBookById, deleteBook, registBook, updateBook } from '../controllers/books.mjs';

const router = express.Router();

// // 例外を処理する -> この処理はhelperへ移す
// function requestErrorHandler(controller) {
//     return async function (req, res, next) {
//         try {
//             return await controller(req, res);
//         } catch (error) {
//             next(error);
//         }
//     };
// }

// /api/books
// router.get('/', getAllBooks);
router.get('/', requestErrorHandler(getAllBooks));

// 個別記事取得
router.get('/:id', requestErrorHandler(getBookById));

// express-validator
router.post('/', body('title').notEmpty(), body('description').notEmpty(), body('comment').notEmpty(), body('rating').notEmpty().isInt({ min: 1, max: 5 }), requestErrorHandler(registBook));

// PATCH経路(更新)
router.patch('/:id', body('title').optional().notEmpty(), body('description').optional().notEmpty(), body('comment').optional().notEmpty(), body('rating').optional().notEmpty().isInt({ min: 1, max: 5 }), requestErrorHandler(updateBook));

// DELETE
router.delete('/:id', requestErrorHandler(deleteBook));

export default router;
