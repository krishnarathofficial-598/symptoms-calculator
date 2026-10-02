const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(cors());

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const FILE_PATH = './users.json';

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => ({
    salt,
    hash: crypto.scryptSync(password, salt, 64).toString('hex')
});

const verifyPassword = (password, stored) => {
    if (!stored || typeof stored !== 'object' || !stored.salt || !stored.hash) return false;
    const candidate = crypto.scryptSync(password, stored.salt, 64).toString('hex');
    return crypto.timingSafeEqual(Buffer.from(candidate, 'hex'), Buffer.from(stored.hash, 'hex'));
};

// Helper function to safely read the JSON file
const readUsers = () => {
    if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify({})); // Creates file if missing
        return {};
    }
    try {
        const data = fs.readFileSync(FILE_PATH);
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
};

// Route: Register
app.post('/register', (req, res) => {
    console.log(`➡️ New Registration Attempt: ${req.body.username}`);
    const { username, password } = req.body;
    const users = readUsers();

    if (users[username]) {
        return res.status(400).json({ message: "Username already exists" });
    }

    users[username] = hashPassword(password);
    fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 4));
    res.status(201).json({ message: "User registered successfully" });
});

// Route: Login
app.post('/login', (req, res) => {
    console.log(`➡️ Login Attempt: ${req.body.username}`);
    const { username, password } = req.body;
    const users = readUsers();

    if (verifyPassword(password, users[username])) {
        res.status(200).json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// Start the server with a built-in error catcher
const server = app.listen(PORT, () => {
    console.log(`\n=========================================`);
    console.log(`✅ SERVER IS ALIVE AND RUNNING ON PORT ${PORT}`);
    console.log(`⏳ Waiting for webpage to connect...`);
    console.log(`=========================================\n`);
});

// If anything tries to crash the server, this will catch it and print it!
server.on('error', (err) => {
    console.error('\n❌ FATAL ERROR CAUGHT:');
    console.error(err);
});
