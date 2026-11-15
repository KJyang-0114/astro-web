// 設計範例（虛構品牌）。文案規範：docs/studio-writing-guide.md
// 這四個都不是客戶。真實作品在 cases.ts。
import type { DemoSlug } from "./demos";

export type WorkCase = {
  slug: string;
  demoSlug: DemoSlug;
  demoUrl: string;
  industry: string;
  brand: string;
  title: string;
  description: string;
  // 這個版面適合哪種店、客人通常想知道什麼
  forWho: string;
  // 打開第一個畫面看到什麼、回答了哪個問題
  firstScreen: string;
  // 主要按鈕帶訪客去哪裡
  nextStep: string;
  // 一句話總結版面安排（llms-full.txt 會讀）
  strategy: string;
  // 如果是真的店，我還會改什麼
  realShopNotes: string[];
};

export const workCases: WorkCase[] = [
  {
    slug: "interior-design",
    demoSlug: "interior-design",
    demoUrl: "/studio/demo/interior-design",
    industry: "室內設計",
    brand: "岩序室內設計",
    title: "設計範例：岩序室內設計（虛構品牌）",
    description: "給室內設計、裝修工作室參考的版面。大張空間照片放在第一屏，往下是服務、流程、常見問題和需求表單。店名是我編的，不是客戶。",
    forWho: "室內設計、系統櫃、小型裝修工作室。客人通常先滑作品照片，覺得喜歡才會問「大概要多少錢」「可以只改廚房嗎」。",
    firstScreen: "一張大的空間照片配一句短標題，旁邊一顆「聊聊你的空間」按鈕。這類客人是先被照片吸引，所以照片給最大的位置，文字很少。",
    nextStep: "按鈕直接跳到頁面最下面的需求表單：選想做的項目（新成屋、老屋翻新、商業空間、局部改造），再寫一句想問什麼。",
    strategy: "照片先吸引人，再用服務、流程和常見問題回答預算與範圍，最後收到需求表單。",
    realShopNotes: [
      "照片要換成店家自己的完工照，每張註明是哪一區、幾坪。",
      "常見問題裡加上諮詢費和丈量費怎麼算，這是裝修業客人最想先知道的。",
      "表單改成真的送出到店家的 LINE 或 Email。範例裡的表單只會在畫面上顯示摘要，不會送出任何資料。"
    ]
  },
  {
    slug: "dental-clinic",
    demoSlug: "dental-clinic",
    demoUrl: "/studio/demo/dental-clinic",
    industry: "診所",
    brand: "晴禾牙醫診所",
    title: "設計範例：晴禾牙醫診所（虛構品牌）",
    description: "給牙醫、物理治療、小型診所參考的版面。主要按鈕先帶初診的人看流程，再看診療項目和常見問題。診所名稱是我編的，不是客戶。",
    forWho: "牙醫、中醫、物理治療這類診所。第一次來的人最緊張的是「去了會發生什麼事」「要等多久」，而不是診所多漂亮。",
    firstScreen: "淺色的診間照片，標題講初診，按鈕寫「了解初診流程」。我刻意不把「立刻預約」放在最前面，因為還沒來過的人通常想先知道流程。",
    nextStep: "按鈕跳到 4 個步驟的初診流程（填資料、檢查、說明治療選項、安排下次），看完再往下是常見問題，例如初診要多久、有沒有停車位。",
    strategy: "先回答「第一次去會怎樣」，用初診流程降低緊張，再列診療項目與常見問題。",
    realShopNotes: [
      "加上醫師介紹和門診時間表，這兩個是診所網站最常被看的地方。",
      "健保和自費項目分開寫，自費的寫價格區間。",
      "醫療廣告有法規限制，療效相關的字句要讓診所自己確認過才上線。"
    ]
  },
  {
    slug: "ac-service",
    demoSlug: "ac-service",
    demoUrl: "/studio/demo/ac-service",
    industry: "冷氣與居家修繕",
    brand: "安峰冷氣工程",
    title: "設計範例：安峰冷氣工程（虛構品牌）",
    description: "給冷氣、水電、居家修繕師傅參考的版面。服務分成安裝、清洗、維修、移機四項，常見問題先講估價要拍哪些照片。店名是我編的，不是客戶。",
    forWho: "冷氣、水電、清潔這類到府服務。客人多半是冷氣壞了、在手機上急著找人，想知道「多少錢」「什麼時候能來」。",
    firstScreen: "居家照片加一句標題和「整理我的需求」按鈕，往下就是四項服務，每項都有一行說明在處理什麼問題。",
    nextStep: "按鈕帶到需求表單，先選是安裝、清洗、維修還是移機。常見問題第一題就是「LINE 估價要拍哪些照片」，讓客人傳訊息前就準備好，師傅不用來回問。",
    strategy: "依安裝、清洗、維修、移機分開說明，先告訴客人估價要準備哪些照片，再收到需求表單。",
    realShopNotes: [
      "第一屏要加上服務地區和清洗的起跳價，急著找師傅的人看到這兩個才會繼續看。",
      "主要按鈕直接改成加 LINE，修繕業的客人幾乎都用 LINE 傳照片。",
      "保固範圍寫成條列，避免完工後才有爭議。"
    ]
  },
  {
    slug: "tutoring-center",
    demoSlug: "tutoring-center",
    demoUrl: "/studio/demo/tutoring-center",
    industry: "補習班",
    brand: "啟衡文理補習班",
    title: "設計範例：啟衡文理補習班（虛構品牌）",
    description: "給補習班、才藝教室參考的版面。依班型列出課程，再說明試聽流程和家長常問的問題。補習班名稱是我編的，不是客戶。",
    forWho: "國中、高中補習班和小型才藝教室。看網站的通常是家長，想知道「有沒有適合我家小孩的班」「可不可以先試聽」。",
    firstScreen: "教室照片配一句短標題和「認識課程安排」按鈕。紙張色底和略微傾斜的照片，讓整頁讀起來比較像一份課程簡介。",
    nextStep: "往下是 4 種班型（會考班、學測班、英文、一對一），再來是試聽流程。常見問題回答家長最常問的：試聽要不要錢、能不能只補一科、會不會收到回報。",
    strategy: "依班型整理課程，接著說明試聽流程，再回答家長常問的費用與回報問題。",
    realShopNotes: [
      "加上每個班的上課時段和老師介紹，家長會拿來跟孩子的行程對照。",
      "試聽改成真的可以預約的表單，送出後通知到補習班的 LINE。",
      "如果有榜單，要先取得學生和家長同意才放上去。"
    ]
  }
];

export function getWorkCase(slug: string): WorkCase {
  const item = workCases.find((work) => work.slug === slug);
  if (!item) throw new Error(`Unknown work case: ${slug}`);
  return item;
}
