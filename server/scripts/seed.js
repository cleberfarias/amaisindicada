// Roda uma vez para popular o Firestore com os dados de exemplo em
// server/data/*.json. Uso local (com gcloud autenticado): node scripts/seed.js
const path = require("path");
const fs = require("fs");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const credential = process.env.FIREBASE_SERVICE_ACCOUNT_JSON
  ? cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON))
  : applicationDefault();

initializeApp({ credential, projectId: process.env.GCLOUD_PROJECT || "bd-indicada" });
const db = getFirestore();

const dataDir = path.join(__dirname, "..", "data");

const seedCollection = async (collectionName, filename) => {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`Arquivo nao encontrado, pulando: ${filePath}`);
    return;
  }

  const items = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const batch = db.batch();
  items.forEach((item) => {
    batch.set(db.collection(collectionName).doc(item.id), item);
  });
  await batch.commit();
  console.log(`Seed de ${collectionName}: ${items.length} documento(s) gravado(s).`);
};

const run = async () => {
  await seedCollection("produtos", "produtos.json");
  await seedCollection("banners", "banners.json");
  await seedCollection("posts", "posts.json");
  console.log("Seed concluido.");
};

run().catch((error) => {
  console.error("Falha no seed:", error);
  process.exit(1);
});
