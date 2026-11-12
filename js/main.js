(() => {
  const $ = (s) => document.querySelector(s),
    $$ = (s) => [...document.querySelectorAll(s)];
  const h = $(".hdr");
  addEventListener("scroll", () =>
    h.classList.toggle("stuck", scrollY > 40),
  );
  const b = $(".burger"),
    n = $("nav");
  const tg = (o) => {
    n.classList.toggle("open", o);
    b.classList.toggle("open", o);
    document.body.classList.toggle("lock", o);
    b.setAttribute("aria-expanded", o);
  };
  b &&
    b.addEventListener("click", () =>
      tg(!n.classList.contains("open")),
    );
  $$("nav a").forEach((a) =>
    a.addEventListener("click", () => tg(false)),
  );
  addEventListener(
    "resize",
    () => innerWidth > 960 && tg(false),
  );
  const io = new IntersectionObserver(
    (e) =>
      e.forEach((x) => {
        if (x.isIntersecting) {
          x.target.classList.add("in");
          io.unobserve(x.target);
        }
      }),
    { threshold: 0.12 },
  );
  $$(".rev").forEach((e) => io.observe(e));
  $$("[data-count]").forEach((el) => {
    const t = +el.dataset.count,
      s = el.dataset.suf || "";
    let st;
    const f = (ts) => {
      st = st || ts;
      const p = Math.min((ts - st) / 1800, 1);
      el.textContent =
        Math.round(t * (1 - Math.pow(1 - p, 3))) + s;
      p < 1 && requestAnimationFrame(f);
    };
    setTimeout(() => requestAnimationFrame(f), 1800);
  });
  $$(".ba").forEach((w) => {
    const r = w.querySelector("input"),
      t = w.querySelector(".top"),
      bar = w.querySelector(".bar");
    const u = () => {
      t.style.clipPath = `inset(0 ${100 - r.value}% 0 0)`;
      bar.style.left = r.value + "%";
    };
    r.addEventListener("input", u);
  });
  $$(".filters button").forEach((x) =>
    x.addEventListener("click", () => {
      $$(".filters button").forEach((y) =>
        y.classList.remove("on"),
      );
      x.classList.add("on");
      $$("[data-cat]").forEach((c) =>
        c.classList.toggle(
          "hide",
          x.dataset.f !== "all" &&
            c.dataset.cat !== x.dataset.f,
        ),
      );
    }),
  );
  /* hero */
  const hero = $(".hero");
  if (hero) {
    const sl = $$(".slide");
    let i = 0;
    sl[0].classList.add("on");
    setInterval(() => {
      sl[i].classList.remove("on");
      i = (i + 1) % sl.length;
      sl[i].classList.remove("on");
      void sl[i].offsetWidth;
      sl[i].classList.add("on");
    }, 6000);
    const fog = $("#fog"),
      fc = fog.getContext("2d"),
      fx = $("#fx"),
      c = fx.getContext("2d");
    let W,
      H,
      P = [],
      S = [],
      m = { x: -99, y: -99 };
    const rs = () => {
      W = fog.width = fx.width = hero.offsetWidth;
      H = fog.height = fx.height = hero.offsetHeight;
    };
    rs();
    addEventListener("resize", rs);
    // squeegee: frosted glass wiped away in three passes
    const g = fc.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, "#f6dbe9");
    g.addColorStop(1, "#d9defa");
    fc.fillStyle = g;
    fc.fillRect(0, 0, W, H);
    fc.fillStyle = "rgba(255,255,255,.25)";
    for (let k = 0; k < 60; k++)
      fc.fillRect(
        Math.random() * W,
        Math.random() * H,
        2,
        Math.random() * 60 + 10,
      );
    const bh = H / 3;
    let t0 = null;
    const pass = (ts) => {
      t0 = t0 || ts;
      const e = (ts - t0) / 1800,
        p = Math.min(e * 3, 3);
      fc.globalCompositeOperation = "destination-out";
      for (let r = 0; r < 3; r++) {
        const q = Math.max(0, Math.min(p - r, 1));
        if (!q) continue;
        const x = r % 2 ? W * (1 - q) : 0;
        fc.fillStyle = "#000";
        fc.fillRect(
          r % 2 ? x : 0,
          r * bh,
          r % 2 ? W - x + 4 : W * q + 4,
          bh + 2,
        );
        if (q < 1) {
          fc.fillStyle = "#fff";
          fc.globalCompositeOperation = "source-over";
          fc.fillRect(r % 2 ? x : W * q, r * bh, 6, bh);
          fc.globalCompositeOperation = "destination-out";
        }
      }
      p < 3
        ? requestAnimationFrame(pass)
        : ((fog.style.transition = "opacity .8s"),
          (fog.style.opacity = 0));
    };
    setTimeout(() => requestAnimationFrame(pass), 300);
    // bubbles + sparkle trail
    const mk = () => ({
      x: Math.random() * W,
      y: H + Math.random() * 200,
      r: 5 + Math.random() * 15,
      v: 0.3 + Math.random() * 0.9,
      w: Math.random() * 6,
    });
    for (let k = 0; k < (innerWidth < 700 ? 7 : 14); k++) {
      const o = mk();
      o.y = Math.random() * H;
      P.push(o);
    }
    hero.addEventListener("pointermove", (e) => {
      const r = hero.getBoundingClientRect();
      m.x = e.clientX - r.left;
      m.y = e.clientY - r.top;
      for (let k = 0; k < 2; k++)
        S.push({
          x: m.x,
          y: m.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 0.5,
          l: 1,
        });
    });
    hero.addEventListener("click", (e) => {
      const r = hero.getBoundingClientRect(),
        x = e.clientX - r.left,
        y = e.clientY - r.top;
      P.forEach((p) => {
        if (Math.hypot(p.x - x, p.y - y) < p.r + 10) {
          for (let k = 0; k < 10; k++)
            S.push({
              x: p.x,
              y: p.y,
              vx: (Math.random() - 0.5) * 6,
              vy: (Math.random() - 0.5) * 6,
              l: 1,
            });
          Object.assign(p, mk());
        }
      });
    });
    const star = (x, y, s) => {
      c.beginPath();
      c.moveTo(x, y - s);
      c.quadraticCurveTo(x, y, x + s, y);
      c.quadraticCurveTo(x, y, x, y + s);
      c.quadraticCurveTo(x, y, x - s, y);
      c.quadraticCurveTo(x, y, x, y - s);
      c.fill();
    };
    const loop = () => {
      c.clearRect(0, 0, W, H);
      P.forEach((p) => {
        c.globalAlpha =
          p.x < W * 0.6 && W > 960 ? 0.25 : 0.6;
        p.y -= p.v;
        p.w += 0.02;
        p.x += Math.sin(p.w) * 0.5;
        const d = Math.hypot(p.x - m.x, p.y - m.y);
        if (d < 90) {
          p.x += ((p.x - m.x) / d) * 2;
          p.y += ((p.y - m.y) / d) * 2;
        }
        if (p.y < -60) Object.assign(p, mk());
        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, 7);
        c.strokeStyle = "rgba(255,255,255,.35)";
        c.lineWidth = 1.5;
        c.stroke();
        c.fillStyle = "rgba(255,255,255,.04)";
        c.fill();
        c.beginPath();
        c.arc(
          p.x - p.r * 0.35,
          p.y - p.r * 0.35,
          p.r * 0.18,
          0,
          7,
        );
        c.fillStyle = "rgba(255,255,255,.8)";
        c.fill();
      });
      c.globalAlpha = 1;
      S = S.filter((s) => s.l > 0);
      S.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.l -= 0.03;
        c.fillStyle = `rgba(255,${(180 + s.l * 60) | 0},${(220 + s.l * 30) | 0},${s.l})`;
        star(s.x, s.y, 3 + s.l * 7);
      });
      requestAnimationFrame(loop);
    };
    if (
      !matchMedia("(prefers-reduced-motion:reduce)").matches
    )
      loop();
    else fog.style.display = "none";
  }
  /* quote calculator */
  const f = $("#bookForm");
  if (f) {
    const base = {
        Residential: 90,
        Apartment: 80,
        "Deep Cleaning": 150,
        "Move-In / Move-Out": 160,
        Office: 110,
        Gym: 130,
        Construction: 220,
        "Airbnb Turnover": 100,
        "Windows & Blinds": 95,
      },
      fr = {
        "One-time": 1,
        Weekly: 0.85,
        "Bi-weekly": 0.9,
        Monthly: 0.93,
      },
      sq = [0, 25, 55, 95, 150];
    const calc = () => {
      const v = (n) => f.elements[n].value,
        s = v("service"),
        bd = +v("beds"),
        ba = +v("baths"),
        q = +v("sqft"),
        fq = v("freq");
      let ad = 0,
        al = [];
      $$("input[name=addon]:checked").forEach((a) => {
        ad += +a.dataset.p;
        al.push(a.value);
      });
      const sub = base[s] + bd * 18 + ba * 22 + sq[q];
      const disc = sub * (1 - fr[fq]);
      const tot = Math.round((sub - disc + ad) / 5) * 5;
      $("#qSvc").textContent = s;
      $("#qBase").textContent = "$" + base[s];
      $("#qRooms").textContent =
        "$" + (bd * 18 + ba * 22 + sq[q]);
      $("#qAdd").textContent = "$" + ad;
      $("#qDisc").textContent = "-$" + Math.round(disc);
      $("#qAmt").textContent =
        `$${Math.round((tot * 0.9) / 5) * 5} – $${Math.round((tot * 1.1) / 5) * 5}`;
      return {
        s,
        bd,
        ba,
        fq,
        al,
        tot,
        range: $("#qAmt").textContent,
        sqf: f.elements.sqft.selectedOptions[0].text,
      };
    };
    f.addEventListener("input", calc);
    calc();
    f.addEventListener("submit", async (e) => {
      e.preventDefault();
      const q = calc(),
        d = Object.fromEntries(new FormData(f)),
        m = $("#msg"),
        btn = f.querySelector("button[type=submit]");
      btn.disabled = true;
      btn.textContent = "Sending…";
      m.className = "msg";
      const body = {
        _subject: `Your Marina Cleaning Services quote – ${q.s}`,
        _cc: window.MARINA.ownerEmail,
        _template: "table",
        _captcha: "false",
        Name: d.name,
        Email: d.email,
        email: d.email,
        Phone: d.phone,
        Service: q.s,
        Bedrooms: q.bd,
        Bathrooms: q.ba,
        "Home size": q.sqf,
        Frequency: q.fq,
        "Add-ons": q.al.join(", ") || "None",
        "Preferred date": d.date,
        "Preferred time": d.time,
        Address: d.address,
        Notes: d.notes || "-",
        "Estimated quote": q.range,
      };
      try {
        const r = await fetch(
          "https://formsubmit.co/ajax/" +
            window.MARINA.ownerEmail,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(body),
          },
        );
        if (!r.ok) throw 0;
        m.className = "msg ok";
        m.textContent = `Thank you, ${d.name.split(" ")[0]}! Your quote (${q.range}) was emailed to ${d.email}. Marina will confirm your booking shortly.`;
        f.reset();
        calc();
      } catch (x) {
        m.className = "msg err";
        m.textContent =
          "We could not send your booking. Please call " +
          window.MARINA.phone +
          " or try again.";
      }
      btn.disabled = false;
      btn.textContent = "Book & email my quote";
    });
  }
})();
