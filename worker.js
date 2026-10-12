// بات بله — نسخه دیباگ
export default {
  async fetch(request, env) {
    console.log('HAS_TOKEN:', !!env.BOT_TOKEN, 'LEN:', (env.BOT_TOKEN||'').length);

    // اندپوینت تست — فقط برای دیباگ
    if (new URL(request.url).pathname === '/test') {
      let chatId = 756119691;
      try { const b = await request.json(); if (b.chat_id) chatId = b.chat_id; } catch(e) {}
      const r = await fetch(
        `https://tapi.bale.ai/bot${env.BOT_TOKEN}/sendMessage`,
        { method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: 'تست از ورکر 🧪' }) }
      );
      const t = await r.text();
      return new Response('STATUS:' + r.status + '\nBODY:' + t.slice(0, 300));
    }

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
