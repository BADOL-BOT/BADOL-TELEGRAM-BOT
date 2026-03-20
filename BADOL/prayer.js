const schedule = require("node-schedule");

const cron = require("node-cron");

const moment = require("moment-timezone");

// ==================== CONFIG ====================

const TIMEZONE = "Asia/Dhaka";

const RAMADAN_MODE = true;

const HIJRI_ADJUSTMENT = -1;

const APPROVED_CHAT_IDS = [

    -1002036630134,

    -1003128747983,

    -1002843537512,

    -1002990379233

];

const PRAYER_TIMES = {

    Tahajjud: "03:30",

    Fajr:     "05:58",

    Sunrise:  "06:40",

    Dhuhr:    "12:59",

    Asr:      "16:45",

    Maghrib:  "17:59",

    Sunset:   "17:55",

    Isha:     "19:45",

    JummahAzan: "12:30",

    JummahPrayer: "13:30"

};

const RAMADAN_TIMES = { 

    SehriEnd: "05:05",

    Iftar:    "17:58"

};

// ==================== HIJRI FIX ====================

const engToBn = num => num.toString().replace(/\d/g, d => "০১২৩৪৫৬৭৮৯"[d]);

const HIJRI_MONTHS_BN = [

    "মুহররম", "সফর", "রবিউল আউয়াল", "রবিউস সানি",

    "জুমাদিউল আউয়াল", "জুমাদিউস সানি",

    "রজব", "শাবান", "রমজান", "শাওয়াল",

    "জিলক্বদ", "জিলহজ"

];

function calculateHijri(date) {

    const jd = Math.floor(date.getTime() / 86400000) - Math.floor(date.getTimezoneOffset() / 1440) + 2440588 + HIJRI_ADJUSTMENT;

    let l = jd - 1948440 + 10632;

    let n = Math.floor((l - 1) / 10631);

    l = l - 10631 * n + 354;

    let j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));

    l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;

    let m = Math.floor((24 * l) / 709);

    let d = l - Math.floor((709 * m) / 24);

    let y = 30 * n + j - 30;

    return { day: d, month: m - 1, year: y };

}

function getHijriDate() {

    const dhakaNow = new Date(new Date().toLocaleString("en-US", { timeZone: TIMEZONE }));

    const h = calculateHijri(dhakaNow);

    return `${engToBn(h.day)} ${HIJRI_MONTHS_BN[h.month]} ${engToBn(h.year)} হিজরি`;

}

// ==================== TIME HELPERS ====================

function getBDTimeFormatted() {

    const now = moment().tz(TIMEZONE);

    const hour = now.hour();

    let period = "রাত";

    if (hour >= 4 && hour < 6) period = "ভোর";

    else if (hour >= 6 && hour < 12) period = "সকাল";

    else if (hour >= 12 && hour < 16) period = "দুপুর";

    else if (hour >= 16 && hour < 18) period = "বিকাল";

    else if (hour >= 18 && hour < 20) period = "সন্ধ্যা";

    return {

        time: `${now.format("hh:mm")} ${period}`,

        date: now.locale("bn").format("DD MMMM YYYY"),

        day: now.locale("bn").format("dddd"),

        hijri: getHijriDate()

    };

}

function formatTo12Hour(timeStr) {

    const [h] = timeStr.split(":").map(Number);

    let period = "রাত";

    if (h >= 4 && h < 6) period = "ভোর";

    else if (h >= 6 && h < 12) period = "সকাল";

    else if (h >= 12 && h < 16) period = "দুপুর";

    else if (h >= 16 && h < 18) period = "বিকাল";

    else if (h >= 18 && h < 20) period = "সন্ধ্যা";

    return moment(timeStr, "HH:mm").format("hh:mm") + " " + period;

}

// ==================== STYLISH BOX ====================

function stylishBox(title, body) {

    return `

🕌 *বিসমিল্লাহির রাহমানির রাহিম* 🕌

┏━━━━━━━༻❁༺━━━━━━━┓

      ✨ *${title.toUpperCase()}* ✨

┗━━━━━━━༻❁༺━━━━━━━┛

${body}

◈━━━━━━━━━━━━━━━━━━◈

🌙 *ইসলামিক দাওয়াত ও নামাজ রিমাইন্ডার*

🛠️ *Developer: MOHAMMAD-BADOL 🤍*

◈━━━━━━━━━━━━━━━━━━◈

`;

}

