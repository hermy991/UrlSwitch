import {up} from "./utils.ts";

const rulesFile = Deno.args[0] || "./rules.json";
console.log(`Rules File : ${rulesFile}`)
const rules:any = JSON.parse(await Deno.readTextFile(rulesFile));

const futures: Promise<void>[] = []
for(const rule in rules){
  futures.push(up(Number(rule), rules[rule]))
}

Promise.all(futures);