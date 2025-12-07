import { test } from '../../fixtures/base-fixture';
import { expect } from '../../utils/custom-expects';
import requestPayload from '../../rest-objects/request-objects/POST-article.json';
import { faker } from '@faker-js/faker'; 
import { generateArticlePayload, generateNewRandomArticlesPayload } from '../../rest-objects/request-objects/articles-payloads';

test('Create and Delete Article', async ({ api }) => {
    const articlePayload = JSON.parse(JSON.stringify(requestPayload)) // 1 - Deep copy (JSON parse/stringify)
    const payload = generateArticlePayload() //direct function call
    const newPayload = generateNewRandomArticlesPayload() // structuredClone(payload)
    
    // Create Article
    const createArticleResponse = await api
        .path('/articles')
        .body(newPayload)
        .postRequest(201)
    await expect(createArticleResponse).shouldMatchSchema('articles', 'POST_articles', true)
    expect(createArticleResponse.article.title).shouldEqual(newPayload.article.title)
    const slugId = createArticleResponse.article.slug
    
    // Get Articles
    const articlesResponse = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getRequest(200)
    await expect(articlesResponse).shouldMatchSchema('articles', 'GET_articles', true)
    expect(articlesResponse.articles[0].title).shouldEqual(newPayload.article.title)
    
    // Delete Article
    await api
        .path(`/articles/${slugId}`)
        .deleteRequest(204)
    
    // Get Articles Again
    const articlesResponseTwo = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getRequest(200)
    await expect(articlesResponseTwo).shouldMatchSchema('articles', 'GET_articles')
    expect(articlesResponseTwo.articles[0].title).not.shouldEqual(newPayload.article.title)
})