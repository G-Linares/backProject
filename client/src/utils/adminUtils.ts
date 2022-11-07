export interface itemType {
    alcohol:string,
    codigo:string,
    descripcion:string,
    foto:string,
    nombre: string,
    price: number,
    region: string,
    stock: number,
    timestamp:number,
    type:string,
    _id:string,
    id:string,
}
// get number without commas
export const numberWithCommas = (number : number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// get all the current Items in stock
export const allItemsInStock = (allItems: itemType[]) => {
    return numberWithCommas(allItems.reduce((prev:any, cur:any) => prev + cur.stock , 0));
}
// get all the current sales this year
export const allItemsSoldYearly = (allItems: itemType[]) => {
    return numberWithCommas(allItems.reduce((prev:any, cur:any) => prev + cur.sold , 0));
}

// sort items depending on stock
export const sortArrayDesAsc = (allItems: itemType[], sortDirection:string) => {
    const copyArray = [...allItems];
    copyArray.sort((a, b) => {
        return sortDirection === "0" ? a.stock - b.stock : b.stock - a.stock;
      });
      return copyArray
}