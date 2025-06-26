//This File is used to automate Collection download for backup purpose
//Uing Node-crons

const cron = require("node-cron");
const fs = require("fs");
const path = require("path");
const { Parser } = require("json2csv");
const { Zip } = require("zip-lib");
const User_data = require("../modals/CustModal");
const { json } = require("body-parser");

cron.schedule("* * * * *", async () => {
  const password = process.env.Password;
  const backupDir = path.join(__dirname, "../../backups");
  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }
  const now = new Date().toISOString().replace(/[:.]/g, "-");
  const jsonPath = path.join(backupDir, `users-${now}.json`);
  const csvPath = path.join(backupDir, `users-${now}.csv`);
  const zipPath = path.join(backupDir, `users-${now}.zip`);
  try {
    const user = await User_data.find().lean();
    if (user.length == 0) return 0;

    fs.writeFileSync(jsonPath, JSON.stringify(user, null, 2));

    const parser = new Parser();
    const csv = parser.parse(user);
    fs.writeFileSync(csvPath, csv);

    const zip=new Zip();
    zip.addFile(jsonPath)
    zip.addFile(csvPath)
    await zip.archive(zipPath);

    console.log(`Backup created and zipped with password at ${zipPath}`);
  } catch (err) {
    console.error("Error creating file.", err.message);
    console.error(err.stack);
  } finally {
    fs.unlinkSync(jsonPath);
    fs.unlinkSync(csvPath);
  }
});
