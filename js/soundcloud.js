/*
 * SoundCloud Go+ Unlock Script
 * Endpoint: api-mobile.soundcloud.com/configuration/ios
 * Tác giả: MaiHieu707 (chuyển đổi chuẩn Shadowrocket)
 * 
 * Tính năng:
 * - Chặn 100% quảng cáo âm thanh (no_audio_ads)
 * - Mở khóa nghe âm thanh chất lượng cao (hq_audio)
 * - Mở khóa chuyển bài không giới hạn (unlimited_skips)
 * - Mở khóa gói Go+ (high_tier)
 */

let body = $response.body;

try {
    let obj = JSON.parse(body);

    if (obj) {
        obj.plan = {
            "id": "high_tier",
            "vendor": "apple",
            "plan_name": "SoundCloud Go+",
            "plan_id": "go-plus",
            "features": {
                "offline_sync": true,
                "no_audio_ads": true,
                "hq_audio": true,
                "unlimited_skips": true
            }
        };
        $done({ body: JSON.stringify(obj) });
    } else {
        $done({});
    }
} catch (e) {
    $done({});
}
