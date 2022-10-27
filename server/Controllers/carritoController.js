// import { getNewCartId, removeObjectWithId } from '../utils/carritoUtils.js';
import { ContenedorCarritos } from '../Class/ContenedorCarritos.js';

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
		console.log(allcarts);
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

// export const addProductInExistingCart = async (req, res) => {
// 	const cartId = JSON.parse(req.params.id);
// 	const itemToAdd = req.body;
// 	const allCarts = await contenedorCarritos.getAllCarts();
// 	if (cartId > allCarts.length || cartId < 1)
// 		return res.status(500).json({
// 			status: 'error',
// 			message: `No existe un carrito con este id:${cartId}`,
// 		});
// esta funcion verifica que el item que se intenta agregar exista dentro de un carrito existente,
// si existe en el carrito, solo aumenta una unidad el mismo item, si no existe, create el nuevo item
// y lo adjunta al carrito
// 	try {
// 		const doesItemExist = allCarts[cartId - 1].productos.find(
// 			(obj) => obj.id === itemToAdd.id
// 		);
// 		if (itemToAdd.id < 1)
// 			return res.status(500).json({
// 				status: 'error',
// 				message:
// 					'el id del item a meter dentro del carrito, no puede ser menor a 0',
// 			});
// 		if (doesItemExist) {
// 			const index = allCarts[cartId - 1].productos.findIndex((object) => {
// 				return object.id === itemToAdd.id;
// 			});
// 			allCarts[cartId - 1].productos[index].quantity++;
// 			await contenedor.saveAll(allCarts);
// 			return res.status(200).json({
// 				status: 'success',
// 				message: `Item existente en carrito, sole se agrega una unidad mas al carrito con id: ${cartId}`,
// 			});
// 		} else {
// 			allCarts[cartId - 1].productos.push(itemToAdd);
// 			await contenedor.saveAll(allCarts);
// 			res.status(200).json({
// 				status: 'success',
// 				message: `Item agregado al carrito con id: ${cartId}`,
// 			});
// 		}
// 	} catch (e) {
// 		res.status(500).json({ status: 'error', message: 'algo salio mal' });
// 	}
// };

// toma el id del carrito y del item, valida que todos los numeros sean existentes y no tengan overflow,
// si existe se crea el indice de donde esta el item, lo borra, y se guarda con el saveAll
// export const deleteItemInCart = async (req, res) => {
// 	const cartID = JSON.parse(req.params.id);
// 	const itemID = JSON.parse(req.params.id_prod);
// 	const allCarts = await contenedor.getAll();
// 	if (cartID > allCarts.length || cartID < 1)
// 		return res.status(500).json({
// 			status: 'error',
// 			message: `No existe un carrito con este id:${cartID}`,
// 		});
// 	try {
// 		const doesItemExist = allCarts[cartID - 1].productos.find(
// 			(obj) => obj.id === itemID
// 		);
// 		if (itemID < 1)
// 			return res.status(500).json({
// 				status: 'error',
// 				message:
// 					'el id del item a borrar dentro del carrito, no puede ser menor a 0',
// 			});
// 		if (doesItemExist) {
// 			const index = allCarts[cartID - 1].productos.findIndex((object) => {
// 				return object.id === itemID;
// 			});
// 			allCarts[cartID - 1].productos.splice(index, 1);
// 			await contenedor.saveAll(allCarts);
// 			return res.status(200).json({
// 				status: 'success',
// 				message: `Item con id:${itemID} borrado de carrito con id: ${cartID}`,
// 			});
// 		} else {
// 			res.status(500).json({
// 				status: 'error',
// 				message: `Item no existe con ese ID`,
// 			});
// 		}
// 	} catch (e) {
// 		res.status(500).json({ status: 'error', message: 'algo salio mal' });
// 	}
// };
