/** Database setup for BizTime. */

const { Client } =  require('pg');

if (process.env.NODE_ENV === "test") {
    DB_URI = "postgresql://azzam:password@localhost/biztime_test";
  } else {
    DB_URI = "postgresql://azzam:password@localhost/biztime";
  }

    let db = new Client({
        connectionString: DB_URI
      });
      
    db.connect();

    module.exports = db;