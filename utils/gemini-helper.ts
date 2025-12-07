import axios from 'axios';

const GEMINI_API_KEY = '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function generatePlaywrightSteps(task: string): Promise<string> {
  const response = await axios.post(
    `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
    {
      contents: [{
        parts: [{
          text: `Convert this test case to Playwright TypeScript code:

${task}

 ⚠️ Locator & Code Rules:
 
  1. Prefer data-testid if available, else use CSS #id if unique.
  2. If no unique id, then use: getByRole(), getByLabel(), getByPlaceholder(), getByText().
  3. If multiple matching locators are found, always select the first element (use .first()).
  4. Avoid generic CSS like div:nth-child(), span, or indexes.
  5. Before interacting (click, fill), always ensure element is ToBeVisible using expect() with 15 seconds timeouts.
  6. Never use page.waitForTimeout(); use expect conditions or waitForLoadState() instead.
  7. Use locator({ hasText: '...' }) when filtering by text inside an element.
  8. Use descriptive const variables for locators reused in multiple steps.
  9. Generate clean Playwright TypeScript with: import { test, expect } from '@playwright/test';
  10. No explanation, only code.
  11. If no data-testid or unique id exists, prefer semantic element structure.
  12. When targeting heading elements, use getByRole('heading', { name: /text/i }) if text is stable.
  13. Never invent attributes like data-testid if they don't exist in HTML.
  14. Always prefer existing class names or roles over creating non-existent attributes.
  15. For dynamic text inside cards, use semantic selectors like 'a.user-name h3'.`
        }]
      }]
    }
  );
  return response.data.candidates[0].content.parts[0].text;
}
