//Details.js, för detaljsidan ska oxå importeras länka med htmlen, mycket importer
import { renderDetailsPage } from "./render.js";

// let activityID;
// try {
//     const urlParams = new URLSearchParams(window.location.search);
//     const irlID = urlParams.get("id");
//     activityID 
//     renderDetailsPage(activityID);
// } catch (error) {
//     console.error("Error parsing URL parameters:", error);
// }


// const params = new URLSearchParams({
//     controller: "activity",
//     method: "getall",
//     api_key: window.APIKEY,
//     ids: "1"
// });

// const response = await fetch(`https://smapi.lnu.se/api/?${params}`);
// let activity = await response.json();

let payload = [
    {
        "id": "1",
        "lat": "56.669297",
        "lng": "16.490171",
        "name": "\u00d6lands Djur- och N\u00f6jespark",
        "description": "N\u00f6jespark",
        "type": "activity",
        "address": "Djurparksv\u00e4gen",
        "zip_code": "386 90",
        "city": "F\u00e4rjestaden",
        "phone_number": "0485-392 22",
        "website": "http:\/\/olandsdjurpark.com\/",
        "abstract": "\u00d6lands djur- och n\u00f6jespark \u00e4r en djurpark, n\u00f6jespark och ett vattenland i F\u00e4rjestaden, n\u00e4ra \u00d6landsbron p\u00e5 \u00d6land. Djurparken grundades 1974 av Boris Bravin.",
        "text": "",
        "price_range": "250-500",
        "outdoors": "Y",
        "child_discount": "Y",
        "student_discount": "N",
        "senior_discount": "N",
        "municipality": "M\u00f6rbyl\u00e5nga kommun",
        "county": "Kalmar l\u00e4n",
        "province": "\u00d6land",
        "modified_at": "2018-01-22 19:20:10",
        "rating": "1.66667",
        "num_reviews": "3"
    }];

renderDetailsPage(payload[0]);