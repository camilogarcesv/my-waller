// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAEDGehDOT3HNj2UpCMSDMj4fTanAh5AV8",
    authDomain: "loginwallet-74832.firebaseapp.com",
    databaseURL: "https://loginwallet-74832-default-rtdb.firebaseio.com",
    projectId: "loginwallet-74832",
    storageBucket: "loginwallet-74832.appspot.com",
    messagingSenderId: "868877269112",
    appId: "1:868877269112:web:f5e421da2b3829741dd58d",
    measurementId: "G-VGJ3538R2E",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// xxxxxxxxxx Working For Sign Up Form xxxxxxxxxx
// xxxxxxxxxx Full Name Validation xxxxxxxxxx
function checkUserFullName() {
    let userSurname = document.getElementById("userFullName").value;
    let flag = false;
    if (userSurname === "") {
        flag = true;
    }
    if (flag) {
        document.getElementById("userFullNameError").style.display = "block";
    } else {
        document.getElementById("userFullNameError").style.display = "none";
    }
}
// xxxxxxxxxx Email Validation xxxxxxxxxx
function checkUserEmail() {
    let userEmail = document.getElementById("userEmail");
    let userEmailFormate =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let flag;
    if (userEmail.value.match(userEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userEmailError").style.display = "block";
    } else {
        document.getElementById("userEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Password Validation xxxxxxxxxx
function checkUserPassword() {
    let userPassword = document.getElementById("userPassword");
    let userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    let flag;
    if (userPassword.value.match(userPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userPasswordError").style.display = "block";
    } else {
        document.getElementById("userPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Submitting and Creating new user in firebase authentication xxxxxxxxxx
function signUp() {
    let userFullName = document.getElementById("userFullName").value;
    let userEmail = document.getElementById("userEmail").value;
    let userPassword = document.getElementById("userPassword").value;
    let userFullNameFormate = /^([A-Za-z.\s_-])/;
    let userEmailFormate =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let userPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    let checkUserFullNameValid = userFullName.match(userFullNameFormate);
    let checkUserEmailValid = userEmail.match(userEmailFormate);
    let checkUserPasswordValid = userPassword.match(userPasswordFormate);

    if (checkUserFullNameValid == null) {
        return checkUserFullName();
    } else if (checkUserEmailValid == null) {
        return checkUserEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserPassword();
    } else {
        firebase
            .auth()
            .createUserWithEmailAndPassword(userEmail, userPassword)
            .then((success) => {
                const user = firebase.auth().currentUser;
                let uid;
                if (user != null) {
                    uid = user.uid;
                }
                let firebaseRef = firebase.database().ref();
                const userData = {
                    userFullName: userFullName,
                    userEmail: userEmail,
                    userPassword: userPassword,
                };
                firebaseRef.child(uid).set(userData);
                swal(
                    "Your Account Created",
                    "Your account was created successfully, you can log in now."
                ).then((value) => {
                    setTimeout(function() {
                        window.location.replace("../budget.html");
                    }, 500);
                });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                swal({
                    type: "error",
                    title: "Error",
                    text: "Error",
                });
            });
    }
}
// xxxxxxxxxx Working For Sign In Form xxxxxxxxxx
// xxxxxxxxxx Sign In Email Validation xxxxxxxxxx
function checkUserSIEmail() {
    let userSIEmail = document.getElementById("userSIEmail");
    let userSIEmailFormate =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let flag;
    if (userSIEmail.value.match(userSIEmailFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIEmailError").style.display = "block";
    } else {
        document.getElementById("userSIEmailError").style.display = "none";
    }
}
// xxxxxxxxxx Sign In Password Validation xxxxxxxxxx
function checkUserSIPassword() {
    let userSIPassword = document.getElementById("userSIPassword");
    let userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;
    let flag;
    if (userSIPassword.value.match(userSIPasswordFormate)) {
        flag = false;
    } else {
        flag = true;
    }
    if (flag) {
        document.getElementById("userSIPasswordError").style.display = "block";
    } else {
        document.getElementById("userSIPasswordError").style.display = "none";
    }
}
// xxxxxxxxxx Check email or password exsist in firebase authentication xxxxxxxxxx
function signIn() {
    let userSIEmail = document.getElementById("userSIEmail").value;
    let userSIPassword = document.getElementById("userSIPassword").value;
    let userSIEmailFormate =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let userSIPasswordFormate = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}/;

    let checkUserEmailValid = userSIEmail.match(userSIEmailFormate);
    let checkUserPasswordValid = userSIPassword.match(userSIPasswordFormate);

    if (checkUserEmailValid == null) {
        return checkUserSIEmail();
    } else if (checkUserPasswordValid == null) {
        return checkUserSIPassword();
    } else {
        firebase
            .auth()
            .signInWithEmailAndPassword(userSIEmail, userSIPassword)
            .then((success) => {
                swal({
                    type: "successfull",
                    title: "Succesfully signed in",
                }).then((value) => {
                    setTimeout(function() {
                        window.location.replace("../budget.html");
                    }, 500);
                });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                swal({
                    type: "error",
                    title: "Error",
                    text: "Error",
                });
            });
    }
}
// xxxxxxxxxx Working For Profile Page xxxxxxxxxx
// xxxxxxxxxx Get data from server and show in the page xxxxxxxxxx
control = false;
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        //   User is signed in.
        let user = firebase.auth().currentUser;
        let uid;
        if (user != null) {
            uid = user.uid;
        }
        let firebaseRefKey = firebase.database().ref().child(uid);
        firebaseRefKey.on("value", (dataSnapShot) => {
            document.getElementById("userPfFullName").innerHTML = getFirstWord(
                dataSnapShot.val().userFullName
            );
        });
    } else {
        //   No user is signed in.
        console.log("entra");
    }
});

function getFirstWord(str) {
    let spaceIndex = str.indexOf(" ");
    return spaceIndex === -1 ? str : str.substr(0, spaceIndex);
}

// xxxxxxxxxx Working For Sign Out xxxxxxxxxx
function signOut() {
    firebase
        .auth()
        .signOut()
        .then(function() {
            // Sign-out successful.
            swal({
                type: "successfull",
                title: "Signed Out",
            }).then((value) => {
                setTimeout(function() {
                    window.location.replace("../index.html");
                }, 500);
            });
        })
        .catch(function(error) {
            // An error happened.
            let errorMessage = error.message;
            swal({
                type: "error",
                title: "Error",
                text: "Error",
            });
        });
}

const toggleForm = () => {
    const container = document.querySelector(".container");
    container.classList.toggle("active");
};

//// DARK MODE CONFIG

const options = {
    bottom: "32px", // default: '32px'
    right: "0px", // default: '32px'
    left: "20px", // default: 'unset'
    time: "0.5s", // default: '0.3s'
    mixColor: "#fff", // default: '#fff'
    backgroundColor: "#fff", // default: '#fff'
    buttonColorDark: "#100f2c", // default: '#100f2c'
    buttonColorLight: "#fff", // default: '#fff'
    saveInCookies: true, // default: true,
    label: "🌓", // default: ''
    autoMatchOsTheme: true, // default: true,
};
//istanbul ignore next
const darkmode = new Darkmode(options);
darkmode.showWidget();

///Export for testing
function getFormElems() {
    return [
        document.getElementById("userSIEmail"),
        document.getElementById("userSIPassword"),
    ];
}
module.exports = {
    getFormElems: getFormElems,
    checkUserSIEmail: checkUserSIEmail,
    checkUserSIPassword: checkUserSIPassword,
};