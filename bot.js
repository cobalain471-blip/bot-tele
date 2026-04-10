const TelegramBot = require("node-telegram-bot-api");

const token = "ISI_TOKEN_KAMU";
const ADMIN_ID = 123456789;

const LINK_KONTEN = "https://linkkamu.com";
const QRIS = "LINK_QRIS_KAMU";

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
    await bot.sendVideo(id, "LINK_VIDEO_1", {
      caption: "🔥 Video 1"
    });

    await bot.sendVideo(id, "LINK_VIDEO_2", {
      caption: "😈 Video 2"
    });

    await bot.sendVideo(id, "LINK_VIDEO_3", {
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
