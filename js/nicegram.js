/*
 * Nicegram Pro Unlock Script
 * Endpoint: restore-access.indream.app/restoreAccess
 * Host: MaiHieu707
 */

let body = $response.body;

try {
    let obj = JSON.parse(body);
    obj.data = {
        "premium": true,
        "has_premium": true,
        "expires": 4070908800
    };
    obj.premium = true;
    obj.sync = true;
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    $done({});
}
