/* ============================================================
   내용 수정은 여기서만 하면 됩니다.
   카테고리 → 하위메뉴 → 목록(name, meta) 순서예요.
   image: images 폴더 안의 사진 파일 (Pixabay에서 받은 실사 사진)
   ============================================================ */
const DATA = [
  {
    id: "playlist",
    title: "플레이리스트",
    en: "Playlists",
    desc: "상황마다 꺼내 듣는 노래 묶음.",
    image: "images/playlist.jpg",
    subs: [
      {
        id: "playlist-morning",
        title: "출근길",
        desc: "잠 깨우는 가벼운 템포. 오늘은 하울의 움직이는 성.",
        items: [
          { name: "인생의 회전목마", meta: "히사이시 조 · 하울의 움직이는 성 OST", link: "https://www.youtube.com/results?search_query=하울의+움직이는+성+인생의+회전목마" },
          { name: "하늘 산책", meta: "히사이시 조 · 하울의 움직이는 성 OST", link: "https://www.youtube.com/results?search_query=Howl's+Moving+Castle+Sky+Walk+Joe+Hisaishi" },
          { name: "세계의 약속", meta: "바이쇼 치에코 · 하울의 움직이는 성 OST", link: "https://www.youtube.com/results?search_query=하울의+움직이는+성+세계의+약속" },
        ],
      },
      {
        id: "playlist-night",
        title: "새벽 2시",
        desc: "불 끄고 이어폰 끼고.",
        items: [
          { name: "곡 제목", meta: "아티스트" },
          { name: "곡 제목", meta: "아티스트" },
        ],
      },
      {
        id: "playlist-rain",
        title: "비 오는 날",
        desc: "창밖 소리랑 같이 듣기 좋은 곡들.",
        items: [
          { name: "곡 제목", meta: "아티스트" },
          { name: "곡 제목", meta: "아티스트" },
        ],
      },
    ],
  },
  {
    id: "artist",
    title: "아티스트",
    en: "Artists",
    desc: "오래 듣게 되는 사람들.",
    image: "images/artist.jpg",
    subs: [
      {
        id: "artist-kr",
        title: "국내",
        desc: "",
        items: [
          { name: "아티스트 이름", meta: "추천 앨범" },
          { name: "아티스트 이름", meta: "추천 앨범" },
        ],
      },
      {
        id: "artist-global",
        title: "해외",
        desc: "",
        items: [
          { name: "아티스트 이름", meta: "추천 앨범" },
          { name: "아티스트 이름", meta: "추천 앨범" },
        ],
      },
      {
        id: "artist-now",
        title: "요즘 빠진",
        desc: "최근 반복재생 중.",
        items: [{ name: "아티스트 이름", meta: "이유 한 줄" }],
      },
    ],
  },
  {
    id: "log",
    title: "기록",
    en: "Log",
    desc: "듣고, 보고, 남긴 것들.",
    image: "images/log.jpg",
    subs: [
      {
        id: "log-live",
        title: "공연",
        desc: "다녀온 공연 메모.",
        items: [{ name: "공연 이름", meta: "2026.00.00 · 장소" }],
      },
      {
        id: "log-review",
        title: "앨범 리뷰",
        desc: "한 줄 감상.",
        items: [{ name: "앨범 제목", meta: "★★★★☆ · 한 줄 감상" }],
      },
      {
        id: "log-wish",
        title: "위시리스트",
        desc: "갖고 싶은 LP, 장비.",
        items: [{ name: "아이템 이름", meta: "메모" }],
      },
    ],
  },
];

/* ============================================================ */

const pad = (n) => String(n).padStart(2, "0");
const $ = (s) => document.querySelector(s);

function toggle(btn, panel, force) {
  const open = force ?? btn.getAttribute("aria-expanded") !== "true";
  btn.setAttribute("aria-expanded", open);
  panel.classList.toggle("open", open);
}

