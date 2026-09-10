/** @typedef {import("./types.d.ts").ProfileConfig} ProfileConfig */
/** @typedef {import("./types.d.ts").ProfileBio} ProfileBio */

/**
 * @param {string} text
 */
function encodeUrl(text) {
  return encodeURIComponent(text);
}

/**
 * @param {ProfileConfig} config
 */
function renderHeader(config) {
  const { name, title, specialization, username, email, links, theme, typingLines } = config;
  const encodedName = encodeUrl(name);
  const typing = typingLines.map(encodeUrl).join(";");

  return `<div align="center">

<!-- Animated waving header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=0:${theme.primary},50:${theme.secondary},100:${theme.accent}&height=240&section=header&text=${encodedName}&fontSize=50&fontColor=ffffff&animation=twinkling" width="100%" alt="${name}"/>

<!-- Role badge -->
<img src="https://img.shields.io/badge/${encodeUrl(title)}-${theme.primary}?style=for-the-badge&logo=codeigniter&logoColor=white" alt="${title}"/>
<img src="https://img.shields.io/badge/${encodeUrl(specialization)}-${theme.secondary}?style=for-the-badge" alt="${specialization}"/>
<img src="https://img.shields.io/badge/Open_to_Collaboration-${theme.accent}?style=for-the-badge&logo=handshake&logoColor=white" alt="Open to collaboration"/>

<br/><br/>

<!-- Typing animation -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&pause=1000&color=${theme.primary.toUpperCase()}&center=true&vCenter=true&multiline=true&width=650&height=100&lines=${typing}" alt="Typing SVG"/>
</a>

<br/>

<!-- Profile views & social proof -->
<img src="https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=${theme.primary}&style=for-the-badge" alt="Profile views"/>
<img src="https://img.shields.io/github/followers/${username}?style=for-the-badge&logo=github&color=${theme.secondary}" alt="GitHub followers"/>
<img src="https://img.shields.io/github/stars/${username}?style=for-the-badge&logo=github&color=${theme.accent}&label=Total%20Stars" alt="GitHub stars"/>

<br/><br/>

<!-- Quick links -->
<a href="${links.portfolio}" target="_blank"><img src="https://img.shields.io/badge/Portfolio-abd1bayev.uz-${theme.primary}?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio"/></a>
<a href="${links.website}" target="_blank"><img src="https://img.shields.io/badge/Website-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Website"/></a>
<a href="${links.telegram}" target="_blank"><img src="https://img.shields.io/badge/Telegram-@abd1bayev-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram"/></a>
<a href="mailto:${email}"><img src="https://img.shields.io/badge/Email-${email}-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Email"/></a>

</div>`;
}

/**
 * @param {ProfileBio} bio
 * @param {{ company: ProfileConfig["company"], links: ProfileConfig["links"] }} context
 */
function renderBioSection(bio, { company, links }) {
  return `- 🏢 **Company:** [${company.name}](${company.url})
- 🎯 **Expertise:** ${bio.expertise}
- 🧠 **Approach:** ${bio.approach}
- ⚡ **Fun fact:** ${bio.funFact}
- 🌐 **Portfolio:** [abd1bayev.uz](${links.portfolio})
- 💬 **Let's talk:** [Telegram](${links.telegram}) · [LinkedIn](${links.linkedin})`;
}

/**
 * @param {ProfileConfig} config
 */
function renderLanguages(config) {
  const { bios, company, links } = config;

  return `## 🌐 Languages / Til / Язык

<details open>
<summary><b>🇬🇧 English</b></summary>
<br/>

> ${bios.en.tagline}

${renderBioSection(bios.en, { company, links })}

</details>

<details>
<summary><b>🇺🇿 O'zbek</b></summary>
<br/>

> ${bios.uz.tagline}

${renderBioSection(bios.uz, { company, links })}

</details>

<details>
<summary><b>🇷🇺 Русский</b></summary>
<br/>

> ${bios.ru.tagline}

${renderBioSection(bios.ru, { company, links })}

</details>`;
}

