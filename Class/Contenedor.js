import { writeFile, readFile } from "fs/promises";

export class Contenedor {
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
      await writeFile(this.filePath, JSON.stringify(allCurrentItems, null, 2));
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
    try {
      await this.getById(id);
      const filteredArray = allCurrentItem.filter((item) => item.id !== id);
      await writeFile(this.filePath, JSON.stringify(filteredArray, null, 2));
    } catch (e) {
      throw new Error("No existe el elemento");
    }
  }

  async getAll() {
    try {
      const allCurrentItems = await readFile(this.filePath, {
        encoding: "utf-8"
      });
      return JSON.parse(allCurrentItems);
    } catch (error) {
      //controlo error por si se quiere imprimir todos y no hay archivo existente, si no hay lo crea y le pone un array
      await writeFile(this.filePath, JSON.stringify([]), (err) =>
        console.log("Couldn't Create File: " + err)
      );
      return [];
    }
  }

  async modifyById(id, newObjProps) {
    let allCurrentItems = await this.getAll();
    const itemToModify = await this.getById(id);
    //hay otra validacion dentro del modified array que checa si el elemento esta vacio, si lo esta mete el mismo valor de antes
    const modifiedArray = {
      ...itemToModify,
      title: newObjProps.title ? newObjProps.title : itemToModify.title,
      thumbnail: newObjProps.thumbnail
        ? newObjProps.thumbnail
        : itemToModify.thumbnail,
      price: newObjProps.price ? newObjProps.price : itemToModify.price
    };
    //reemplaza el item anterior
    allCurrentItems[id - 1] = modifiedArray;
    await writeFile(this.filePath, JSON.stringify(allCurrentItems, null, 2));
    //regresa el ID del item modificado
    return itemToModify.id;
  }

  async deleteAll() {
    await writeFile(this.filePath, JSON.stringify([]));
  }

  createId(allCurrentItems) {
    //crea un nuevo ID y asigna 1 si es el primero, si no agarra el ultimo id del ultimo id y le suma 1
    let newID = allCurrentItems.length > 0 ? allCurrentItems.length + 1 : 1;
    return newID;
  }
}
