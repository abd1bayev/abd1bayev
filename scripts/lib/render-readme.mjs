/** @typedef {import("./types.d.ts").ProfileConfig} ProfileConfig */

/**
 * @param {string[]} items
 */
function quoteList(items) {
  return items.map((item) => `"${item}"`).join(", ");
}

/**
 * @param {Record<string, string[]>} stack
 */
function renderStackDict(stack) {
  const lines = Object.entries(stack).map(
    ([key, values]) => `    "${key}": [${quoteList(values)}],`,
  );
  lines[lines.length - 1] = lines[lines.length - 1].replace(/,$/, "");
  return lines.join("\n");
}

/**
 * @param {ProfileConfig} config
 */
function renderHero(config) {
  const {
    name,
    title,
    headline,
    summary,
    company,
    location,
    timezone,
    links,
    email,
    username,
    status,
    theme,
  } = config;

  const typingLines = [
    `${title} · ${headline}`,
    "Python · Django · FastAPI",
    "Data Pipelines · PostgreSQL",
    "Docker · CI/CD · Linux",
  ]
    .map(encodeURIComponent)
    .join(";");

  const openToList = status.openTo.map((item) => `> - ${item}`).join("\n");

  return `<div align="center">

<img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=28&duration=3000&pause=800&color=${theme.accent.toUpperCase()}&center=true&vCenter=true&width=700&lines=${typingLines}" alt="${title}"/>

<br />

### ${name}

\`${company.role}\` @ [**${company.name}**](${company.url}) · \`${location}\` · \`${timezone}\`

${summary}

<br />

[![GitHub](https://img.shields.io/badge/GitHub-abd1bayev-${theme.bg}?style=for-the-badge&logo=github&logoColor=${theme.accent})](${links.github})
[![Portfolio](https://img.shields.io/badge/Portfolio-abd1bayev.uz-${theme.accent}?style=for-the-badge&logo=googlechrome&logoColor=white)](${links.portfolio})
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](${links.linkedin})
[![Telegram](https://img.shields.io/badge/Telegram-@abd1bayev-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](${links.telegram})
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${email})

<br /><br />

<img src="https://komarev.com/ghpvc/?username=${username}&label=profile%20views&color=${theme.accent}&style=flat-square" alt="Profile views"/>

</div>

> [!IMPORTANT]
> ${status.current}

> [!TIP]
> Open to collaboration:
> ${openToList}`;
}

/**
 * @param {ProfileConfig} config
 */
function renderBentoGrid(config) {
  const { username, theme, focusAreas } = config;
  const { name, title, company, location } = config;

  return `## Overview

<table width="100%">
<tr>
<td width="50%" valign="top">

**\`profile.py\`**

\`\`\`python
from dataclasses import dataclass
from typing import Self

@dataclass(frozen=True, slots=True)
class Engineer:
    name: str = "${name}"
    role: str = "${title}"
    company: str = "${company.name}"
    location: str = "${location}"
    focus: tuple[str, ...] = (${focusAreas.map((a) => `"${a.domain}"`).join(", ")})

    def pipeline(self) -> Self:
        return self.design_apis().orchestrate_data().ship()
\`\`\`

</td>
<td width="50%" valign="top">

**\`stats.json\`**

<img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&include_all_commits=true&count_private=true&theme=transparent&hide_border=true&bg_color=00000000&title_color=${theme.accent}&icon_color=${theme.accent}&text_color=${theme.text}&rank_icon=percentile" width="100%" alt="GitHub stats"/>

<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=transparent&hide_border=true&bg_color=00000000&title_color=${theme.accent}&text_color=${theme.text}&langs_count=6&hide=html,css,markdown" width="100%" alt="Top languages"/>

</td>
</tr>
</table>`;
}

/**
 * @param {ProfileConfig} config
 */
function renderArchitecture() {
  return `## \`architecture.mermaid\`

\`\`\`mermaid
---
config:
  theme: dark
  look: neo
---
flowchart TB
    subgraph Clients["🌐 Clients"]
        WEB[Web Apps]
        API_C[API Consumers]
    end

    subgraph Platform["⚙️ Platform Layer"]
        GW[API Gateway]
        AUTH[Auth / JWT]
        SVC[Services]
        Q[Task Queue]
    end

    subgraph Storage["🗄️ Data Layer"]
        DB[(PostgreSQL)]
        CACHE[(Redis)]
        DWH[(Analytics)]
    end

    WEB --> GW
    API_C --> GW
    GW --> AUTH --> SVC
    SVC --> DB & CACHE
    SVC --> Q --> SVC
    DB --> DWH

    classDef client fill:#161b22,stroke:#667eea,color:#c9d1d9
    classDef platform fill:#0d1117,stroke:#764ba2,color:#c9d1d9
    classDef storage fill:#161b22,stroke:#f093fb,color:#c9d1d9
    class WEB,API_C client
    class GW,AUTH,SVC,Q platform
    class DB,CACHE,DWH storage
\`\`\``;
}

/**
 * @param {ProfileConfig} config
 */
