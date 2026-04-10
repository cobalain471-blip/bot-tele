const TelegramBot = require("node-telegram-bot-api");

const token = "8296936814:AAHl8Fmr9qCjCwDL--to-Aab1wSSZdncDCA";

const bot = new TelegramBot(token, { polling: true });

// START
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🔥 Selamat datang!\n\nKlik tombol di bawah 👇",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "👀 Lihat Konten", callback_data: "lihat" }]
        ]
      }
    }
  );
});

// BUTTON
bot.on("callback_query", (q) => {
  const id = q.message.chat.id;

  if (q.data === "lihat") {
    bot.sendMessage(
      id,
      "💰 Untuk membuka konten bayar Rp5.000\n\nKlik jika sudah bayar",
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: "✅ Saya sudah bayar", callback_data: "bayar" }]
          ]
        }
      }
    );
  }

  if (q.data === "bayar") {
    bot.sendMessage(
      id,
      "🔓 Ini link konten kamu:\nhttps://linkkamu.com"
    );
  }
});

console.log("Bot aktif 🚀");