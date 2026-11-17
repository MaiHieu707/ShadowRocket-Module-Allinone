/*
 * PicsArt Gold Unlock Script
 * Endpoint: api.picsart.com/gw-v2/shop/subscription/apple/purchases
 * Host: MaiHieu707
 */

let body = $response.body;

try {
    let obj = JSON.parse(body);
    obj.status = "success";
    obj.response = [
        {
            "status": "SUBSCRIPTION_PURCHASED",
            "order_id": "2000001108724193",
            "original_order_id": "2000001108724193",
            "purchase_date": 1672531199000,
            "expire_date": 4070908800000,
            "subscription_id": "subscription_gold_yearly",
            "is_trial": false,
            "plan_type": "gold",
            "tier": "gold",
            "level": "gold"
        }
    ];
    $done({ body: JSON.stringify(obj) });
} catch (e) {
    $done({});
}
