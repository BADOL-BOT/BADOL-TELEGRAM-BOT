const moment = require('moment-timezone');

function getBanglaDateTimeInfo() {
    const now = new Date().toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
    const dateObj = new Date(now);

    const dayNames = ["রবিবার","সোমবার","মঙ্গলবার","বুধবার","বৃহস্পতিবার","শুক্রবার","শনিবার"];
    const monthNames = ["জানুয়ারি","ফেব্রুয়ারি","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"];

    let hour = dateObj.getHours();
    let minute = dateObj.getMinutes().toString().padStart(2,"0");
    let ampm = hour >= 12 ? "PM" : "AM";

    let period = "";
    if(hour >= 5 && hour < 12) period = "সকাল";
    else if(hour >= 12 && hour < 16) period = "দুপুর";
    else if(hour >= 16 && hour < 19) period = "বিকেল";
    else period = "রাত";

    let displayHour = hour % 12 || 12;
    let timeText = `${period} ${displayHour}:${minute} ${ampm}`;
    let dayName = dayNames[dateObj.getDay()];
    let day = dateObj.getDate();
    let month = monthNames[dateObj.getMonth()];
    let year = dateObj.getFullYear();
    
    return `আজকে ${dayName}, ${timeText}, ${day}ই ${month} ${year}`;
}

module.exports = {
    config: {
        name: "start",
        version: "2.0.1",
        author: "MOHAMMAD-BADOL",
        countDown: 5,
        role: 0,
        description: "MCS বটের মেইন মেনু",
        category: "System",
        guide: "{pn}",
        prefix: true
    },

    run: async (bot, msg, args) => {
        const { chat, from } = msg;

        try {
            if (!from) return;

            // ইউজারকে ওয়েলকাম মেসেজ
            const botInfo = await bot.getMe();
            const botUsername = botInfo.username;
            const welcomeTime = getBanglaDateTimeInfo();
            
            const welcomeMessage = `স্বাগতম, <b>${from.first_name}</b>! 👋\n\nআমি MCS BOT। আমাকে আপনার গ্রুপে যোগ করে সব সুবিধা উপভোগ করুন।\n\n🕰️ <b>সময়:</b> ${welcomeTime}\n\n🤖 বট এর কমান্ড দেখতে টাইপ করুন /help`;

            const buttons = {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: "🔴 Add to Group", url: `https://t.me/${botUsername}?startgroup=true` },
                            { text: "🔵 Add to Channel", url: `https://t.me/${botUsername}?startchannel=true` }
                        ],
                        [{ text: "📩 MCS-SUPPORT-GROUP✅", url: "https://t.me/mcssupport" }],
                        [{ text: "📩 MB_EDITOR_ZONE✅", url: "https://t.me/mreditorzone" }],
                        [{ text: "📩 BADOL-BOT-GC✅", url: "https://t.me/BADOLBOTGC" }]
                    ]
                }
            };

            // সরাসরি ইউজারকে রিপ্লাই পাঠানো হচ্ছে (ফটো চেক ছাড়াই টেক্সট মেসেজ)
            await bot.sendMessage(chat.id, welcomeMessage, buttons);

        } catch (err) {
            console.error("Error in start command:", err.message);
        }
    }
};
