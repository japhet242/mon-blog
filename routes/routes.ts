/**
 * routes public , route que tout le monde peut acceder 
 * @type {Array}
 */

export const publicRoute = [
    "/",
    "/error",
    "/api/uploadthing"
]

/**
 * route d'authentification 
 * @type {Array}
 */

export const authRoute = [
    "/auth/login",
    "/auth/register"
]
/**
 *  permet de savoir si nous somme dans l"api de l'authentification
 * @type {string}
 */
export const apiPrefixRoute = "/api/auth/"
export const apiPrefixupload = "/api/uploadthing"

/**
 * route par defaut pour la redirection
 * @type {Array}
 */
export const DEFAULT_REDIRECT ="/"