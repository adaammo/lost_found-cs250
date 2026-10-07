export type Item = {
    id: string;
    item_name: string;
    item_description: string;
    item_type: "lost" | "found";
    image_url: string | null;
    longitude: number;
    latitude: number;
    resolved: boolean;
    created_at: string;
  };
  export type ItemsResponse = {
    items: Item[];
  };

  export interface FastAPIErrorResponse {
    status_code: number,
    detail: string
  }
  export type PinPosition = {
    lat: number,
    lng: number
  }