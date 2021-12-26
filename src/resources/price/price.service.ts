import pricesRepo from './price.memory.repository';

import { IBasePrice, IPrice } from './price.interface';

const getAll = async (): Promise<IPrice[]> => pricesRepo.getAll();

const getById = async (id: string): Promise<IPrice | null> => pricesRepo.getById(id);

const createPrice = async (price: IBasePrice): Promise<IPrice | null> => pricesRepo.createPrice(price);

const updateById = async (price: IPrice): Promise<IPrice | null> => pricesRepo.updateById(price);

const deleteById = async (id: string): Promise<IPrice | null> => {
    const priceDeletable = await getById(id);
    pricesRepo.deleteById(id);
    return priceDeletable;
}
export default {
    getAll,
    getById,
    createPrice,
    updateById,
    deleteById
}