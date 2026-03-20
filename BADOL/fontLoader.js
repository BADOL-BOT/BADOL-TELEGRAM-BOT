/**

 * 🎨 MCS-BOT FONT LOADER SYSTEM

 * 👤 AUTHOR: MOHAMMAD BADOL

 * 📅 YEAR: 2026

 */

const { registerFont } = require('canvas');

const path = require('path');

const fs = require('fs');

/**

 * 🛠️ CONFIGURATION

 * এখানে আপনি যত খুশি ফন্ট অ্যাড করতে পারবেন। 

 * 'file' হলো আপনার fonts ফোল্ডারে থাকা ফাইলের নাম।

 * 'family' হলো কোডে আপনি যে নামে ডাকবেন।

 */

const fontsToRegister = [

    { file: 'Badol_font.ttf', family: 'BanglaFont' },

    { file: 'Kalpurush.ttf', family: 'Kalpurush' } // যদি থাকে

];

/**

 * 🚀 INITIALIZE FONTS

 */

function initFonts() {

    // প্রজেক্টের মেইন ডিরেক্টরিতে 'fonts' ফোল্ডারের পাথ

    const fontsFolder = path.join(__dirname, '..', 'fonts');

    console.log("-----------------------------------------");

    console.log("🎨 Font System: Initializing...");

    // ১. ফোল্ডার চেক করা

    if (!fs.existsSync(fontsFolder)) {

        try {

            fs.mkdirSync(fontsFolder);

            console.log("📁 Created 'fonts' folder. Please put your .ttf files there.");

        } catch (err) {

            console.error("❌ Could not create fonts folder:", err.message);

            return;

        }

    }

    // ২. ফন্টগুলো রেজিস্টার করা

    let loadedCount = 0;

    fontsToRegister.forEach(font => {

        const fullPath = path.join(fontsFolder, font.file);

        if (fs.existsSync(fullPath)) {

            try {

                registerFont(fullPath, { family: font.family });

                console.log(`✅ Loaded: ${font.family} (${font.file})`);

                loadedCount++;

            } catch (err) {

                console.error(`❌ Error loading ${font.file}:`, err.message);

            }

        } else {

            console.log(`⚠️ Missing: ${font.file} (Not found in /fonts/)`);

        }

    });

    if (loadedCount > 0) {

        console.log(`✨ Font System: ${loadedCount} font(s) ready to use!`);

    } else {

        console.log("ℹ️ Font System: No fonts were loaded.");

    }

    console.log("-----------------------------------------");

}

module.exports = { initFonts };