import mongoose, { Schema } from 'mongoose';

const CarritosSchema = new Schema({
	// aqui tengo que modelar la base de datos, sera un placeholder a datos de verdad
	// modelare una tabla como si fuera para un blog
	productos: Array,
	id: Number,
	timestamp: String,
});

const CarritosModel = mongoose.model('carritos', CarritosSchema);

export default CarritosModel;
