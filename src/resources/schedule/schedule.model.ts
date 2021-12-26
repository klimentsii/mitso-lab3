import {
    v4 as uuid
} from 'uuid';

import { ISchedule, IBaseSchedulePartial, IBaseScheduleResponse } from './schedule.interface';

class Schedule {
    id:string;

    tourId: string | null;

    isActive: Boolean;

    startDate: Date;

    endDate: Date;

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    tourId = 'null' ,
                    isActive = true,
                    startDate =new Date,
                    endDate = new Date,
                    createdAt =  new Date,
                    updatedAt = new Date
                }: IBaseSchedulePartial = {}) {
        this.id = uuid();
        this.tourId = tourId;
        this.isActive = isActive;
        this.startDate = startDate;
        this.endDate = endDate;
        this.createdAt =createdAt;
        this.updatedAt =updatedAt;
    }

    static toResponse(schedule: ISchedule): IBaseScheduleResponse {
        const {
            id,
            tourId,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        } = schedule;
        return {
            id,
            tourId,
            isActive,
            startDate,
            endDate,
            createdAt,
            updatedAt
        };
    }
}

export default Schedule;