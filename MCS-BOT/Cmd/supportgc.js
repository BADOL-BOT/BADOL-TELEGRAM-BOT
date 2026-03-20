/**
 * 🤖 MCS-BOT SUPPORT COMMAND
 * 👤 AUTHOR: MOHAMMAD BADOL
 * 📅 YEAR: 2026
 */

module.exports = {
    config: {
        name: "supportgc",
        aliases: ["links", "link", "community"],
        version: "1.2.1",
        credit: "MOHAMMAD BADOL", // আপনার সিস্টেম অনুযায়ী Credit Name
        role: 0,                   // সবার জন্য উন্মুক্ত
        prefix: true,              
        cooldown: 5,               // ৫ সেকেন্ড কুলডাউন
        description: "বটের সকল অফিসিয়াল গ্রুপ এবং চ্যানেলের তালিকা।"
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;
        const firstName = msg.from.first_name || "User";

        const supportText = 
            `🌟 **স্বাগতম, ${firstName}!** 🌟\n` +
            `━━━━━━━━━━━━━━━━━━━━━━\n` +
            `🚀 **সেরা টেক আপডেট এবং প্রিমিয়াম সাপোর্ট পেতে আমাদের সাথে যুক্ত হন!**\n\n` +
            `নিচের লিংকগুলো আপনি কপি করে বন্ধুদের সাথে শেয়ার করতে পারেন। প্রতিটি লিংকের ওপর ক্লিক করলেই কপি হয়ে যাবে! 🔥\n\n` +
            `📢 **অফিসিয়াল চ্যানেল ও গ্রুপসমূহ:**\n` +
            `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `🔹 **MR EDITOR ZONE** 🎬\n` +
            `🔗 \`https://t.me/mreditorzone\`\n\n` +
            `🔹 **MCS SUPPORT** 🛠️\n` +
            `🔗 \`https://t.me/mcssupport\`\n\n` +
            `🔹 **BADOL BOT GC** 🤖\n` +
            `🔗 \`https://t.me/BADOLBOTGC\`\n\n` +
            `🔹 **SB MODS APK** 📲\n` +
            `🔗 \`https://t.me/SB_MODS_APK\`\n\n` +
            `👤 **OWNER USERNAME:**\n` +
            `🔗 \`@B4D9L_007\`\n\n` +
            `✨ **${firstName}**, দেরি না করে এখনই নিচের বাটনগুলোতে ক্লিক করে আমাদের পরিবারের সদস্য হয়ে যান! 🦋\n` +
            `━━━━━━━━━━━━━━━━━━━━━━\n` +
            `*Shared with Love & Support.*\n` +
            `👤 **Developer:** \`MOHAMMAD BADOL\``;

        const replyMarkup = {
            inline_keyboard: [
                [
                    { text: "🎬 Mr Editor Zone", url: "https://t.me/mreditorzone" },
                    { text: "🛠️ MCS Support", url: "https://t.me/mcssupport" }
                ],
                [
                    { text: "🤖 Badol Bot GC", url: "https://t.me/BADOLBOTGC" },
                    { text: "📲 Main Channel", url: "https://t.me/SB_MODS_APK" }
                ],
                [
                    { text: "👨‍💻 Contact Owner", url: "https://t.me/B4D9L_007" }, // এখানে ইউজারনেম লিংক আপডেট করা হয়েছে
                    { text: "📤 Share All Links", url: "https://t.me/share/url?url=Check%20out%20our%20Official%20Communities!%0A%0A🎬%20Editor%20Zone:%20https://t.me/mreditorzone%0A🛠️%20Support:%20https://t.me/mcssupport%0A🤖%20Bot%20GC:%20https://t.me/BADOLBOTGC%0A📲%20Main:%20https://t.me/SB_MODS_APK" }
                ]
            ]
        };

        try {
            await bot.sendMessage(chatId, supportText, {
                parse_mode: "Markdown",
                disable_web_page_preview: true, 
                reply_markup: replyMarkup
            });
        } catch (error) {
            console.error("Support Command Error:", error);
        }
    }
};


