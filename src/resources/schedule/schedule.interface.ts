export interface IBaseSchedule {
    tourId:string | null;
    isActive: Boolean;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface ISchedule extends IBaseSchedule {
    id: string;
}

export interface IBaseScheduleResponse extends Partial<IBaseSchedule> {
    id: string;
}

export interface IBaseSchedulePartial extends Partial<IBaseSchedule> { }