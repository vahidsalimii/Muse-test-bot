// بات بله — جواب /start و تکرار پیام
export default {
  async fetch(request, env) {
    if (request.method === 'POST') {
      try {
        const update = await request.json();
        const msg = update.message;
        if (msg && msg.text) {
          const chatId = msg.chat.id;
          const reply = msg.text === '/start'
            ? 'سلام! 👋 من بات تو هستم. هر چی بگی تکرار می‌کنم!'
            : 'گفتی: ' + msg.text;
          await fetch(
            `https://tapi.bale.ai/bot${env.BOT_TOKEN}/sendMessage`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chatId, text: reply })
            }
          );
        }
      } catch (e) {}
      return new Response('OK');
    }
    return new Response('🤖 بات روشنه!');
  }
};
