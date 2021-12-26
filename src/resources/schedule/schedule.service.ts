import { IPrice } from '../price/price.interface';
import schedulesRepo from './schedule.memory.repository';
import pricesRepo from '../price/price.memory.repository';

import { IBaseSchedule, ISchedule } from './schedule.interface';


const getAll = async (): Promise<ISchedule[]> => schedulesRepo.getAll();

const getById = async (id: string): Promise<ISchedule | null> => schedulesRepo.getById(id);

const getPricesByScheduleId = async (id: string): Promise<IPrice[] | null> => pricesRepo.getPricesByScheduleId(id);

const createSchedule = async (schedule: IBaseSchedule): Promise<ISchedule> => schedulesRepo.createSchedule(schedule);

const updateById = async (schedule: ISchedule): Promise<ISchedule | null> => schedulesRepo.updateById(schedule);

const deleteById = async (id: string): Promise<ISchedule | null> => {
    const scheduleDeletable = await getById(id);
    schedulesRepo.deleteById(id);
    pricesRepo.deleteByScheduleId(id);
    return scheduleDeletable;
}


export default {
    getAll,
    getById,
    getPricesByScheduleId,
    createSchedule,
    updateById,
    deleteById
}