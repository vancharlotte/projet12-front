import { Equipment } from "./equipment-model";

export class Location {
  constructor(
  public id: string,
  public longitude : number,
  public latitude : number,
  public name: string,
  public description: string,
  public equipments: Equipment[]) {
  }


}