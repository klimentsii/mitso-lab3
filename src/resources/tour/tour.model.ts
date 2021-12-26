import {
    v4 as uuid
} from 'uuid';

import { ITour, IBaseTourPartial, IBaseTourResponse} from './tour.interface';

class Tour {
    id: string;

    title: string;

    slug: string;

    description: string;

    isActive: boolean;

    createdAt: Date;

    updatedAt: Date;

    constructor({
                    slug = 'test',
                    title = 'title',
                    description = 'place',
                    isActive = true,
                    createdAt = new Date(),
                    updatedAt = new Date()
                }: IBaseTourPartial = {}) {
        this.id = uuid();
        this.title = title;
        this.slug = slug;
        this.description = description;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static toResponse(tour: ITour): IBaseTourResponse {
        const {
            id, title, slug, description, isActive, createdAt, updatedAt
        } = tour;
        return {
            id, title, slug, description, isActive, createdAt, updatedAt
        };
    }
}

export default Tour;