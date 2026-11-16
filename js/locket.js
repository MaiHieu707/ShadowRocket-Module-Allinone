/*
 * Locket Gold - Safe Scoped Script
 * Chỉ can thiệp Locket, bỏ qua hoàn toàn các app khác dùng RevenueCat
 */
const ua = $request.headers['User-Agent'] || $request.headers['user-agent'] || '';

if (!ua.includes('Locket')) {
    $done({});
} else {
    let obj = JSON.parse($response.body || '{}');
    obj.subscriber = obj.subscriber || {};
    obj.subscriber.entitlements = obj.subscriber.entitlements || {};
    obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};

    const goldData = {
        "expires_date": "2099-12-31T23:59:59Z",
        "original_purchase_date": "2023-01-01T00:00:00Z",
        "purchase_date": "2023-01-01T00:00:00Z",
        "ownership_type": "PURCHASED",
        "store": "app_store"
    };

    obj.subscriber.entitlements["Gold"] = goldData;
    obj.subscriber.subscriptions["com.locket.gold.yearly"] = goldData;

    $done({ body: JSON.stringify(obj) });
}
