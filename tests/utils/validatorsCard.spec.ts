import {describe, expect, test} from "@jest/globals";
import {validarToken, validateTokenAuth} from "../../src/helpers/validatorsCard";

describe("validator file validator / function validarToken", () => {

    test("If a text string is delivered Wi9YDgXPPPayLHfx, should return not null", async () => {
        expect(validarToken("Wi9YDgXPPPayLHfx")).not.toBeNull();
    });

    test("If a text string is delivered Wi9YDgXPPPayLHfx, should return a empty string", async () => {
        expect(validarToken("Wi9YDgXPPPayLHfx")).toBe("");
    });

    test("If a text string is delivered 9YDgXPPPayLHfx, should return a message string's amount", async () => {
        expect(validarToken("Wi$%9YDgXPPPayLHfx!")).toBe("El token debe tener 16 digitos");

    });

    test("If a text string is delivered Wi$%9YDyL@!#Hfx!, should return a message that only certain characters are allowed", async () => {
        expect(validarToken("Wi$%9YDyL@!#Hfx!")).toBe("El token no cumple con sus requisitos (tener 16 caracteres, donde utiliza números, letras minúsculas, letras mayúsculas)");

    });

});

describe("validator file validator / function validateTokenAuth  ", () => {

    test("If a text string is delivered pk_test_LsRBKejzCOEEWOsw, should return not null  ", async () => {
        expect(validateTokenAuth("pk_test_LsRBKejzCOEEWOsw")).not.toBeNull();
    });

    test("If a text string is delivered pk_test_LsRBKejzCOEEWOsw, should not return a empty string", async () => {
        expect(validateTokenAuth("")).toBe("Debe mandar un token de autorizacion valido o con data");
    });

    test("If a text string is delivered pk_te7st_LsRBKejzCOEEWOsw, should not return a empty string", async () => {
        expect(validateTokenAuth("pk_te7st_LsRBKejzCOEEWOsw")).toBe("El token pk_te7st_LsRBKejzCOEEWOsw no cumple con el formato pk_test_");
    });
});
