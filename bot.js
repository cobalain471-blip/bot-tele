const TelegramBot = require("node-telegram-bot-api");

const token = "8296936814:AAHl8Fmr9qCjCwDL--to-Aab1wSSZdncDCA";
const bot = new TelegramBot(token, { polling: true });

const ADMIN_ID = 6677303168;
const QRIS = "https://ibb.co.com/WvVKrZJ4";
const LINK_KONTEN = "https://tempatbokep.com/";

// anti spam
const userState = {};

// START
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 Mau lihat video viral?", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "👀 Lihat Sekarang", callback_data: "lihat" }]
      ]
    }
  });
});

// BUTTON
bot.on("callback_query", async (q) => {
  const id = q.message.chat.id;

  // ❌ kalau lagi proses, stop
  if (userState[id]) return;
  userState[id] = true;

  try {
    if (q.data === "lihat") {
      await bot.sendVideo(id, "https://t.me/videopanas46/2?single");
      await new Promise(r => setTimeout(r, 1000));

      await bot.sendVideo(id, "https://t.me/videopanas46/3");
      await new Promise(r => setTimeout(r, 1000));

      await bot.sendVideo(id, "https://t.me/videopanas46/4");

      await bot.sendMessage(id, "🔥 Mau lanjut full video?", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "▶️ Lanjutkan", callback_data: "lanjut" }]
          ]
        }
      });
    }

    if (q.data === "lanjut") {
      await bot.sendPhoto(id, QRIS, {
        caption:
          "🔥 Buka semua video full 😈\n\n💰 Bayar Rp5.000\n\n📸 Kirim bukti pembayaran"
      });
    }

    if (q.data.startsWith("approve_")) {
      const userId = q.data.split("_")[1];

      await bot.sendMessage(
        userId,
        "🔓 Pembayaran diterima!\n\nAkses:\n" + LINK_KONTEN
      );
    }
  } catch (e) {
    console.log("ERROR:", e.message);
  }

  // reset biar bisa klik lagi
  setTimeout(() => {
    userState[id] = false;
  }, 3000);
});

// TERIMA BUKTI
bot.on("photo", (msg) => {
  const userId = msg.chat.id;

  bot.sendPhoto(ADMIN_ID, msg.photo[msg.photo.length - 1].file_id, {
    caption: "User: " + userId,
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "✅ Approve",
            callback_data: "approve_" + userId
          }
        ]
      ]
    }
  });

  bot.sendMessage(userId, "⏳ Menunggu konfirmasi...");
});

console.log("Bot aman jalan 🚀");
