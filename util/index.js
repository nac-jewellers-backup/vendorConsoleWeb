module.exports = {
    setUserSession: function (session) {
        const { user, token } = session;
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('session', JSON.stringify(session));
    },
    getSession: function () {
        const session = sessionStorage.getItem('session');
        if (session === 'undefined' || !session) { return null; }
        else { return JSON.parse(session); }
    },
    getUser: function () {
        const user = sessionStorage.getItem('user');
        if (user === 'undefined' || !user) { return null; }
        else { return JSON.parse(user); }
    },
    getToken: function () {
        return sessionStorage.getItem('token');
    },
    resetUserSession: function () {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('session');
    }
}