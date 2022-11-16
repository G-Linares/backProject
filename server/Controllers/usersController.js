import { ContenedorUsers } from '../DAO/ContenedorUsers.js';
// este contenedor contiene todas las funciones de mongoos que se van a ocupar en carrito y en productos
const contenedorUsers = new ContenedorUsers();

// esto es solo un test
export const ping = async (req, res) => {
	res.status(200).json({ message: 'pong' });
};

export const listUsers = async (req, res) => {
	try {
		const allProducts = await contenedorUsers.getAllProducts();
		res.status(200).json(allProducts);
	} catch (e) {
		res
			.status(501)
			.json({ status: 'ERROR', message: 'No se pueden encontrar items' });
	}
};

// mete informacion dummy
export const signIn = async (req, res) => {
	try {
		await contenedorUsers.registerNewUser({
			nombre: 'Gerardo',
			isAdmin: true,
			apellido: 'Linares',
			username: 'Squiffy',
			password: '123',
			profilePicture: 'url',
		});
		res.status(200).json({ status: 'success', message: 'Usuario creado' });
	} catch (e) {
		res.status(501).json({
			status: 'ERROR',
			message: 'No se puede registrar nuevo usuario',
		});
	}
};
