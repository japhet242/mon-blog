/**
 * routes public , route que tout le monde peut acceder 
 * @type {Array}
 */

export const publicRoute = [
    "/",
    "/error"
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

/**
 * route par defaut pour la redirection
 * @type {Array}
 */
export const DEFAULT_REDIRECT ="/"