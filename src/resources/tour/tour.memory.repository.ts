import { IBaseTour, ITour } from './tour.interface';

import Tour from './tour.model';

const TOURS: ITour[] = [];

const getAll = async (): Promise<ITour[]> => TOURS;

const getById = async (id: string): Promise<ITour | null> => TOURS.find((tour) => tour.id === id) || null;

const createTour = async ({
                              title,
                              slug,
                              description,
                              isActive,
                              createdAt,
                              updatedAt
                          }: IBaseTour): Promise<ITour> => {
    const tour = new Tour({
        title,
        slug,
        description,
        isActive,
        createdAt,
        updatedAt
    })
    TOURS.push(tour);
    return tour;
}

const updateById = async ({
                              id,
                              title,
                              slug,
                              description,
                              isActive,
                              createdAt,
                              updatedAt
                          }: ITour): Promise<ITour | null> => {
    const tourPos = TOURS.findIndex((tour) => tour.id === id);

    if (tourPos === -1) return null;

    const oldTour = TOURS[tourPos];

    const newTour = {
        ...oldTour,
        id,
        title,
        slug,
        description,
        isActive,
        createdAt,
        updatedAt
    };

    TOURS.splice(tourPos, 1, newTour);
    return newTour;
};

const deleteById = async (id: string): Promise<ITour | null> => {
    const tourPos = TOURS.findIndex((tour) => tour.id === id);

    if (tourPos === -1) return null;

    const tourDeletable = TOURS[tourPos]!;

    TOURS.splice(tourPos, 1);
    return tourDeletable;
}

export default {
    TOURS,
    getAll,
    getById,
    createTour,
    updateById,
    deleteById
};