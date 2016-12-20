module.exports = {
  dest: 'upload',
  database:{
    "client":"sqlite3",
    connection: {
      filename: "./db.sqlite"
    },
    useNullAsDefault: true
  }
}