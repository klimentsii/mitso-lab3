import { ISchedule } from '../schedule/schedule.interface';
import toursRepo from './tour.memory.repository';
import schedulesRepo from '../schedule/schedule.memory.repository';
import pricesRepo from '../price/price.memory.repository';

import { IBaseTour, ITour } from './tour.interface';

const getAll = async (): Promise<ITour[]> => toursRepo.getAll();

const getById = async (id: string): Promise<ITour | null> => toursRepo.getById(id);

const getSchedulesByTourId = async (id: string): Promise<ISchedule[] | null> => schedulesRepo.getSchedulesByTourId(id);

const createTour = async (tour: IBaseTour): Promise<ITour> => toursRepo.createTour(tour);

const updateById = async (tour: ITour): Promise<ITour | null> => toursRepo.updateById(tour);

const deleteById = async (id: string): Promise<ITour | null> => {
    const tourDeletable = await getById(id);
    await toursRepo.deleteById(id);
    await schedulesRepo.deleteByTourId(id);
    const schedule = schedulesRepo.getSchedulesByDelTourId(id)
    schedule.map((i) => pricesRepo.deleteByScheduleId(i.id))
    return tourDeletable;
};

export default {
    getAll,
    getById,
    getSchedulesByTourId,
    createTour,
    updateById,
    deleteById
};