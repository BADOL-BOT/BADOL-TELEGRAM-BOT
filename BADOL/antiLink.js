/**
 * 🛡️ ANTI-LINK & ANTI-FORWARD SYSTEM (UPDATED FOR DOWNLOADER)
 * 👤 AUTHOR: MOHAMMAD BADOL
 */

module.exports = async (bot, msg) => {
    try {
        if (!msg.chat || msg.chat.type === "private" || msg.from.is_bot) return;

        const userId = msg.from.id;
        const chatId = msg.chat.id;
        const prefix = global.CONFIG.BOT_SETTINGS.PREFIX || '/';

        if (msg.text && msg.text.startsWith(prefix)) return;

        const linkRegex = /(https?:\/\/|t\.me\/|telegram\.me\/|www\.)/i;
        const isForwarded = !!msg.forward_from || !!msg.forward_from_chat;
        const hasLink = msg.text && linkRegex.test(msg.text);

        if (!hasLink && !isForwarded) return;

        // --- নতুন লজিক শুরু ---
        // যে লিঙ্কগুলো ভিডিও ডাউনলোডার সাপোর্ট করে, সেগুলোকে ডিলিট করবে না
        const downloaderLinks = ["facebook.com", "fb.watch", "instagram.com", "tiktok.com", "reels"];
        const isDownloadable = msg.text && downloaderLinks.some(link => msg.text.includes(link));

        if (isDownloadable) return; // যদি ডাউনলোডার লিঙ্ক হয়, তবে এখানেই থেমে যাও (ডিলিট করো না)
        // --- নতুন লজিক শেষ ---

        const whitelist = [
            6954597258, // Mohammad Badol
            -1002310865564 
        ];

        const isForwardFromWhitelistedChannel =
            msg.forward_from_chat &&
            whitelist.includes(msg.forward_from_chat.id);

        const member = await bot.getChatMember(chatId, userId);
        const isAdmin = ["administrator", "creator"].includes(member.status);

        if (isAdmin || whitelist.includes(userId) || isForwardFromWhitelistedChannel) return;

        await bot.deleteMessage(chatId, msg.message_id);

        const warningMsg = await bot.sendMessage(
            chatId,
            `🚫 <b>${msg.from.first_name}</b>, গ্রুপে শুধু ভিডিও লিঙ্ক ছাড়া অন্য কোনো লিঙ্ক বা ফরোয়ার্ড মেসেজ নিষিদ্ধ!`,
            { parse_mode: "HTML" }
        );

        setTimeout(() => {
            bot.deleteMessage(chatId, warningMsg.message_id).catch(() => {});
        }, 5000);

    } catch (err) {
        console.error("AntiLink Error:", err.message);
    }
};

