{\rtf1\ansi\ansicpg1252\cocoartf2867
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 (() => \{\
  const $ = (s, root = document) => root.querySelector(s);\
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));\
\
  const toc = $("#toc");\
  const content = $("#content");\
  const searchInput = $("#searchInput");\
  const clearSearch = $("#clearSearch");\
  const toggleTheme = $("#toggleTheme");\
  const printBtn = $("#printBtn");\
  const toast = $("#toast");\
\
  // --- Config simple ---\
  const APP_VERSION = "vX.Y.Z"; // <- remplace ici (et id\'e9alement automatiser plus tard)\
  $("#appVersion").textContent = APP_VERSION;\
\
  // Stamp (juste pour rep\'e8re)\
  $("#buildStamp").textContent = `Manuel \'97 $\{APP_VERSION\}`;\
\
  // --- Theme ---\
  const themeKey = "vbs_manual_theme";\
  const applyTheme = (t) => \{\
    document.documentElement.dataset.theme = t;\
    toggleTheme.textContent = t === "light" ? "\uc0\u9728 " : "\u9790 ";\
  \};\
  const storedTheme = localStorage.getItem(themeKey);\
  if (storedTheme) applyTheme(storedTheme);\
\
  toggleTheme.addEventListener("click", () => \{\
    const current = document.documentElement.dataset.theme || "dark";\
    const next = current === "dark" ? "light" : "dark";\
    localStorage.setItem(themeKey, next);\
    applyTheme(next);\
  \});\
\
  // --- Print ---\
  printBtn.addEventListener("click", () => window.print());\
\
  // --- TOC auto depuis H2/H3 ---\
  const headings = $$("h2[id], h3[id]", content);\
  const frag = document.createDocumentFragment();\
\
  headings.forEach(h => \{\
    const a = document.createElement("a");\
    a.href = `#$\{h.id\}`;\
    a.textContent = h.textContent.trim();\
    a.className = h.tagName.toLowerCase() === "h3" ? "toc-h3" : "toc-h2";\
    frag.appendChild(a);\
  \});\
\
  toc.appendChild(frag);\
\
  // --- Active link au scroll ---\
  const links = $$("a", toc);\
  const byId = new Map(links.map(a => [a.getAttribute("href").slice(1), a]));\
\
  const setActive = (id) => \{\
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#$\{id\}`));\
  \};\
\
  const obs = new IntersectionObserver((entries) => \{\
    // on prend le plus visible\
    const visible = entries\
      .filter(e => e.isIntersecting)\
      .sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];\
    if (visible) setActive(visible.target.id);\
  \}, \{ rootMargin: "-20% 0px -70% 0px", threshold: [0.1, 0.2, 0.4, 0.6] \});\
\
  headings.forEach(h => obs.observe(h));\
\
  // --- Search (filtre sur TOC + sur contenu via highlight simple) ---\
  const showToast = (msg) => \{\
    toast.textContent = msg;\
    toast.classList.add("show");\
    setTimeout(() => toast.classList.remove("show"), 1400);\
  \};\
\
  const clearHighlights = () => \{\
    $$("mark.__hl", content).forEach(m => \{\
      const text = document.createTextNode(m.textContent);\
      m.replaceWith(text);\
    \});\
  \};\
\
  const highlight = (query) => \{\
    clearHighlights();\
    if (!query) return;\
\
    const q = query.toLowerCase();\
    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, \{\
      acceptNode(node) \{\
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;\
        const parentTag = node.parentElement?.tagName?.toLowerCase();\
        if (["script", "style"].includes(parentTag)) return NodeFilter.FILTER_REJECT;\
        return node.nodeValue.toLowerCase().includes(q) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;\
      \}\
    \});\
\
    let hits = 0;\
    const nodes = [];\
    while (walker.nextNode()) nodes.push(walker.currentNode);\
\
    nodes.forEach(node => \{\
      const text = node.nodeValue;\
      const idx = text.toLowerCase().indexOf(q);\
      if (idx === -1) return;\
\
      const before = document.createTextNode(text.slice(0, idx));\
      const mid = document.createElement("mark");\
      mid.className = "__hl";\
      mid.textContent = text.slice(idx, idx + query.length);\
      const after = document.createTextNode(text.slice(idx + query.length));\
\
      node.replaceWith(before, mid, after);\
      hits += 1;\
    \});\
\
    if (hits) showToast(`$\{hits\} occurrence(s)`);\
    else showToast("Aucun r\'e9sultat");\
  \};\
\
  const filterToc = (query) => \{\
    const q = query.trim().toLowerCase();\
    links.forEach(a => \{\
      const ok = !q || a.textContent.toLowerCase().includes(q);\
      a.style.display = ok ? "" : "none";\
    \});\
  \};\
\
  const runSearch = () => \{\
    const q = searchInput.value.trim();\
    filterToc(q);\
    highlight(q);\
  \};\
\
  searchInput.addEventListener("input", runSearch);\
  clearSearch.addEventListener("click", () => \{\
    searchInput.value = "";\
    filterToc("");\
    clearHighlights();\
    searchInput.focus();\
  \});\
\
  // Ctrl+K\
  window.addEventListener("keydown", (e) => \{\
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") \{\
      e.preventDefault();\
      searchInput.focus();\
    \}\
  \});\
\
  // Jump from hash to active toc\
  window.addEventListener("hashchange", () => \{\
    const id = location.hash.replace("#", "");\
    if (byId.has(id)) setActive(id);\
  \});\
\
  // default theme if none stored: dark\
  if (!storedTheme) applyTheme("dark");\
\})();\
}