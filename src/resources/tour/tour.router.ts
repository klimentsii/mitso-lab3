import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';


import Tour from './tour.model';
import Schedule from '../schedule/schedule.model';

import toursService from './tour.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
    catchErrors(async (_req: Request, res: Response) => {
        const tours = await toursService.getAll();

        res.json(tours.map(Tour.toResponse));
    })
);

router.route('/:id').get(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const tour = await toursService.getById(id || '');

        if (tour) {
            res.json(Tour.toResponse(tour));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'TOUR_NOT_FOUND',
                    msg: 'Tour not found'
                });
        }
    })
);

router.route('/:id/schedule').get(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const schedules = await toursService.getSchedulesByTourId(id || '');

        if (schedules) {
            res.json(schedules.map((ord) => Schedule.toResponse(ord)));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'SCHEDULE_NOT_FOUND',
                    msg: 'Schedule not found'
                });
        }
    })
);

router.route('/').post(
    catchErrors(async (req: Request, res: Response) => {
        const {
            title,
            slug,
            description,
            isActive,
            createdAt,
            updatedAt
        } = req.body;

        const tour = await toursService.createTour({
            title,
            slug,
            description,
            isActive,
            createdAt,
            updatedAt
        });

        if (tour) {
            res.status(StatusCodes.CREATED).json(Tour.toResponse(tour));
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    code: 'TOUR_NOT_CREATED',
                    msg: 'Tour not created'
                });
        }
    })
);

router.route('/:id').put(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;
        const {
            title,
            slug,
            description,
            isActive,
            createdAt,
            updatedAt
        } = req.body;

        const tour = await toursService.updateById({
            id: id || '',
            title,
            slug,
            description,
            isActive,
            createdAt,
            updatedAt
        });

        if (tour) {
            res.status(StatusCodes.OK).json(Tour.toResponse(tour));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'TOUR_NOT_FOUND',
                    msg: 'Tour not found'
                });
        }
    })
);

router.route('/:id').delete(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const tour = await toursService.deleteById(id || '');

        if (!tour) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'TOUR_NOT_FOUND',
                    msg: 'TOUR not found'
                });
        }

        return res
            .status(StatusCodes.NO_CONTENT)
            .json({
                code: 'TOUR_DELETED',
                msg: 'The tour has been deleted'
            });
    })
);

export default router;