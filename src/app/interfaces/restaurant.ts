import { MenuDish } from "./menu-dish";

export interface Restaurant {
    companyId : number;
    name: string;
    menus?: MenuDish[][];
    image?: string;
}
