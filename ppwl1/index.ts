import { Elysia } from "elysia";
const app = new Elysia().listen(8000);


app.get("/", () => "Hello Evelyn");


console.log(
  `🦊 Elysia running at http://localhost:${app.server?.port}`
);
app.get("/hello/:name", ({ params }) => {
  return {
    message: `Hallo ${params.name}!`
  };
});



app.post("/login", ({ body }) => {
  const { email, password } = body as {
    email: string;
    password: string;
  };


  return {
    success: true,
    email
  };
});