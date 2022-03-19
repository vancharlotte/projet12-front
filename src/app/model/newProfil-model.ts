export class NewProfil {
    constructor(public authId: string,
                public username: string,
                public email: string,
                public description: string,
                public favorites: []) {
    }
  }