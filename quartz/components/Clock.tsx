// quartz/components/Clock.tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Clock: QuartzComponent = () => {
  return (
    <div class="clock-widget" style="padding: 1rem; margin-bottom: 1rem; border: 1px solid var(--lightgray); border-radius: 8px; text-align: center; background-color: var(--light);">
      <h3 style="margin: 0 0 0.5rem 0; font-size: 0.9rem; color: var(--gray);">当前时间</h3>
      <div id="quartz-clock" style="font-size: 1.5rem; font-weight: bold; font-family: 'IBM Plex Mono', monospace; color: var(--secondary);">
        Loading...
      </div>
      
      {/* 嵌入一段简单的脚本让时钟动起来 */}
      <script dangerouslySetInnerHTML={{ __html: `
        function updateClock() {
          const now = new Date();
          const timeString = now.toLocaleTimeString('zh-CN', { hour12: false });
          const el = document.getElementById('quartz-clock');
          if(el) el.innerText = timeString;
        }
        setInterval(updateClock, 1000);
        // 立即执行一次，避免等待1秒
        setTimeout(updateClock, 0); 
      ` }} />
    </div>
  )
}

export default (() => Clock) satisfies QuartzComponentConstructor