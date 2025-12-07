import { faker } from '@faker-js/faker';
import requestPayload from './POST-article.json';
export const generateArticlePayload = () => {
    return {
        article: {
            title: faker.lorem.words(3),
            description: faker.lorem.sentence(),
            body: faker.lorem.paragraphs(2),
            tagList: []
        }
    }
}

export function generateNewRandomArticlesPayload() {
    structuredClone(requestPayload);
    requestPayload.article.title = faker.lorem.words(3);
    requestPayload.article.description = faker.lorem.sentence();
    requestPayload.article.body = faker.lorem.paragraphs(2);
    return requestPayload;
}
