import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
const firebaseConfig = {
	apiKey: 'AIzaSyAV0dF3DSzxFMrC8dAHK3kstAIW1xvDTQc',
	authDomain: 'event-planning-app-89bec.firebaseapp.com',
	databaseURL: 'https://event-planning-app-89bec-default-rtdb.firebaseio.com/',
	projectId: 'event-planning-app-89bec',
	storageBucket: 'event-planning-app-89bec.appspot.com',
	messagingSenderId: '325804923316',
	appId: '1:325804923316:ios:a46ac0ae8bb28808bbfae1',
};
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}
export { firebase };
