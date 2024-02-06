import { v4 as uuidv4 } from 'uuid';

export class JobValue {
    id: string;
    title?: string;
    image?: string;
    description?: string;

    constructor({ title, image, description }: {
        title?: string,
        image?: string,
        description?: string,
    }) {
        this.id = uuidv4();
        this.title = title;
        this.image = image;
        this.description = description;
    }
}