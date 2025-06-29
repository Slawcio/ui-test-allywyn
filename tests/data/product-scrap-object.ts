import { ItemView } from "../../pages/item-view/item-view";

export class ParsedProduct {

    constructor(
        public readonly name: string,
        public readonly description: string,
        public readonly price: string,
        public readonly imgSrc: string
    ) {}

    static async fromInventoryItem(itemInventory: ItemView): Promise<ParsedProduct> {
        const name = await itemInventory.name.textContent();
        const description = await itemInventory.description.textContent();
        const price = await itemInventory.price.textContent();
        const imgSrc = await itemInventory.img.getAttribute('src');
        return new ParsedProduct(name?.trim() || '', description?.trim() || '', price?.trim() || '', imgSrc?.trim() || '');
    }

}