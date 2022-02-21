export class NewProfil {
    constructor(public authId: string,
                public username: string,
                public description: string,
                public favorites: []) {
    }
  }