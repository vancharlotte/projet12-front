export class Location {
    constructor(public id: string,
                public name: string,
                public longitude : number,
                public latitude : number,
                public location: string,
                public description: string,
                public equipments: []) {
    }
  }