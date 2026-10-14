"use server";

import { FastAPIErrorResponse, Item, ItemsProfileReturn, ItemsWithProfilesResponse, UserDatabaseProfile } from "./types";
import axios, { isAxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function insertItemReport(item: Item, token: string): Promise<{ ok: false; error: string } | { ok: true; item: Item }> {
  try {
    if (!API_URL) {
      return {
        ok: false,
        error: "Missing API URL",
      };
    }
    
    const payload = {
      item_name: item.item_name,
      item_description: item.item_description,
      item_type: item.item_type,
      longitude: item.longitude,
      latitude: item.latitude,
      created_at: item.created_at,
    };

    const response = await axios.post<Item>(`${API_URL}/items`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    return {
      ok: true,
      item: response.data,
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const data = error.response?.data as FastAPIErrorResponse | undefined;
      const msg =
        data?.detail ??
        error.message ??
        "Failed to submit item, please try again later";

      return {
        ok: false,
        error: msg,
      };
    }

    return {
      ok: false,
      error: "Something happened internally, please try again",
    };
  }
}

export async function fetchItems(): Promise<
  { ok: false; error: string } | { ok: true; items: Item[], profiles: Record<string, ItemsProfileReturn>}
> {
  try {
    if (!API_URL) {
      return {
        ok: false,
        error: "Missing API URL",
      };
    }

    const response = await axios.get<ItemsWithProfilesResponse>(`${API_URL}/items`);

    return {
      ok: true,
      items: response.data.items,
      profiles: response.data.profiles
    };
  } catch (err) {
    if (isAxiosError(err)) {
      console.log(err.message)
      const data = err.response?.data as FastAPIErrorResponse | undefined;

      const msg =
        data?.detail ??
        err.message ??
        "Could not connect to the backend";

      return {
        ok: false,
        error: msg,
      };
    }

    return {
      ok: false,
      error: "Something happened internally, please try again",
    };
  }
}

export async function callDefaultProfileService(username: string, token: string, first_name: string, last_name: string | null):
  Promise<{ ok: false; error: string } | { ok: true; detail: string }> {
  try {
    // FastAPI expects a header holding authorization with the bearer token to get a users session.
    const payload = {
      username,
      first_name,
      last_name
    }
    const response = await axios.post<{ ok: boolean, detail: string }>(`${API_URL}/profiles/make`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });
    return {
      ok: true,
      detail: response.data.detail
    }
  }
  catch (error) {
    if (isAxiosError(error)) {
      const data = error.response?.data as FastAPIErrorResponse | undefined;
      const msg =
        data?.detail ??
        error.message ??
        "Could not connect to the service.";
      return {
        ok: false,
        error: msg,
      };
    }
  }
  return {
    ok: false,
    error: "Something happened internally."
  }
}

export async function callProfileService(token: string)
: Promise < { ok: false; error: string } | { ok: true; profile: UserDatabaseProfile } > {

  try {
    // The api expects a json body where the left side is named 'id' so it has the uuid for the requested 
    const response = await axios.post<UserDatabaseProfile>(`${API_URL}/profiles`, {}, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });
    return {
      ok: true,
      profile: response.data
    }
  }
  catch(error) {
    if (isAxiosError(error)) {
      const data = error.response?.data as FastAPIErrorResponse | undefined;
      const msg =
        data?.detail ??
        error.message ??
        "Could not connect to the service.";
      return {
        ok: false,
        error: msg,
      };
    }
  }
  return{
    ok: false,
    error: "Something happened internally."
  }
}