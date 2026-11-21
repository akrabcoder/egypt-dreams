
"use strict";

// ======================================
// EGYPT DREAMS — Main Application
// ======================================

let currentLanguage = "ar";
let currentCategory = "all";

// Demo dreams: illustrative content, not real submissions.
let dreams = [
  {
    name: "أحمد",
    nameEn: "Ahmed",
    category: "technology",
    title: "مستقبل التكنولوجيا",
    titleEn: "The Future of Technology",
    text: "أحلم أن أكون مهندسًا يساهم في تطوير التكنولوجيا في مصر.",
    textEn: "I dream of becoming an engineer who contributes to technology in Egypt."
  },
  {
    name: "مريم",
    nameEn: "Mariam",
    category: "science",
    title: "اكتشافات تغير العالم",
    titleEn: "Discoveries That Change the World",
    text: "أحلم أن أعمل في البحث العلمي وأقدم اكتشافًا يفيد البشرية.",
    textEn: "I dream of working in research and making a discovery that benefits humanity."
  },
  {
    name: "يوسف",
    nameEn: "Youssef",
    category: "education",
    title: "التعليم للجميع",
    titleEn: "Education for Everyone",
    text: "أتمنى أن يحصل كل طفل على فرصة عادلة للتعلم وتحقيق أحلامه.",
    textEn: "I hope every child gets a fair chance to learn and achieve their dreams."
  },
  {
    name: "سارة",
    nameEn: "Sara",
    category: "society",
    title: "مجتمع أفضل",
    titleEn: "A Better Society",
    text: "أحلم بمبادرة تساعد الشباب على تحويل أفكارهم إلى مشاريع حقيقية.",
    textEn: "I dream of an initiative that helps young people turn ideas into real projects."
  }
];

const categoryData = {
  education: {
    ar: "التعليم",
    en: "Education",
    icon: "📚"
  },
  technology: {
    ar: "التكنولوجيا",
    en: "Technology",
    icon: "⌘"
  },
  science: {
    ar: "البحث العلمي",
    en: "Scientific Research",
    icon: "✦"
  },
  society: {
    ar: "المجتمع",
    en: "Society",
    icon: "♡"
  }
};

// ======================================
// 1. RENDER DREAMS
// ======================================

const dreamGrid = document.getElementById("dreamGrid");

function renderDreams() {
  dreamGrid.replaceChildren();

  const filteredDreams = dreams.filter(dream =>
    currentCategory === "all" ||
    dream.category === currentCategory
  );

  if (filteredDreams.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = currentLanguage === "ar"
      ? "لا توجد أحلام في هذا القسم حتى الآن."
      : "No dreams in this category yet.";

    dreamGrid.appendChild(empty);
    return;
  }

  filteredDreams.forEach(dream => {
    const category = categoryData[dream.category];

    const card = document.createElement("article");
    card.className = "dream-card";

    const icon = document.createElement("div");
    icon.className = "dream-icon";
    icon.textContent = category.icon;

    const categoryLabel = document.createElement("span");
    categoryLabel.className = "dream-category";
    categoryLabel.textContent = currentLanguage === "ar"
      ? category.ar
      : category.en;

    const title = document.createElement("h3");
    title.textContent = currentLanguage === "ar"
      ? dream.title
      : dream.titleEn;

    const description = document.createElement("p");
    description.textContent = currentLanguage === "ar"
      ? dream.text
      : dream.textEn;

    const author = document.createElement("div");
    author.className = "dream-author";
    author.textContent = "— " + (
      currentLanguage === "ar"
        ? dream.name
        : dream.nameEn
    );

    card.append(
      icon,
      categoryLabel,
      title,
      description,
      author
    );

    dreamGrid.appendChild(card);
  });
}

// ======================================
// 2. CATEGORY FILTERS
// ======================================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentCategory = button.dataset.category;

    filterButtons.forEach(item =>
      item.classList.remove("active")
    );

    button.classList.add("active");

    renderDreams();
  });
});

// ======================================
// 3. LANGUAGE SWITCHER
// ======================================

const languageBtn = document.getElementById("languageBtn");

function setLanguage(language) {
  currentLanguage = language;

  const isArabic = language === "ar";

  document.documentElement.lang = language;
  document.documentElement.dir = isArabic ? "rtl" : "ltr";
  document.body.dir = isArabic ? "rtl" : "ltr";

  document.querySelectorAll("[data-ar][data-en]").forEach(element => {
    element.textContent = element.dataset[language];
  });

  languageBtn.textContent = isArabic ? "EN" : "AR";

  document.getElementById("dreamName").placeholder =
    isArabic ? "اسمك" : "Your name";

  document.getElementById("dreamText").placeholder =
    isArabic
      ? "احكِ لنا عن حلمك..."
      : "Tell us about your dream...";

  renderDreams();
}

languageBtn.addEventListener("click", () => {
  setLanguage(currentLanguage === "ar" ? "en" : "ar");
});

// ======================================
// 4. ADD A NEW DREAM
// ======================================

const dreamForm = document.getElementById("dreamForm");
const formNotice = document.getElementById("formNotice");

dreamForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("dreamName").value.trim();
  const category = document.getElementById("dreamCategory").value;
  const message = document.getElementById("dreamText").value.trim();

  if (!name || !message) return;

  const newDream = {
    name: name,
    nameEn: name,
    category: category,
    title: currentLanguage === "ar"
      ? "حلم جديد"
      : "A New Dream",
    titleEn: "A New Dream",
    text: message,
    textEn: message
  };

  dreams.unshift(newDream);

  currentCategory = "all";

  filterButtons.forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === "all"
    );
  });

  renderDreams();

  formNotice.textContent = currentLanguage === "ar"
    ? "تمت إضافة حلمك للعرض التجريبي بنجاح!"
    : "Your dream was added to the demo successfully!";

  dreamForm.reset();

  document.getElementById("dreams").scrollIntoView({
    behavior: "smooth"
  });
});

// ======================================
// 5. INITIALIZE APPLICATION
// ======================================

setLanguage("ar");
renderDreams();

console.log("EGYPT DREAMS initialized successfully.");
