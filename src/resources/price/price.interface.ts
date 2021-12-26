export interface IBasePrice {
    scheduleId: string | null;
    priceValue: string;
    priceCurrency: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPrice extends IBasePrice {
    id: string;
}

export interface IBasePricePartial extends Partial<IBasePrice> {
}