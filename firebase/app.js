import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js'
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js'

const firebaseConfig = {
  apiKey: 'AIzaSyAVP3SjKCaIRSd4Glh_yPy-I_nFUC-qu3c',
  authDomain: 'testing-firebase-34a55.firebaseapp.com',
  projectId: 'testing-firebase-34a55',
  storageBucket: 'testing-firebase-34a55.appspot.com',
  messagingSenderId: '624970264400',
  appId: '1:624970264400:web:7240ea87bf103f0f874655',
  measurementId: 'G-4R3LL11D37'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

getDocs(collection(db, 'games'))
    .then(querySnapshot => {
        const gamesLis = querySnapshot.docs.reduce((acc, doc) => {
            const { title, developedBy, createdAt } = doc.data()

           acc += `<li class="my-4">
                <h5>${title}</h5>

                <ul>
                    <li>Desenvolvido por ${developedBy}</li>
                    <li>Adicionado no banco em ${createdAt.toDate()}</li>
                </ul>
           </li>` 

           return acc
        }, '') 

        const gamesList = document.querySelector('[data-js="games-list"]')
        gamesList.innerHTML = gamesLis
    })
    .catch(console.log)
