/**
 * 🛡️ TOTAL MEMBERSHIP SYSTEM (FORCE 3 GROUP FIX)
 * AUTHOR: MOHAMMAD BADOL (2026)
 */

const { REQUIRED_CHATS } = require("../MCS-Config/config");

async function checkStatus(bot, userId) {
    if (Number(userId) === 6954597258) return { status: true, notJoined: [] };

    const requiredGroups = Array.isArray(REQUIRED_CHATS) ? REQUIRED_CHATS : [];
    const notJoined = [];

    for (const groupObj of requiredGroups) {
        let groupId = String(groupObj.id).trim();
        try {
            const member = await bot.getChatMember(groupId, userId);
            const valid = ['member', 'administrator', 'creator', 'restricted'].includes(member.status);
            if (!valid) notJoined.push(groupObj);
        } catch (error) {
            // যদি বট চেক করতে নাও পারে, তবুও লিস্টে দেখাবে
            console.error(`⚠️ Error checking ${groupId}:`, error.message);
            notJoined.push(groupObj); 
        }
    }
    return { status: notJoined.length === 0, notJoined };
}

function getButtons(notJoinedList) {
    // এখানে আমরা REQUIRED_CHATS থেকে সরাসরি বাটন বানাচ্ছি যাতে কোনোটি মিস না হয়
    const buttons = notJoinedList.map(g => {
        const username = g.id.replace("@", "");
        return [{ text: `🔗 Join ${g.name}`, url: `https://t.me/${username}` }];
    });
    buttons.push([{ text: "🔄 আবার চেক করুন (Verify)", callback_data: "check_join" }]);
    return { inline_keyboard: buttons };
}

async function handleMembership(bot, msg) {
    const userId = msg.from.id;
    if (Number(userId) === 6954597258) return true;

    const check = await checkStatus(bot, userId);
    if (!check.status) {
        await bot.sendMessage(
            msg.chat.id,
            `🔒 **অ্যাক্সেস লক করা হয়েছে!**\n\nআপনি সব গ্রুপে জয়েন করেননি। নিচের **${check.notJoined.length}টি** গ্রুপে জয়েন করে ভেরিফাই করুন 👇`,
            { reply_markup: getButtons(check.notJoined), parse_mode: 'Markdown' }
        ).catch(() => {});
        return false; 
    }
    return true; 
}

function initMembershipCallback(bot) {
    bot.on("callback_query", async (query) => {
        if (query.data === "check_join") {
            const userId = query.from.id;
            const check = await checkStatus(bot, userId);
            if (check.status) {
                await bot.answerCallbackQuery(query.id, { text: "✅ ভেরিফিকেশন সফল!" });
                await bot.editMessageText("✅ ধন্যবাদ! আপনি এখন বট ব্যবহার করতে পারবেন।", {
                    chat_id: query.message.chat.id, message_id: query.message.message_id
                }).catch(() => {});
            } else {
                // এখানে আমরা এডিট করে আবার ৩টি বাটনই পাঠাচ্ছি
                await bot.editMessageText(`❌ আপনি এখনও **${check.notJoined.length}টি** গ্রুপে জয়েন করেননি।`, {
                    chat_id: query.message.chat.id,
                    message_id: query.message.message_id,
                    reply_markup: getButtons(check.notJoined)
                }).catch(() => {});
                await bot.answerCallbackQuery(query.id, { text: "⚠️ জয়েন বাকি আছে!", show_alert: true });
            }
        }
    });
}

module.exports = { handleMembership, initMembershipCallback };
