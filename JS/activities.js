//renderingen, filtrering imortera det
import { renderActivities } from "./render.js";
import { fetchPixabay } from "./pixabay.js";
import { listenerEvents, filterFromSmapi } from "./filter.js"


listenerEvents()
filterFromSmapi();