// ==================== DUAS & HADITHS ====================

const PRAYER_DETAILS = {

    Fajr: { 

        dua: "اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا", 

        hadith: "যে ব্যক্তি ফজরের নামাজ জামাতে আদায় করল, সে যেন সারা রাত নফল নামাজ আদায় করল। (মুসলিম)" 

    },

    Dhuhr: { 

        dua: "اللَّهُمَّ اغْفِرْ لِي ذُنُوبِي وَافْتَحْ لِي أَبْوَابَ رَحْمَتِكَ", 

        hadith: "যোহরের আগে ৪ রাকাত সুন্নাত নামাজ ত্যাগ করো না, কারণ এই সময় আসমানের দরজাগুলো খোলা হয়।" 

    },

    Asr: { 

        dua: "اللَّهُمَّ اشْرَحْ لِي صَدْرِي وَيَسِّরْ لِي أَمْرِي", 

        hadith: "যে ব্যক্তি আসরের নামাজ ছেড়ে দিল, তার আমল বিনষ্ট হয়ে গেল। (বুখারি)" 

    },

    Maghrib: { 

        dua: "اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ (৭ বার)", 

        hadith: "মাগরিবের নামাজের পর অন্য কোনো কথা বলার আগে এই দোয়াটি ৭ বার পড়লে ওই রাতে মারা গেলে জাহান্নাম থেকে মুক্তি মিলবে।" 

    },

    Isha: { 

        dua: "اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا", 

        hadith: "যে ব্যক্তি এশা ও ফজর জামাতে আদায় করল, সে যেন সারা রাত দাঁড়িয়ে নামাজ পড়ল। (মুসলিম)" 

    },

    Tahajjud: { 

        dua: "রাব্বানা আতিনা ফিদ্দুনিয়া হাসানাতাও ওয়া ফিল আখিরাতি হাসানাতাও ওয়া কিনা আজাবান্নার", 

        hadith: "ফরজ নামাজের পর সবচেয়ে উত্তম নামাজ হলো তাহাজ্জুদের নামাজ। শেষ রাতে আল্লাহ প্রথম আসমানে নেমে আসেন এবং বান্দার ডাক শোনেন।" 

    },

    Sunrise: { 

        dua: "এখন নামাজ পড়া নিষিদ্ধ।", 

        hadith: "সূর্যোদয়, সূর্যাস্ত এবং ঠিক দুপুরে নামাজ পড়া নিষিদ্ধ। সূর্য পূর্ণাঙ্গভাবে ওঠার ২০ মিনিট পর ইশরাক নামাজ পড়া যাবে।" 

    }

};

const PRAYER_RAKATS = {

    Fajr: "২ রাকাত সুন্নাত ও ২ রাকাত ফরজ",

    Dhuhr: "৪ সুন্নাত, ৪ ফরজ, ২ সুন্নাত ও ২ নফল",

    Asr: "৪ সুন্নাত ও ৪ ফরজ",

    Maghrib: "৩ ফরজ ও ২ সুন্নাত",

    Isha: "৪ সুন্নাত, ৪ ফরজ, ২ সুন্নাত, ৩ বিতর ও ২ নফল",

    Tahajjud: "নফল",

    Jummah: "৪ সুন্নাত, ২ ফরজ, ৪ সুন্নাত ও ২ নফল"

};

// ==================== SEND ====================

async function sendToGroups(bot, text) {

    for (const id of APPROVED_CHAT_IDS) {

        try {

            await bot.sendMessage(id, text, { parse_mode: "Markdown" });

        } catch (e) {

            console.error("Error sending message to " + id + ": " + e.message);

        }

    }

}

// ==================== SCHEDULER ====================

