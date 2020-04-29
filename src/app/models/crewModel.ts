import { SocialModel } from './socialModel';
import { LinkModel } from './linkModel';
import { ImageModel } from './imageModel';



export class CrewModel   {

    _id: string;
    act: boolean;
    name: string;
    lastname: string;
    email: string;
    roles: string;
    image: ImageModel[];
    date: Date;
    links: LinkModel[];
    social = new SocialModel();



}
