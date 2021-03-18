export class Contact {
    constructor(con?:Contact){
        if (con) Object.assign(this,con)
    }
    Id?: number;
    Name?: string;
    Address?: string;
    Email?: string;
    Phone?: string;
}
