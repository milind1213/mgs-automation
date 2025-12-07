import { test } from '../fixtures/fixtures';
import { expect } from '../utils/custom-expects';
import requestPayload from '../rest-objects/request-objects/POST-article.json';
import { faker } from '@faker-js/faker'; 
import { generateArticlePayload,generateNewRandomArticlesPayload} from '../rest-objects/request-objects/articles-payloads';

test('Create and Delete Article', async ({ api }) => {
    // 1 - Deep copy (JSON parse/stringify)
     const articlePayload = JSON.parse(JSON.stringify(requestPayload))
     const title = articlePayload.article.title = faker.lorem.words(3)
    // 2 - Direct function   
    const payload = generateArticlePayload()
    // 3 - With structured clone
    const newPayload = generateNewRandomArticlesPayload()

    const createArticleResponse = await api
        .path('/articles')
        .body(newPayload)
        .postRequest(201)
    await expect(createArticleResponse).shouldMatchSchema('articles', 'POST_articles', true)
    expect(createArticleResponse.article.title).shouldEqual(newPayload.article.title)
    const slugId = createArticleResponse.article.slug

    const articlesResponse = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getRequest(200)
    await expect(articlesResponse).shouldMatchSchema('articles', 'GET_articles', true)
    expect(articlesResponse.articles[0].title).shouldEqual(newPayload.article.title)

    await api
        .path(`/articles/${slugId}`)
        .deleteRequest(204)

    const articlesResponseTwo = await api
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .getRequest(200)
    await expect(articlesResponseTwo).shouldMatchSchema('articles', 'GET_articles')
    expect(articlesResponseTwo.articles[0].title).not.shouldEqual(newPayload.article.title)
})