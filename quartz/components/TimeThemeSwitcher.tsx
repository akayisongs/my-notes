import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const TimeThemeSwitcher: QuartzComponent = () => {
  return (
    <script dangerouslySetInnerHTML={{ __html: `
      document.addEventListener('DOMContentLoaded', () => {
        function checkTimeAndSetTheme() {
          const now = new Date();
          // 强制转换为北京时间 (UTC+8)
          const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
          const bjDate = new Date(utc + (3600000 * 8));
          
          const hours = bjDate.getHours();
          const minutes = bjDate.getMinutes();
          const currentTotalMinutes = hours * 60 + minutes;

          console.log("Current BJ Time:", hours + ":" + minutes); // 方便你在控制台调试

          // 设定时间段
          const startDark = 18 * 60 + 30; // 18:30
          const endDark = 5 * 60 + 30;    // 05:30

          // 判断逻辑
          const shouldBeDark = currentTotalMinutes >= startDark || currentTotalMinutes < endDark;

          const html = document.documentElement;
          // 获取当前实际显示的主题
          const currentTheme = html.getAttribute("data-theme");

          if (shouldBeDark) {
            // 如果应该是黑夜，但现在不是黑夜，强制切换
            if (currentTheme !== "dark") {
              console.log("Auto-switching to Dark Mode");
              html.setAttribute("data-theme", "dark");
              localStorage.setItem("theme", "dark");
              window.dispatchEvent(new Event("themechange"));
            }
          } else {
            // 如果应该是白天，但现在不是白天，强制切换
            if (currentTheme !== "light") {
              console.log("Auto-switching to Light Mode");
              html.setAttribute("data-theme", "light");
              localStorage.setItem("theme", "light");
              window.dispatchEvent(new Event("themechange"));
            }
          }
        }

        // 立即执行一次
        checkTimeAndSetTheme();
        
        // 每分钟检查一次
        setInterval(checkTimeAndSetTheme, 60000);
      });
    ` }} />
  )
}

export default (() => TimeThemeSwitcher) satisfies QuartzComponentConstructor
