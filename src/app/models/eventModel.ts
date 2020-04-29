
import { LinkModel } from './linkModel';
import { ImageModel } from './imageModel';

export class EventModel  {


    _id: string;
    act: boolean;

    title: string;
    description: string;
    text: string;
    image: ImageModel[];
    date: Date;
    place: string;
    location: string;
    codigoPlus: string;
    access: string;
    category: string;
    links: LinkModel[];
    crew: string;
    tecnic: string;
    media: string;





}



