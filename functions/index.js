const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

// trigger function on new user creation.
// when a new user is created this fucntion is triggered. When triggered a defualt 
// data object is pushed to the roles collection, this object contains the user's role status
exports.AddUserRole = functions.auth.user().onCreate(async (authUser) => {
    if (authUser.email) {
        const customClaims = {
            customer: true,
        };
        try {
            var _ = await admin.auth().setCustomUserClaims(authUser.uid, customClaims)
            return db.collection("roles").doc(authUser.uid).set({
                email: authUser.email,
                role: customClaims
            })
        } catch (error) {
            console.log(error)
        }
    }
});

// create admin user on when you register a new admin
exports.setAdmin = functions.https.onCall(async (data, context) => {

    // if (!context.auth.token.admin) return
    if (!context.auth.token) return

    try {
        var _ = await admin.auth().setCustomUserClaims(data.uid, data.role)

        return db.collection("roles").doc(data.uid).update({
            role: data.role
        })

    } catch (error) {
        console.log('🤡', error)
    }

});

// this function can only be triggered by the admin. This function allows the admin to
// set user roles accordingly.
exports.setUserRole = functions.https.onCall(async (data, context) => {
    if (!context.auth.token.admin) return
    try {
        var _ = await admin.auth().setCustomUserClaims(data.uid, data.role)
        return db.collection("roles").doc(data.uid).update({
            role: data.role
        })
    } catch (error) {
        console.log(error)
    }
});