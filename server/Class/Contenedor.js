import ProductosModel from '../Models/Productos.js';

export class Contenedor {
	async getAllProducts() {
		try {
			const allProducts = await ProductosModel.find();
			return allProducts;
		} catch (e) {
			throw new Error('Algo salio mal al mostrar todos');
		}
	}

	async getByIdProduct(id) {
		try {
			const item = await ProductosModel.findById(id);
			return item;
		} catch (e) {
			throw new Error('Algo salio mal al buscar Id');
		}
	}

	async saveOneProduct(incomingItem) {
		try {
			const newItem = new ProductosModel({ ...incomingItem });
			await newItem.save();
		} catch (e) {
			throw new Error('Algo salio mal al guardar');
		}
	}

	async editOneProduct(newItemData, _id) {
		try {
			await ProductosModel.updateOne({ _id }, newItemData);
		} catch (e) {
			throw new Error('Algo salio mal al editar');
		}
	}

	async deleteOneProduct(_id) {
		try {
			await ProductosModel.findByIdAndDelete(_id);
		} catch (e) {
			throw new Error('Algo salio mal al borrar');
		}
	}
}
