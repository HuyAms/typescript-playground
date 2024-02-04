type Route = "/" | "/about" | "/admin" | "/admin/users";

/**
 * 
 * Expect result
 * {
 *  "/": "/",
 *  "/about": "/about",
 *  "/admin": "/admin",
 *  "/admin/users": "/admin/users"
 * }
 */

type RoutesObject = {
    [T in Route]: T
}