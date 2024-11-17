export interface Task {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    status: "done" | "pending";
    type: "default" | "deadline" | "responsible" | "location";
  }
  
  export class DefaultTask implements Task {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    status: "done" | "pending";
    type: Task["type"];
  
    constructor(title: string, description: string) {
      this.id = crypto.randomUUID();
      this.title = title;
      this.description = description;
      this.createdAt = new Date();
      this.status = "pending";
      this.type = "default";
    }
  }
  
  export class DeadlineTask extends DefaultTask {
    deadline: Date;
  
    constructor(title: string, description: string, deadline: Date) {
      super(title, description);
      this.deadline = deadline;
      this.type = "deadline";
    }
  }
  
  export class ResponsibleTask extends DefaultTask {
    responsible: string;
  
    constructor(title: string, description: string, responsible: string) {
      super(title, description);
      this.responsible = responsible;
      this.type = "responsible";
    }
  }
  
  export class LocationTask extends DefaultTask {
    location: string;
  
    constructor(title: string, description: string, location: string) {
      super(title, description);
      this.location = location;
      this.type = "location";
    }
  }