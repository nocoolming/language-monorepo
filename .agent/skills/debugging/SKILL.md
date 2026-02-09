---
name: Debugging & Analysis Standards / 调试与分析规范
description: Guidelines for root cause analysis and solution evaluation in bug fixes / Bug 修复中根本原因分析与方案评估的指南
---

# 调试与分析规范 / Debugging & Analysis Standards

## 根本原因分析 / Root Cause Analysis
在修复 Bug 时，必须明确识别问题的根源，而不仅仅是修复表现症状。
When fixing bugs, the root cause must be clearly identified, not just the symptoms.

### 识别准则 / Identification Criteria
- **冲突逻辑**：分析哪些功能或事件在逻辑上产生了冲突（例如：展开与选择事件冲突）。 / **Conflicting Logic**: Analyze which features or events are logically conflicting (e.g., expansion vs. selection conflict).
- **生命周期问题**：检查组件挂载、更新或卸载时的状态变化。 / **Lifecycle Issues**: Check state changes during component mounting, updating, or unmounting.
- **外部依赖**：确认是否由第三方库或 API 的预期外行为引起。 / **External Dependencies**: Confirm if it's caused by unexpected behavior from third-party libraries or APIs.

## 方案评估 / Solution Evaluation
在选择修复方案时，应对多种可能性进行对比评估。
When choosing a fix solution, multiple possibilities should be compared and evaluated.

### 评估维度 / Evaluation Dimensions
- **标准化 (Standardization)**：优先使用成熟的库（如 MUI）提供的标准组件。 / Prioritize using standard components provided by mature libraries (e.g., MUI).
- **可维护性 (Maintainability)**：方案是否易于理解和后续修改。 / Whether the solution is easy to understand and maintain.
- **用户体验 (User Experience)**：修复是否提升了交互的流畅性和直观性。 / Whether the fix improves the smoothness and intuitiveness of interaction.

---
*本规范基于 CategoryTreeSelect Bug 修复案例总结。*
*This standard is summarized based on the CategoryTreeSelect bug fix case.*
