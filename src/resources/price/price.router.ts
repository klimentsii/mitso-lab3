import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';


import Price from './price.model';

import pricesService from './price.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
    catchErrors(async (_req: Request, res: Response) => {
        const prices = await pricesService.getAll();

        res.json(prices.map(Price.toResponse));
    })
);

router.route('/:id').get(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const price = await pricesService.getById(id || '');

        if (price) {
            res.json(Price.toResponse(price));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRODUCT_NOT_FOUND',
                    msg: 'Product not found'
                });
        }
    })
);

router.route('/').post(
    catchErrors(async (req: Request, res: Response) => {
        const {
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt
        } = req.body;
        const price = await pricesService.createPrice({
            scheduleId: scheduleId || '',
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt
        });

        if (price) {
            res.status(StatusCodes.CREATED).json(Price.toResponse(price));
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    code: 'PRICE_NOT_CREATED',
                    msg: 'PRICE not created'
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
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt
        } = req.body;

        const price = await pricesService.updateById({
            id: id || '',
            scheduleId: scheduleId || '',
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt
        });

        if (price) {
            res.status(StatusCodes.OK).json(Price.toResponse(price));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRICE_NOT_FOUND',
                    msg: 'PRICE not found'
                });
        }
    })
);

router.route('/:id').delete(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const price = await pricesService.deleteById(id || '');

        if (!price) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRICE_NOT_FOUND',
                    msg: 'PRICE not found'
                });
        }

        return res
            .status(StatusCodes.NO_CONTENT)
            .json({
                code: 'PRICE_DELETED',
                msg: 'The PRICE has been deleted'
            });
    })
);

export default router;