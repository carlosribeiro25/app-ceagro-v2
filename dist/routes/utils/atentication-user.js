export function autenticationUser(request) {
    const user = request.user;
    if (!user) {
        throw new Error('Invalid autentication');
    }
    return user;
}
