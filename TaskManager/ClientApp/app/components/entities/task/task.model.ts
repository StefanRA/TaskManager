import { Project } from '../project/project.model';

export class Task {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public creationDate?: Date,
        public dueDate?: Date,
        public status?: boolean,
        public reporter?: any,
        public assignee?: any,
        public parentProject?: Project
    ) { }
}