/**
 * @param {ProfileConfig} config
 */
function renderAnalytics(config) {
  const { username, theme } = config;

  return `## 📊 GitHub Analytics

<div align="center">

<img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&include_all_commits=true&count_private=true&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=${theme.primary}&icon_color=${theme.accent}&text_color=c9d1d9&rank_icon=percentile" height="170" alt="GitHub stats"/>
<img src="https://streak-stats.demolab.com/?user=${username}&theme=tokyonight&hide_border=true&background=0D1117&ring=${theme.primary}&fire=${theme.secondary}&currStreakLabel=${theme.accent}&sideLabels=${theme.primary}" height="170" alt="GitHub streak"/>
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=tokyonight&hide_border=true&bg_color=0d1117&title_color=${theme.primary}&text_color=c9d1d9&langs_count=8&hide=html,css" height="170" alt="Top languages"/>

<br/>

<img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark&hide_border=true&bg_color=0d1117&color=${theme.primary}&line=${theme.secondary}&point=${theme.accent}&area=true&custom_title=Contribution%20Activity" width="100%" alt="Activity graph"/>

</div>`;
}

/**
 * @param {ProfileConfig} config
 */
function renderArticles(config) {
  const rows = config.articles
    .map(
      (article) =>
        `| **${article.title}** | ${article.topic} | [Read on Medium →](${article.url}) |`,
    )
    .join("\n");

  return `## 📝 Latest Articles on Medium

<div align="center">

| 📄 Article | 📌 Topic | 🔗 Link |
|:-----------|:---------|:--------|
${rows}

</div>`;
}

/**
 * @param {ProfileConfig} config
 */
function renderFooter(config) {
  const { links, email, theme, quotes } = config;

  const quoteBlock = quotes.map((q) => `> *"${q}"*`).join("\n>\n");

  return `## 🤝 Connect With Me

<div align="center">

<a href="${links.portfolio}" target="_blank"><img src="https://img.shields.io/badge/Portfolio-${theme.primary}?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Portfolio"/></a>
<a href="${links.website}" target="_blank"><img src="https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Website"/></a>
<a href="${links.linkedin}" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/></a>
<a href="${links.medium}" target="_blank"><img src="https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white" alt="Medium"/></a>
<a href="${links.telegram}" target="_blank"><img src="https://img.shields.io/badge/Telegram-26A5E4?style=for-the-badge&logo=telegram&logoColor=white" alt="Telegram"/></a>
<a href="mailto:${email}"><img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail"/></a>

<br/><br/>

<img src="https://user-images.githubusercontent.com/74038144/212284100-561aa473-3905-4a80-b561-0d285066134e.gif" width="900">

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:${theme.primary},100:${theme.secondary}&height=130&section=footer&text=Thanks%20for%20visiting!%20%E2%AD%90&fontSize=26&fontColor=ffffff&animation=twinkling" width="100%" alt="Footer"/>

<br/>

${quoteBlock}

<br/>

**If you like my work, consider giving it a ⭐ — it means a lot!**

</div>`;
}

const SECTION_DIVIDER = `<img src="https://user-images.githubusercontent.com/74038144/212284136-039889ad-366d-4353-aa04-f5ad4ad258a2.gif" width="1000">`;

const SECTION_DIVIDER_ALT = `<img src="https://user-images.githubusercontent.com/74038144/212284158-98b768ab-f752-4274-a961-6672ca387007.gif" width="1000">`;

/**
 * @param {ProfileConfig} config
 * @returns {string}
 */
