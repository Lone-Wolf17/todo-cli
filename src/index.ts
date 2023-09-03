import EnvVars from "./constants/EnvVars.js";
import {TodoModel} from "./models/Todo.model.js";
import {connectDB} from "./db/connect-db.js";

console.log(EnvVars);

connectDB().then( async () => {
    console.log("Count :: ", await TodoModel.count())
});