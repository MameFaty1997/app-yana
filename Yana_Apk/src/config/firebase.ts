import { firebaseAuth, firebaseFirestore } from '../services/firebase';

export { firebaseAuth, firebaseFirestore };

export default {
    auth: firebaseAuth,
    firestore: firebaseFirestore,
};
