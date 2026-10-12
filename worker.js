    // اندپوینت تست — فقط برای دیباگ
    if (new URL(request.url).pathname === '/test') {
      const tok = env.BOT_TOKEN || '';
      return new Response('HAS_TOKEN:' + !!tok + ' LEN:' + tok.length + ' FIRST3:' + tok.slice(0,3));
    }
