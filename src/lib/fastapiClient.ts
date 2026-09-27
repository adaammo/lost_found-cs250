"use server"
import { FastAPIErrorResponse, Item, ItemsResponse } from "./types";
import axios, { isAxiosError } from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? ""
export async function fetchItems(): Promise<{ok: false, error: string} | {ok: true, items: Item[]}> {
  try {
    if(!API_URL){
      return {
        ok: false,
        error: "Missing API URL"
      }
    }
    const response = await axios.get<ItemsResponse>(`${API_URL}/items`);
    return {
      ok: true,
      items: response.data.items
  }
}
  catch (err) {
    if(isAxiosError(err)){
      const msg = (err.response?.data as FastAPIErrorResponse).detail
      const status = (err.response?.data as FastAPIErrorResponse).status_code
        return {
          ok: false,
          error: msg
      }
    }
  }
  return {
    ok: false,
    error: "Something happened internally, please try again"
  }
}