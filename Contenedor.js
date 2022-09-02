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
    const filteredArray = allCurrentItem.filter((item) => item.id !== id);
    if (!filteredArray) throw new Error("No existe item con ese Id");
    try {
      await writeFile(this.filePath, JSON.stringify(filteredArray, null, 2));
    } catch (error) {
      throw new Error("Algo paso al borrar elemento");
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
      await writeFile("./productos.txt", JSON.stringify([]), (err) =>
        console.log("Couldn't Create File: " + err)
      );
      return [];
    }
  }

  async deleteAll() {
    await writeFile(this.filePath, JSON.stringify([]));
  }

  createId(allCurrentItems) {
    //crea un nuevo ID y asigna 1 si es el primero, si no agarra el ultimo id del ultimo id y le suma 1
    let newID = allCurrentItems.length > 0 ? allCurrentItems.at(-1).id + 1 : 1;
    return newID;
  }
}