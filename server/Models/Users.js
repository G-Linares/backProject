import mongoose, { Schema } from 'mongoose';

const UsersSchema = new Schema({
	timestamp: {
		type: Date,
		default: new Date(),
	},
	nombre: String,
	apellido: String,
	username: String,
	password: String,
	profilePicture: String,
});

const UsersModel = mongoose.model('Users', UsersSchema);

export default UsersModel;
