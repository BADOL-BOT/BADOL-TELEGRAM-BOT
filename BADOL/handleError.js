/**
 * 🛠️ ERROR & PROCESS HANDLER
 * 👤 AUTHOR: MOHAMMAD BADOL (2026)
 */

module.exports = {
    // ভুল কমান্ড দিলে ইউজারকে নোটিশ দেওয়ার ফাংশন
    handleInvalidCommand: async (bot, msg, cmdName) => {
        const prefix = global.CONFIG.BOT_SETTINGS.PREFIX || '/';
        const errorMessage = `⚠️ "${cmdName}" নামে কোনো কমান্ড পাওয়া যায়নি!\n\n💡 সঠিক কমান্ড লিস্ট দেখতে ${prefix}help লিখুন।`;
        
        try {
            return await bot.sendMessage(msg.chat.id, errorMessage, {
                reply_to_message_id: msg.message_id
            });
        } catch (e) {
            console.error("[ ERROR ] Failed to send invalid command notice:", e.message);
        }
    }
};
