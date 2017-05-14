export class Firm {
    name: String;
    established: String;
    active: Number;
    country: String;
    employees: Number;
    sector: String;
    constructor(n: String, e: String, a: Number, c: String, emp: Number, s: String) {
        this.name = n;
        this.established = e;
        this.active = a;
        this.country = c;
        this.employees = emp;
        this.sector = s;
    }
}