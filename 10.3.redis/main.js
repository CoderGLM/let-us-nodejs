// npm install --save-dev redis后执行redis-server

import redis from 'redis';

// 默认端口和主机：6379,'127.0.0.1'
const client = redis.createClient();

client.on('error', err => {
    console.log(`Error ${err}`);
});

client.set('string key', 'string value', redis.print);
client.hset('hash key', 'hashtest 1', 'some value', redis.print);
client.hset(["hash key", 'hashtest 2', 'some other value'], redis.print);
client.hkeys('hash key', (err, replies) => {
    console.log(replies.length, ' replies:');
    replies.forEach((reply, i) => {
        console.log(`    ${i}: ${reply}`);
    });
    client.quit();
});