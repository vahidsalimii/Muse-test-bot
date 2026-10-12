// بات بله — نسخه دیباگ
export default {
  async fetch(request, env) {
    console.log('HAS_TOKEN:', !!env.BOT_TOKEN, 'LEN:', (env.BOT_TOKEN||'').length);
    if (request.method === 'POST') {
      try {
        const update = await request.json();
        console.log('UPDATE:', JSON.stringify(update).slice(0, 500));
        const msg = update.message;
        if (msg && msg.text) {
          const chatId = msg.chat.id;
          let reply = msg.text === '/start'
            ? 'سلام! 👋 من بات تو هستم!'
            : 'گفتی: ' + msg.text;
          const r = await fetch(
            `https://tapi.bale.ai/bot${env.BOT_TOKEN}/sendMessage`,
            { method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: chatId, text: reply }) }
          );
          console.log('SEND_STATUS:', r.status, 'RESP:', (await r.text()).slice(0, 300));
        } else {
          console.log('NO msg.text, keys:', msg ? Object.keys(msg).join(',') : 'no-message');
        }
      } catch (e) { console.log('ERROR:', e.message); }
      return new Response('OK');
    }
    return new Response('🤖 بات روشنه!');
  }
};