function schedulePrayerReminders(bot) {

    for (let jobName in schedule.scheduledJobs) {

        if (jobName.startsWith("prayer_")) schedule.cancelJob(jobName);

    }

    Object.entries(PRAYER_TIMES).forEach(([prayer, timeStr]) => {

        const [h, m] = timeStr.split(":").map(Number);

        const rule = { hour: h, minute: m, tz: TIMEZONE };

        if (prayer.startsWith("Jummah")) rule.dayOfWeek = 5;

        schedule.scheduleJob(`prayer_${prayer}`, rule, () => {

            const { date, day, hijri } = getBDTimeFormatted();

            if (prayer === "Sunrise") {

                const body = `🌅 সূর্যোদয়ের সময় হয়েছে!\n⏰ সময়: ${formatTo12Hour(timeStr)}\n📅 ${day}, ${date}\n\n⚠️ সতর্কবার্তা: এখন সূর্য উঠছে, তাই সকল প্রকার নামাজ পড়া নিষিদ্ধ। সূর্য পূর্ণাঙ্গভাবে উঠলে ইশরাক নামাজ পড়তে পারবেন।`;

                return sendToGroups(bot, stylishBox("সূর্যোদয় (Sunrise)", body));

            }

            if (prayer === "JummahAzan") {

                return sendToGroups(bot, stylishBox("জুম্মা আজান", `🕌 আজ পবিত্র জুম্মাবার\n⏰ আজান: ${formatTo12Hour(timeStr)}\n📅 ${day}, ${date}\n🌙 হিজরি: ${hijri}`));

            }

            if (prayer === "JummahPrayer") {

                return sendToGroups(bot, stylishBox("জুম্মা নামাজ", `🕒 জামাত: ${formatTo12Hour(timeStr)}\n📖 রাকাত: ${PRAYER_RAKATS.Jummah}`));

            }

            const details = PRAYER_DETAILS[prayer] || {};

            let infoText = `📍 নামাজ: ${prayer}\n⏰ সময়: ${formatTo12Hour(timeStr)}\n📅 ${day}, ${date}\n🌙 হিজরি: ${hijri}\n\n`;

            

            if (prayer === "Fajr") infoText += `🌅 সূর্যোদয়: ${formatTo12Hour(PRAYER_TIMES.Sunrise)}\n`;

            if (prayer === "Maghrib") infoText += `🌇 সূর্যাস্ত: ${formatTo12Hour(PRAYER_TIMES.Sunset)}\n`;

            

            infoText += `📖 রাকাত: ${PRAYER_RAKATS[prayer] || ""}\n\n🤲 দোয়া: ${details.dua || ""}\n📜 হাদিস: ${details.hadith || ""}`;

            

            sendToGroups(bot, stylishBox(`${prayer} রিমাইন্ডার`, infoText));

        });

    });

}

function scheduleRamadanReminders(bot) {

    if (!RAMADAN_MODE) return;

    if (schedule.scheduledJobs["sehri_alert"]) schedule.cancelJob("sehri_alert");

    if (schedule.scheduledJobs["iftar_alert"]) schedule.cancelJob("iftar_alert");

    const [sH, sM] = RAMADAN_TIMES.SehriEnd.split(":").map(Number);

    let alertM = sM - 10;

    let alertH = sH;

    if (alertM < 0) { alertM += 60; alertH -= 1; }

    schedule.scheduleJob("sehri_alert", { hour: alertH, minute: alertM, tz: TIMEZONE }, () => {

        const { hijri } = getBDTimeFormatted();

        sendToGroups(bot, stylishBox("সেহরি রিমাইন্ডার", `🌙 সেহরির শেষ সময়: ${formatTo12Hour(RAMADAN_TIMES.SehriEnd)}\n🌙 হিজরি: ${hijri}\n\nদ্রুত সেহরি শেষ করে নিন।`));

    });

    const [iH, iM] = RAMADAN_TIMES.Iftar.split(":").map(Number);

    schedule.scheduleJob("iftar_alert", { hour: iH, minute: iM, tz: TIMEZONE }, () => {

        const { hijri } = getBDTimeFormatted();

        sendToGroups(bot, stylishBox("ইফতার রিমাইন্ডার", `🌇 ইফতার ও সূর্যাস্তের সময় হয়েছে!\n⏰ সময়: ${formatTo12Hour(RAMADAN_TIMES.Iftar)}\n🌙 হিজরি: ${hijri}\n\n🤲 দোয়া: আল্লাহুম্মা লাকা সুমতু ওয়া আলা রিজকিকা আফতারতু।`));

    });

}

function dailyRefresh(bot) {

    cron.schedule("1 0 * * *", () => {

        schedulePrayerReminders(bot);

        scheduleRamadanReminders(bot);

    }, { timezone: TIMEZONE });

    schedulePrayerReminders(bot);

    scheduleRamadanReminders(bot);

}

// আপনার কাঙ্ক্ষিত এক্সপোর্ট ফরম্যাট

module.exports = {

    schedulePrayerReminders,

    scheduleRamadanReminders,

    dailyRefresh

};
