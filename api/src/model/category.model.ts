import mongoose from 'mongoose';
import { UserDocument } from './user.model';

/**
 * Interface pro kategorii.
 */
export interface CategoryDocument extends mongoose.Document {
    owner: UserDocument["_id"];
    name: string;
    description: string;
    color: string;
    craetedAt: Date;
    updatedAt: Date;
}

/**
 * Vytvořím objekt (schéma) pro kategorii.
 */
const CategorySchema = new mongoose.Schema(
    {
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: { type: String },
        description: { type: String },
        color: { type: String }
    },
    {
        timestamps: true
    }
)

const category = mongoose.model<CategoryDocument>("Category", CategorySchema);

export default category;