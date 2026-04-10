const TelegramBot = require("node-telegram-bot-api");

const token = "ISI_TOKEN_KAMU";
const ADMIN_ID = 123456789;

// link konten
const LINK_KONTEN = "https://linkkamu.com";

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
      "💰 Harga Rp5.000\n\nSilakan transfer lalu kirim bukti (screenshot) ke bot ini 📸"
    );
  }

  if (q.data.startsWith("approve_")) {
    const userId = q.data.split("_")[1];

    bot.sendMessage(
      userId,
      "🔓 Pembayaran diterima!\n\nAkses di sini:\n" + LINK_KONTEN
    );

    bot.sendMessage(ADMIN_ID, "✅ User sudah di-approve");
  }
});

// TERIMA FOTO (BUKTI BAYAR)
bot.on("photo", (msg) => {
  const userId = msg.chat.id;

  // kirim ke admin
  bot.sendPhoto(ADMIN_ID, msg.photo[msg.photo.length - 1].file_id, {
    caption: "Bukti bayar dari user: " + userId,
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

  bot.sendMessage(userId, "📩 Bukti diterima, tunggu konfirmasi admin");
});

console.log("Bot jualan PRO jalan 🚀");
