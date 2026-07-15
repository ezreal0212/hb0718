/* 所有文字與媒體都由此檔案設定；路徑請保持相對於 index.html。 */
window.birthdayConfig = {
  title: "Happy Birthday",
  subtitle: "文字文字文字文字",
  photos: [
    // { src: "./assets/images/photo-01.jpg", alt: "我們的回憶", caption: "那一天" }
  ],
  timeline: [
    { date: "小標題1", title: "主標題1", text: "文字文字文字文字文字文字文字文字文字文字。", media: { type: "images", images: [
      { src: "./assets/images/meeting-01.jpg", alt: "相遇的回憶 1" },
      { src: "./assets/images/meeting-02.jpg", alt: "相遇的回憶 2" },
      { src: "./assets/images/meeting-03.jpg", alt: "相遇的回憶 3" },
      { src: "./assets/images/meeting-04.jpg", alt: "相遇的回憶 4" }
    ] } },
    { date: "小標題2", title: "主標題2", text: "文字文字文字文字文字文字文字文字文字文字", media: { type: "images", images: [
      { src: "./assets/images/together-01.jpg", alt: "相伴的回憶 1" },
      { src: "./assets/images/together-02.jpg", alt: "相伴的回憶 2" },
      { src: "./assets/images/together-03.jpg", alt: "相伴的回憶 3" },
      { src: "./assets/images/together-04.jpg", alt: "相伴的回憶 4" }
    ] } },
    { date: "小標題3", title: "影片頁", text: "文字文字文字文字文字文字文字文字文字文字", media: { type: "youtube", videoId: "REPLACE_WITH_YOUTUBE_VIDEO_ID" } }
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
  letter: "親愛的妳：\n\n文字文字文字文字，文字文字文字文字。\n\n文字文字文字文字，文字文字文字文字，文字文字文字文字。文字文字文字文字，我文字文字文字文字。",
  gift: {
    title: "送妳一趟旅行",
    text: "我們一起出發。去看海、吹風，把新的回憶也收藏起來。",
    image: "./assets/images/okinawa-ticket.jpg",
    alt: "前往沖繩的機票"
  },
  ending: "文字文字文字文字，文字文字文字文字。"
};
