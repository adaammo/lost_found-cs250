export type Item = {
  id: string;
  owner_id: string;
  item_name: string;
  item_description: string;
  item_type: "lost" | "found";
  image_url: string | null;
  longitude: number;
  latitude: number;
  resolved: boolean;
  created_at: string;
};
export type ItemCreate = {
  item_name: string;
  item_description: string;
  longitude: number;
  latitude: number;
}

export type ItemsProfileReturn = {
  id: string;
  user_id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone_number: string | null;
};

export type ItemsWithProfilesResponse = {
  items: Item[];
  profiles: Record<string, ItemsProfileReturn>;
};

export interface FastAPIErrorResponse {
  status_code: number,
  detail: string
}
export type PinPosition = {
  lat: number,
  lng: number
}

export type UserDatabaseProfile = {
  id: string;
  user_id: string;
  created_at: string;
  username: string;
  first_name: string;
  last_name: string | null;
  phone_number: string | null;
  email: string;
}