function renderModulesBento(config) {
  const cards = config.focusAreas
    .map(
      (a) => `<td width="33%" valign="top">

**\`${a.module}/\`**

\`\`\`python
# ${a.domain}
# ${a.description}
TECH = [${quoteList(a.technologies)}]
\`\`\`

</td>`,
    )
    .join("\n");

  return `## \`modules/\`

<table width="100%">
<tr>
${cards}
</tr>
</table>`;
}

/**
 * @param {ProfileConfig} config
 */
function renderStack(config) {
  const { theme } = config;

  return `## \`stack.config.toml\`

\`\`\`toml
[stack]
languages = [${quoteList(config.techStack.languages)}]
backend   = [${quoteList(config.techStack.backend)}]
data      = [${quoteList(config.techStack.data)}]
infra     = [${quoteList(config.techStack.infrastructure)}]
frontend  = [${quoteList(config.techStack.frontend)}]
\`\`\`

<div align="center">

<img src="https://skillicons.dev/icons?i=python,django,fastapi,flask,postgres,redis,rabbitmq,docker,git,linux,react,vue,postman&perline=13&theme=dark" alt="Tech stack" />

</div>`;
}

/**
 * @param {ProfileConfig} config
 */
function renderManifest(config) {
  const entries = Object.entries(config.principles)
    .map(([key, value]) => `  ${key}: "${value}",`)
    .join("\n");

  return `## \`engineering.manifest.ts\`

> [!NOTE]
> Engineering principles that guide every system I build.

\`\`\`typescript
export const PRINCIPLES = {
${entries}
} as const satisfies Record<string, string>;

export type Principle = (typeof PRINCIPLES)[keyof typeof PRINCIPLES];
\`\`\``;
}

/**
 * @param {ProfileConfig} config
 */
function renderAbout(config) {
  const { bios } = config;

  return `## \`about/\`

<details open>
<summary><b>🇬🇧 English</b></summary>
<br />

> ${bios.en}

</details>

<details>
<summary><b>🇺🇿 O'zbek</b></summary>
<br />

> ${bios.uz}

</details>

<details>
<summary><b>🇷🇺 Русский</b></summary>
<br />

> ${bios.ru}

</details>`;
}

/**
 * @param {ProfileConfig} config
 */
function renderPublications(config) {
  return `## \`publications.json\`

\`\`\`json
[
${config.articles
  .map(
    (a) =>
      `  { "title": "${a.title}", "topic": "${a.topic}", "url": "${a.url}" }`,
  )
  .join(",\n")}
]
\`\`\`

| Article | Topic | Link |
|:--------|:------|:-----|
${config.articles.map((a) => `| **${a.title}** | ${a.topic} | [Read →](${a.url}) |`).join("\n")}`;
}

/**
 * @param {ProfileConfig} config
 */
function renderActivity(config) {
  const { username, theme } = config;

  return `## \`activity.graph\`

<img src="https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=react-dark&hide_border=true&bg_color=${theme.bg}&color=${theme.accent}&line=${theme.accent}&point=${theme.accent}&area=true&custom_title=Contribution%20Activity" width="100%" alt="Activity graph" />`;
}

/**
 * @param {ProfileConfig} config
 */
function renderContactApi(config) {
  const { links, email, name } = config;

  return `## \`GET /api/v1/contact\`

\`\`\`yaml
openapi: 3.1.0
info:
  title: Contact API
  version: 1.0.0
paths:
  /contact:
    get:
      summary: Reach ${name}
      responses:
        "200":
          content:
            application/json:
              schema:
                properties:
                  portfolio: { type: string, example: "${links.portfolio}" }
                  github:    { type: string, example: "${links.github}" }
                  linkedin:  { type: string, example: "${links.linkedin}" }
                  telegram:  { type: string, example: "${links.telegram}" }
                  email:     { type: string, example: "${email}" }
\`\`\`

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-667eea?style=flat-square&logo=googlechrome&logoColor=white)](${links.portfolio})
[![Website](https://img.shields.io/badge/Website-000000?style=flat-square&logo=vercel&logoColor=white)](${links.website})
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](${links.linkedin})
[![Medium](https://img.shields.io/badge/Medium-12100E?style=flat-square&logo=medium&logoColor=white)](${links.medium})
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white)](${links.telegram})
[![Email](https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:${email})

<br /><br />

<sub>config-driven · CI validated · <code>npm run generate</code></sub>

</div>`;
}

/**
 * @param {ProfileConfig} config
 * @returns {string}
 */
export function renderReadme(config) {
  return [
    "<!-- Generated by scripts/generate-readme.mjs — edit config/profile.json -->",
    renderHero(config),
    "",
    "---",
    "",
    renderBentoGrid(config),
    "",
    "---",
    "",
    renderArchitecture(),
    "",
    "---",
    "",
    renderModulesBento(config),
    "",
    "---",
    "",
    renderStack(config),
    "",
    "---",
    "",
    renderManifest(config),
    "",
    "---",
    "",
    renderAbout(config),
    "",
    "---",
    "",
    renderPublications(config),
    "",
    "---",
    "",
    renderActivity(config),
    "",
    "---",
    "",
    renderContactApi(config),
    "",
  ].join("\n");
}