export function renderReadme(config) {
  const { username, theme } = config;

  return [
    "<!-- Generated by scripts/generate-readme.mjs — edit config/profile.json instead -->",
    renderHeader(config),
    "",
    SECTION_DIVIDER,
    "",
    "---",
    "",
    renderLanguages(config),
    "",
    SECTION_DIVIDER_ALT,
    "",
    "---",
    "",
    `## 💼 What I Do

<div align="center">

\`\`\`txt
┌─────────────────────┬─────────────────────┬─────────────────────┐
│  🏗️  Architecture    │  ⚙️  Backend APIs    │  📊  Data Systems   │
│  Scalable software  │  Python · Django    │  Warehouses · ETL   │
│  Clean & modular    │  FastAPI · Celery   │  Analytics · Viz    │
└─────────────────────┴─────────────────────┴─────────────────────┘
\`\`\`

</div>

<table align="center">
<tr>
<td align="center" width="33%">
<img src="https://user-images.githubusercontent.com/74038144/212257467-871d32b7-e401-42e0-a097-fea984c1325f.gif" width="80" alt="Backend"/>
<br/><b>Backend Engineering</b>
<br/><sub>REST APIs · Microservices · Async tasks</sub>
</td>
<td align="center" width="33%">
<img src="https://user-images.githubusercontent.com/74038144/212257468-1b331177-ee68-5124-1771-81537190046b.gif" width="80" alt="Data"/>
<br/><b>Data Engineering</b>
<br/><sub>Pipelines · Warehouses · Visualization</sub>
</td>
<td align="center" width="33%">
<img src="https://user-images.githubusercontent.com/74038144/212257460-738ff738-247f-4445-a718-c4970eb1aa6f.gif" width="80" alt="DevOps"/>
<br/><b>DevOps & Tools</b>
<br/><sub>Docker · Linux · CI/CD · Git</sub>
</td>
</tr>
</table>`,
    "",
    "---",
    "",
    `## 🛠️ Tech Stack

<div align="center">

<img src="https://skillicons.dev/icons?i=python,django,fastapi,flask,postgres,redis,rabbitmq,docker,git,linux&perline=5" alt="Core stack"/>

<br/>

<img src="https://skillicons.dev/icons?i=html,css,js,react,vue,postman&perline=6" alt="Frontend and tools"/>

<br/>

<img src="https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white" alt="NumPy"/>
<img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white" alt="Pandas"/>
<img src="https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white" alt="Scikit-Learn"/>
<img src="https://img.shields.io/badge/Streamlit-FF4B4B?style=for-the-badge&logo=Streamlit&logoColor=white" alt="Streamlit"/>
<img src="https://img.shields.io/badge/Plotly-239120?style=for-the-badge&logo=plotly&logoColor=white" alt="Plotly"/>
<img src="https://img.shields.io/badge/OpenCV-27338e?style=for-the-badge&logo=opencv&logoColor=white" alt="OpenCV"/>
<img src="https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white" alt="Jupyter"/>
<img src="https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white" alt="Celery"/>
<img src="https://img.shields.io/badge/DRF-092E20?style=for-the-badge&logo=django&logoColor=white" alt="Django REST Framework"/>

</div>`,
    "",
    SECTION_DIVIDER_ALT,
    "",
    "---",
    "",
    `## 🏆 GitHub Trophies

<div align="center">
  <img src="https://github-profile-trophy-tawny.vercel.app/?username=${username}&theme=dracula&no-frame=true&no-bg=true&row=2&column=4&margin-w=15&margin-h=15" width="100%" alt="GitHub trophies"/>
</div>`,
    "",
    "---",
    "",
    renderAnalytics(config),
    "",
    "---",
    "",
    `## 🐍 Contribution Snake

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/github-contribution-grid-snake-dark.svg"/>
    <source media="(prefers-color-scheme: light)" srcset="./assets/github-contribution-grid-snake.svg"/>
    <img src="./assets/github-contribution-grid-snake.svg" alt="Contribution snake animation"/>
  </picture>
</div>`,
    "",
    "---",
    "",
    renderArticles(config),
    "",
    SECTION_DIVIDER_ALT,
    "",
    "---",
    "",
    renderFooter(config),
    "",
  ].join("\n");
}
