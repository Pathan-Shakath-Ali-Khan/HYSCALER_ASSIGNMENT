const DB_KEYS = {
  users: "hylearn_users",
  courses: "hylearn_courses",
  enrollments: "hylearn_enrollments", 
  session: "hylearn_session", 
};

// Utilities
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);
const nowIso = () => new Date().toISOString();
const read = (k, fallback) => { try { const v = JSON.parse(localStorage.getItem(k)); return v ?? fallback; } catch { return fallback; } };
const write = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const ensure = (k, v) => { if (localStorage.getItem(k) == null) write(k, v); };


function seedCourses() {
  const existing = read(DB_KEYS.courses, []);
  if (existing.length > 0) return;
  const demo = [
    {
      id: uid(),
      title: "JavaScript Foundations",
      description: "Learn variables, functions, DOM, and async JS from scratch.",
      category: "Programming",
      thumbText: "JS",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      resources: {
        pdfs: [{ name: "JS Guide.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }],
        ppts: [{ name: "JS Slides.pptx", url: "https://file-examples.com/storage/fe0e1f2d2d7/example.pptx" }],
        slideshows: [{ name: "Intro Slides", url: "https://docs.google.com/presentation/" }],
      },
      quiz: [
        { id: uid(), q: "Which keyword declares a variable?", options: ["var", "let", "const", "All of the above"], correctIndex: 3 },
        { id: uid(), q: "What does DOM stand for?", options: ["Document Object Model", "Data Object Map", "Digital Object Model", "None"], correctIndex: 0 },
      ],
      createdAt: nowIso(),
    },
    {
      id: uid(),
      title: "HTML & CSS Essentials",
      description: "Build beautiful, responsive websites with modern CSS.",
      category: "Design",
      thumbText: "HTML/CSS",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      resources: {
        pdfs: [{ name: "Flexbox Cheat Sheet.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }],
        ppts: [],
        slideshows: [],
      },
      quiz: [
        { id: uid(), q: "Which tag creates a hyperlink?", options: ["<a>", "<link>", "<href>", "<url>"], correctIndex: 0 },
      ],
      createdAt: nowIso(),
    },
    {
      id: uid(),
      title: "Python Basics",
      description: "Start programming with Python: syntax, data types, and control flow.",
      category: "Programming",
      thumbText: "PY",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      resources: {
        pdfs: [{ name: "Python Cheat Sheet.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }],
        ppts: [],
        slideshows: [],
      },
      quiz: [
        { id: uid(), q: "Which keyword defines a function?", options: ["func", "def", "function", "lambda"], correctIndex: 1 },
      ],
      createdAt: nowIso(),
    },
    {
      id: uid(),
      title: "SQL Fundamentals",
      description: "Query relational databases using SELECT, JOIN, GROUP BY, and more.",
      category: "Data",
      thumbText: "SQL",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      resources: {
        pdfs: [{ name: "SQL Reference.pdf", url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" }],
        ppts: [],
        slideshows: [],
      },
      quiz: [
        { id: uid(), q: "Which clause filters rows?", options: ["ORDER BY", "FILTER", "WHERE", "HAVING"], correctIndex: 2 },
      ],
      createdAt: nowIso(),
    },
    {
      id: uid(),
      title: "React Basics",
      description: "Build interactive UIs with components, props, and state.",
      category: "Frontend",
      thumbText: "REACT",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      resources: { pdfs: [], ppts: [], slideshows: [] },
      quiz: [ { id: uid(), q: "What hook manages state?", options: ["useState", "useEffect", "useMemo", "useRef"], correctIndex: 0 } ],
      createdAt: nowIso(),
    },
    {
      id: uid(),
      title: "Data Science Intro",
      description: "Understand basics of data analysis and visualization.",
      category: "Data",
      thumbText: "DS",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      resources: { pdfs: [], ppts: [], slideshows: [] },
      quiz: [ { id: uid(), q: "Which library plots charts in Python?", options: ["NumPy", "Matplotlib", "Pandas", "SciPy"], correctIndex: 1 } ],
      createdAt: nowIso(),
    },
    {
      id: uid(),
      title: "Cybersecurity Basics",
      description: "Learn threats, encryption basics, and safe online practices.",
      category: "Security",
      thumbText: "SEC",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      resources: { pdfs: [], ppts: [], slideshows: [] },
      quiz: [ { id: uid(), q: "HTTPS uses which protocol for security?", options: ["SSL/TLS", "FTP", "SSH", "SMTP"], correctIndex: 0 } ],
      createdAt: nowIso(),
    },
    {
      id: uid(),
      title: "Project Management Essentials",
      description: "Master fundamentals of scope, schedule, and stakeholders.",
      category: "Management",
      thumbText: "PM",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      resources: { pdfs: [], ppts: [], slideshows: [] },
      quiz: [ { id: uid(), q: "Agile uses which iteration unit?", options: ["Sprints", "Milestones", "Tickets", "Waves"], correctIndex: 0 } ],
      createdAt: nowIso(),
    },
    {
      id: uid(),
      title: "Machine Learning 101",
      description: "Supervised vs unsupervised learning and common algorithms.",
      category: "AI/ML",
      thumbText: "ML",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      resources: { pdfs: [], ppts: [], slideshows: [] },
      quiz: [ { id: uid(), q: "Which is a supervised algorithm?", options: ["K-Means", "Linear Regression", "PCA", "DBSCAN"], correctIndex: 1 } ],
      createdAt: nowIso(),
    },
    {
      id: uid(),
      title: "Cloud Fundamentals",
      description: "Intro to IaaS, PaaS, SaaS and cloud deployment models.",
      category: "Cloud",
      thumbText: "CLOUD",
      videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      resources: { pdfs: [], ppts: [], slideshows: [] },
      quiz: [ { id: uid(), q: "Which is a service model?", options: ["LAN", "IaaS", "HTTP", "DNS"], correctIndex: 1 } ],
      createdAt: nowIso(),
    },
  ];
  write(DB_KEYS.courses, demo);
}

// Persistence boot
ensure(DB_KEYS.users, []);
ensure(DB_KEYS.courses, []);
ensure(DB_KEYS.enrollments, {});
ensure(DB_KEYS.session, null);
seedCourses();

// API helpers (PHP backend). These calls are optional; UI continues if backend is unavailable.
const API = {
  get: (path) => fetch(path, { credentials: 'include' }).then(r => r.json()).catch(() => null),
  post: (path, body) => fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(body || {}) }).then(r => r.json()).catch(() => null),
};

async function syncCoursesOnce() {
  const resp = await API.get('api/courses.php?action=list');
  if (resp && Array.isArray(resp.courses)) {
    const serverCourses = resp.courses.map(c => ({
      id: c.id,
      title: c.title,
      description: c.description,
      category: c.category,
      thumbText: c.thumb_text || (c.title || "?").slice(0,4).toUpperCase(),
      videoUrl: c.video_url || "",
      resources: { pdfs: [], ppts: [], slideshows: [] },
      quiz: [],
      createdAt: c.created_at || nowIso(),
    }));
    write(DB_KEYS.courses, serverCourses);
    return true;
  }
  return false;
}

// Session helpers
function getCurrentUser() {
  const session = read(DB_KEYS.session, null);
  if (!session) return null;
  const users = read(DB_KEYS.users, []);
  return users.find(u => u.id === session.userId) || null;
}
function setSession(userId) { write(DB_KEYS.session, { userId }); }
function clearSession() { write(DB_KEYS.session, null); }

// Auth helpers
const ADMIN_EMAIL = "admin@hylearn.com";
const ADMIN_PASS = "admin123";

function createUser({ name, email, password, provider = "local" }) {
  const users = read(DB_KEYS.users, []);
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) throw new Error("Email already registered");
  const user = { id: uid(), name, email, password, provider, createdAt: nowIso(), role: email === ADMIN_EMAIL ? "admin" : "user" };
  users.push(user);
  write(DB_KEYS.users, users);
  return user;
}
function login({ email, password }) {
  const users = read(DB_KEYS.users, []);
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error("User not found");
  if (user.provider === "local" && user.password !== password) throw new Error("Invalid credentials");
  setSession(user.id);
  return user;
}

// Course helpers
function listCourses() { return read(DB_KEYS.courses, []); }
function addCourse({ title, description, category, videoUrl }) {
  const courses = listCourses();
  const course = {
    id: uid(), title, description, category, thumbText: (title || "?").split(" ").map(w => w[0]).join("").slice(0,4).toUpperCase(), videoUrl,
    resources: { pdfs: [], ppts: [], slideshows: [] }, quiz: [], createdAt: nowIso()
  };
  courses.unshift(course);
  write(DB_KEYS.courses, courses);
  return course;
}
function deleteCourse(courseId) {
  const courses = listCourses().filter(c => c.id !== courseId);
  write(DB_KEYS.courses, courses);
  // Clean enrollments references
  const enrollments = read(DB_KEYS.enrollments, {});
  Object.keys(enrollments).forEach(userId => {
    if (enrollments[userId] && enrollments[userId][courseId]) {
      delete enrollments[userId][courseId];
      if (Object.keys(enrollments[userId]).length === 0) delete enrollments[userId];
    }
  });
  write(DB_KEYS.enrollments, enrollments);
}
function addQuizQuestion(courseId, { q, options, correctIndex }) {
  const courses = listCourses();
  const idx = courses.findIndex(c => c.id === courseId);
  if (idx === -1) throw new Error("Course not found");
  courses[idx].quiz.push({ id: uid(), q, options, correctIndex });
  write(DB_KEYS.courses, courses);
}
function addResource(courseId, type, { name, url }) {
  const courses = listCourses();
  const c = courses.find(x => x.id === courseId);
  if (!c) throw new Error("Course not found");
  if (!c.resources[type]) c.resources[type] = [];
  c.resources[type].push({ name, url });
  write(DB_KEYS.courses, courses);
}

// Enrollment & progress
function enroll(userId, courseId) {
  const enrollments = read(DB_KEYS.enrollments, {});
  enrollments[userId] = enrollments[userId] || {};
  enrollments[userId][courseId] = enrollments[userId][courseId] || { progressPct: 0, secondsWatched: 0, quizScores: {}, certificateEarned: false, enrolledAt: nowIso() };
  write(DB_KEYS.enrollments, enrollments);
}
function isEnrolled(userId, courseId) {
  const enrollments = read(DB_KEYS.enrollments, {});
  return Boolean(enrollments[userId] && enrollments[userId][courseId]);
}
function getEnrollment(userId, courseId) {
  const enrollments = read(DB_KEYS.enrollments, {});
  return enrollments[userId]?.[courseId] || null;
}
function updateWatchTime(userId, courseId, secondsDelta) {
  const enrollments = read(DB_KEYS.enrollments, {});
  if (!enrollments[userId] || !enrollments[userId][courseId]) return;
  enrollments[userId][courseId].secondsWatched += secondsDelta;
  write(DB_KEYS.enrollments, enrollments);
}
function updateProgress(userId, courseId, progressPct) {
  const enrollments = read(DB_KEYS.enrollments, {});
  if (!enrollments[userId] || !enrollments[userId][courseId]) return;
  enrollments[userId][courseId].progressPct = Math.max(enrollments[userId][courseId].progressPct, progressPct);
  if (enrollments[userId][courseId].progressPct >= 100) enrollments[userId][courseId].certificateEarned = true;
  write(DB_KEYS.enrollments, enrollments);
}
function recordQuizScore(userId, courseId, quizId, scorePct) {
  const enrollments = read(DB_KEYS.enrollments, {});
  if (!enrollments[userId] || !enrollments[userId][courseId]) return;
  enrollments[userId][courseId].quizScores[quizId] = Math.max(enrollments[userId][courseId].quizScores[quizId] || 0, scorePct);
  // Simple heuristic: if quiz >= 80%, mark progress 100
  if (scorePct >= 80) enrollments[userId][courseId].progressPct = 100;
  if (enrollments[userId][courseId].progressPct >= 100) enrollments[userId][courseId].certificateEarned = true;
  write(DB_KEYS.enrollments, enrollments);
}

// Router
const app = document.getElementById("app");
const routes = {};
function route(path, renderer) { routes[path] = renderer; }
function navigate(path) { window.location.hash = path; }
window.addEventListener("hashchange", render);

// UI Helpers
function h(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") el.className = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "html") el.innerHTML = v;
    else el.setAttribute(k, v);
  });
  if (!Array.isArray(children)) children = [children];
  children.filter(Boolean).forEach(c => el.appendChild(typeof c === "string" ? document.createTextNode(c) : c));
  return el;
}

function appBar() {
  const user = getCurrentUser();
  return h("div", { class: "appbar" }, [
    h("div", { class: "container appbar-inner" }, [
      h("div", { class: "logo" }, [document.createTextNode("HYLEARN")]),
      user && user.role === "user" && h("div", { class: "nav" }, [
        aLink("Dashboard", "#/dashboard"),
        aLink("My Learning", "#/mylearning"),
        aLink("Catalog", "#/catalog"),
      ]),
      user && user.role === "admin" && h("div", { class: "nav" }, [
        aLink("Admin", "#/admin"),
      ]),
      h("div", { class: "right flex" }, [
        !user && aLink("Admin", "#/admin-login"),
        user ? h("span", { class: "tag" }, [user.name || user.email]) : aLink("Log in", "#/login"),
        user && h("button", { class: "ghost", onclick: () => { clearSession(); render(); navigate("#/"); } }, ["Logout"])
      ])
    ])
  ]);
}
function aLink(text, href) { const a = h("a", { href }, [text]); a.addEventListener("click", (e) => { e.preventDefault(); navigate(href); }); return a; }

// Views
function Landing() {
  const hero = h("section", { class: "hero" }, [
    h("div", { class: "container" }, [
      h("div", { class: "row" }, [
        h("div", {}, [
          h("div", { class: "brand" }, ["HYLEARN"]),
          h("div", { class: "spacer" }),
          h("p", { class: "subtitle" }, ["Learn anything, anytime. Enroll for free and track your progress with certificates."]),
          h("div", { class: "spacer-lg" }),
          h("div", { class: "flex" }, [
            h("button", { onclick: () => navigate("#/signup") }, ["Get Started"]),
            h("button", { class: "ghost", onclick: () => navigate("#/catalog") }, ["Browse Catalog"]),
          ])
        ]),
        h("div", { class: "card auth-card" }, [AuthCard()])
      ])
    ])
  ]);
  return [appBar(), hero, Footer()];
}

function AuthCard(mode = "login") {
  const container = h("div");
  function renderCard() {
    container.innerHTML = "";
    const isLogin = mode === "login";
    const title = isLogin ? "Login" : "Sign Up";
    const form = h("div", { class: "grid" }, [
      !isLogin && field("Full Name", "text", "name"),
      field("Email", "email", "email"),
      field("Password", "password", "password"),
      h("button", { onclick: onSubmit }, [title])
    ].filter(Boolean));
    const social = h("div", { class: "grid social-btns" }, [
      h("button", { class: "ghost", onclick: () => socialLogin("google") }, [iconCircle("G"), " Continue with Google"]),
      h("button", { class: "ghost", onclick: () => socialLogin("facebook") }, [iconCircle("f"), " Continue with Facebook"]),
    ]);
    container.appendChild(h("h2", {}, [title]));
    container.appendChild(h("p", { class: "muted" }, [isLogin ? "Welcome back to HYLEARN" : "Create your HYLEARN account"]));
    container.appendChild(h("div", { class: "spacer" }));
    container.appendChild(form);
    container.appendChild(h("div", { class: "spacer" }));
    container.appendChild(social);
    container.appendChild(h("div", { class: "spacer" }));
    container.appendChild(h("div", { class: "muted" }, [
      isLogin ? "No account? " : "Already have an account? ",
      aSwap(isLogin ? "Sign up" : "Log in", () => { mode = isLogin ? "signup" : "login"; renderCard(); })
    ]));

    async function onSubmit() {
      const values = readForm(container);
      values.email = (values.email || '').trim();
      values.password = (values.password || '').trim();
      try {
        if (isLogin) {
          // Allow admin via main login as well
          if (values.email === ADMIN_EMAIL && values.password === ADMIN_PASS) {
            let users = read(DB_KEYS.users, []);
            let admin = users.find(u => u.email === ADMIN_EMAIL);
            if (!admin) admin = createUser({ name: "Admin", email: ADMIN_EMAIL, password: ADMIN_PASS });
            setSession(admin.id);
          } else {
            // Try backend login first
            const resp = await API.post('api/auth.php?action=login', { email: values.email, password: values.password });
            if (resp && resp.ok && resp.user) {
              // Mirror to localStorage session and user list
              const users = read(DB_KEYS.users, []);
              if (!users.find(u => u.id === resp.user.id)) {
                users.push({ id: resp.user.id, name: resp.user.name, email: resp.user.email, password: '', provider: 'server', createdAt: nowIso(), role: resp.user.role });
                write(DB_KEYS.users, users);
              }
              setSession(resp.user.id);
            } else {
              // Fallback local login
              login({ email: values.email, password: values.password });
            }
          }
        } else {
          // Try backend signup first
          const resp = await API.post('api/auth.php?action=signup', { name: (values.name || '').trim(), email: values.email, password: values.password });
          let user;
          if (resp && resp.ok && resp.user) {
            user = resp.user;
            const users = read(DB_KEYS.users, []);
            if (!users.find(u => u.id === user.id)) {
              users.push({ id: user.id, name: user.name, email: user.email, password: '', provider: 'server', createdAt: nowIso(), role: user.role });
              write(DB_KEYS.users, users);
            }
          } else {
            user = createUser({ name: (values.name || '').trim(), email: values.email, password: values.password });
          }
          setSession(user.id);
        }
        render();
        const me = getCurrentUser();
        navigate(me && me.role === 'admin' ? "#/admin" : "#/dashboard");
      } catch (e) { alert(e.message); }
    }
    function socialLogin(provider) {
      // Mock: create or login user with provider
      const email = `${provider}_${uid().slice(0,5)}@example.com`;
      const name = provider === "google" ? "Google User" : "Facebook User";
      let users = read(DB_KEYS.users, []);
      let user = users.find(u => u.email === email);
      if (!user) user = createUser({ name, email, password: "", provider });
      setSession(user.id);
      render();
      navigate("#/dashboard");
    }
  }
  renderCard();
  return container;
}

function LoginView() { return [appBar(), h("div", { class: "container" }, [h("div", { class: "card auth-card" }, [AuthCard("login")])]), Footer()]; }
function SignupView() { return [appBar(), h("div", { class: "container" }, [h("div", { class: "card auth-card" }, [AuthCard("signup")])]), Footer()]; }

function Dashboard() {
  const user = getCurrentUser(); if (!user || user.role !== "user") return navigate("#/login");
  const container = h("div", { class: "container" });
  const grid = h("div", { class: "grid courses" });
  function draw() {
    const courses = listCourses();
    grid.innerHTML = "";
    courses.map(CourseCard).forEach(n => grid.appendChild(n));
  }
  (async () => { await syncCoursesOnce(); draw(); })();
  draw();
  return [appBar(), container.appendChild(h("div", {}, [
    h("div", { class: "spacer" }),
    h("h2", {}, ["Welcome, ", user.name || user.email]),
    h("p", { class: "muted" }, ["Explore courses and start learning for free."]),
    h("div", { class: "spacer" }),
    grid,
    h("div", { class: "spacer" }),
  ])) && container, Footer()];
}

function Catalog() {
  const user = getCurrentUser();
  const container = h("div", { class: "container" });
  const grid = h("div", { class: "grid courses" });
  function draw() {
    const courses = listCourses();
    grid.innerHTML = "";
    courses.map(CourseCard).forEach(n => grid.appendChild(n));
  }
  (async () => { await syncCoursesOnce(); draw(); })();
  draw();
  return [appBar(), container.appendChild(h("div", {}, [
    h("div", { class: "spacer" }),
    h("h2", {}, ["Catalog"]),
    grid,
    h("div", { class: "spacer" }),
  ])) && container, Footer()];
}

function MyLearning() {
  const user = getCurrentUser(); if (!user) return navigate("#/login");
  const enrollments = read(DB_KEYS.enrollments, {})[user.id] || {};
  const courses = listCourses().filter(c => enrollments[c.id]);
  const rows = courses.map(c => {
    const e = enrollments[c.id];
    const hh = Math.floor(e.secondsWatched / 3600).toString().padStart(2, "0");
    const mm = Math.floor((e.secondsWatched % 3600) / 60).toString().padStart(2, "0");
    const ss = Math.floor(e.secondsWatched % 60).toString().padStart(2, "0");
    const certBtn = e.certificateEarned ? h("button", { class: "ghost", onclick: () => downloadCertificate(user, c, e) }, ["Download Certificate"]) : h("span", { class: "muted" }, ["Not yet"]);
    return h("tr", {}, [
      h("td", {}, [c.title]),
      h("td", {}, [`${e.progressPct}%`]),
      h("td", {}, [`${hh}:${mm}:${ss}`]),
      h("td", {}, [certBtn]),
      h("td", {}, [h("button", { onclick: () => navigate(`#/course/${c.id}`) }, ["Resume"])])
    ]);
  });
  return [appBar(), h("div", { class: "container" }, [
    h("div", { class: "spacer" }),
    h("h2", {}, ["My Learning"]),
    h("div", { class: "card" }, [
      h("table", {}, [
        h("thead", {}, [h("tr", {}, [h("th", {}, ["Course"]), h("th", {}, ["Progress"]), h("th", {}, ["Time Spent"]), h("th", {}, ["Certificate"]), h("th", {}, ["Action"])])]),
        h("tbody", {}, rows.length ? rows : [h("tr", {}, [h("td", { colspan: "5", class: "muted" }, ["No enrollments yet. Go to ", aLink("Catalog", "#/catalog"), "."])])])
      ])
    ]),
    h("div", { class: "spacer" }),
  ]), Footer()];
}

function CourseCard(course) {
  const user = getCurrentUser();
  const enrolled = user ? isEnrolled(user.id, course.id) : false;
  return h("div", { class: "course" }, [
    h("div", { class: "thumb" }, [course.thumbText]),
    h("div", { class: "body" }, [
      h("div", { class: "title" }, [course.title]),
      h("div", { class: "muted" }, [course.description]),
      h("div", { class: "flex" }, [
        h("span", { class: "tag" }, [course.category || "General"]),
        h("span", { class: "right" }),
        enrolled ? h("button", { onclick: () => navigate(`#/course/${course.id}`) }, ["View"]) : h("button", { onclick: async () => {
          const u = getCurrentUser(); if (!u) return navigate("#/login");
          // Try backend enroll
          const resp = await API.post('api/enrollments.php?action=enroll', { courseId: course.id });
          enroll(u.id, course.id);
          render(); alert("Enrolled successfully!"); navigate(`#/course/${course.id}`);
        } }, ["Enroll Free"]) ])
    ])
  ]);
}

function CourseDetail(params) {
  const user = getCurrentUser(); if (!user) return navigate("#/login");
  const courseId = params.id;
  const course = listCourses().find(c => c.id === courseId);
  if (!course) return [appBar(), h("div", { class: "container" }, [h("p", {}, ["Course not found"])])];
  if (!isEnrolled(user.id, courseId)) enroll(user.id, courseId);

  const tabs = ["Video", "PDF", "PPT", "Slideshow", "Quiz", "Assignments"];
  let active = "Video";
  const content = h("div");
  let watchTimer = null;

  function renderTabs() {
    const tabEls = tabs.map(t => h("div", { class: `tab ${active === t ? 'active' : ''}`, onclick: () => { active = t; renderContent(); } }, [t]));
    return h("div", { class: "tabs" }, tabEls);
  }
  function renderContent() {
    content.innerHTML = "";
    if (active === "Video") {
      const video = h("video", { class: "video", controls: true }, []);
      video.src = course.videoUrl;
      content.appendChild(video);
      if (watchTimer) clearInterval(watchTimer);
      watchTimer = setInterval(async () => {
        updateWatchTime(user.id, courseId, 1);
        await API.post('api/progress.php?action=watch', { courseId, seconds: 1 });
      }, 1000);
      // Naive progress: watching 2 minutes sets 100%
      video.addEventListener("timeupdate", () => {
        const pct = Math.min(100, Math.round((video.currentTime / 120) * 100));
        updateProgress(user.id, courseId, pct);
        API.post('api/progress.php?action=update', { courseId, progressPct: pct });
      });
    } else if (active === "PDF") {
      content.appendChild(resourceList(course, "pdfs"));
      // Try fetching latest resources from backend
      API.get(`api/resources.php?action=list&courseId=${encodeURIComponent(courseId)}`).then(resp => {
        if (resp && Array.isArray(resp.resources)) {
          const mapped = { pdfs: [], ppts: [], slideshows: [] };
          resp.resources.forEach(r => {
            if (r.type === 'pdf') mapped.pdfs.push({ name: r.name, url: r.url });
            if (r.type === 'ppt') mapped.ppts.push({ name: r.name, url: r.url });
            if (r.type === 'slideshow') mapped.slideshows.push({ name: r.name, url: r.url });
          });
          course.resources = mapped;
          content.innerHTML = "";
          content.appendChild(resourceList(course, "pdfs"));
        }
      });
    } else if (active === "PPT") {
      content.appendChild(resourceList(course, "ppts"));
      API.get(`api/resources.php?action=list&courseId=${encodeURIComponent(courseId)}`).then(resp => {
        if (resp && Array.isArray(resp.resources)) {
          const mapped = { pdfs: [], ppts: [], slideshows: [] };
          resp.resources.forEach(r => {
            if (r.type === 'pdf') mapped.pdfs.push({ name: r.name, url: r.url });
            if (r.type === 'ppt') mapped.ppts.push({ name: r.name, url: r.url });
            if (r.type === 'slideshow') mapped.slideshows.push({ name: r.name, url: r.url });
          });
          course.resources = mapped;
          content.innerHTML = "";
          content.appendChild(resourceList(course, "ppts"));
        }
      });
    } else if (active === "Slideshow") {
      content.appendChild(resourceList(course, "slideshows"));
      API.get(`api/resources.php?action=list&courseId=${encodeURIComponent(courseId)}`).then(resp => {
        if (resp && Array.isArray(resp.resources)) {
          const mapped = { pdfs: [], ppts: [], slideshows: [] };
          resp.resources.forEach(r => {
            if (r.type === 'pdf') mapped.pdfs.push({ name: r.name, url: r.url });
            if (r.type === 'ppt') mapped.ppts.push({ name: r.name, url: r.url });
            if (r.type === 'slideshow') mapped.slideshows.push({ name: r.name, url: r.url });
          });
          course.resources = mapped;
          content.innerHTML = "";
          content.appendChild(resourceList(course, "slideshows"));
        }
      });
    } else if (active === "Quiz") {
      // Fetch latest quiz list
      API.get(`api/quiz.php?action=list&courseId=${encodeURIComponent(courseId)}`).then(resp => {
        if (resp && Array.isArray(resp.quiz)) {
          course.quiz = resp.quiz;
          content.innerHTML = "";
          content.appendChild(QuizView(user, course));
        }
      });
      content.appendChild(QuizView(user, course));
    } else if (active === "Assignments") {
      content.appendChild(AssignmentsView(user, course));
    }
  }
  function cleanup() { if (watchTimer) clearInterval(watchTimer); }

  const view = [appBar(), h("div", { class: "container" }, [
    h("div", { class: "spacer" }),
    h("h2", {}, [course.title]),
    h("p", { class: "muted" }, [course.description]),
    renderTabs(),
    h("div", { class: "card" }, [content]),
    h("div", { class: "spacer" }),
  ]), Footer()];
  renderContent();

  // Clean timer on navigation
  window.addEventListener("hashchange", cleanup, { once: true });
  return view;
}

function resourceList(course, type) {
  const items = course.resources?.[type] || [];
  if (!items.length) return h("div", { class: "muted" }, ["No resources yet."]);
  return h("div", { class: "grid" }, items.map(it => h("a", { href: it.url, target: "_blank" }, [it.name])));
}

function QuizView(user, course) {
  const container = h("div", { class: "grid" });
  if (!course.quiz || !course.quiz.length) return h("div", { class: "muted" }, ["No quiz available yet."]);
  const form = h("div", { class: "grid" });
  const answers = {};
  course.quiz.forEach((q, idx) => {
    const block = h("div", { class: "card" }, [
      h("div", { class: "muted" }, [`Question ${idx + 1}`]),
      h("div", { style: "font-weight:600;margin:4px 0 10px 0" }, [q.q]),
      h("div", { class: "grid" }, q.options.map((opt, i) => {
        const id = `${q.id}_${i}`;
        const input = h("input", { type: "radio", name: q.id, id });
        input.addEventListener("change", () => { answers[q.id] = i; });
        return h("label", { for: id }, [h("div", { class: "flex" }, [input, h("span", {}, [opt])])]);
      }))
    ]);
    form.appendChild(block);
  });
  const submit = h("button", { onclick: () => {
    let correct = 0;
    course.quiz.forEach(q => { if (answers[q.id] === q.correctIndex) correct++; });
    const pct = Math.round((correct / course.quiz.length) * 100);
    recordQuizScore(user.id, course.id, "main", pct);
    API.post('api/quiz.php?action=score', { courseId: course.id, quizId: 'main', scorePct: pct });
    alert(`You scored ${pct}%`);
    render();
  } }, ["Submit Quiz"]);
  container.appendChild(form);
  container.appendChild(submit);
  return container;
}

function AssignmentsView(user, course) {
  const wrap = h("div", { class: "grid" });
  const listEl = h("div", { class: "grid" });
  const actions = h("div", { class: "flex" }, [
    h("button", { class: "ghost", onclick: () => fetchAndDraw() }, ["Refresh Assignments"])
  ]);
  wrap.appendChild(actions);
  wrap.appendChild(listEl);
  function draw(assignments, submissionsMap) {
    listEl.innerHTML = "";
    if (!assignments || !assignments.length) {
      listEl.appendChild(h("div", { class: "muted" }, ["No assignments yet."]));
      return;
    }
    assignments.forEach(a => {
      const sub = submissionsMap[a.id];
      const card = h("div", { class: "card" }, [
        h("div", { class: "flex" }, [h("strong", {}, [a.title]), a.due_date ? h("span", { class: "right tag" }, ["Due: ", new Date(a.due_date).toLocaleString()]) : null]),
        h("div", { class: "spacer" }),
        h("div", {}, [a.description || "No description."]),
        h("div", { class: "spacer" }),
        sub ? h("div", { class: "muted" }, ["Submitted on ", new Date(sub.submitted_at).toLocaleString()]) : SubmissionForm(user, course, a)
      ]);
      listEl.appendChild(card);
    });
  }
  function fetchAndDraw() {
    const bust = `&_=${Date.now()}`;
    Promise.all([
      API.get(`api/assignments.php?action=list&courseId=${encodeURIComponent(course.id)}${bust}`),
      API.get(`api/assignments.php?action=mine&courseId=${encodeURIComponent(course.id)}${bust}`)
    ]).then(([alist, mine]) => {
      if (alist && alist.error) {
        listEl.innerHTML = "";
        listEl.appendChild(h("div", { class: "muted" }, [alist.error]));
        return;
      }
      const assignments = (alist && alist.assignments) || [];
      const submissionsMap = {};
      (mine && mine.submissions || []).forEach(s => { submissionsMap[s.assignment_id] = s; });
      draw(assignments, submissionsMap);
    }).catch(() => {
      listEl.innerHTML = "";
      listEl.appendChild(h("div", { class: "muted" }, ["Could not fetch assignments. Is the server running?"]));
    });
  }
  fetchAndDraw();
  return wrap;
}

function SubmissionForm(user, course, assignment) {
  const form = h("div", { class: "form-grid" }, [
    h("div", {}, [labelEl("Your Answer"), inputEl("text", `ans_${assignment.id}`)]),
    h("div", {}, [labelEl("Attachment URL (optional)"), inputEl("url", `att_${assignment.id}`)]),
    h("button", { onclick: async () => {
      const answer = document.querySelector(`input[name=ans_${assignment.id}]`).value.trim();
      const attachment = document.querySelector(`input[name=att_${assignment.id}]`).value.trim();
      if (!answer && !attachment) return alert("Provide an answer or attachment");
      await API.post('api/assignments.php?action=submit', { assignmentId: assignment.id, answerText: answer, attachmentUrl: attachment });
      alert("Assignment submitted");
      render();
    } }, ["Submit Assignment"])
  ]);
  return form;
}

function AdminLogin() {
  const user = getCurrentUser(); if (user && user.role === "admin") return navigate("#/admin");
  const wrap = h("div", { class: "container" }, [
    h("div", { class: "spacer" }),
    h("div", { class: "card auth-card" }, [
      h("h2", {}, ["Admin Login"]),
      h("div", { class: "spacer" }),
      field("Email", "email", "email"),
      field("Password", "password", "password"),
      h("div", { class: "spacer" }),
      h("button", { onclick: () => {
        const vals = readForm(wrap);
        const email = (vals.email || '').trim();
        const password = (vals.password || '').trim();
        if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
          let users = read(DB_KEYS.users, []);
          let admin = users.find(u => u.email === ADMIN_EMAIL);
          if (!admin) admin = createUser({ name: "Admin", email: ADMIN_EMAIL, password: ADMIN_PASS });
          setSession(admin.id);
          navigate("#/admin");
          render();
        } else { alert("Invalid admin credentials"); }
      } }, ["Login"])
    ]),
    h("div", { class: "spacer" }),
  ]);
  return [appBar(), wrap, Footer()];
}

function AdminPanel() {
  const user = getCurrentUser(); if (!user || user.role !== "admin") return navigate("#/admin-login");
  const courses = listCourses();
  const form = h("div", { class: "card" }, [
    h("h3", {}, ["Add New Course"]),
    h("div", { class: "form-grid" }, [
      field("Title", "text", "title"),
      field("Description", "text", "description"),
      field("Category", "text", "category"),
      field("Video URL", "url", "videoUrl"),
      h("button", { onclick: async () => {
        const v = readForm(form);
        if (!v.title || !v.description) return alert("Title and Description required");
        // Save to backend first (best effort)
        await API.post('api/courses.php?action=add', { title: v.title, description: v.description, category: v.category, videoUrl: v.videoUrl });
        const c = addCourse({ title: v.title, description: v.description, category: v.category, videoUrl: v.videoUrl });
        alert("Course added");
        render();
      } }, ["Create Course"])
    ])
  ]);

  const manage = h("div", { class: "card" }, [
    h("h3", {}, ["Manage Courses (Add Quiz & Materials)"]),
    h("div", { class: "grid" }, courses.map(c => h("div", { class: "card" }, [
      h("div", { class: "flex" }, [
        h("strong", {}, [c.title]),
        h("span", { class: "right tag" }, [c.category || "General"]),
        h("button", { class: "danger", onclick: async () => {
          if (confirm(`Delete course "${c.title}"? This cannot be undone.`)) {
            await API.post('api/courses.php?action=delete', { id: c.id });
            deleteCourse(c.id);
            alert("Course deleted");
            render();
          }
        } }, ["Delete"])
      ]),
      h("div", { class: "spacer" }),
      h("div", { class: "form-grid" }, [
        h("div", {}, [labelEl("Add Assignment Title"), inputEl("text", `atitle_${c.id}`)]),
        h("div", {}, [labelEl("Assignment Description"), inputEl("text", `adesc_${c.id}`)]),
        h("div", {}, [labelEl("Due Date (YYYY-MM-DD HH:MM)"), inputEl("text", `adue_${c.id}`)]),
        h("button", { onclick: async () => {
          const title = document.querySelector(`input[name=atitle_${c.id}]`).value.trim();
          const description = document.querySelector(`input[name=adesc_${c.id}]`).value.trim();
          const due = document.querySelector(`input[name=adue_${c.id}]`).value.trim();
          if (!title) return alert("Assignment title required");
          const resp = await API.post('api/assignments.php?action=add', { courseId: c.id, title, description, dueDate: due || null });
          if (resp && resp.ok) {
            alert("Assignment added");
            render();
          } else {
            alert((resp && resp.error) || "Failed to add assignment. Ensure you're logged in as admin on the server.");
          }
        } }, ["Add Assignment"]),

        h("div", {}, [labelEl("Quiz Question"), inputEl("text", `q_${c.id}`)]),
        h("div", {}, [labelEl("Options (comma separated)"), inputEl("text", `opts_${c.id}`)]),
        h("div", {}, [labelEl("Correct Option Index (0-based)"), inputEl("number", `idx_${c.id}`, "0")]),
        h("button", { onclick: async () => {
          const q = document.querySelector(`input[name=q_${c.id}]`).value.trim();
          const opts = document.querySelector(`input[name=opts_${c.id}]`).value.split(",").map(s => s.trim()).filter(Boolean);
          const idx = parseInt(document.querySelector(`input[name=idx_${c.id}]`).value, 10) || 0;
          if (!q || !opts.length) return alert("Enter question and options");
          addQuizQuestion(c.id, { q, options: opts, correctIndex: Math.min(Math.max(idx, 0), opts.length - 1) });
          await API.post('api/quiz.php?action=add', { courseId: c.id, q, options: opts, correctIndex: Math.min(Math.max(idx, 0), opts.length - 1) });
          alert("Quiz question added");
          render();
        } }, ["Add Question"]),

        h("div", {}, [labelEl("Add PDF (name|url)"), inputEl("text", `pdf_${c.id}`)]),
        h("div", {}, [labelEl("Add PPT (name|url)"), inputEl("text", `ppt_${c.id}`)]),
        h("div", {}, [labelEl("Add Slideshow (name|url)"), inputEl("text", `slide_${c.id}`)]),
        h("div", { class: "flex" }, [
          h("button", { class: "ghost", onclick: () => addResFromField(c.id, "pdfs", `pdf_${c.id}`) }, ["Add PDF"]),
          h("button", { class: "ghost", onclick: () => addResFromField(c.id, "ppts", `ppt_${c.id}`) }, ["Add PPT"]),
          h("button", { class: "ghost", onclick: () => addResFromField(c.id, "slideshows", `slide_${c.id}`) }, ["Add Slideshow"]),
        ])
      ])
    ])))
  ]);

  async function addResFromField(courseId, type, fieldName) {
    const raw = document.querySelector(`input[name=${CSS.escape(fieldName)}]`).value.trim();
    if (!raw.includes("|")) return alert("Use format: name|url");
    const [name, url] = raw.split("|").map(s => s.trim());
    addResource(courseId, type, { name, url });
    await API.post('api/resources.php?action=add', { courseId, type: type === 'pdfs' ? 'pdf' : (type === 'ppts' ? 'ppt' : 'slideshow'), name, url });
    alert("Resource added");
    render();
  }

  return [appBar(), h("div", { class: "container" }, [
    h("div", { class: "spacer" }),
    h("h2", {}, ["Admin Panel"]),
    form,
    h("div", { class: "spacer" }),
    manage,
    h("div", { class: "spacer" }),
  ]), Footer()];
}

// Small UI helpers
function field(labelText, type, name) { return h("div", {}, [labelEl(labelText), inputEl(type, name)]); }
function labelEl(text) { return h("label", {}, [text]); }
function inputEl(type, name, value = "") { const i = h("input", { type, name, value }); return i; }
function readForm(root) {
  const inputs = root.querySelectorAll("input[name]");
  const out = {}; inputs.forEach(i => out[i.getAttribute("name")] = i.value);
  return out;
}
function aSwap(text, onClick) { const a = h("a", { href: "#" }, [text]); a.addEventListener("click", e => { e.preventDefault(); onClick(); }); return a; }
function iconCircle(txt) { return h("span", { class: "tag" }, [txt]); }
function Footer() { return h("div", { class: "footer" }, [h("div", { class: "container" }, ["© ", new Date().getFullYear().toString(), " HYLEARN"])]); }

// Router setup
route("#/", Landing);
route("#", Landing);
route("#/login", LoginView);
route("#/signup", SignupView);
route("#/dashboard", Dashboard);
route("#/catalog", Catalog);
route("#/mylearning", MyLearning);
route("#/course/:id", CourseDetail);
route("#/admin-login", AdminLogin);
route("#/admin", AdminPanel);

function matchRoute() {
  const hash = window.location.hash || "#/";
  // Param route: #/course/:id
  if (hash.startsWith("#/course/")) {
    const id = hash.replace("#/course/", "");
    return { view: routes["#/course/:id"], params: { id } };
  }
  const view = routes[hash] || routes["#/"];
  return { view, params: {} };
}

function render() {
  const { view, params } = matchRoute();
  const nodes = view(params) || [];
  app.innerHTML = "";
  (Array.isArray(nodes) ? nodes : [nodes]).forEach(n => app.appendChild(n));
}

// Boot initial route
render();


