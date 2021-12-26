import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';


import Price from '../price/price.model';
import Schedule from './schedule.model';

import schedulesService from './schedule.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
    catchErrors(async (_req: Request, res: Response) => {
        const schedules = await schedulesService.getAll();

        res.json(schedules.map(Schedule.toResponse));
    })
);

router.route('/:id').get(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const schedule = await schedulesService.getById(id || '');

        if (schedule) {
            res.json(Schedule.toResponse(schedule));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'ORDER_NOT_FOUND',
                    msg: 'Order not found'
                });
        }
    })
);

router.route('/:id/price').get(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const schedules = await schedulesService.getPricesByScheduleId(id || '');

        if (schedules) {
            res.json(schedules.map((ord) => Price.toResponse(ord)));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRICES_NOT_FOUND',
                    msg: 'PRICES not found'
                });
        }
    })
);

router.route('/').post(
    catchErrors(async (req: Request, res: Response) => {
        const {
            tourId,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        } = req.body;

        const schedule = await schedulesService.createSchedule({
            tourId: tourId || '',
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        });

        if (schedule) {
            res.status(StatusCodes.CREATED).json(Schedule.toResponse(schedule));
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    code: 'SCHEDULE_NOT_CREATED',
                    msg: 'SCHEDULE not created'
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
            tourId,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        } = req.body;

        const schedule = await schedulesService.updateById({
            id: id || '',
            tourId: tourId || '',
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        });

        if (schedule) {
            res.status(StatusCodes.OK).json(Schedule.toResponse(schedule));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'SCHEDULE_NOT_FOUND',
                    msg: 'SCHEDULE not found'
                });
        }
    })
);

router.route('/:id').delete(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const schedule = await schedulesService.deleteById(id || '');

        if (!schedule) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'SCHEDULE_NOT_FOUND',
                    msg: 'SCHEDULE not found'
                });
        }

        return res
            .status(StatusCodes.NO_CONTENT)
            .json({
                code: 'SCHEDULE_DELETED',
                msg: 'The SCHEDULE has been deleted'
            });
    })
);

export default router;