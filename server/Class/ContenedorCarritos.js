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

	async addOneMoreExistingItemInCart(
		requestedCartId,
		incomingItemID,
		quantity
	) {
		try {
			await CarritosModel.updateOne(
				{ requestedCartId, 'productos._id': incomingItemID },
				{ $set: { 'productos.$.quantity': quantity + 1 } }
			);
		} catch (e) {
			throw new Error('Algo salio mal al editar item existente de carrito');
		}
	}

	async addNonExistentItemToCart(incomingItem, requestedCartId) {
		try {
			await CarritosModel.updateOne(
				{ requestedCartId },
				{ $push: { productos: incomingItem } }
			);
		} catch (e) {
			throw new Error('Algo salio mal al agregar item no existente a carrito');
		}
	}

	async deleteOneItemInCart(cartId, itemId) {
		console.log(cartId);
		console.log(itemId);
		try {
			CarritosModel.deleteOne({ cartId, 'productos._id': itemId });
		} catch (e) {
			throw new Error('Algo salio mal al agregar item al carrito');
		}
	}
	// en mongosh si mi deja
	// db.mycollection.update(
	// 	{ '_id': ObjectId("5150a1199fac0e6910000002") },
	// 	{ $pull: { items: { id: 23 } } },
	// 	false, // Upsert
	// 	true, // Multi
	// );
}
