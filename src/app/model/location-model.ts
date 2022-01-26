export class Location {
    constructor(public id: string,
                public name: string,
                public longitude : number,
                public latitude : number,
                public adress: string,
                public description: string,
                public equipments: []) {
    }
  }