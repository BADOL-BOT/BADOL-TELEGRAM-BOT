/**
 * 🤖 MCS-BOT COMMAND: APK LIST
 * 👤 CREDIT: MOHAMMAD BADOL
 * 📅 YEAR: 2026
 * 🆔 TELEGRAM ID: 6954597258
 */

module.exports = {
    config: {
        name: "apk",
        aliases: ["apps", "app"],
        version: "1.0.0",
        credit: "MOHAMMAD BADOL", // ক্রেডিট সিস্টেম
        role: 0,                   // সবার জন্য উন্মুক্ত
        cooldown: 10,              // স্প্যাম রোধে ১০ সেকেন্ড কুলডাউন
        prefix: true,
        category: "utility",
        description: "প্রিমিয়াম APK লিস্ট এবং ডাউনলোড লিঙ্ক দেখায়।",
        guide: "/apk"
    },

    run: async (bot, msg, args) => {
        const chatId = msg.chat.id;

        try {
            /* ------------------------------
             🔄  PREMIUM LOADING BAR 
            ------------------------------*/
            let progress = [
                "🔄 [▒▒▒▒▒▒▒▒▒▒] 0%",
                "⚡ [██▒▒▒▒▒▒▒▒] 20%",
                "⚡ [████▒▒▒▒▒▒] 40%",
                "⚡ [██████▒▒▒▒] 60%",
                "⚡ [████████▒▒] 80%",
                "✅ [██████████] 100%"
            ];

            let loading = await bot.sendMessage(chatId, progress[0]);

            // লোডিং এনিমেশন প্রসেস
            progress.forEach((bar, i) => {
                setTimeout(() => {
                    bot.editMessageText(bar, {
                        chat_id: chatId,
                        message_id: loading.message_id
                    }).catch(() => {});
                }, 350 * i);
            });

            // লোডিং মেসেজ ডিলিট করা
            setTimeout(() => {
                bot.deleteMessage(chatId, loading.message_id).catch(() => {});
            }, 350 * progress.length + 200);

            /* ------------------------------
             📱 PREMIUM APK BUTTON LIST
            ------------------------------*/
            const apkButtons = {
                inline_keyboard: [
                    [
                        { text: "🛠️ Apk Editor Pro", url: "https://t.me/SB_MODS_APK/115" },
                        { text: "🤖 BADOL_TG_BOT", url: "https://t.me/SB_MODS_APK/116" }
                    ],
                    [
                        { text: "📘 MCS Fb Lite", url: "https://t.me/SB_MODS_APK/117" },
                        { text: "💳 HD Card Maker", url: "https://t.me/SB_MODS_APK/118" }
                    ],
                    [
                        { text: "⌨️ Redmik Keyboard", url: "https://t.me/SB_MODS_APK/119" },
                        { text: "🎵 Audio Player Pro", url: "https://t.me/SB_MODS_APK/120" }
                    ],
                    [
                        { text: "🎬 Inshot Premium", url: "https://t.me/SB_MODS_APK/121" },
                        { text: "📨 Telegram Puls Mod", url: "https://t.me/SB_MODS_APK/122" }
                    ],
                    [
                        { text: "📹 Xrecorder Pro", url: "https://t.me/SB_MODS_APK/123" },
                        { text: "🌐 TouchVPN Mod", url: "https://t.me/SB_MODS_APK/124" }
                    ],
                    [
                        { text: "🖼️ PixelLab MB", url: "https://t.me/SB_MODS_APK/125" },
                        { text: "🖼️ PixelLab MB 2", url: "https://t.me/SB_MODS_APK/126" }
                    ],
                    [
                        { text: "🛠️ Apk Editor MB", url: "https://t.me/SB_MODS_APK/127" },
                        { text: "📘 Old FB Lite",  url: "https://t.me/SB_MODS_APK/31" }
                    ],
                    // --- নতুন বাটন নিচে যোগ করা হয়েছে ---
                    [
                        { text: "🆔 Fb Name Change Capital", url: "https://t.me/SB_MODS_APK/136" },
                        { text: "🆕 Coming Soon 🔙", url: "https://t.me/SB_MODS_APK/" }
                    ]
                ]
            };

            /* ------------------------------
             📦 SEND FINAL PREMIUM MENU
            ------------------------------*/
            setTimeout(() => {
                bot.sendMessage(
                    chatId,
                    `✨ **SB MODS PREMIUM APK LIST**\n\n📂 নিচের লিস্ট থেকে আপনার পছন্দের APK সিলেক্ট করুন:\n\n🛡️ **Credit:** ${module.exports.config.credit}`,
                    {
                        parse_mode: "Markdown",
                        reply_markup: apkButtons,
                        reply_to_message_id: msg.message_id
                    }
                );
            }, 2500);

        } catch (error) {
            console.error("APK CMD ERROR:", error.message);
            bot.sendMessage(chatId, "⚠️ APK লিস্ট লোড করতে সমস্যা হয়েছে।");
        }
    }
};



