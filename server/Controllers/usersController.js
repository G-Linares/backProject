import bcrypt from 'bcrypt';
import { ContenedorUsers } from '../DAO/ContenedorUsers.js';
// este contenedor contiene todas las funciones de mongoos que se van a ocupar en carrito y en productos
const contenedorUsers = new ContenedorUsers();

// esto es solo un test
export const ping = async (req, res) => {
	res.status(200).json({ message: 'pong' });
};

export const listUsers = async (req, res) => {
	try {
		const allProducts = await contenedorUsers.getAllUsers();
		res.status(200).json(allProducts);
	} catch (e) {
		res
			.status(501)
			.json({ status: 'ERROR', message: 'No se pueden encontrar items' });
	}
};

// mete informacion real que viene desde front y registra usuario con contraseña encriptada
export const signIn = async (req, res) => {
	const { userName, password } = req?.body;
	if (!userName || !password) {
		res.status(500).json({
			status: 'error',
			message: 'Username o Password estan vacios',
		});
		return;
	}
	const existingUser = await contenedorUsers.findOneUser(userName);
	if (existingUser) {
		res.status(500).json({
			status: 'error',
			message: 'Usuario ya existe',
		});
	} else {
		const hasehdPassword = await bcrypt.hash(password, 10);
		try {
			await contenedorUsers.registerNewUser({
				userName,
				password: hasehdPassword,
				isAdmin: false, // esto tiene que cambiar, ahora esta hardcodeado
			});
			res.status(200).json({
				status: 'success',
				message: 'Usuario registrado correctamente',
			});
		} catch (e) {
			res.status(500).json({
				status: 'error',
				message: 'Algo salio mal al registrar usuario',
			});
		}
	}
};

// valida la password y username, y valida que tipo de usuario es
export const login = async (req, res) => {
	try {
		const resultingUser = await contenedorUsers.findOneUser(req.body.userName);
		if (resultingUser) {
			const isValid = await bcrypt.compare(
				req.body.password,
				resultingUser.password
			);
			if (!isValid) {
				return res.status(400).json({
					status: 'error',
					message: 'Contraseña incorrecta',
				});
			} else {
				if (resultingUser.isAdmin) {
					res.status(200).json({
						status: 'success',
						message: 'Acceso correcto',
						type: 'admin',
					});
				} else {
					res.status(200).json({
						status: 'success',
						message: 'Acceso correcto',
						type: 'regular',
					});
				}
			}
		} else {
			res.status(501).json({
				status: 'error',
				message: 'No hay usuario con ese nombre',
			});
		}
	} catch (e) {
		res.status(501).json({
			status: 'ERROR',
			message: 'No se puede acceder al sistema en este momento',
		});
	}
};
