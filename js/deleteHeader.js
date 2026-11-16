/*
 * deleteHeader.js - Xóa Cache Header cho RevenueCat & Locket
 * Tác giả: MaiTrungHieu (MaiHieu707)
 * 
 * Mục đích: Ép máy chủ RevenueCat luôn phản hồi 200 OK kèm dữ liệu VIP mới nhất,
 * không trả về 304 Not Modified (dữ liệu cũ bị cache).
 */

let headers = $request.headers;

delete headers['x-revenuecat-etag'];
delete headers['X-RevenueCat-ETag'];
delete headers['if-none-match'];
delete headers['If-None-Match'];
delete headers['if-modified-since'];
delete headers['If-Modified-Since'];

$done({ headers });
