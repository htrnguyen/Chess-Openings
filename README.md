# Chess With Openings

Ứng dụng web cờ vua giúp người chơi thực hành các khai cuộc phổ biến. Được phát triển để hỗ trợ việc học cờ vua tại Trường Đại học Tôn Đức Thắng.

## Tính Năng

- Hỗ trợ 12 khai cuộc cờ vua
- Cho phép tự do di chuyển nếu không đánh theo khai cuộc
- Cho phép người chơi chọn màu quân (trắng/đen)
- Hiển thị các nước đi hợp lệ
- Đánh dấu nước đi vừa thực hiện
- Cảnh báo khi bị chiếu
- Giao diện thân thiện, dễ sử dụng
- Tương thích với mọi thiết bị (responsive)

## Cách Sử Dụng

1. Chọn màu quân muốn chơi (Trắng/Đen)
2. Chọn khai cuộc từ danh sách
3. Nhấn "Start Game" để bắt đầu
4. Di chuyển quân cờ theo khai cuộc hoặc tự do
5. Sử dụng "Reset" để bắt đầu lại khai cuộc hiện tại
6. Sử dụng "Clear" để xóa bàn cờ

## Các Khai Cuộc Hỗ Trợ

Xem chi tiết các khai cuộc tại đây: [Khai cuộc](./document/Khai_cuoc.pdf)

Bạn có thể thêm/bớt/chỉnh sửa các khai cuộc bằng cách sửa file [data/openings.json](data/openings.json). Các nước đi được ghi theo ký hiệu chuẩn quốc tế:

- Quân tốt: chỉ ghi tên ô (vd: "e4", "d5")
- Mã: N (vd: "Nf3", "Nc6")
- Tượng: B (vd: "Bc4", "Be7")
- Xe: R (vd: "Re1", "Rd8")
- Hậu: Q (vd: "Qd2", "Qe7")
- Vua: K (vd: "Ke2", "Kg8")
- Nhập thành ngắn: "O-O"
- Nhập thành dài: "O-O-O"
- Ăn quân: x (vd: "exd5", "Nxe4")
- Chiếu: + (vd: "Bb4+")

## Đóng Góp

Mọi đóng góp đều được hoan nghênh! Vui lòng tạo Pull Request hoặc Issue nếu bạn muốn cải thiện dự án.

## Giấy Phép

Dự án này được cấp phép theo giấy phép MIT - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## Tác Giả

[htrnguyen](https://github.com/htrnguyen)
