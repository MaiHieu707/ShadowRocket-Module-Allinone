/*
 * PicsArt Gold Unlock Script (Tự động nhận + Hỗ trợ Restore)
 * Host: MaiHieu707
 */

let url = $request.url;
let body = $response.body;

try {
    let obj = JSON.parse(body);

    if (url.includes("users/show/me.json")) {
        // Kích hoạt VIP ngay khi mở Profile tài khoản
        obj.memberships = [
            {
                "status": "SUBSCRIPTION_PURCHASED",
                "type": "gold",
                "is_trial": false,
                "expire_date": 4070908800000
            }
        ];
    } else {
        // Kích hoạt khi bấm "Khôi phục giao dịch mua" (Restore Purchases)
        obj.status = "success";
        obj.response = [
            {
                "status": "SUBSCRIPTION_PURCHASED",
                "order_id": "2000001108724193",
                "original_order_id": "2000001108724193",
                "purchase_date": 1672531199000,
                "expire_date": 4070908800000,
                "subscription_id": "com.picsart.studio.subscription_plus_yearly",
                "is_trial": false,
                "plan_type": "gold",
                "tier": "gold",
                "level": "gold"
            }
        ];
    }
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    $done({});
}
