/*
 * Meitu XiuXiu VIP Unlock Script
 * Endpoint: (h5|api).xiuxiu.meitu.com/v\d/(h\d/vip|vip|user)/
 * Host: MaiHieu707
 */

let body = $response.body;

try {
    let obj = JSON.parse(body);
    if (obj.data) {
        obj.data.vip_type = 1;
        obj.data.is_vip = 1;
        obj.data.vip = 1;
        obj.data.is_valid = 1;
        obj.data.valid_time = 4070908800;
        obj.data.expire_time = "2099-12-31 23:59:59";
    }
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    $done({});
}
