import mongoose, { Schema } from 'mongoose';

const UsersSchema = new Schema({
	isAdmin: Boolean,
	nombre: String,
	apellido: String,
	username: String,
	password: String,
	profilePicture: String,
	timestamp: {
		type: Date,
		default: new Date(),
	},
});

const UsersModel = mongoose.model('Users', UsersSchema);

export default UsersModel;
