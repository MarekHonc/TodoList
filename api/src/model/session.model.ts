import mongoose from 'mongoose';
import { UserDocument } from './user.model';

/**
 * Interface pro session.
 */
export interface SessionDocument extends mongoose.Document {
    user: UserDocument["_id"];
    valid: boolean;
    userAgent: string;
    craetedAt: Date;
    updatedAt: Date;
}

/**
 * Vytvořím objekt (schéma) pro session.
 */
const SessionSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        valid: { type: Boolean, default: true },
        userAgent: { type: String }
    },
    {
        timestamps: true
    }
)

const session = mongoose.model<SessionDocument>("Session", SessionSchema);

export default session;