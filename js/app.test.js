const appModule = require("./app");

function mockElements() {
    let email = document.createElement("input");
    email.type = "email";
    email.value = "mail@mail.com";
    let userSIEmail = document.getElementById("userSIEmail");
    userSIEmail = email;

    let password = document.createElement("input");
    password.type = "password";
    password.value = "123456";

    return [email, password];
}

function mockdata() {
    return {
        email: "camo0402@gmail.com",
        password: "Contraseña123456",
    };
}

describe("Test form elements manipulation methods", () => {
    test("Expect to get 2 elements from getFormElems", () => {
        let elems = appModule.getFormElems();
        expect(elems).toHaveLength(2);
    });
    test("Expect to validate email input", () => {
        let data = mockElements();
        data.password = "";
        let elems = appModule.checkUserSIEmail();
        expect(elems).toBeTruthy();
    });
});