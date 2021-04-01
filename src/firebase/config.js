import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyDuxn3vOIuhebiKqD5EcT_7ld6PVzHV00s',
	authDomain: 'salt-and-hash.firebaseapp.com',
	databaseURL: 'https://salt-and-hash-default-rtdb.firebaseio.com/',
	projectId: 'salt-and-hash',
	storageBucket: 'salt-and-hash.appspot.com',
	messagingSenderId: '681081627618',
	appId: '1:681081627618:ios:55fd9632b65645f9fbcfbb',
};
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
export { firebase };
