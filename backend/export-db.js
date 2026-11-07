const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ohiabhist:duFoybPfg3hbfJPY@ohiabhist.zjaxj.mongodb.net/diwali-wishes?retryWrites=true&w=majority&appName=ohiabhist';

async function backupDatabase() {
  console.log('⏳ Connecting to MongoDB Atlas...');
  await mongoose.connect(MONGODB_URI);
  console.log('✅ Connected successfully!');

  const backupDir = path.join(__dirname, '..', 'backup');
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log(`📦 Found ${collections.length} collections. Exporting...\n`);

  for (const col of collections) {
    const docs = await mongoose.connection.db.collection(col.name).find({}).toArray();
    const filePath = path.join(backupDir, `${col.name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(docs, null, 2), 'utf-8');
    console.log(`  📄 Exported ${col.name}.json -> ${docs.length} documents`);
  }

  console.log(`\n🎉 Full Backup completed successfully in:\n👉 ${backupDir}\n`);
  process.exit(0);
}

backupDatabase().catch(err => {
  console.error('❌ Backup Error:', err);
  process.exit(1);
});

