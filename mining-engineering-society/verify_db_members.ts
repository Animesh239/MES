import "dotenv/config"; // Loads .env file
import { membersTable } from "./src/db/schema";
import { DB_Connection } from "./src/lib/db_connection/index";

async function checkMembers() {
  console.log("Checking members in DB...");
  try {
    const memberList = await DB_Connection.select().from(membersTable);
    console.log(`Found ${memberList.length} members.`);
    console.log(JSON.stringify(memberList, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

checkMembers();
