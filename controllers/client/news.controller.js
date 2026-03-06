module.exports.index = (req, res) => {
  const newsList = [
    {
      title: "Du lịch Việt Nam 2024: Xu hướng trải nghiệm xanh",
      description: "Du lịch bền vững, gần gũi thiên nhiên đang trở thành xu hướng nổi bật năm 2024.",
      image: "/assets/images/news-3.png",
      createdAt: "10/03/2025"
    },
    {
      title: "Kinh nghiệm săn tour giá tốt mùa cao điểm",
      description: "Bí quyết chọn tour phù hợp và tiết kiệm chi phí khi du lịch lễ, Tết.",
      image: "/assets/images/news-2.png",
      createdAt: "22/03/2025"
    },
    {
      title: "Những điểm đến không thể bỏ lỡ trong mùa hè",
      description: "Gợi ý các điểm đến hấp dẫn trong nước và quốc tế cho mùa hè sôi động.",
      image: "/assets/images/news-1.png",
      createdAt: "01/04/2025"
    }
  ];

  res.render("client/pages/news", {
    pageTitle: "Tin tức du lịch",
    newsList
  });
};
