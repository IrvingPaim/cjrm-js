import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js'
import { getFirestore, collection, addDoc, serverTimestamp, doc, deleteDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js'

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
const collectionGames = collection(db, 'games')

const formAddGame = document.querySelector('[data-js="add-game-form"]')
const gamesList = document.querySelector('[data-js="games-list"]')
const buttonUnsub = document.querySelector('[data-js="unsub"]')

const unsubscribe = onSnapshot(collectionGames, querySnapshot => {
    console.log('callback do onsnapshot executado')
    if(!querySnapshot.metadata.hasPendingWrites) {

        const gamesLis = querySnapshot.docs.reduce((acc, doc) => {
            const { title, developedBy, createdAt } = doc.data()
    
           acc += `<li data-id="${doc.id}"class="my-4">
                <h5>${title}</h5>
    
                <ul>
                    <li>Desenvolvido por ${developedBy}</li>  
                    ${createdAt ? `<li>Adicionado no banco em ${new Intl.DateTimeFormat('pt-BR', {dateStyle: 'short', timeStyle: 'short'}).format(createdAt.toDate())}</li>` : ''}
                </ul>
    
                <button data-remove="${doc.id}"class="btn btn-danger btn-sm">Remover</button>
           </li>` 
    
           return acc
        }, '') 
    
        gamesList.innerHTML = gamesLis
        console.log('Manipulação de DOM executada')
    }
})

/*
getDocs(collectionGames)
    .then(querySnapshot => {
        const gamesLis = querySnapshot.docs.reduce((acc, doc) => {
            const { title, developedBy, createdAt } = doc.data()

           acc += `<li data-id="${doc.id}"class="my-4">
                <h5>${title}</h5>

                <ul>
                    <li>Desenvolvido por ${developedBy}</li>
                    <li>Adicionado no banco em ${createdAt.toDate()}</li>
                </ul>

                <button data-remove="${doc.id}"class="btn btn-danger btn-sm">Remover</button>
           </li>` 

           return acc
        }, '') 

        gamesList.innerHTML = gamesLis
    })
    .catch(console.log)
*/

formAddGame.addEventListener('submit', e => {
    e.preventDefault()

    addDoc(collectionGames, {
        title: e.target.title.value,
        developedBy: e.target.developer.value,
        createdAt: serverTimestamp()
    })
    .then(doc => {
        console.log('Document criado com o ID', doc.id)
        e.target.reset()
        e.target.title.focus()
    })
    .catch(console.log)
})

gamesList.addEventListener('click', e => {
    const idRemoveButton = e.target.dataset.remove

    if (idRemoveButton) {
        deleteDoc(doc(db,'games', idRemoveButton))
            .then(() => console.log('Game removido'))
            .catch(console.log)
    }
})

buttonUnsub.addEventListener('click', unsubscribe)


//<li>Adicionado no banco em ${createdAt.toDate()}</li>
//${createdAt ? `<li>Adicionado no banco em ${new Intl.DateTimeFormat('pt-BR', {dateStyle: 'short', timeStyle: 'short'}).format(createdAt.toDate())}</li>` : ''}
