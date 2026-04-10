const TelegramBot = require("node-telegram-bot-api");

const token = "8296936814:AAHl8Fmr9qCjCwDL--to-Aab1wSSZdncDCA";
const ADMIN_ID = 6677303168;

const LINK_KONTEN = "https://tempatbokep.com/";
const QRIS = "https://ibb.co.com/WvVKrZJ4";

const bot = new TelegramBot(token, { polling: true });

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

  // 🎬 STEP 1: 3 VIDEO
  if (q.data === "lihat") {
    await bot.sendVideo(id, "https://t.me/c/3916601448/2", {
      caption: "🔥 Video 1"
    });

    await bot.sendVideo(id, "https://t.me/c/3916601448/3", {
      caption: "😈 Video 2"
    });

    await bot.sendVideo(id, "https://t.me/c/3916601448/4", {
      caption: "⚠️ Video terakhir 😳 (full lebih gila)"
    });

    bot.sendMessage(id, "Mau lanjut full videonya?", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "▶️ Lanjutkan", callback_data: "lanjut" }]
        ]
      }
    });
  }

  // 💳 STEP 2: QRIS
  else if (q.data === "lanjut") {
    bot.sendPhoto(id, QRIS, {
      caption:
        "🔥 Buka semua video full 😈\n\n💰 Bayar Rp5.000\n\n📸 Kirim bukti pembayaran"
    });
  }

  // ✅ APPROVE
  else if (q.data.startsWith("approve_")) {
    const userId = q.data.split("_")[1];

    bot.sendMessage(
      userId,
      "🔓 Pembayaran diterima!\n\nAkses semua video:\n" + LINK_KONTEN
    );

    bot.sendMessage(ADMIN_ID, "✅ User berhasil di-approve");
  }
});

// 📸 TERIMA BUKTI
bot.on("photo", (msg) => {
  const userId = msg.chat.id;

  bot.sendPhoto(ADMIN_ID, msg.photo[msg.photo.length - 1].file_id, {
    caption: "Bukti dari user: " + userId,
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

  bot.sendMessage(userId, "⏳ Menunggu konfirmasi admin...");
});

console.log("Bot cuan siap 🚀");
