export interface IBaseTour {
    title: string;
    slug: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export interface IBaseTourPartial extends Partial<IBaseTour> { }

export interface ITour extends IBaseTour {
    id: string;
}

export interface IBaseTourResponse extends Partial<IBaseTour> {
    id: string;
}