import firebase from "@firebase/app-compat";

import 'firebase/firestore';

const firestore = firebase.firestore();

firestore.collection('users').doc('RM05LT7klgBATPzDm6VD').collection('cartItems').doc('8M8l6MCzqWOGy5JpY8d5');
firestore.doc('/users/RM05LT7klgBATPzDm6VD/cartItems/8M8l6MCzqWOGy5JpY8d5');
firestore.collection('/users/RM05LT7klgBATPzDm6VD/cartItems');


