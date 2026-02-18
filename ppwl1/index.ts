import { Elysia } from "elysia";

const app = new Elysia().listen(8000);

const FILE_NAME = "notes.txt";


// UPDATE - Edit catatan
async function updateNote(number: number, newContent: string) {
  const file = Bun.file(FILE_NAME);

  if (!await file.exists()) {
    console.log (" Tidak ada file catatan");
    return;
  }

  const content = await file.text();
  const lines = 
  content.trim().split("\n").filter(Boolean);

  if (number < 1 || number > lines.length) {
    console.log ("Nomor catatan tidak valid" );
    return;
  }

 const timestamp = new Date()
  .toISOString()
  .replace("T", " ")
  .split(".")[0];

  lines[number - 1] = `[${timestamp}] ${newContent}`;

  await Bun.write(FILE_NAME, lines.join("\n") + "\n");

  console.log ("Catatan berhasil diperbarui" );
}

//fitur serach
// SEARCH - Cari catatan berdasarkan keyword
async function searchNotes(keyword: string) {
  const file = Bun.file(FILE_NAME);


  if (!await file.exists()) {
    console.log("Tidak ada file catatan");
    return;
  }


  const content = await file.text();
  const lines = content.trim().split("\n").filter(Boolean);


  const results = lines.filter(line =>
    line.toLowerCase().includes(keyword.toLowerCase())
  );


  if (results.length === 0) {
    console.log("Tidak ada catatan yang mengandung kata tersebut.");
    return;
  }


  console.log(`Hasil pencarian untuk "${keyword}":\n`);
  results.forEach((note, index) => {
    console.log(`${index + 1}. ${note}`);
  });
}


app.get("/", () => "Hello Evelyn");

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


app.put("/update/:number", async ({ params, body }) => {
  const number = Number(params.number);
  const { newContent } = body as { newContent: string };

  return await updateNote(number, newContent);
});

console.log(
  `🦊 Elysia running at http://localhost:${app.server?.port}`
);
