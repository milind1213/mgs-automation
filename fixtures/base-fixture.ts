import { test as base } from '@playwright/test';
import { RequestHandler } from '../common/commonREST/base-requests';
import { APILogger } from '../utils/api-logger';
import { setCustomExpectLogger } from '../utils/custom-expects';
import { config } from '../env-config';
import { createToken } from '../common/commonREST/create-token';

export type TestOptions = {
    api: RequestHandler
    config: typeof config
}

export type WorkerFixture = {
    authToken: string
}

export const test = base.extend<TestOptions, WorkerFixture>({
    authToken: [ async ({}, use) => {
        const authToken = await createToken(config.userEmail, config.userPassword)
        await use(authToken)
    }, {scope: 'worker'}], 

    api: async({request, authToken}, use) => {
        const logger = new APILogger()
        setCustomExpectLogger(logger)
        const requestHandler = new RequestHandler(request, config.apiUrl, logger, authToken)
        await use(requestHandler)
    },
    config: async({}, use) => {
        await use(config)
    }
})