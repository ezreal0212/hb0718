/* 所有文字與媒體都由此檔案設定；路徑請保持相對於 index.html。 */
window.birthdayConfig = {
  title: "Happy Birthday",
  subtitle: "My Dear Wifi",
  photos: [
    // { src: "./assets/images/photo-01.jpg", alt: "我們的回憶", caption: "那一天" }
  ],
  timeline: [
    { date: "2020/05", title: "Beginning", text: "這是我們一起過的第七個生日了，時間真的走很快對吧。", media: { type: "images", images: [
      { src: "./assets/images/meeting-01.jpg", alt: "相遇的回憶 1" },
      { src: "./assets/images/meeting-02.jpg", alt: "相遇的回憶 2" },
      { src: "./assets/images/meeting-03.jpg", alt: "相遇的回憶 3" },
      { src: "./assets/images/meeting-04.jpg", alt: "相遇的回憶 4" }
    ] } },
    { date: "2025/02", title: "Roller Coaster", text: "這一年半來我們經歷了爆炸的每一刻。", media: { type: "images", images: [
      { src: "./assets/images/together-01.jpg", alt: "相伴的回憶 1" },
      { src: "./assets/images/together-02.jpg", alt: "相伴的回憶 2" },
      { src: "./assets/images/together-03.jpg", alt: "相伴的回憶 3" },
      { src: "./assets/images/together-04.jpg", alt: "相伴的回憶 4" },
      { src: "./assets/images/together-05.jpg", alt: "相伴的回憶 5" }
    ] } },
    { date: "2026/07", title: "Life", text: "記住妳自己快樂的樣子。", media: { type: "video", src: "https://pub-a8dd4d11ffcb446c8f6085a86c8746a1.r2.dev/future-web.mp4" } }
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
  letter:
 `這一年多來，妳經歷了懷孕、生產、照顧寶寶，現在又再次懷孕。每天看著妳為了這個家付出，我知道那些辛苦不是幾句「謝謝」就能表達的。
我知道有時候妳會累、會煩、會擔心自己是不是做得不夠好，但在我眼裡，妳一直都是最棒的媽媽，也是我最愛的人。

謝謝妳願意陪我一起走過這些年來的每一天，從只有我們兩個，到現在變成一家人。
未來一定還會有很多挑戰，但我希望妳記得，妳不是一個人在努力。

雖然我不是很厲害，也沒有很會賺錢，但我會一直陪著妳，一起照顧波波跟比比、一起面對生活、一起慢慢變老。
希望妳偶爾也能停下來，好好看看自己，記住妳開心笑著的樣子。因為不管妳變成什麼樣子，在我心裡，妳永遠都是最美、最重要的人。

最後，希望這份小小的禮物，能讓妳暫時放下疲憊。
Love You!`,

  gift: {
    title: "送妳一趟旅行",
    text: "我們一起去看海、吹風，把新的回憶也收藏起來。",
    image: "./assets/images/okinawa-ticket.jpg",
    alt: "前往沖繩的機票"
  },
  ending: "2026/07/18"
};
