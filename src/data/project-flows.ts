export interface FlowNode { title: string; purpose: string; output: string; boundary: string }
export const projectFlows: Record<string, FlowNode[]> = {
  discord: [
    { title: "題目圖片", purpose: "Discord 作為操作入口，接收使用者的題目與追問。", output: "圖片與訊息上下文", boundary: "先辨認輸入類型；畫面上的展示不會把訪客輸入送到模型。" },
    { title: "Mathpix OCR", purpose: "將圖片中的文字與數學內容轉成後續模型可處理的輸入。", output: "辨識後的題目文字", boundary: "OCR 的辨識錯誤可能傳到下一階段，不能把辨識結果直接當作正確答案。" },
    { title: "LLM 解題", purpose: "將辨識後的題目與對話上下文交給 LLM API，產生解答與步驟。", output: "待核對的解題文字", boundary: "模型可能推理錯誤；專案沒有標準化答對率評測，解答仍需核對。" },
    { title: "訊息切分", purpose: "把長回覆拆成 Discord 可以傳送的訊息，再送回對話。", output: "分段回覆", boundary: "API 產生的文字不一定符合平台訊息長度，需要在整合層處理。" },
    { title: "SQLite 上下文", purpose: "保存對話資料，讓使用者能接續同一個問題追問。", output: "可接續的對話紀錄", boundary: "這是歷史專案的架構說明，目前長期服務已結束。" },
  ],
  sift: [
    { title: "Semgrep 規則", purpose: "以靜態規則先處理能明確描述的程式碼問題。", output: "規則命中與位置", boundary: "規則命中是需要核對的線索，不等於已證實的漏洞。" },
    { title: "套件驗證", purpose: "檢查程式碼引用的套件資訊，補充單看程式片段不足的脈絡。", output: "套件核對結果", boundary: "套件資訊與程式行為是不同證據，兩者需要一起閱讀。" },
    { title: "可選 LLM", purpose: "在需要時使用模型補充語意分析，保留不依賴模型的規則流程。", output: "額外分析線索", boundary: "需要額外 API 設定，模型也可能誤判；不是每次掃描都必須使用。" },
    { title: "SARIF / JSON", purpose: "把結果整理成機器可讀格式，供其他開發工具使用。", output: "結構化分析報告", boundary: "報告格式方便整合，但不會自動提高檢查本身的正確率。" },
    { title: "SQLite 歷史", purpose: "保存分析紀錄，使結果可以追蹤與回看。", output: "歷次檢查紀錄", boundary: "可追蹤性與正確性是兩件事；重跑後仍需要閱讀結果。" },
  ],
  rl: [
    { title: "16 維狀態", purpose: "將 2048 的 4 × 4 棋盤編碼，作為網路輸入。", output: "棋盤狀態向量", boundary: "狀態表示會影響模型看到的資訊；本專案使用 log2 編碼。" },
    { title: "4 種動作", purpose: "在上、下、左、右中選擇動作，以 epsilon-greedy 平衡探索與利用。", output: "下一個移動方向", boundary: "首頁的走一步只是規則示意，並未執行這個模型。" },
    { title: "獎勵回饋", purpose: "執行動作後，由遊戲環境回傳下一個狀態與獎勵。", output: "狀態轉移與回饋", boundary: "單次得分或好看的棋盤，不能代替多次訓練評估。" },
    { title: "Replay buffer", purpose: "保存經驗，供訓練時抽樣使用。", output: "可取樣的經驗資料", boundary: "需要配合訓練紀錄檢查，不能只從有經驗回放就推論模型已收斂。" },
    { title: "DQN 更新", purpose: "用 MSE 與 Adam 更新神經網路，練習估計動作價值。", output: "更新後的網路參數", boundary: "目前沒有 target network 或 Double DQN，也尚未完成多個隨機種子的基準比較。" },
  ],
};
