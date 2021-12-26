import { IPrice, IBasePrice } from './price.interface';
import Price from './price.model';

const PRICES: IPrice[] = []

const getAll = async (): Promise<IPrice[]> => PRICES;

const getById = async (id: string): Promise<IPrice | null> => PRICES.find((price) => price.id === id) || null;

const getPricesByScheduleId = async (scheduleId: string): Promise<IPrice[] | null> => {
    const prices = PRICES.filter((price) => price.scheduleId === scheduleId);
    return prices;
}

const createPrice = async ({
                               scheduleId,
                               priceValue,
                               priceCurrency,
                               createdAt,
                               updatedAt
                           }: IBasePrice): Promise<IPrice> => {
    const price = new Price({
        scheduleId,
        priceValue,
        priceCurrency,
        createdAt,
        updatedAt
    })
    PRICES.push(price);
    return price;
}

const updateById = async ({
                              id,
                              scheduleId,
                              priceValue,
                              priceCurrency,
                              createdAt,
                              updatedAt
                          }: IPrice): Promise<IPrice | null> => {
    const pricePos = PRICES.findIndex((price) => price.id === id);

    if (pricePos === -1) return null;

    const oldPrice = PRICES[pricePos];

    const newPrice = {
        ...oldPrice,
        scheduleId,
        priceValue,
        priceCurrency,
        createdAt,
        updatedAt,
        id
    };

    PRICES.splice(pricePos, 1, newPrice);
    return newPrice;

};

const deleteById = async (id: string): Promise<IPrice | null> => {
    const pricePos = PRICES.findIndex((price) => price.id === id);

    if (pricePos === -1) return null;

    const priceDeletable = PRICES[pricePos]!;

    PRICES.splice(pricePos, 1);
    return priceDeletable;
}

const deleteByScheduleId = async (scheduleId: string): Promise<void> => {
    const schedules = PRICES.filter((price) => price.scheduleId === scheduleId);

    await Promise.allSettled(schedules.map(async (price) => deleteById(price.id)));
}

export default {
    PRICES,
    getAll,
    getById,
    getPricesByScheduleId,
    createPrice,
    updateById,
    deleteById,
    deleteByScheduleId
}