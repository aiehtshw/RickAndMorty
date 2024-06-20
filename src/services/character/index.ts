import axios from "axios";
import { Request, Response } from "../types";
import { BASE_URL, ServicesRoutes } from "../serviceRoutes";

export default class CharacterSearchAPI {
  // @ts-ignore
  static async fetch(jBody: Request): Promise<Response> {
    try {
      const params = new URLSearchParams({
        page: jBody.pages.toString()
      });
      const res = await axios.get(BASE_URL + ServicesRoutes.characters.character,{params});
      return res.data;
    } catch (ex) {
      console.log("hata");
      console.log(ex);
    }
  }
}
