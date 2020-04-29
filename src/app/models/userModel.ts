import { ImageModel } from './imageModel';


export class UserModel   {

    _id: string;
    act: string;
    name: string;
    email: string;
    role: string;
    image: ImageModel[];
    google: boolean;
    password: string;

}
