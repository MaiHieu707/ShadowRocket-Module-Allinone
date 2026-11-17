/*
 * Nicegram Pro Unlock Script
 * Endpoint: api.nicegram.app/(user/info|profile/premium)
 * Tác giả gốc: ddgksf2013 | Host: MaiHieu707
 */

let body = $response.body;

try {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data.premium = true;
        obj.data.has_premium = true;
    }
    if (obj.user) {
        obj.user.premium = true;
    }
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    $done({});
}
