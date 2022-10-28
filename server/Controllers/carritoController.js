// import { getNewCartId, removeObjectWithId } from '../utils/carritoUtils.js';
import { ContenedorCarritos } from '../Class/ContenedorCarritos.js';
import CarritosModel from '../Models/Carritos.js';

const contenedorCarritos = new ContenedorCarritos();

// this is only a test
export const ping = async (req, res) => {
	res.status(200).json({ message: 'pong' });
};

// funcion correspondiente al get de todods los carritos en existencia
export const getCarts = async (req, res) => {
	try {
		const allcarts = await contenedorCarritos.getAllCarts();
		// se imprime y lo mando a imprimir en pantalla
		res.status(200).json(allcarts);
	} catch (e) {
		res.status(400).json({ message: e.message });
	}
};

// funcion que trae un solo carrito con toda su informacion dependiendo del ID
export const getOneCart = async (req, res) => {
	const { id } = req.params;
	try {
		const foundCart = await contenedorCarritos.getCartById(id);
		res.status(200).json(foundCart);
	} catch (e) {
		res.status(400).json({ message: 'No se puede encontrar carrito' });
	}
};

// funcion para encontrar los items de un carrito en especifco filtrado por ID
export const getOneCartItems = async (req, res) => {
	const { id } = req.params;
	try {
		const foundCart = await contenedorCarritos.getCartById(id);
		res.status(200).json(foundCart.productos);
	} catch (e) {
		res
			.status(400)
			.json({ message: 'No se pueden encontrar items en carrito' });
	}
};

// esta api call es llamada en <Carrito Modal />
export const createNewCart = async (req, res) => {
	const newCart = req.body;
	// verifica que el nuevo carrito no venga vacio
	if (newCart.length < 1 || Object.keys(newCart).length === 0) {
		res.status(500).json({ status: 'error', message: 'Tu carrito esta vacio' });
	} else {
		try {
			const newCartId = await contenedorCarritos.saveOneCart(req.body);
			// cuando se crea un carrito regresa un ID para que el usuario lo guarde
			res
				.status(200)
				.json({ status: 'OK', message: 'Carrito creado', id: newCartId });
		} catch (e) {
			res.status(500).json({
				status: 'error',
				message: 'Algo salio mal al guardar nuevo carrito',
			});
		}
	}
};

// a partir de aqui no se pueden probar estos endpoints ya que no hay front end para ellas,
// se tienen que probar con POSTMAN o INSOMNIA
// url para probar http://localhost:8080/api/carrito/635aa37779a14e788c1c773a
export const deleteCart = async (req, res) => {
	const { id } = req.params;
	try {
		await contenedorCarritos.deleteOneCart(id);
		res.status(200).json({ status: 'success', message: 'carrito borrado' });
	} catch (e) {
		res.status(500).json({
			status: 'error',
			message: 'algo salio mal, no hay item con ese ID',
		});
	}
};

// esta funcion es medio compleja, basicamente lo que hace es agarrar el item que se quiere ingresar completo
// asi como el id del carrito que se va a modificar, con esto se busca a el carrito con el ID correspondiente
// despues buscamos en ese mismo carrito si existe un item dentro de sus productos con el mismo ID como el item que viene
// si existe, se manda al DAO para agregarle un +1 en cantidad, si no, simplemente lo crea desde 0 y se quede en el
// array de productos dentro del carrito

// tiene bug esta funcion y no se por que, funciona al 100% solo con el primer carrito, con los demas no hace nada
export const addProductInExistingCart = async (req, res) => {
	const requestedCartId = req.params.id;
	const incomingItem = req.body;
	try {
		const completeRequestedCart = await contenedorCarritos.getCartById(
			requestedCartId
		);
		const repeatedItem = completeRequestedCart.productos.find(
			(item) => item._id === incomingItem._id
		);
		// si existe el item dentro del carrito
		if (repeatedItem) {
			await contenedorCarritos.addOneMoreExistingItemInCart(
				requestedCartId,
				incomingItem._id,
				repeatedItem.quantity
			);
			res.status(200).json({
				status: 'success',
				message:
					'item existente en carrito, se agrego una unidad a su cantidad',
			});
			// si no existe el item dentro del carrito
		} else {
			await contenedorCarritos.addNonExistentItemToCart(
				incomingItem,
				requestedCartId
			);
			res.status(200).json({
				status: 'success',
				message: 'item no existente en carrito agregado',
			});
		}
	} catch (e) {
		res.status(500).json({
			status: 'error',
			message: 'algo salio mal, al agregar item a carrito',
		});
	}
};

// toma el id del carrito y del item, valida que todos los numeros sean existentes y no tengan overflow,
// si existe se crea el indice de donde esta el item, lo borra, y se guarda con el saveAll
export const deleteItemInCart = async (req, res) => {
	const cartId = req.params.id;
	const itemId = req.params.id_prod;
	try {
		await contenedorCarritos.deleteOneItemInCart(cartId, itemId);
		res.status(200).json({
			status: 'success',
			message: 'item borrado con exito',
		});
	} catch (e) {
		res.status(500).json({
			status: 'error',
			message: 'algo salio mal, al borrar item de carrito',
		});
	}
};
