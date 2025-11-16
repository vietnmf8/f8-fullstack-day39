import { createStore } from "@/lib/redux";
import reducer from "./reducer";

const store = createStore(reducer);

export default store;
