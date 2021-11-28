import mongoose from 'mongoose';
import { UserDocument } from './user.model';
import { CategoryDocument } from './category.model';

/**
 * Interface pro úkol.
 */
export interface TaskDocument extends mongoose.Document {
    owner: UserDocument["_id"];
    category: CategoryDocument["_id"];
    status: number;
    priority: number;
    deadline: Date;
    name: string;
    description: string;
    craetedAt: Date;
    updatedAt: Date;
}

/**
 * Vytvořím objekt (schéma) pro úkol.
 */
const TaskSchema = new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
        status: { type: Number },
        priority: { type: Number },
        deadline: { type: Date },
        name: { type: String },
        description: { type: String },
    },
    {
        timestamps: true
    }
)

const task = mongoose.model<TaskDocument>("Task", TaskSchema);

export default task;