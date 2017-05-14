export class Message {
    date: String;
    time: String;
    sender: String;
    content: String;

    constructor(d: String, t: String, s: String, c: String) {
        this.date = d;
        this.time = t;
        this.sender = s;
        this.content = c;
    }
}

export class Document extends Message {
    file: String;
}

export class Call extends Message {
    length: String;
}