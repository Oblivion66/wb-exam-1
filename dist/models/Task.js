export class DefaultTask {
    constructor(title, description) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.createdAt = new Date();
        this.status = "pending";
        this.type = "default";
    }
}
export class DeadlineTask extends DefaultTask {
    constructor(title, description, deadline) {
        super(title, description);
        this.deadline = deadline;
        this.type = "deadline";
    }
}
export class ResponsibleTask extends DefaultTask {
    constructor(title, description, responsible) {
        super(title, description);
        this.responsible = responsible;
        this.type = "responsible";
    }
}
export class LocationTask extends DefaultTask {
    constructor(title, description, location) {
        super(title, description);
        this.location = location;
        this.type = "location";
    }
}
