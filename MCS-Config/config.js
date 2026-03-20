/**
 * 🛠️ MCS-BOT CONFIGURATION FILE
 * 👤 AUTHOR: MOHAMMAD BADOL
 * 📅 YEAR: 2026
 */

module.exports = {
  // আপনার বটের টোকেন এখানে দিন
  BOT_TOKEN: "8399717399:AAGUhd_H4UMkMqSspk2xhOrrf_G81T6QOYU",

  BOT_SETTINGS: {
    NAME: "𝄞⋆⃝🧚‍𝐌𝐂𝐒-𝐁𝐎𝐓🧚‍⋆⃝𝄞",
    VERSION: "2.5.0-VIP",
    PREFIX: "/", // বটের মেইন প্রিফিক্স
    ADMINS: ["6954597258"], // এডমিনদের আইডি তালিকা
    CREDIT: "MOHAMMAD BADOL",
    FOOTER: "© 𝟐𝟎𝟐𝟔 𝐌𝐂𝐒 𝐁𝐎𝐓 𝐏𝐑𝐎𝐉𝐄𝐂𝐓"
  },

  OWNER: {
    ID: 6954597258,
    NAME: "MOHAMMAD BADOL",
    USERNAME: "B4D9L_007"
  },

  // সোশ্যাল মিডিয়া লিংক
  SOCIAL: {
    FACEBOOK: "https://www.facebook.com/B4D9L",
    WHATSAPP: "https://wa.me/+8801782721761",
    TELEGRAM: "https://t.me/mreditorzone"
  },

  // বটের মেসেজ ডিজাইন এলিমেন্ট
  DESIGN: {
    LINE: "━━━━━━━━━━━━━━━━━━━━━━━━",
    TICK: "✅",
    ERROR: "❌",
    INFO: "💡",
    STAR: "⭐",
    LOCK: "🔐",
    JOIN: "📢"
  },

  /**
   * 🛡️ FORCE JOIN SETTINGS
   * এখানে ৩টি গ্রুপের নাম এবং আইডি দিন। 
   * ইউজার এই ৩টিতে জয়েন না থাকলে কমান্ড কাজ করবে না।
   * (আইডি অবশ্যই @username বা -100 ফরম্যাটে হতে হবে)
   */
  REQUIRED_CHATS: [
    { 
      name: "My Project Group", 
      id: "@mreditorzone" 
    },
    { 
      name: "MCS Support Group", 
      id: "@mcssupport" // এখানে আপনার ২য় গ্রুপের ইউজারনেম দিন
    },
    { 
      name: "Update News", 
      id: "@BADOLBOTGC" // এখানে আপনার ৩য় গ্রুপের ইউজারনেম দিন
    }
  ],

  // অন্যান্য সেটিংস
  MAINTENANCE_MODE: false, // এটি true করলে বট শুধু ওনার চালাতে পারবে
};
