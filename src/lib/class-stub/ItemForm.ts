import { Item } from "../types";

/**
 * ItemForm: lets the user create a new report for their missing item
 */
class ItemForm {
    private currentUserId!: string;
    private itemName!: string;
    private itemDescription!: string;
    private itemType!: "lost" | "found";
    private imageURL!: string;
    private itemResolved!: boolean;
    private itemLongitude!: number;
    private itemLatitude!: number;
    private dateReported!: Date;


    /**
     * The user enters the information of their lost item
     * @return True if the item information is valid
     */
    public setItemFormData(itemName: string, itemDescription: string, itemType: "lost" | "found", itemResolved: boolean, itemLongitude: number, itemLatitude: number): boolean {
        throw new Error("Not implemented")
    }   

    /**
     * The user submits the item report
     * @return void
     */
    public submitReport(): void {
        throw new Error("Not implemented")
    }

}