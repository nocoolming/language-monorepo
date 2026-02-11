# Product Strategy & Architecture / 产品策略与架构

> **Role**: This document serves as the "North Star" for development. Refer to it for product goals, user personas, and core features.
> **Last Updated**: 2026-02-11 (Round 3 Feedback)

## 1. Product Vision / 产品愿景
Build a **"Voice-First" Language Learning App** that focuses on speaking and listening mock scenarios, rather than traditional grammar drills.
构建一个**“语音优先”的语言学习应用**，专注于口语和听力模拟场景，而不是传统的语法练习。

## 2. Core Principles / 核心原则
1.  **Voice First / 语音优先**: Every interaction should ideally be voice-enabled or sound-centric.
    - **UI Rule**: "Hold to Speak" (Push-to-Talk) is the primary interaction model for roleplay.
2.  **Immersive / 沉浸式**: Minimal UI, maximum audio content.
3.  **Single Language UI / 单语言 UI**: 
    - The App Interface must be in **ONE language** consistent with the user's Native Language (e.g., Chinese for Chinese users) OR the Target Language. 
    - **DO NOT Mix Languages** (e.g., do not use "Title / 标题" formats).
    - **Exceptions**: Content itself (e.g., an English article title) remains in the target language.
4.  **Community Driven / 社区驱动**: Learning is social.

## 3. Architecture / 架构

### Tech Stack
- **Framework**: React Native (Expo)
- **Navigation**: Expo Router (File-based routing)
- **State Management**: Zustand
- **Styling**: StyleSheet (Standard RN)

### Navigation Structure (Prototype)
- **Root**: `(auth)` vs `(main)`
- **Auth**: `sign-in`, `sign-on`, `user-setup`
- **Main**:
    - **Tabs**: `Listen`, `Speak`, `Community` (Persistent Bottom Bar)
        - **Nested Stacks**: Detail pages (`article/[id]`, `post/[id]`) are nested within tabs to keep the footer visible.
    - **Drawer**: `Profile`, `Settings`

## 4. Key Features (MVP) / 关键功能 (MVP)
- **Smart News Feed**: Daily news tailored to user level.
- **AI Roleplay**: Scenario-based chatting (Ordering coffee, Job interview).
- **Social Battery**: Gamification mechanic limiting daily study to prevent burnout.
