// import { test, expect } from '@playwright/test';

// test('GET tags', async ({ request }) => {
// const response  = await request.get('https://conduit-api.bondaracademy.com/api/tags');
//     expect(response.ok()).toBeTruthy();
//     const responseBody = await response.json();
//     console.log(responseBody);
// });

// test('GET Articles', async ({ request }) => {
// const response  = await request.get('https://conduit-api.bondaracademy.com/api/articles');
//     expect(response.ok()).toBeTruthy();
//     const responseBody = await response.json();
//     console.log(responseBody.articles[0].title);
// });


// test('Create and Delete Articles', async ({ request }) => {
// const response  = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
//     data: { "user": { "email": "templateapiuser@xyz.com", "password": "Welcome"}}});
//     expect(response.ok()).toBeTruthy();
//     const responseBody = await response.json();
//     const token  = responseBody.user.token;
    
   
//     // Create Article
//     const response1  = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
//         data: { "article": { "title": "Test Milind", "description": "Hello Milind", "body": "Test Body", "tagList": [] } },
//         headers: {
//             Authorization : `Token ${token}`
//         }
//     });
//     expect(response1.ok()).toBeTruthy();
//     const responseBody1 = await response1.json();
//     expect(responseBody1.article.title).toBe("Test Milind");
//     const slugId  = responseBody1.article.slug;
   

//     // Get Article
//     const response3  = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
//         headers: {
//             Authorization : `Token ${token}`
//         }
//     });
//     expect(response3.ok()).toBeTruthy();
//     const responseBody3 = await response3.json();
//     expect(responseBody3.articles[0].title).toBe("Test Milind");
   

//    // Delete Article by slug    
//    const response2  = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
//         headers: {
//             Authorization : `Token ${token}`
//         }
//     });
//     expect(response2.ok()).toBeTruthy();
//     expect(response2.status()).toBe(204);
//     console.log(`Article with slug ${slugId} deleted successfully.`);

// });


// test('Create, Update and Delete Articles', async ({ request }) => {
// const response  = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
//     data: { "user": { "email": "templateapiuser@xyz.com", "password": "Welcome"}}});
//     expect(response.ok()).toBeTruthy();
//     const responseBody = await response.json();
//     const token  = responseBody.user.token;
  
//     // Create Article
//     const response1  = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
//         data: { "article": { "title": "New Test Milind", "description": "Hello Milind", "body": "Test Body", "tagList": [] } },
//         headers: {
//             Authorization : `Token ${token}`
//         }
//     });
//     expect(response1.ok()).toBeTruthy();
//     const responseBody1 = await response1.json();
//     expect(responseBody1.article.title).toBe("New Test Milind");
//     const slugId  = responseBody1.article.slug;
    

//     // update Article
//     const responseUpdate  = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
//         data: { "article": { "title": "Updated Test Milind", "description": "Hello Milind Updated", "body": "Test Body Updated", "tagList": [] } },
//         headers: {
//             Authorization : `Token ${token}`
//         }
//     });
//     expect(responseUpdate.ok()).toBeTruthy();
//     const responseBodyUpdate = await responseUpdate.json();
//     expect(responseBodyUpdate.article.title).toBe("Updated Test Milind");
//     const updatedSlugId  = responseBodyUpdate.article.slug;


//    // Delete Article by slug    
//    const response2  = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${updatedSlugId}`, {
//         headers: {
//             Authorization : `Token ${token}`
//         }
//     });
//     expect(response2.ok()).toBeTruthy();
//     expect(response2.status()).toBe(204);
//     console.log(`Article with slug ${slugId} deleted successfully.`);

// });