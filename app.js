const fs = require("fs/promises");
const { item1, item2, item3, item4 } = require("./dummyData.js");

class Contenedor {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async save(itemToBeCreated) {
    const allCurrentItems = await this.getAll();
    //este metodo funciona para validar el ID y regresar uno que cumple con las reclas
    const newObjId = this.createId(allCurrentItems);
    const newCompleteObj = { ...itemToBeCreated, id: newObjId };
    allCurrentItems.push(newCompleteObj);
    try {
      await fs.writeFile(
        this.filePath,
        JSON.stringify(allCurrentItems, null, 2)
      );
    } catch (e) {
      throw console.error(`Error al guargar nuevo obnjeto, mensaje: ${e}`);
    }
    return newCompleteObj.id;
  }

  async getById(id) {
    const allCurrentItems = await this.getAll();
    //regresa un nuevo array con el resultado encontrado, si es undef mete error, si no lo regresa.
    const filteredArray = allCurrentItems.find((item) => item.id === id);
    if (!filteredArray) throw new Error("No existe item con ese Id");
    return filteredArray;
  }

  async deleteById(id) {
    const allCurrentItem = await this.getAll();
    const filteredArray = allCurrentItem.filter((item) => item.id !== id);
    if (!filteredArray) throw new Error("No existe item con ese Id");
    try {
      await fs.writeFile(this.filePath, JSON.stringify(filteredArray, null, 2));
    } catch (error) {
      throw new Error("Algo paso al borrar elemento");
    }
  }

  async getAll() {
    try {
      const allCurrentItems = await fs.readFile(this.filePath, {
        encoding: "utf-8"
      });
      return JSON.parse(allCurrentItems);
    } catch (error) {
      //controlo error por si se quiere imprimir todos y no hay archivo existente, si no hay lo crea y le pone un array
      await fs.writeFile("./productos.txt", JSON.stringify([]), (err) =>
        console.log("Couldn't Create File: " + err)
      );
      return [];
    }
  }

  async deleteAll() {
    await fs.writeFile(this.filePath, JSON.stringify([]));
  }

  createId(allCurrentItems) {
    //crea un nuevo ID y asigna 1 si es el primero, si no agarra el ultimo id del ultimo id y le suma 1
    let newID = allCurrentItems.length > 0 ? allCurrentItems.at(-1).id + 1 : 1;
    return newID;
  }
}

const testConsignas = async () => {
  //creo la clase solo con la ruta del archivo
  const items = new Contenedor("./productos.txt");

  //consigna metodo save()
  let firstItemCreatedId = await items.save(item1);
  console.log(`Item creado con el id: ${firstItemCreatedId}`);

  //consigna metodo save()
  let secondItemCreatedId = await items.save(item2);
  console.log(`Item creado con el id: ${secondItemCreatedId}`);

  //consigna metodo save()
  let thirdItemCreatedId = await items.save(item3);
  console.log(`Item creado con el id: ${thirdItemCreatedId}`);

  //consigna metodo save()
  let fourthItemCreatedId = await items.save(item4);
  console.log(`Item creado con el id: ${fourthItemCreatedId}`);

  //consigna metodo getById(Number): Object
  let filteredById = await items.getById(3);
  console.log(filteredById);
  //tambien se valida que el id sea valido
  //let filteredByIdUndef = await items.getById(123);
  //console.log(filteredByIdUndef)

  //consgina metodo getAll() : void
  const allCurrentItem = await items.getAll();
  console.log("Estos son todos los items existentes");
  console.log(allCurrentItem);

  //consigna metodo deleteById(Number): void
  let ereasedById = await items.deleteById(2);
  console.log("ese objeto se elemino");
  //tambien valida que el item que quiere eliminar sea valido
  //let ereasedById = await items.deleteById(87);

  //consigna metodo deleteAll(): void
  await items.deleteAll();
};

testConsignas();
