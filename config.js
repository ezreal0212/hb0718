/* 所有文字與媒體都由此檔案設定；路徑請保持相對於 index.html。 */
window.birthdayConfig = {
  title: "Happy Birthday",
  subtitle: "獻給我最愛的妳",
  photos: [
    // { src: "./assets/images/photo-01.jpg", alt: "我們的回憶", caption: "那一天" }
  ],
  timeline: [
    { date: "相遇", title: "故事的開始", text: "從那一天起，平凡的日子有了不一樣的光。", media: { type: "images", images: [
      { src: "./assets/images/meeting-01.jpg", alt: "相遇的回憶 1" },
      { src: "./assets/images/meeting-02.jpg", alt: "相遇的回憶 2" },
      { src: "./assets/images/meeting-03.jpg", alt: "相遇的回憶 3" },
      { src: "./assets/images/meeting-04.jpg", alt: "相遇的回憶 4" }
    ] } },
    { date: "相伴", title: "一起走過", text: "謝謝妳，讓每一段日常都成為值得收藏的回憶。", media: { type: "images", images: [
      { src: "./assets/images/together-01.jpg", alt: "相伴的回憶 1" },
      { src: "./assets/images/together-02.jpg", alt: "相伴的回憶 2" },
      { src: "./assets/images/together-03.jpg", alt: "相伴的回憶 3" },
      { src: "./assets/images/together-04.jpg", alt: "相伴的回憶 4" }
    ] } },
    { date: "未來", title: "繼續寫下去", text: "往後的每一年，也想陪妳一起度過。", media: { type: "video", src: "./assets/videos/future.mp4", poster: "./assets/images/future-poster.jpg" } }
  ],
  video: {
    enabled: false,
    src: "./assets/videos/birthday.mp4",
    poster: "./assets/images/video-poster.jpg"
  },
  music: {
    enabled: false,
    src: "./assets/music/background.mp3"
  },
  letter: "親愛的妳：\n\n謝謝妳出現在我的生命裡，讓每一個普通的日子都有了值得期待的理由。\n\n願新的一歲，妳依然自由、閃亮，被溫柔以待。所有想去的地方、想做的事，我都想陪妳慢慢完成。\n\n生日快樂，我愛妳。",
  gift: {
    title: "送妳一趟沖繩旅行",
    text: "這次，我們一起出發。去看海、吹風，把新的回憶也收藏起來。",
    image: "./assets/images/okinawa-ticket.jpg",
    alt: "前往沖繩的機票"
  },
  ending: "願妳的每一天，都比昨天更幸福。"
};
