export class Task {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public creationDate?: Date,
        public dueDate?: Date,
        public reporter?: any,
        public assignee?: any
    ) { }
}