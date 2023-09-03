import {prop, getModelForClass, pre} from '@typegoose/typegoose';
import {Status} from "../constants/enums.js";
import {TimeStamps} from "@typegoose/typegoose/lib/defaultClasses.js";
import {nanoid} from  'nanoid';
// @pre<Todo>('save', function() {
//     this.code = nanoid(10);
// })
class Todo extends TimeStamps {
    @prop({required: true, trim: true})
    public name!: string;

    @prop({required: true, trim: true})
    public detail!: string;

    @prop({
        enum: Status,
        required: true, trim: true, default: Status.Pending})
    public status!: Status;

    @prop({required: true, trim: true, default: nanoid(10)})
    public code!: string;

}

export const TodoModel = getModelForClass(Todo); // UserModel is a regular Mongoose Model with correct types
