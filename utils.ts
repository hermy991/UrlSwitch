import {oak} from "./deps.ts";

export async function up (port: number, routes: { [route:string]: string }): Promise<void> {
  const app = new oak.Application();
  const books = new Map<string, any>();
  books.set("1", {
    id: "1",
    title: "The Hound of the Baskervilles",
    author: "Conan Doyle, Arthur",
  });
  const router = new oak.Router();
  for(const route in routes){
    const path = routes[route];
    router.all(`/${route.replace(/^[\/]|[\/]$/ig, "")}(.*)`, async (ctx) => {
      //const url = ctx.request.url;
      const ri: RequestInit = {
      };

      const furl = `${path.replace(/[\/]$/ig, "")}${ctx.captures.join("")}`;
      console.log(`  Url Point :${furl}`);
      const response = await fetch(furl, ri);
      const body = await response.text();
      ctx.response.body = body;
    });
  }

  app.use(router.routes());
  app.use(router.allowedMethods());
  console.log(`Port : ${port}`);
  const show:any = {}
  for(let route in routes){
    console.log(`  Path '${routes[route]}' mount in port http://127.0.0.1:${port}/${route}`);
  }
  // for(let route in routes){
  //   show[routes[route]] = `http://127.0.0.1:${port}/${route}`;
  // }
  // console.table(show)
  await app.listen({ port });
}