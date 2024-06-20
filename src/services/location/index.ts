import axios from "axios";
import { LocationResponse, Request, Response } from "../types";
import { BASE_URL, ServicesRoutes } from "../serviceRoutes";

export default class LocationSearchAPI {
  // @ts-ignore
  static async fetch(jBody: Request): Promise<LocationResponse> {
    try {
      const res = await axios.get(BASE_URL + ServicesRoutes.locations.location, {
        params:
          {
            count: jBody.count,
            pages: jBody.pages,
            next: jBody.next,
            prev: jBody.prev
          }
      });
      return res.data;
    } catch (ex) {
      console.log("hata");
      console.log(ex);
    }
  }
}
