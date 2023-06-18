import { Storage } from "./Storage.mjs";

const storage = new Storage("names", { type: "local", data: [1, 2, 3, 4] });

console.log(storage.get());

console.log(storage.isEmpty());

storage.set([8]);

console.log(storage.get());

storage.clear();

console.log(storage.isEmpty());
