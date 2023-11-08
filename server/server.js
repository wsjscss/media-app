import express from "express";
import bodyParser from "body-parser";
import fs from "fs/promises";
import path from "path";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const jsonDataPath = path.join("./server/db/db.json");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function readJSONFile() {
  try {
    const data = await fs.readFile(jsonDataPath, "utf8");
    const jsonData = JSON.parse(data);

    return jsonData;
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
  }
}

app.get("/", async (req, res) => {
  res.json({ message: "Let's go" });
});

app.get("/api/media", async (req, res) => {
  const { media } = await readJSONFile();

  res.json({ media });
});

app.post("/api/add", async (req, res) => {
  let newMedia = { id: uuidv4(), imageSrc: "/assets/game-1.jpeg", ...req.body };

  const jsonData = await readJSONFile();
  jsonData.media.unshift(newMedia);

  fs.writeFile(jsonDataPath, JSON.stringify(jsonData, null, 4), "utf8");

  res.json({ ...jsonData });
});

app.delete("/api/delete", async (req, res) => {
  const { id } = req.query;
  const jsonData = await readJSONFile();
  const newMedia = jsonData.media.filter((item) => {
    const incomeId = isNaN(Number(id)) ? id : Number(id);
    return item.id !== incomeId;
  });
  const newJsonData = { media: newMedia };

  fs.writeFile(jsonDataPath, JSON.stringify(newJsonData, null, 4), "utf8");

  res.json({ ...newJsonData });
});

app.patch("/api/update", async (req, res) => {
  const { id, data } = req.body;
  const jsonData = await readJSONFile();
  const newMedia = jsonData.media.map((item) => {
    const incomeId = isNaN(Number(id)) ? id : Number(id);

    if (item.id === incomeId) {
      return { ...item, ...data };
    }

    return item;
  });
  const newJsonData = { media: newMedia };

  fs.writeFile(jsonDataPath, JSON.stringify(newJsonData, null, 4), "utf8");

  res.json({ ...newJsonData });
});

app.listen(3000, () => {
  console.log("Server run on port 3000");
});
