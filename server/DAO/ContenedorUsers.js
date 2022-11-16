import UsersModel from '../Models/Users.js';

export class ContenedorUsers {
	// mostrar todos los productos
	async getAllProducts() {
		try {
			const allProducts = await UsersModel.find();
			return allProducts;
		} catch (e) {
			throw new Error('Algo salio mal al mostrar todos los usuarios');
		}
	}

	async registerNewUser(incomingUser) {
		try {
			const newUser = new UsersModel({ ...incomingUser });
			await newUser.save();
		} catch (e) {
			throw new Error('Algo salio mal al guardar');
		}
	}
}
