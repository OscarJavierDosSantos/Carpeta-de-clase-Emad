import { Router } from 'express';
import { ReviewsController } from '../controllers/reviews.controller.js';
import createDebug from 'debug';
import { AuthInterceptor } from '../middleware/auth.interceptor.js';
import { Role } from '@prisma/client';

const debug = createDebug('movies:router:reviews');

export const createReviewsRouter = (
    authInterceptor: AuthInterceptor,
    reviewsController: ReviewsController,
) => {
    debug('Ejecutando createReviewsRouter');

    const reviewsRouter = Router();
    reviewsRouter.get(
        '/',
        authInterceptor.authenticate,
        // authInterceptor.hasRole(Role.EDITOR),
        reviewsController.getAll,
    );
    reviewsRouter.get(
        '/:id',
        
        reviewsController.getById,
    );
    reviewsRouter.post(
        '/',
        authInterceptor.authenticate,
        reviewsController.create,
    );
    reviewsRouter.patch(
        '/:id',
        authInterceptor.authenticate,
        authInterceptor.isOwnerReview,
        reviewsController.update,
    );
    reviewsRouter.delete(
        '/:id',
        authInterceptor.authenticate,
        authInterceptor.isOwnerReview,
        reviewsController.delete,
    );
    return reviewsRouter;
};
