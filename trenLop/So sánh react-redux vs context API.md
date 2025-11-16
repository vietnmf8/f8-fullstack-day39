**Khi có ai hỏi so sánh Redux với Context APi**

-   Bản chất Redux ở đây là React-Redux vs Context API
-   Bản chất bên trong React-Redux sử dụng Context API

**Vậy so sánh cái gì?**
Chẳng qua là bên trong React-Redux sẽ tối ưu.

-   Nó kiểm tra, so sánh state trước và state mới, nếu mà giống nhau thì không re-render
-   Phải khác tham chiếu, khác giá trị mới re-render

**Context API**:
- Có thể tạo ra quy trình giống như Redux
- Nhưng nếu dùng thuần thì không có quy trình => khó maintain
- Mà kể cả có dùng quy trình kết hợp với reducer, dispatch để cho ra kết quả giống như Redux, nhưng phải xử lý tối ưu re-render một cách thủ công:
    - Check reducer tránh return thẳng về state có tham chiếu cũ
    - Check state để đảm bảo giá trị trước và sau phải khác nhau thì re-render
