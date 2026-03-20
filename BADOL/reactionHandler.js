/**
 * 🤖 MCS-BOT REACTION HANDLER (👍 AUTO-DELETE SYSTEM)
 * 👤 AUTHOR: MOHAMMAD BADOL
 * 📅 YEAR: 2026
 */

const logger = require('./logger');

/**
 * 👍 রিঅ্যাকশন দিলে বটের মেসেজ অটো-ডিলিট করার সিস্টেম
 * @param {TelegramBot} botInstance 
 * @param {Object} update 
 */
async function reactionHandler(botInstance, update) {
    try {
        const { chat, message_id, new_reaction } = update;
        
        // যদি কোনো নতুন রিঅ্যাকশন আসে
        if (new_reaction && new_reaction.length > 0) {
            
            // চেক করা হচ্ছে ইমোজিটি '👍' কি না
            const emoji = new_reaction[0].emoji;

            if (emoji === '👍') {
                // মেসেজটি ডিলিট করার চেষ্টা করবে
                await botInstance.deleteMessage(chat.id, message_id)
                    .catch((err) => {
                        // যদি বট মেসেজ ডিলিট করার পারমিশন না পায় বা মেসেজটি অলরেডি ডিলিট হয়ে থাকে
                        // logger.logError("Delete Permission Missing", err);
                    });
            }
        }

    } catch (error) {
        if (logger && logger.logError) {
            logger.logError("ReactionHandler - 👍 Delete", error);
        } else {
            console.error("ReactionHandler Error:", error);
        }
    }
}

module.exports = reactionHandler;

