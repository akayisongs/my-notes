import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const MotivationPopup: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  // 只在首页显示
  if (fileData.slug !== "index") {
    return <></>
  }

  return (
    <div id="motivation-modal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; backdrop-filter: blur(3px); align-items: center; justify-content: center;">
      <div style="
        background-color: var(--light); 
        color: var(--dark); 
        padding: 2rem; 
        border-radius: 20px; 
        border: 2px solid var(--secondary);
        max-width: 400px; 
        width: 80%; 
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        text-align: center;
        animation: popUp 0.3s ease-out forwards;
      ">
        <h2 style="margin-top: 0; color: var(--secondary);">✨ 保持热爱，奔赴山海</h2>
        <p style="font-size: 1.1rem; line-height: 1.6; margin: 1.5rem 0;">
          每一次的记录都是成长的足迹。<br/>今天也要继续加油！
        </p>
        
        {/* 给按钮一个 ID，不写 onClick */}
        <button id="motivation-close-btn"
          style="
            background-color: var(--secondary); 
            color: var(--light); 
            border: none; 
            padding: 10px 25px; 
            font-size: 1rem; 
            border-radius: 50px; 
            cursor: pointer; 
            transition: opacity 0.2s;
          "
        >
          冲！🚀
        </button>
      </div>

      <style>{`
        @keyframes popUp {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
      
      {/* 核心修复：把交互逻辑写在这里，并在页面加载完成后执行 */}
      <script dangerouslySetInnerHTML={{ __html: `
        document.addEventListener('DOMContentLoaded', () => {
          const modal = document.getElementById('motivation-modal');
          const btn = document.getElementById('motivation-close-btn');
          
          // 延迟 500ms 显示弹窗
          if(modal) {
             setTimeout(() => { modal.style.display = 'flex'; }, 500);
          }

          // 绑定点击事件：关闭弹窗
          if(btn && modal) {
            btn.addEventListener('click', () => {
              modal.style.display = 'none';
            });
            
            // 添加鼠标悬停效果 (用 JS 实现更稳)
            btn.addEventListener('mouseenter', () => { btn.style.opacity = '0.8' });
            btn.addEventListener('mouseleave', () => { btn.style.opacity = '1' });
          }
        });
      ` }} />
    </div>
  )
}

export default (() => MotivationPopup) satisfies QuartzComponentConstructor