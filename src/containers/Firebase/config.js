import app from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import ReactGA from 'react-ga';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
        this.db = app.firestore();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () =>
        this.auth.signOut();

    doPasswordReset = email =>
        this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    doSendEmailVerification = () =>
        this.auth.currentUser.sendEmailVerification({
            url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
        });

    // *** Merge Auth and DB User API *** //

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                authUser.getIdToken(true).then((tokenId) => {
                    this.user(authUser.uid)
                        .get()
                        .then(doc => {
                            const dbUser = doc.data();

                            // default empty roles
                            // if (!dbUser.roles) {
                            //     dbUser.roles = [];
                            // }

                            // merge auth and db user
                            authUser = {
                                jwtToken: tokenId,
                                uid: authUser.uid,
                                email: authUser.email,
                                emailVerified: authUser.emailVerified,
                                providerData: authUser.providerData,
                                ...dbUser,
                            };

                            //Integration with GA
                            ReactGA.set({
                                userId: authUser.uid
                            });

                            ReactGA.event({
                                category: authUser.uid,
                                action: 'User logged in',
                            });


                            next(authUser);
                        });
                })
            } else {
                fallback();
            }
        });

    // *** User API ***

    user = uid => this.db.collection('users').doc(uid);

    users = () => this.db.collection('users');
}

export default Firebase;