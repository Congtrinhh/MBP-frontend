2.2.39 Xác minh danh tính
Mô tả vắn tắt use case: cho phép người dùng (MC/ khách book MC) xác minh danh tính.
• Luồng sự kiện:
o Luồng cơ bản:

1. Use case bắt đầu khi người dùng bấm vào tùy chọn “Xác minh danh tính” trên màn hình thiết lập. Hệ thống hiển thị màn hình tổng quan hướng dẫn các bước cần làm để xác minh danh tính: chụp hình khuôn mặt (bước 1), sau đó chụp CCCD trước, mặt sau (bước 2), sau đó xác nhận thông tin CCCD (bước 3).
2. Người dùng chọn “Bắt đầu”, hệ thống hiện màn hình chụp ảnh khuôn mặt người dùng (thêm lựa chọn cho phép người dùng chọn ảnh từ thư viện ảnh trên máy của họ (điện thoại iphone/android, máy tínhtính)).
3. Người dùng bấm chụp, hệ thống lưu lại ảnh khuôn mặt vào trường face_image_url của bảng user_id_verification, set giá trị trường current_step = 1 và chuyển sang bước 2: hệ thống hiện màn hình chụp ảnh CCCD mặt trước (thêm lựa chọn cho phép người dùng chọn ảnh từ thư viện ảnh trên máy của họ (điện thoại iphone/android, máy tínhtính)).
4. Người dùng bấm chụp, hệ thống lưu lại ảnh CCCD mặt trước vào trường id_front_image_url của bảng user_id_verification, set giá trị trường current_step = 2 và hiện màn hình chụp ảnh CCCD mặt sau (thêm lựa chọn cho phép người dùng chọn ảnh từ thư viện ảnh trên máy của họ (điện thoại iphone/android, máy tínhtính)).
5. Người dùng bấm chụp, hệ thống lưu lại ảnh CCCD mặt sau vào trường id_back_image_url của bảng user_id_verification, set giá trị trường current_step = 3. Hệ thống thực hiện lưu thông tin trường status và verified_at vào bảng user_id_verification, đồng thời lấy đầy đủ thông tin của người dùng từ CCCD (được trả về từ API lấy thông tin CCCD) và lưu vào bảng id_info. Hệ thống chuyển sang bước 3: hiển thị thông tin đầy đủ của CCCD.
6. Người dùng kiểm tra lại thông tin và bấm “Xác nhận”, hệ thống cập nhật trạng thái xác thực danh tính trong bảng user thành đã xác thực (is_verified = true) và gửi thông báo toast đến người dùng “Bạn đã xác thực danh tính thành công”. Use case kết thúc.
   o Luồng rẽ nhánh:
7. Tại bước 1 của luồng cơ bản, nếu người dùng bấm nút “Quay lại” khi đang đứng tại màn hướng dẫn tổng quan, use case kết thúc.
8. Tại bước 3 của luồng cơ bản, nếu hệ thống không nhận diện được ảnh khuôn mặt do người dùng chụp (hệ thống back-end gọi sang bên thứ 3 để kiểm tra khuôn mặt có đủ rõ nét hay không), hệ thống yêu cầu người dùng thực hiện lại bước 3 của luồng cơ bản.
9. Tại bước 4 của luồng cơ bản, nếu hệ thống không nhận diện được ảnh CCCD mặt trước do người dùng chụp (hệ thống back-end gọi sang api bên thứ 3 để lấy thông tin cccd mặt trước, tài liệu api: https://docs.fpt.ai/docs/vi/vision/api/id-recognition/), hệ thống yêu cầu người dùng thực hiện lại bước 4 của luồng cơ bản.
10. Tại bước 5 của luồng cơ bản, nếu hệ thống không nhận diện được ảnh CCCD mặt sau do người dùng chụp(hệ thống back-end gọi sang api bên thứ 3 để lấy thông tin cccd mặt sau, tài liệu api: https://docs.fpt.ai/docs/vi/vision/api/id-recognition/), hệ thống yêu cầu người dùng thực hiện lại bước 5 của luồng cơ bản.
11. Tại bước một trong các bước 2, 3, 4, 5, 6 của luồng cơ bản, nếu người dùng bấm “Quay lại”, hệ thống quay lại bước trước đó.
12. Tại bước một trong các bước 3, 4, 5 của luồng cơ bản, sau khi bấm chụp, nếu người dùng bấm “Chụp lại”, hệ thống hiện màn hình chụp của bước đó cho người dùng chụp lại.
13. Tại bất kỳ thời điểm nào trong quá trình thực hiện use case nếu không kết nối được với cơ sở dữ liệu thì hệ thống sẽ hiển thị thông báo “Lỗi kết nối!” và use case kết thúc.
14. Tại bước 5 của luồng cơ bản, sau khi đã lấy được thông tin cccd mặt sau từ api bên thứ 3 (tài liệu api: https://docs.fpt.ai/docs/vi/vision/api/id-recognition/), hệ thống thực hiện so sánh ảnh khuôn mặt người dùng và ảnh cccd mặt trước, mặt sau để xác nhận xem khuôn mặt chụp ở bước 3 có trùng với ảnh cccd ở bước 4 và 5 hay không.nếu không trùng, hệ thống hiển thị thông báo toast lỗi về cho người dùng: "ảnh chụp khuôn mặt không khớp với ảnh cccd mặt trước và mặt sau".
    • Các yêu cầu đặc biệt:
    Người dùng đã đăng nhập
    • Tiền điều kiện:
    Không có
    • Hậu điều kiện:
    Không có
    • Điểm mở rộng:
    Không có
