/*
 * Locket Firebase Remote Config Unlock
 * MaiHieu707
 *
 * Mục đích: Mở khóa các feature flags UI của Locket Gold
 * (widget nhiều ảnh, video dài, nhiều bạn bè...)
 * mà RevenueCat không kiểm soát được.
 *
 * ✅ Chỉ can thiệp Locket Firebase project (locket-4252a)
 * ✅ Không gửi dữ liệu ra ngoài
 */

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"] || "";

// 🔒 Bộ lọc cứng: Không phải Locket → thoát ngay
if (!ua.includes("Locket")) {
    $done({});
} else {
    try {
        var obj = JSON.parse($response.body);

        // Firebase Remote Config trả về dạng { entries: { key: "value" } }
        obj.entries = obj.entries || {};

        // Bật các feature flags liên quan tới Gold
        var goldFlags = {
            // Subscription & paywall
            "subscription_enabled":           "true",
            "gold_enabled":                   "true",
            "paywall_enabled":                "false",
            "show_paywall":                   "false",
            "force_paywall":                  "false",

            // Widget & ảnh
            "max_friends":                    "20",
            "max_photos_per_moment":          "10",
            "widget_enabled":                 "true",
            "gold_widget_enabled":            "true",

            // Video
            "video_enabled":                  "true",
            "long_video_enabled":             "true",
            "max_video_duration":             "60",

            // Tính năng Gold khác
            "notifications_enabled":          "true",
            "gold_notifications_enabled":     "true",
            "gold_features_enabled":          "true",
            "premium_features_enabled":       "true"
        };

        // Merge vào entries hiện có (không xóa các flag khác của app)
        Object.assign(obj.entries, goldFlags);

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        // Nếu parse lỗi → trả nguyên bản gốc, không làm gì
        $done({});
    }
}
