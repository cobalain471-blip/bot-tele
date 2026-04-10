const TelegramBot = require("node-telegram-bot-api");

const token = "8296936814:AAHl8Fmr9qCjCwDL--to-Aab1wSSZdncDCA";
const ADMIN_ID = 6677303168;

// link konten
const LINK_KONTEN = "https://tempatbokep.com/";

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

  // 🔥 STEP 1: KIRIM 3 VIDEO PREVIEW
  if (q.data === "lihat") {

    await bot.sendVideo(id, "LINK_VIDEO_1", {
      caption: "🔥 Video 1 (preview)"
    });

    await bot.sendVideo(id, "LINK_VIDEO_2", {
      caption: "😈 Video 2 (makin panas)"
    });

    await bot.sendVideo(id, "LINK_VIDEO_3", {
      caption:
        "⚠️ Video 3 (terakhir sebelum full 😳)\n\nMau lanjut full videonya?"
    });

    // tombol lanjut
    bot.sendMessage(id, "👇 Klik di bawah untuk lanjut", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "▶️ Lanjutkan Video", callback_data: "lanjut" }]
        ]
      }
    });
  }

  // 💳 STEP 2: TAMPILKAN QRIS
  if (q.data === "lanjut") {
    bot.sendPhoto(id, "https://ibb.co.com/WvVKrZJ4", {
      caption:
        "🔥 Untuk membuka semua video full 😈\n\n💰 Cukup bayar Rp5.000\n\n🎬 Akses banyak video sekaligus\n\n📸 Kirim bukti setelah bayar"
    });
  }

  // ✅ APPROVE (BIAR TETAP JALAN)
  if (q.data.startsWith("approve_")) {
    const userId = q.data.split("_")[1];

    bot.sendMessage(
      userId,
      "🔓 Pembayaran diterima!\n\nAkses semua video di sini:\nhttps://linkkamu.com"
    );

    bot.sendMessage(ADMIN_ID, "✅ User sudah di-approve");
  }
});
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
