const TelegramBot = require("node-telegram-bot-api");

const token = "8296936814:AAHl8Fmr9qCjCwDL--to-Aab1wSSZdncDCA";
const ADMIN_ID = 123456789;

const LINK_KONTEN = "https://linkkamu.com";
const QRIS = "LINK_QRIS_KAMU";

const bot = new TelegramBot(token, { polling: true });

// START
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, "🔥 Klik tombol di bawah", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "👀 Lihat Konten", callback_data: "lihat" }]
      ]
    }
  });
});

// CALLBACK
bot.on("callback_query", async (q) => {
  const id = q.message.chat.id;

  if (q.data === "lihat") {
    await bot.sendMessage(id, "🎬 Preview 1");
    await bot.sendMessage(id, "🎬 Preview 2");
    await bot.sendMessage(id, "🎬 Preview 3");

    bot.sendMessage(id, "Lanjut?", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "▶️ Lanjut", callback_data: "lanjut" }]
        ]
      }
    });
  }

  else if (q.data === "lanjut") {
    bot.sendPhoto(id, QRIS, {
      caption: "💳 Bayar dulu ya\n\nKirim bukti setelah bayar"
    });
  }

  else if (q.data.startsWith("approve_")) {
    const userId = q.data.split("_")[1];

    bot.sendMessage(userId, "✅ Pembayaran diterima!\n" + LINK_KONTEN);
    bot.sendMessage(ADMIN_ID, "User approved");
  }
});

// FOTO
bot.on("photo", (msg) => {
  const userId = msg.chat.id;

  bot.sendPhoto(ADMIN_ID, msg.photo[msg.photo.length - 1].file_id, {
    caption: "Bukti dari: " + userId,
    reply_markup: {
      inline_keyboard: [
        [{ text: "Approve", callback_data: "approve_" + userId }]
      ]
    }
  });

  bot.sendMessage(userId, "⏳ Menunggu konfirmasi admin");
});

console.log("Bot jalan 🚀");
