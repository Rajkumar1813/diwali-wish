const dns = require('dns');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {}

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Target MongoDB URI (pass as TARGET_URI or use default)
const TARGET_URI = process.env.TARGET_URI || process.env.MONGODB_URI || 'mongodb+srv://ohiabhist:duFoybPfg3hbfJPY@ohiabhist.zjaxj.mongodb.net/diwali-wishes?retryWrites=true&w=majority&appName=ohiabhist';

async function restoreDatabase() {
  const backupDir = path.join(__dirname, '..', 'backup');
  if (!fs.existsSync(backupDir)) {
    console.error('❌ Backup directory not found:', backupDir);
    process.exit(1);
  }

  console.log('⏳ Connecting to target MongoDB...');
  await mongoose.connect(TARGET_URI);
  console.log('✅ Connected successfully!');

  const files = fs.readdirSync(backupDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const colName = path.basename(file, '.json');
    const content = fs.readFileSync(path.join(backupDir, file), 'utf-8');
    const docs = JSON.parse(content);

    if (Array.isArray(docs) && docs.length > 0) {
      const col = mongoose.connection.db.collection(colName);
      // Clean and re-insert
      await col.deleteMany({});
      await col.insertMany(docs);
      console.log(`  ✅ Restored ${colName} -> ${docs.length} documents`);
    } else {
      console.log(`  ℹ️ Skipped ${colName} (empty)`);
    }
  }

  console.log('\n🎉 Database restore completed successfully!\n');
  process.exit(0);
}

restoreDatabase().catch(err => {
  console.error('❌ Restore Error:', err);
  process.exit(1);
});
