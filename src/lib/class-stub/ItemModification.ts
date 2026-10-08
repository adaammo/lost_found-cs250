import { Item } from "../types";

/**
 * ItemModification: lets the owner of an item edit and save its info.
 */
class ItemModification {
    private selectedItem!: Item;
    private currentUserId!: string;

    /**
     * The user chooses the item that they want to modify.
     * @return Item
     */
    public chooseItem(itemId: string): Item {
        throw new Error("Not implemented")
    }

    /**
     * The user enters modification.
     * @return True if modification is succeeded
     */
    public saveModification(modName: string, modDescription: string, modItemType: "lost" | "found", modResolved: boolean): boolean {
        throw new Error("Not implemented")
    }

    /**
     * The system compares owner_id and id of current user.
     * @return True if they are the same
     */
    private checkIfSame(): boolean {
        throw new Error("Not implemented")
    }
}