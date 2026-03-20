const fs = require('fs-extra');

const path = require('path');

// আপনার রিকোয়েস্ট অনুযায়ী সঠিক পাথ

const DB_PATH = path.join(__dirname, '..', 'MCS-BOT', 'Cmd', 'BADOL', 'users_db.json');

// ফোল্ডার না থাকলে তৈরি করবে

fs.ensureDirSync(path.dirname(DB_PATH));

const db = {

    load: () => {

        try {

            return fs.existsSync(DB_PATH) ? fs.readJsonSync(DB_PATH) : { users: [] };

        } catch (e) { 

            return { users: [] }; 

        }

    },

    save: (data) => {

        try {

            fs.writeJsonSync(DB_PATH, data, { spaces: 4 });

        } catch (e) {

            console.error("DB Save Error:", e.message);

        }

    },

    

    getUser: (userId) => {

        const data = db.load();

        return data.users.find(u => u.user_id === userId);

    },

    

    addUser: (userData) => {

        const data = db.load();

        if (!data.users.find(u => u.user_id === userData.user_id)) {

            data.users.push(userData);

            db.save(data);

        }

    },

    

    updateUser: (userId, updateData) => {

        const data = db.load();

        const index = data.users.findIndex(u => u.user_id === userId);

        if (index !== -1) {

            data.users[index] = { ...data.users[index], ...updateData };

            db.save(data);

        }

    }

};

// এটি খুব গুরুত্বপূর্ণ, এটি ছাড়া এরর আসবে

module.exports = db;