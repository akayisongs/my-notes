import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "小智的温馨小窝",
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
        header: "ZCOOL KuaiLe",
        body: "Noto Serif Simplified Chinese",
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
          light: "#332D56",      // 背景色：深紫色 (来自新色板)
          lightgray: "#4E6688",  // 边框：板岩蓝 (来自新色板)
          gray: "#71C0BB",       // 次要信息/引用：青色 (来自新色板)
          darkgray: "#E3EEB2",   // 正文：浅黄绿色 (来自新色板，对比清晰)
          dark: "#E3EEB2",       // 标题：同正文，保持统一 (或者用纯白 #ffffff 更跳跃)
          secondary: "#71C0BB",  // 链接/标签：青色作为强调色
          tertiary: "#8FE3DD",   // 链接悬停：比青色稍亮的颜色
          // ▼ 重点修改在这里 ▼
          // 改成了深蓝色的半透明背景，浅色文字在上面会非常清晰
          highlight: "rgba(78, 102, 136, 0.4)", 
          textHighlight: "#ffffff",
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
