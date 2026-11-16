/*
 * Locket Gold — Safe Merged Script
 * Data structure: @iouyongg
 * Safety filter: MaiTrungHieu (MaiHieu707)
 *
 * ✅ Chỉ can thiệp đúng app Locket
 * ✅ Các app khác dùng RevenueCat trên máy KHÔNG bị ảnh hưởng
 * ✅ Product ID chuẩn Việt Nam: locket_1600_1y (399,000 VND/năm)
 */

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";

// 🔒 Bộ lọc cứng: Không phải Locket → thoát ngay, không làm gì
if (!ua.includes("Locket")) {
    $done({});
} else {
    var obj = JSON.parse($response.body);

    var FAR_FUTURE = "9999-01-09T10:10:14Z";
    var PAST       = "2026-10-23T10:10:14Z";

    function makeSub(productId, priceAmount, priceCurrency) {
        return {
            auto_resume_date:           null,
            display_name:               productId,
            is_sandbox:                 true,
            ownership_type:             "PURCHASED",
            billing_issues_detected_at: null,
            management_url:             "https://apps.apple.com/account/subscriptions",
            period_type:                "normal",
            price: {
                amount:   priceAmount,
                currency: priceCurrency
            },
            expires_date:               FAR_FUTURE,
            grace_period_expires_date:  null,
            refunded_at:                null,
            unsubscribe_detected_at:    null,
            original_purchase_date:     PAST,
            purchase_date:              PAST,
            store:                      "app_store",
            store_transaction_id:       "2000001108724193"
        };
    }

    function makeEnt(productId) {
        return {
            grace_period_expires_date: null,
            purchase_date:             PAST,
            product_identifier:        productId,
            expires_date:              FAR_FUTURE
        };
    }

    obj.subscriber                 = obj.subscriber                 || {};
    obj.subscriber.subscriptions   = obj.subscriber.subscriptions   || {};
    obj.subscriber.entitlements    = obj.subscriber.entitlements    || {};

    // ✅ Unlock Gold (Product ID chuẩn Việt Nam)
    var goldProduct = "locket_1600_1y";
    obj.subscriber.subscriptions[goldProduct]  = makeSub(goldProduct, 399000.0, "VND");
    obj.subscriber.entitlements["Gold"]         = makeEnt(goldProduct);

    // 🎨 Filter Pack — Bỏ comment nếu muốn mở thêm bộ lọc
    // var pack10 = "com.locket.Locket.FilterPack_10Photos_400";
    // obj.subscriber.subscriptions[pack10] = makeSub(pack10, 0.0, "USD");
    // obj.subscriber.entitlements["effect_pack_10"] = makeEnt(pack10);
    //
    // var pack20 = "com.locket.Locket.FilterPack_20Photos_500";
    // obj.subscriber.subscriptions[pack20] = makeSub(pack20, 0.0, "USD");
    // obj.subscriber.entitlements["effect_pack_20"] = makeEnt(pack20);

    $done({ body: JSON.stringify(obj) });
}
