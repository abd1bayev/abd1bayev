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
  const { name, title, headline, summary, company, location, links, email, username } = config;

  return `<div align="center">

<!-- header -->
<img src="https://capsule-render.vercel.app/api?type=soft&color=0:0d1117,100:161b22&height=120&section=header&text=${encodeURIComponent(name)}&fontSize=42&fontColor=667eea&animation=fadeIn" width="100%" alt="${name}"/>

**${title}** · ${headline}

${summary}

\`${company.role}\` @ [**${company.name}**](${company.url}) · \`${location}\`

<br />

[![GitHub](https://img.shields.io/badge/GitHub-abd1bayev-0d1117?style=for-the-badge&logo=github&logoColor=white)](${links.github})
[![Portfolio](https://img.shields.io/badge/Portfolio-abd1bayev.uz-667eea?style=for-the-badge&logo=google-chrome&logoColor=white)](${links.portfolio})
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](${links.linkedin})
[![Telegram](https://img.shields.io/badge/Telegram-@abd1bayev-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](${links.telegram})
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${email})

<br /><br />

<img src="https://komarev.com/ghpvc/?username=${username}&label=views&color=667eea&style=flat-square" alt="Profile views"/>

</div>`;
}

/**
 * @param {ProfileConfig} config
 */
function renderProfileClass(config) {
  const { name, title, company, location, focusAreas } = config;
  const focus = quoteList(focusAreas.map((a) => a.domain));

  return `## \`profile.py\`

\`\`\`python
class Engineer:
    name: str = "${name}"
    role: str = "${title}"
    company: str = "${company.name}"
    location: str = "${location}"
    focus: list[str] = [${focus}]

    def build(self) -> "ProductionSoftware":
        return (
            self.design_apis()
            >> self.orchestrate_data()
            >> self.ship_reliably()
        )
\`\`\``;
}

/**
 * @param {ProfileConfig} config
 */
function renderArchitecture() {
  return `## \`architecture.mermaid\`

\`\`\`mermaid
flowchart LR
    subgraph Client
        WEB[Web / Mobile]
        API_C[API Clients]
    end

    subgraph Backend
        GW[API Gateway]
        AUTH[Auth Layer]
        SVC[Service Layer]
        Q[Task Queue]
    end

    subgraph Data
        DB[(PostgreSQL)]
        CACHE[(Redis)]
        DWH[(Data Warehouse)]
    end

    WEB --> GW
    API_C --> GW
    GW --> AUTH --> SVC
    SVC --> DB
    SVC --> CACHE
    SVC --> Q --> SVC
    DB --> DWH
\`\`\``;
}

/**
 * @param {ProfileConfig} config
 */
function renderModules(config) {
  const imports = config.focusAreas.map((a) => `from ${a.module} import ${a.domain.replace(/\s+/g, "")}`).join("\n");
  const modules = config.focusAreas
    .map(
      (a) =>
        `# ${a.module}.py — ${a.domain}\n` +
        `# ${a.description}\n` +
        `STACK = [${quoteList(a.technologies)}]`,
    )
    .join("\n\n");

  return `## \`modules/\`

\`\`\`python
${imports}
\`\`\`

\`\`\`python
${modules}
\`\`\``;
}

/**
 * @param {ProfileConfig} config
 */
function renderStack(config) {
  return `## \`stack.config.py\`

\`\`\`python
STACK: dict[str, list[str]] = {
${renderStackDict(config.techStack)}
}
\`\`\`

<div align="center">
<img src="https://skillicons.dev/icons?i=python,django,fastapi,postgres,redis,rabbitmq,docker,git,linux,react,vue&perline=11" alt="Technologies" />
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

\`\`\`typescript
export const PRINCIPLES = {
${entries}
} as const;

type Principle = typeof PRINCIPLES[keyof typeof PRINCIPLES];
\`\`\``;
}

/**
 * @param {ProfileConfig} config
 */
function renderAbout(config) {
  const { bios } = config;

  return `## \`about/\`

\`\`\`bash
$ cat about.en.md
${bios.en}

$ cat about.uz.md
${bios.uz}

$ cat about.ru.md
${bios.ru}
\`\`\`

<details>
<summary><b>Multilingual bios</b></summary>

**EN** — ${bios.en}

**UZ** — ${bios.uz}

**RU** — ${bios.ru}

</details>`;
}

/**
 * @param {ProfileConfig} config
 */
function renderPublications(config) {
  const rows = config.articles
    .map((a) => `| \`${a.title.replace(/\s+/g, "_").toLowerCase()}\` | ${a.topic} | [read →](${a.url}) |`)
    .join("\n");

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

| id | topic | link |
|:---|:------|:-----|
${rows}`;
}

/**
 * @param {ProfileConfig} config
 */
function renderContactApi(config) {
  const { links, email, name } = config;

  return `## \`GET /contact\`

\`\`\`bash
$ curl -s https://abd1bayev.uz/api/contact | jq
\`\`\`

\`\`\`json
{
  "name": "${name}",
  "portfolio": "${links.portfolio}",
  "website": "${links.website}",
  "github": "${links.github}",
  "linkedin": "${links.linkedin}",
  "medium": "${links.medium}",
  "telegram": "${links.telegram}",
  "email": "${email}"
}
\`\`\`

<div align="center">

[![Portfolio](https://img.shields.io/badge/→_Portfolio-667eea?style=flat-square&logo=google-chrome&logoColor=white)](${links.portfolio})
[![Website](https://img.shields.io/badge/→_Website-000000?style=flat-square&logo=vercel&logoColor=white)](${links.website})
[![LinkedIn](https://img.shields.io/badge/→_LinkedIn-0077B5?style=flat-square&logo=linkedin&logoColor=white)](${links.linkedin})
[![Medium](https://img.shields.io/badge/→_Medium-12100E?style=flat-square&logo=medium&logoColor=white)](${links.medium})
[![Telegram](https://img.shields.io/badge/→_Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white)](${links.telegram})
[![Email](https://img.shields.io/badge/→_Email-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:${email})

<br /><br />

\`\`\`
────────────────────────────────────────────
  Built with clean code · Maintained via CI
  Source: config/profile.json
────────────────────────────────────────────
\`\`\`

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
    renderProfileClass(config),
    "",
    "---",
    "",
    renderArchitecture(),
    "",
    "---",
    "",
    renderModules(config),
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
    renderContactApi(config),
    "",
  ].join("\n");
}
