// import firebase from 'firebase/app';
// import 'firebase/auth';
import { firebase } from '../firebase/config';

function GoogleLogin() {
	var provider = new firebase.auth.GoogleAuthProvider();
	firebase.auth().signInWithRedirect(provider);

	firebase
		.auth()
		.getRedirectResult()
		.then((result) => {
			if (result.credential) {
				/** @type {firebase.auth.OAuthCredential} */
				var credential = result.credential;

				// This gives you a Google Access Token. You can use it to access the Google API.
				var token = credential.accessToken;
				// ...
			}
			// The signed-in user info.
			var user = result.user;
		})
		.catch((error) => {
			// Handle Errors here.
			var errorCode = error.code;
			var errorMessage = error.message;
			// The email of the user's account used.
			var email = error.email;
			// The firebase.auth.AuthCredential type that was used.
			var credential = error.credential;
			// ...
		});
}

export default GoogleLogin;
