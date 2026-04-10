const TelegramBot = require("node-telegram-bot-api");

const token = "8296936814:AAHl8Fmr9qCjCwDL--to-Aab1wSSZdncDCA";
const ADMIN_ID = 6677303168;

const LINK_KONTEN = "https://linkkamu.com";
const QRIS = "https://ibb.co.com/WvVKrZJ4";

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
bot.on("callback_query", async (q) => {
  const id = q.message.chat.id;

  // STEP 1: 3 VIDEO
  if (q.data === "lihat") {
    await bot.sendVideo(id, "LINK_VIDEO_1", {
      caption: "🔥 Video 1 (preview)"
    });

    await bot.sendVideo(id, "LINK_VIDEO_2", {
      caption: "😈 Video 2 (makin panas)"
    });

    await bot.sendVideo(id, "LINK_VIDEO_3", {
      caption: "⚠️ Video terakhir 😳"
    });

    bot.sendMessage(id, "👇 Mau lanjut full video?", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "▶️ Lanjutkan Video", callback_data: "lanjut" }]
        ]
      }
    });
  }

  // STEP 2: QRIS
  if (q.data === "lanjut") {
    bot.sendPhoto(id, QRIS, {
      caption:
        "🔥 Buka semua video full 😈\n\n💰 Bayar Rp5.000\n\n📸 Kirim bukti setelah bayar"
    });
  }

  // APPROVE
  if (q.data.startsWith("approve_")) {
    const userId = q.data.split("_")[1];

    bot.sendMessage(
      userId,
      "🔓 Pembayaran diterima!\n\nAkses di sini:\n" + LINK_KONTEN
    );

    bot.sendMessage(ADMIN_ID, "✅ User sudah di-approve");
  }
});

// TERIMA FOTO
bot.on("photo", (msg) => {
  const userId = msg.chat.id;

  bot.sendPhoto(ADMIN_ID, msg.photo[msg.photo.length - 1].file_id, {
    caption: "Bukti bayar dari: " + userId,
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

  bot.sendMessage(userId, "📩 Bukti diterima, tunggu admin");
});

console.log("Bot siap cuan 🚀");
