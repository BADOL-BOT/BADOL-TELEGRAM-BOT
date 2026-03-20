const db = require('./db'); // একই ফোল্ডারে থাকায় ./db ব্যবহার করা হয়েছে

module.exports = async (bot, msg) => {
    try {
        // মেসেজ ভ্যালিডেশন
        if (!msg || !msg.from || !msg.text || msg.chat.type === "private" || msg.from.is_bot) return;

        const userId = msg.from.id;
        const newName = msg.from.first_name || "No Name";
        const newUsername = msg.from.username || "No Username";

        const oldData = db.getUser(userId);

        if (oldData) {
            let changes = [];
            
            // নাম চেক
            if (oldData.first_name !== newName) {
                changes.push(`📝 **Name:** \`${oldData.first_name}\` ➔ \`${newName}\``);
            }
            
            // ইউজারনেম চেক
            if (oldData.username !== newUsername) {
                const oldU = oldData.username === "No Username" ? "None" : `@${oldData.username}`;
                const newU = newUsername === "No Username" ? "None" : `@${newUsername}`;
                changes.push(`🔗 **User:** ${oldU} ➔ ${newU}`);
            }

            if (changes.length > 0) {
                const text = `⚠️ **[ USER UPDATE DETECTED ]**\n\n🆔 **ID:** \`${userId}\`\n${changes.join("\n")}\n\n👤 **Credit:** Mohammad Badol`;
                
                const options = {
                    parse_mode: "Markdown",
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: "👤 View Profile", url: `tg://user?id=${userId}` }]
                        ]
                    }
                };

                await bot.sendMessage(msg.chat.id, text, options);
                
                // তথ্য আপডেট
                db.updateUser(userId, { first_name: newName, username: newUsername });
            }
        } else {
            // নতুন ইউজার হলে সেভ করুন
            db.addUser({ 
                user_id: userId, 
                first_name: newName, 
                username: newUsername 
            });
        }
    } catch (err) {
        console.error("Tracker Logic Error:", err.message);
    }
};
