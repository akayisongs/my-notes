import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "My Notes from akayi",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#EFECE3",      // 背景色：米白色 (来自配色图2)
          lightgray: "#D4D8E0",  // 边框：带一点点蓝灰的淡色
          gray: "#8FABD4",       // 次要信息/引用：雾霾蓝 (来自配色图2)
          darkgray: "#333333",   // 正文：深灰色 (不使用纯黑，保护眼睛)
          dark: "#000000",       // 标题：纯黑 (来自配色图2)
          secondary: "#4A70A9",  // 链接/标签：深蓝色 (来自配色图2)
          tertiary: "#5C82BA",   // 链接悬停：比链接稍亮一点的蓝色
          highlight: "rgba(143, 171, 212, 0.15)", // 高亮背景：淡淡的蓝色
          textHighlight: "#fff23b", // 文本高亮颜色
        },
        darkMode: {
          light: "#3E3F29",      // 背景色：深橄榄绿 (来自配色图1)
          lightgray: "#585942",  // 边框：比背景稍亮的绿色
          gray: "#7D8D86",       // 次要信息/引用：鼠尾草绿 (来自配色图1)
          darkgray: "#E6E4D5",   // 正文：米灰白 (为了在深色背景下看清，微调了亮度)
          dark: "#F1F0E4",       // 标题：亮米白 (来自配色图1)
          secondary: "#BCA88D",  // 链接/标签：卡其/大地色 (来自配色图1，很跳跃)
          tertiary: "#A8957A",   // 链接悬停：稍暗一点的大地色
          highlight: "rgba(188, 168, 141, 0.15)", // 高亮背景：淡淡的大地色
          textHighlight: "#fff23b", // 文本高亮颜色
        },
      },
      fontOrigin: "googleFonts",
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
