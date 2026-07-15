(function () {
  "use strict";

  const config = window.birthdayConfig || {};
  const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const byId = (id) => document.getElementById(id);
  const state = { autoPlay: false, autoTimer: 0, manualPauseUntil: 0, musicWanted: false };

  function text(id, value) {
    const element = byId(id);
    if (element && typeof value === "string") element.textContent = value;
  }

  function safePlay(media) {
    if (!media || typeof media.play !== "function") return Promise.resolve(false);
    try {
      const result = media.play();
      return result && typeof result.catch === "function" ? result.then(() => true).catch(() => false) : Promise.resolve(true);
    } catch (_) { return Promise.resolve(false); }
  }

  text("heroTitle", config.title || "Happy Birthday");
  text("heroSubtitle", config.subtitle || "");
  text("giftTitle", config.gift?.title || "送妳一趟沖繩旅行");
  text("giftText", config.gift?.text || "這次，我們一起出發。");
  text("endingMessage", config.ending || "願妳的每一天，都比昨天更幸福。");
  document.title = config.title || "Happy Birthday";

  const photoWall = byId("photoWall");
  if (photoWall) {
    (Array.isArray(config.photos) ? config.photos : []).forEach((photo, index) => {
      if (!photo || !photo.src) return;
      const figure = document.createElement("figure");
      figure.className = "photo-card reveal";
      const image = document.createElement("img");
      image.src = photo.src;
      image.alt = photo.alt || `回憶照片 ${index + 1}`;
      image.loading = "lazy";
      image.decoding = "async";
      image.addEventListener("load", () => figure.classList.add("loaded"), { once: true });
      image.addEventListener("error", () => figure.remove(), { once: true });
      figure.appendChild(image);
      if (photo.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = photo.caption;
        figure.appendChild(caption);
      }
      photoWall.appendChild(figure);
    });
    if (!photoWall.children.length) photoWall.closest("section")?.setAttribute("hidden", "");
  }

  const timeline = byId("timeline");
  if (timeline) {
    const timelineItems = Array.isArray(config.timeline) ? config.timeline : [];
    timelineItems.forEach((item, index) => {
      if (!item) return;
      const article = document.createElement("section");
      article.className = "timeline-page story-section";
      article.setAttribute("aria-labelledby", `timelineTitle${index}`);
      const content = document.createElement("article");
      content.className = "timeline-page-content reveal";
      const kicker = document.createElement("p");
      kicker.className = "kicker dark";
      kicker.textContent = "Our Story";
      const date = document.createElement("p");
      date.className = "timeline-date";
      date.textContent = item.date || "";
      const title = document.createElement("h3");
      title.id = `timelineTitle${index}`;
      title.textContent = item.title || "";
      const body = document.createElement("p");
      body.className = "timeline-text";
      body.textContent = item.text || "";
      content.append(kicker, date, title, body);
      const mediaWrap = document.createElement("div");
      mediaWrap.className = "timeline-media reveal";
      const media = item.media || {};
      if (media.type === "video" && media.src) {
        article.classList.add("has-video");
        const clip = document.createElement("video");
        clip.src = media.src;
        clip.controls = true;
        clip.muted = true;
        clip.playsInline = true;
        clip.preload = "metadata";
        if (media.poster) clip.poster = media.poster;
        clip.addEventListener("error", () => mediaWrap.remove(), { once: true });
        mediaWrap.appendChild(clip);
      } else if (media.type === "images" && Array.isArray(media.images)) {
        mediaWrap.classList.add("photo-collage");
        media.images.forEach((photo, photoIndex) => {
          if (!photo?.src) return;
          const image = document.createElement("img");
          image.src = photo.src;
          image.alt = photo.alt || `${item.date || "故事"}照片 ${photoIndex + 1}`;
          image.loading = "lazy";
          image.decoding = "async";
          image.addEventListener("error", () => {
            image.remove();
            if (!mediaWrap.children.length) mediaWrap.remove();
          }, { once: true });
          mediaWrap.appendChild(image);
        });
      } else if (media.type === "image" && media.src) {
        const image = document.createElement("img");
        image.src = media.src;
        image.alt = media.alt || item.date || "故事照片";
        image.loading = "lazy";
        image.decoding = "async";
        image.addEventListener("error", () => mediaWrap.remove(), { once: true });
        mediaWrap.appendChild(image);
      }
      if (mediaWrap.children.length) article.append(content, mediaWrap);
      else article.appendChild(content);
      timeline.appendChild(article);
    });
    if (!timeline.children.length) timeline.setAttribute("hidden", "");
  }

  const letterContent = byId("letterContent");
  if (letterContent) {
    const paragraphs = String(config.letter || "").split(/\n\s*\n/).filter(Boolean);
    paragraphs.forEach((paragraph) => {
      const p = document.createElement("p");
      p.className = "letter-paragraph reveal";
      p.textContent = paragraph;
      letterContent.appendChild(p);
    });
  }

  const giftSection = byId("giftSection");
  const giftImage = byId("giftImage");
  if (giftSection && giftImage && config.gift?.image) {
    giftImage.src = config.gift.image;
    giftImage.alt = config.gift.alt || "生日禮物";
    giftImage.addEventListener("error", () => byId("giftTicket")?.remove(), { once: true });
  } else {
    byId("giftTicket")?.remove();
  }

  const videoSection = byId("videoSection");
  const video = byId("birthdayVideo");
  if (config.video?.enabled && config.video.src && videoSection && video) {
    video.src = config.video.src;
    if (config.video.poster) video.poster = config.video.poster;
    videoSection.hidden = false;
    video.addEventListener("error", () => { videoSection.hidden = true; }, { once: true });
  }

  let audio = null;
  const musicButton = byId("musicButton");
  if (config.music?.enabled && config.music.src && musicButton) {
    audio = new Audio(config.music.src);
    audio.loop = true;
    audio.preload = "metadata";
    musicButton.hidden = false;
    const updateMusic = (playing) => {
      musicButton.textContent = `音樂：${playing ? "開" : "關"}`;
      musicButton.setAttribute("aria-pressed", String(playing));
    };
    musicButton.addEventListener("click", async () => {
      if (!audio) return;
      if (audio.paused) {
        state.musicWanted = await safePlay(audio);
        updateMusic(state.musicWanted);
      } else {
        audio.pause();
        state.musicWanted = false;
        updateMusic(false);
      }
    });
    audio.addEventListener("pause", () => updateMusic(false));
    audio.addEventListener("play", () => updateMusic(true));
  }

  const sections = () => Array.from(document.querySelectorAll(".story-section:not([hidden])"));
  function stopAutoPlay() {
    state.autoPlay = false;
    window.clearTimeout(state.autoTimer);
  }
  function advanceToNext() {
    if (!state.autoPlay) return;
    const all = sections();
    const current = all.reduce((best, item) => Math.abs(item.getBoundingClientRect().top) < Math.abs(best.getBoundingClientRect().top) ? item : best, all[0]);
    const index = all.indexOf(current);
    if (index < 0 || index >= all.length - 1) return stopAutoPlay();
    const next = all[index + 1];
    next.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    document.querySelectorAll(".story-section video").forEach((clip) => {
      if (!next.contains(clip)) clip.pause();
    });
    const nextVideo = next.querySelector("video");
    if (nextVideo) {
      nextVideo.muted = true;
      if (nextVideo.ended) nextVideo.currentTime = 0;
      nextVideo.addEventListener("ended", advanceToNext, { once: true });
      safePlay(nextVideo);
      return;
    }
    scheduleNext();
  }
  function scheduleNext() {
    window.clearTimeout(state.autoTimer);
    if (!state.autoPlay) return;
    const all = sections();
    const current = all.reduce((best, item) => Math.abs(item.getBoundingClientRect().top) < Math.abs(best.getBoundingClientRect().top) ? item : best, all[0]);
    const currentVideo = current?.querySelector("video");
    if (currentVideo && !currentVideo.ended) {
      currentVideo.muted = true;
      currentVideo.addEventListener("ended", advanceToNext, { once: true });
      safePlay(currentVideo);
      return;
    }
    state.autoTimer = window.setTimeout(() => {
      if (Date.now() < state.manualPauseUntil) return scheduleNext();
      advanceToNext();
    }, 5000);
  }
  function startAutoPlay() {
    state.autoPlay = true;
    scheduleNext();
  }
  ["wheel", "touchstart", "pointerdown", "keydown"].forEach((eventName) => {
    window.addEventListener(eventName, (event) => {
      if (!state.autoPlay) return;
      if (eventName === "pointerdown" && event.target?.closest(".controls")) return;
      state.manualPauseUntil = Date.now() + 12000;
      scheduleNext();
    }, { passive: true });
  });

  const opening = byId("opening");
  byId("startButton")?.addEventListener("click", async () => {
    opening?.classList.add("is-closed");
    document.body.classList.remove("start-screen-open");
    startAutoPlay();
    window.setTimeout(() => opening?.remove(), 700);
    try { await document.documentElement.requestFullscreen?.(); } catch (_) { /* optional */ }
    if (audio) {
      state.musicWanted = await safePlay(audio);
      if (musicButton) {
        musicButton.textContent = `音樂：${state.musicWanted ? "開" : "關"}`;
        musicButton.setAttribute("aria-pressed", String(state.musicWanted));
      }
    }
  });

  byId("replayButton")?.addEventListener("click", () => {
    stopAutoPlay();
    video?.pause();
    byId("hero")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      audio?.pause();
      video?.pause();
      state.musicWanted = false;
    }
  });

  const observer = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
  }, { threshold: 0.14 }) : null;
  document.querySelectorAll(".reveal").forEach((element) => observer ? observer.observe(element) : element.classList.add("is-visible"));

  const canvas = byId("fireworks");
  if (canvas && !reducedMotion) {
    const context = canvas.getContext("2d");
    let particles = [];
    let frame = 0;
    const resize = () => { canvas.width = innerWidth; canvas.height = innerHeight; };
    const burst = () => {
      const x = canvas.width * (0.2 + Math.random() * 0.6);
      const y = canvas.height * (0.15 + Math.random() * 0.45);
      for (let i = 0; i < 28; i += 1) {
        const angle = (Math.PI * 2 * i) / 28;
        const speed = 1 + Math.random() * 2;
        particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, hue: Math.random() * 60 + 5 });
      }
    };
    const draw = () => {
      if (!context) return;
      context.clearRect(0, 0, canvas.width, canvas.height);
      if (frame++ % 150 === 0 && particles.length < 80) burst();
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.012; p.life -= 0.009;
        context.fillStyle = `hsla(${p.hue}, 90%, 70%, ${Math.max(0, p.life)})`;
        context.fillRect(p.x, p.y, 2, 2);
      });
      particles = particles.filter((p) => p.life > 0);
      requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });
    draw();
  }

})();