/* 본문 렌더 */
$("#categories").innerHTML = DATA.map((cat, i) => `
  <section class="category" id="${cat.id}">
    ${cat.image ? `<div class="cat-photo"><img class="photo" src="${cat.image}" alt="${cat.title}" loading="lazy"></div>` : ""}
    <p class="cat-en">${cat.en}</p>
    <div class="cat-head">
      <span class="cat-no">${pad(i + 1)}</span>
      <h2 class="cat-title">${cat.title}</h2>
    </div>
    <p class="cat-desc">${cat.desc}</p>
    ${cat.subs.map((sub) => `
      <div class="sub" id="${sub.id}">
        <button class="sub-btn" aria-expanded="false" aria-controls="${sub.id}-panel">
          <span class="sub-title">${sub.title}</span>
          <span class="sub-count">${sub.items.length}</span>
          <span class="plus" aria-hidden="true"></span>
        </button>
        <div class="collapse" id="${sub.id}-panel">
          <div class="sub-inner"><div class="pad">
            ${sub.desc ? `<p class="sub-desc">${sub.desc}</p>` : ""}
            <ul>
              ${sub.items.map((it, k) => {
                const body = `
                  <span class="track-no">${pad(k + 1)}</span>
                  <div><p class="track-name">${it.name}</p><p class="track-meta">${it.meta}</p></div>`;
                return it.link
                  ? `<li><a class="track" href="${it.link}" target="_blank" rel="noopener">${body}<span class="track-play" aria-label="듣기">▶</span></a></li>`
                  : `<li class="track">${body}</li>`;
              }).join("")}
            </ul>
          </div></div>
        </div>
      </div>`).join("")}
  </section>`).join("");

/* 드로어 메뉴 렌더 */
$("#drawerList").innerHTML = DATA.map((cat, i) => `
  <li class="drawer-cat">
    <button class="drawer-cat-btn" aria-expanded="false">
      <span class="no">${pad(i + 1)}</span>${cat.title}
      <span class="plus" aria-hidden="true"></span>
    </button>
    <div class="collapse">
      <ul class="drawer-sub">
        ${cat.subs.map((sub) => `<li><a href="#${sub.id}" data-target="${sub.id}">${sub.title}</a></li>`).join("")}
      </ul>
    </div>
  </li>`).join("");

/* 본문 아코디언 */
document.querySelectorAll(".sub-btn").forEach((btn) => {
  btn.addEventListener("click", () => toggle(btn, btn.nextElementSibling));
});

/* 드로어 열고 닫기 */
const menuBtn = $("#menuBtn"), drawer = $("#drawer"), overlay = $("#overlay");

function setDrawer(open) {
  menuBtn.setAttribute("aria-expanded", open);
  menuBtn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
  drawer.classList.toggle("open", open);
  drawer.setAttribute("aria-hidden", !open);
  document.body.classList.toggle("locked", open);
  if (open) {
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add("show"));
  } else {
    overlay.classList.remove("show");
    setTimeout(() => (overlay.hidden = true), 350);
  }
}

menuBtn.addEventListener("click", () => setDrawer(!drawer.classList.contains("open")));
overlay.addEventListener("click", () => setDrawer(false));
document.addEventListener("keydown", (e) => e.key === "Escape" && setDrawer(false));

/* 드로어 카테고리 펼치기 */
document.querySelectorAll(".drawer-cat-btn").forEach((btn) => {
  btn.addEventListener("click", () => toggle(btn, btn.nextElementSibling));
});

/* 하위메뉴 클릭 → 드로어 닫고 해당 항목 펼친 뒤 이동 */
drawer.addEventListener("click", (e) => {
  const a = e.target.closest("a[data-target]");
  if (!a) return;
  e.preventDefault();
  const sub = document.getElementById(a.dataset.target);
  const btn = sub.querySelector(".sub-btn");
  setDrawer(false);
  toggle(btn, btn.nextElementSibling, true);
  sub.scrollIntoView({ behavior: "smooth", block: "start" });
  sub.classList.remove("flash");
  void sub.offsetWidth;
  sub.classList.add("flash");
});
