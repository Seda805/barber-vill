import hairstylesReducer from "./hairstyles";
import languagesReducer from "./languages";
import beardsReducer from "./beards";
import authReducer from "./auth";
import barbersReducer from "./barbers"
import categoriesReducer from "./categories";


export const reducers = {
    languages: languagesReducer,    
    hairstyles: hairstylesReducer,
    beards: beardsReducer,
    auth: authReducer,
    barbers: barbersReducer
    categories: categoriesReducer,
};