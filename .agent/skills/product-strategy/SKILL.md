---
name: Product Strategy & Architecture / 产品策略与架构
description: Core product documentation defining the app's background, goals, feasibility analysis, and technical implementation strategy. This serves as the "North Star" for development. / 定义应用背景、目标、可行性分析和技术实施策略的核心产品文档。作为开发的“北极星”。
---

# Product Strategy: "Anti-Social" English Learning App
# 产品策略：“社恐”英语学习应用

## 1. Requirement Background & Market Analysis / 需求背景与市场分析

### 1.1 The Problems (Pain Points) / 问题（痛点）
*   **High Anxiety:** Introverted learners are afraid to speak with real humans (tutors/partners) due to social pressure.
    (高焦虑：内向的学习者由于社交压力，害怕与真人（导师/伙伴）交谈。)
*   **Lack of Feedback:** Existing apps either provide no feedback (Duolingo) or generic "Good/Bad" scores without detailed correction.
    (缺乏反馈：现有的应用要么不提供反馈（Duolingo），要么只提供通用的“好/坏”评分，没有详细的纠正。)
*   **Cost Barrier:** Human tutors ($15-30/hr) are too expensive for daily practice.
    (成本障碍：真人导师（$15-30/小时）对于日常练习来说太贵了。)

### 1.2 Market Opportunity (Gap) / 市场机会（空白）
*   **SEO Reality:** General keywords ("Learn English") are saturated (Difficulty 9/10).
    (SEO 现状：通用关键词（“学习英语”）已饱和（难度 9/10）。)
*   **The Niche:** **"IELTS Speaking Practice"** and **"Social Anxiety Friendly"** niches have high demand but lower competition.
    (利基市场：**“雅思口语练习”**和**“社恐友好”**的利基市场需求量大，但竞争较小。)

---

## 2. Product Goal & Strategy / 产品目标与策略

### 2.1 Core Concept: "The AI Roleplay Partner" / 核心概念：“AI 角色扮演伙伴”
*   **What:** A safe, judgment-free space where users practice speaking with AI characters (e.g., "Grumpy Barista", "Strict Examiner").
    (内容：一个安全、无评判的空间，用户可以在这里与 AI 角色（如“脾气暴躁的咖啡师”、“严格的考官”）练习口语。)
*   **Target Audience:** Introverts, IELTS test-takers, and professionals needing career English.
    (目标受众：内向者、雅思考生和需要职业英语的专业人士。)

### 2.2 Success Metrics / 成功指标
*   **User Value:** "I tried 10 times with the AI, and now I'm confident to say it to a human."
    (用户价值：“我和 AI 试了 10 次，现在我有信心对真人说了。”)

---

## 3. Feasibility & Cost Analysis / 可行性与成本分析

### 3.1 The "Cost Trap" vs. "The Solution" / “成本陷阱”与“解决方案”
*   **Traditional Approach (Cloud Audio):** Using OpenAI GPT-4o Audio + Cloud TTS costs **~$2.40 per 15-min session**. This makes a free tier impossible.
    (传统方法（云音频）：使用 OpenAI GPT-4o Audio + Cloud TTS 每 15 分钟会话成本 **~$2.40**。这使得免费层级不可能实现。)
*   **Our Approach (Text + Local):** shifting to "LLM Text Generation" + "Local TTS/STT" reduces cost to **~$0.01 per session**.
    (我们的方法（文本+本地）：转向“LLM 文本生成”+“本地 TTS/STT”将成本降低至 **~$0.01 每会话**。)

### 3.2 Profitability Model / 盈利模型
*   **Free Users:** Zero marginal cost. Unlimited practice supported by local/free stack.
    (免费用户：零边际成本。本地/免费栈支持无限练习。)
*   **Paid Users:** Subscription for "Premium Cloud Voices" (OpenAI/ElevenLabs) and "Deepgram STT" (High Accuracy).
    (付费用户：订阅“高级云语音”（OpenAI/ElevenLabs）和“Deepgram STT”（高精度）。)

---

---

## 4. Local Low-Cost Technical Solution / 本地低成本技术方案

### 4.1 LLM Selection (Phase 1 Strategy) / LLM 选型（第一期策略）
*   **Goal:** Multi-model redundancy to ensure "Zero Cost" & "Global Stability".
    (目标：多模型冗余，确保“零成本”和“全球稳定性”。)

| Model (模型) | Role (角色) | Cost (1M Input/Output) | Why Selected? (入选理由) |
| :--- | :--- | :--- | :--- |
| **Qwen 2.5 Turbo** | **Primary (首选)** | **$0.05** / $0.20 | **Best Balance.** Extremely cheap & smart. The main workhorse. |
| **Gemini 1.5 Flash**| **Backup (备选)** | $0.075 / $0.30 | **Stability.** Google's infrastructure is globally reliable. |
| **GPT-4o mini** | **Baseline (保底)** | $0.15 / $0.60 | **Benchmark.** Only used if others fail. The "Standard". |
| **GLM-4 (Flash/Air)**| **Alternative (候补)**| ~$0.01 - $0.07 | **Extreme Low Cost.** If Qwen has regional issues, switch to Zhipu. |

*   **Implementation Strategy:**
    1.  App tries **Qwen 2.5 Turbo** first.
    2.  If error/slow -> Switch to **Gemini 1.5 Flash**.
    3.  If both fail -> Switch to **GPT-4o mini**.

### 4.2 Architecture: The "Zero Cost" Stack / 架构：“零成本”栈

| Component (组件) | Tool Selection (工具选型) | Why? (原因) | Cost (成本) |
| :--- | :--- | :--- | :--- |
| **Brain** (Logic) | **Qwen 2.5 Turbo** (Primary) <br> **Gemini 1.5 Flash** (Backup) | Smart enough for roleplay, incredibly cheap text generation. | <$0.01/session |
| **Hearing** (Input) | **`whisper.rn`** (Local) | Runs OpenAI Whisper natively on iOS/Android. Zero latency. | **$0.00** |
| **Speaking** (Output)| **Edge TTS** (Online Free) <br> **Piper** (Offline) | Edge TTS has "Human-like" quality. Piper is true offline fallback. | **$0.00** |
| **Judging** (Score) | **Local Text Match** | Check if STT output matches target phrase keywords. | **$0.00** |

### 4.2 Fallback Strategy (Backend) / 降级策略（后端）
*   If a user's phone is too old (e.g., iPhone 6) to run Whisper locally:
    (如果用户的手机太旧（如 iPhone 6）无法本地运行 Whisper：)
*   **Fallback:** Upload audio to self-hosted **Rust (`whisper-rs`)** or **Java (`Vosk`)** server.
    (降级：将音频上传到自托管的 **Rust (`whisper-rs`)** 或 **Java (`Vosk`)** 服务器。)
