import mongoose, { Schema } from 'mongoose';

const ProductosSchema = new Schema({
	// aqui tengo que modelar la base de datos, sera un placeholder a datos de verdad
	// modelare una tabla como si fuera para un blog
	timestamp: {
		type: Date,
		default: new Date(),
	},
	nombre: String,
	descripcion: String,
	codigo: String,
	foto: String,
	price: Number,
	stock: Number,
	type: String,
	Alcohol: Number,
	region: String,
});

const ProductosModel = mongoose.model('Productos', ProductosSchema);

export default ProductosModel;
