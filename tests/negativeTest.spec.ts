
import { test } from '../fixtures/fixtures'; // your custom fixtures
import { expect } from '../utils/custom-expects';

type UserTestData = {
    username: string;
    usernameErrorMessage: string;
};

// Array of test cases
const testCases: UserTestData[] = [
    { username: 'dd', usernameErrorMessage: 'is too short (minimum is 3 characters)' },
    { username: 'ddd', usernameErrorMessage: '' }, // assuming valid, no error
    { username: 'dddddddddddddddddddd', usernameErrorMessage: '' },
    { username: 'ddddddddddddddddddddd', usernameErrorMessage: 'is too long (maximum is 20 characters)' }
];

testCases.forEach(({ username, usernameErrorMessage }) => {
    test(`Error message validation for username: "${username}"`, async ({ api }) => {

        const newUserResponse = await api
            .path('/users')
            .body({
                user: {
                    username: username,
                    email: 'test@example.com',
                    password: 'password123'
                }
            })
            .clearAuth()
            .postRequest(422); 

        console.log(newUserResponse);

        if (username.length == 3 || username.length == 20) {
            expect(newUserResponse.errors).not.toHaveProperty('username')
        } else {
            expect(newUserResponse.errors.username[0]).shouldEqual(usernameErrorMessage)
        }
    });
});
