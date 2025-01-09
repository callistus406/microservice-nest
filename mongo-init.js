db = db.getSiblingDB('mydatabase');

db.createUser({
  user: "appuser",
  pwd: "apppassword",
  roles: [
    {
      role: "readWrite",
      db: "mydatabase"
    }
  ]
});

db.createCollection('users');
db.users.insertOne({ name: "John Doe", email: "john@example.com" });
