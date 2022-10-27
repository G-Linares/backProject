import CarritosModel from '../Models/Carritos.js';

export class ContenedorCarritos {
	// mostrar todos los productos
	async getAllCarts() {
		try {
			const allCarts = await CarritosModel.find();
			return allCarts;
		} catch (e) {
			throw new Error('Algo salio mal al mostrar todos');
		}
	}

	// regresar un carrito dependiendo del ID recivido
	async getCartById(_id) {
		try {
			const cart = await CarritosModel.findById(_id);
			return cart;
		} catch (e) {
			throw new Error('Algo salio mal al mostrar un solo carrito');
		}
	}

	async saveOneCart(incomingItem) {
		try {
			const newItem = new CarritosModel({ productos: incomingItem });
			await newItem.save();
			return newItem._id.toString();
		} catch (e) {
			throw new Error('Algo salio mal al guardar');
		}
	}

	async deleteOneCart(_id) {
		try {
			await CarritosModel.findByIdAndDelete(_id);
		} catch (e) {
			throw new Error('Algo salio mal al borrar un carrito');
		}
	}

	// async addOneItemToExistingCart(itemToAdd, id) {
	//     try {

	//     } catch(e) {
	//         throw new Error('Algo salio mal al agregar item al carrito');
	//     }
	// }
}
