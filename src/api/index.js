class Helper {
  static baseURl() {
      return "https://api.foursquare.com/v2/";
  }
  static auth() {
    const keys = {
      client_id: "ML1FK2XBZRJ03KWRSYMHIZUERR045KBYZQL10KHTSRXJLEWJ",
      client_secret: "UI5X412LXCJC2BA2UNNF5YFLA53V02SRYPWSQWC0KDRWZZFK",
      v: "20180310"
    };
    return Object.keys(keys).map(key => `${key}=${keys[key]}`).join("&");
  }
  static urlBuilder(urlParams){
    if(!urlParams) {
      return ""
    }
    return Object.keys(urlParams)
      .map(key => `${key}=${urlParams[key]}`).join("&");
  }
  static headers() {
    return {
      Accept: "application/json"
    };
  }
  static simpleFetch(endPoint, method, urlParams){
    let requestData = {
      method,
      headers: Helper.headers()
    };
    return fetch(`${Helper.baseURl()}${endPoint}?${Helper.auth()}&${Helper.urlBuilder(
        urlParams
     )}`,
     requestData
   ).then(res => res.json());
  }
}

export default class SquareAPI {

  static search(urlParams){
    return Helper.simpleFetch("/venues/search", "GET", urlParams);
  }

  static getVenueDetails(VENUE_ID){
    return Helper.simpleFetch(`/venues/${VENUE_ID}`, "GET");
  }

  static getVenuePhotos(VENUE_ID){
    return Helper.simpleFetch(`/venues/VENUE_ID/photos`, "GET");
  }
}
