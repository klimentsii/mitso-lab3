import { IBaseSchedule, ISchedule } from './schedule.interface';
import Schedule from './schedule.model';
import pricesRepo from '../price/price.memory.repository';


const SCHEDULES: ISchedule[] = [];

const getAll = async (): Promise<ISchedule[]> => SCHEDULES;

const getById = async (id: string): Promise<ISchedule | null> => SCHEDULES.find((schedule) => schedule.id === id) || null;

const getSchedulesByTourId = async (tourId: string): Promise<ISchedule[] | null> => {
    const schedules = SCHEDULES.filter((schedule) => schedule.tourId === tourId);
    return schedules;
}

const getSchedulesByDelTourId = (tourId: string): ISchedule[] => {
    const schedules = SCHEDULES.filter((schedule) => schedule.tourId === tourId);
    return schedules;
}

const createSchedule = async ({
                                  tourId,
                                  isActive,
                                  startDate,
                                  endDate,
                                  createdAt,
                                  updatedAt
                              }: IBaseSchedule): Promise<ISchedule> => {
    const schedule = new Schedule({
        tourId,
        isActive,
        startDate,
        endDate,
        createdAt,
        updatedAt
    })
    SCHEDULES.push(schedule);
    return schedule;
}

const updateById = async ({
                              id,
                              tourId,
                              isActive,
                              startDate,
                              endDate,
                              createdAt,
                              updatedAt
                          }: ISchedule): Promise<ISchedule | null> => {
    const schedulePos = SCHEDULES.findIndex((schedule) => schedule.id === id);

    if (schedulePos === -1) return null;

    const oldSchedule = SCHEDULES[schedulePos];

    const newSchedule = {
        ...oldSchedule,
        id,
        tourId,
        isActive,
        startDate,
        endDate,
        createdAt,
        updatedAt
    };

    SCHEDULES.splice(schedulePos, 1, newSchedule);
    return newSchedule;
}

const deleteById = async (id: string): Promise<ISchedule | null> => {
    const schedulePos = SCHEDULES.findIndex((schedule) => schedule.id === id);

    if (schedulePos === -1) return null;

    const scheduleDeletable = SCHEDULES[schedulePos]!;

    SCHEDULES.splice(schedulePos, 1);
    return scheduleDeletable;
}

const deleteByTourId = async (tourId: string): Promise<void> => {
    const schedules = SCHEDULES.filter((schedule) => schedule.tourId === tourId);

    await Promise.allSettled(schedules.map(async (schedule) => {
        deleteById(schedule.id);
        pricesRepo.deleteByScheduleId(schedule.id);
    }))
}

export default {
    SCHEDULES,
    getAll,
    getById,
    getSchedulesByTourId,
    getSchedulesByDelTourId,
    createSchedule,
    updateById,
    deleteById,
    deleteByTourId
}