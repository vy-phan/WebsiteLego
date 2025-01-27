import React from 'react'

const Newleater = () => {
    const newleaters = [
        {
            "image_url": "https://images2.thanhnien.vn/zoom/351_219/528068263637045248/2023/8/15/screenshot-2023-08-16-at-00-30-22-169212063449462406525-0-3-1126-1805-crop-16921206626031519692499.png",
            "date": "2024-01-12",
            "title": "Huyền thoại game 'PAC-MAN' phiên bản LEGO xuất hiện tại Việt Nam",
            "description": "Sau khi LEGO ra mắt của hàng shop-in-shop chính hãng đầu tiên tại Việt Nam, nhiều game thủ đã nhanh chóng phát hiện bộ trò chơi PAC-MAN Arcade cũng đã trình làng nhân sự kiện. Đây là mô hình tái hiện nhân vật biểu tượng của ngành công nghiệp game, được nhiều thế hệ game thủ mến mộ.",
        },
        {
            "image_url": "https://thanhnien.mediacdn.vn/Uploaded/2014/Pictures201403/Minh_Nguyet/mayin.jpg",
            "date": "2021-05-10",
            "title": "Học sinh lớp 7 dùng lego chế máy in",
            "description": "Shubham Banerjee, 12 tuổi, tại California (Mỹ) đã chế tạo máy in chữ nổi cho người mù (tên là Braigo) từ đồ chơi xếp hình lego, theo CNN.",
        },
        {
            "image_url": "https://thanhnien.mediacdn.vn/uploaded/lenammedia/2021_03_07/156675457_10159073276959183_205956500475107526_o_VLWZ.jpg?width=500",
            "date": "2024-05-12",
            "title": "'Cao thủ' xếp hình thu cả Sài Gòn thành Lego khiến fan quốc tế trầm trồ",
            "description": "Huỳnh Khang, 30 tuổi, hiện đang là một nhà thiết kế đồ họa tại TP.HCM. Anh có sở thích chơi và lắp ráp Lego. Bộ Lego “Ăn Tết” của anh vừa qua được hãng đồ chơi Lego vinh danh trên fanpage quốc tế nhờ sự sáng tạo và ý nghĩa văn hóa cổ truyền độc đáo.",

        }
    ]

    return (
        <section className="bg-white py-12">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">Latest News</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newleaters.map((newleater, index) => (
                        <article key={index} className="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg h-[400px]">
                            <img
                                alt={newleater.title}
                                src={newleater.image_url}
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            <div className="relative h-full flex flex-col justify-end bg-gradient-to-t from-gray-900/90 to-gray-900/10">
                                <div className="p-4 sm:p-6">
                                    <time dateTime={newleater.date} className="block text-xs text-white/90">
                                        {newleater.date}
                                    </time>

                                    <a href="#" className="block hover:opacity-75 transition">
                                        <h3 className="mt-0.5 text-lg text-white font-bold line-clamp-2">
                                            {newleater.title}
                                        </h3>
                                    </a>

                                    <p className="mt-2 line-clamp-2 text-sm/relaxed text-white/95">
                                        {newleater.description}
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Newleater