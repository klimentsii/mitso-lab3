import {
    v4 as uuid
} from 'uuid';

import { IBasePricePartial, IPrice } from './price.interface';

class Price {
    id: string;

    scheduleId: string | null;

    priceValue: string;

    priceCurrency: string;

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    scheduleId = null,
                    priceValue = '565',
                    priceCurrency = '$',
                    createdAt = new Date,
                    updatedAt = new Date
                }: IBasePricePartial = {}) {
        this.id = uuid();
        this.scheduleId = scheduleId;
        this.priceValue = priceValue;
        this.priceCurrency = priceCurrency;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static toResponse(price: IPrice): IPrice {
        const {
            id,
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt
        } = price;
        return {
            id,
            scheduleId,
            priceValue,
            priceCurrency,
            createdAt,
            updatedAt

        };
    }
}

export default Price;