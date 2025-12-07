import { expect as baseExpect } from '@playwright/test';
import { APILogger } from './api-logger';
import { validateSchema } from './schema-validator';

let apiLogger: APILogger;

export const setCustomExpectLogger = (logger: APILogger) => {
    apiLogger = logger;
};

declare global {
    namespace PlaywrightTest {
        interface Matchers<R, T> {
            // API Assertions
            shouldEqual(expected: T): R;
            shouldBeLessThanOrEqual(expected: T): R;
            shouldMatchSchema(dirName: string, fileName: string, createSchemaFlag?: boolean): Promise<R>;

            // UI Assertions
            shouldBeVisible(): Promise<R>;
            shouldHaveText(expected: string | RegExp): Promise<R>;
            shouldContainText(expected: string): Promise<R>;
            shouldHaveAttribute(name: string, value: string | RegExp): Promise<R>;
            shouldBeEnabled(): Promise<R>;
            shouldBeDisabled(): Promise<R>;
            shouldHaveCount(expected: number): Promise<R>;
            toHaveAmount(expected: number): Promise<R>;
        }
    }
}

export const expect = baseExpect.extend({

    // ---------------------------------------------------------
    // API SCHEMA VALIDATION
    // ---------------------------------------------------------
    async shouldMatchSchema(received: any, dirName: string, fileName: string, createSchemaFlag: boolean = false) {
        let pass: boolean;
        let message: string = '';

        try {
            await validateSchema(dirName, fileName, received, createSchemaFlag);
            pass = true;
            message = 'Schema validation passed';
        } catch (e: any) {
            pass = false;
            const logs = apiLogger?.getRecentLogs() ?? '';
            message = `${e.message}\n\nRecent API Activity:\n${logs}`;
        }

        return {
            message: () => message,
            pass
        };
    },

    // ---------------------------------------------------------
    // API BDD MATCHERS
    // ---------------------------------------------------------
    shouldEqual(received: any, expected: any) {
        let pass: boolean;
        let logs: string = '';

        try {
            baseExpect(received).toEqual(expected);
            pass = true;
        } catch {
            pass = false;
            logs = apiLogger?.getRecentLogs() ?? '';
        }

        const message =
            this.utils.matcherHint('shouldEqual', undefined, undefined, { isNot: this.isNot }) +
            '\n\n' +
            `Expected: ${this.utils.printExpected(expected)}\n` +
            `Received: ${this.utils.printReceived(received)}\n\n` +
            `Recent API Activity:\n${logs}`;

        return {
            message: () => message,
            pass
        };
    },

    shouldBeLessThanOrEqual(received: any, expected: any) {
        let pass: boolean;
        let logs: string = '';

        try {
            baseExpect(received).toBeLessThanOrEqual(expected);
            pass = true;
        } catch {
            pass = false;
            logs = apiLogger?.getRecentLogs() ?? '';
        }

        const message =
            this.utils.matcherHint('shouldBeLessThanOrEqual', undefined, undefined, { isNot: this.isNot }) +
            '\n\n' +
            `Expected <= ${this.utils.printExpected(expected)}\n` +
            `Received: ${this.utils.printReceived(received)}\n\n` +
            `Recent API Activity:\n${logs}`;

        return {
            message: () => message,
            pass
        };
    },

    // ---------------------------------------------------------
    // UI ASSERTIONS (NEW)
    // ---------------------------------------------------------
    async shouldBeVisible(locator: any) {
        let pass: boolean;
        let logs = '';

        try {
            await baseExpect(locator).toBeVisible();
            pass = true;
        } catch {
            pass = false;
            logs = apiLogger?.getRecentLogs() ?? '';
        }

        return {
            message: () =>
                this.utils.matcherHint('shouldBeVisible', undefined, undefined, { isNot: this.isNot }) +
                `\nExpected element to be visible\n\nRecent Logs:\n${logs}`,
            pass
        };
    },

    async shouldHaveText(locator: any, expected: string | RegExp) {
        let pass: boolean;
        let logs = '';

        try {
            await baseExpect(locator).toHaveText(expected);
            pass = true;
        } catch {
            pass = false;
            logs = apiLogger?.getRecentLogs() ?? '';
        }

        return {
            message: () =>
                this.utils.matcherHint('shouldHaveText', undefined, undefined, { isNot: this.isNot }) +
                `\nExpected: ${expected}\n\nLogs:\n${logs}`,
            pass
        };
    },

    async shouldContainText(locator: any, expected: string) {
        let pass: boolean;
        let logs = '';

        try {
            await baseExpect(locator).toContainText(expected);
            pass = true;
        } catch {
            pass = false;
            logs = apiLogger?.getRecentLogs() ?? '';
        }

        return {
            message: () =>
                this.utils.matcherHint('shouldContainText', undefined, undefined, { isNot: this.isNot }) +
                `\nExpected substring: ${expected}\n\nLogs:\n${logs}`,
            pass
        };
    },

    async shouldHaveAttribute(locator: any, name: string, value: string | RegExp) {
        let pass: boolean;
        let logs = '';

        try {
            await baseExpect(locator).toHaveAttribute(name, value);
            pass = true;
        } catch {
            pass = false;
            logs = apiLogger?.getRecentLogs() ?? '';
        }

        return {
            message: () =>
                this.utils.matcherHint('shouldHaveAttribute', undefined, undefined, { isNot: this.isNot }) +
                `\nExpected attribute: ${name} = ${value}\n\nLogs:\n${logs}`,
            pass
        };
    },

    async shouldBeEnabled(locator: any) {
        let pass: boolean;
        let logs = '';

        try {
            await baseExpect(locator).toBeEnabled();
            pass = true;
        } catch {
            pass = false;
            logs = apiLogger?.getRecentLogs() ?? '';
        }

        return {
            message: () =>
                this.utils.matcherHint('shouldBeEnabled', undefined, undefined, { isNot: this.isNot }) +
                `\nExpected element to be enabled\n\nLogs:\n${logs}`,
            pass
        };
    },

    async shouldBeDisabled(locator: any) {
        let pass: boolean;
        let logs = '';

        try {
            await baseExpect(locator).toBeDisabled();
            pass = true;
        } catch {
            pass = false;
            logs = apiLogger?.getRecentLogs() ?? '';
        }

        return {
            message: () =>
                this.utils.matcherHint('shouldBeDisabled', undefined, undefined, { isNot: this.isNot }) +
                `\nExpected element to be disabled\n\nLogs:\n${logs}`,
            pass
        };
    },

    async shouldHaveCount(locator: any, expected: number) {
        let pass: boolean;
        let logs = '';

        try {
            await baseExpect(locator).toHaveCount(expected);
            pass = true;
        } catch {
            pass = false;
            logs = apiLogger?.getRecentLogs() ?? '';
        }

        return {
            message: () =>
                this.utils.matcherHint('shouldHaveCount', undefined, undefined, { isNot: this.isNot }) +
                `\nExpected count: ${expected}\n\nLogs:\n${logs}`,
            pass
        };
    },

    async toHaveAmount(locator: any, expected: number, options?: { timeout?: number }) {
    const assertionName = 'toHaveAmount';
    let pass: boolean;
    let matcherResult: any;
    try {
      const expectation = this.isNot ? baseExpect(locator).not : baseExpect(locator);
      await expectation.toHaveAttribute('data-amount', String(expected), options);
      pass = true;
    } catch (e: any) {
      matcherResult = e.matcherResult;
      pass = false;
    }

    if (this.isNot) {
      pass =!pass;
    }

    const message = pass
      ? () => this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
          '\n\n' +
          `Locator: ${locator}\n` +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '')
      : () =>  this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
          '\n\n' +
          `Locator: ${locator}\n` +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '');

    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: matcherResult?.actual,
    }
  }
});
