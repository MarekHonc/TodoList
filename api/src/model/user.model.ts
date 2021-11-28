import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from 'config';

/**
 * Interface usera.
 */
export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>
}

/**
 * Vytvořím objekt (schéma) uživatele.
 */
const UserSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

/**
 * Definici akce, které nastavene před uložením.
 */
UserSchema.pre('save', async function(next) {
    let user = this as UserDocument;

    // Pokud se heslo nezměnilo, nemá cenu nic dělat.
    if(!user.isModified('password'))
        return next();

    // Náhodná dodatečná data.
    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

    // Vygeneruji hash z hesla.
    const hash = bcrypt.hashSync(user.password, salt);

    // A uložím zahashované heslo.
    user.password = hash;

    return next();
});

/**
 * Přidám do schéma uživatele metodu na kontrolu hesla.
 */
UserSchema.methods.comparePassword = async function(candidatePassword: string) {
    const user = this as UserDocument;

    return bcrypt.compare(candidatePassword, user.password).catch(e => false);
}

const user = mongoose.model<UserDocument>("User", UserSchema);

export default user;