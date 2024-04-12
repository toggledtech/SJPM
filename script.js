const firebaseConfig = {
  apiKey: "AIzaSyDzJe3M-hjERgAx5U8bHfV-dBK2QFQJZ_g",
  authDomain: "carbon-host.firebaseapp.com",
  projectId: "carbon-host",
  storageBucket: "carbon-host.appspot.com",
  messagingSenderId: "769351599940",
  appId: "1:769351599940:web:6bf6136946685026a4b911",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

document.getElementById('search').addEventListener('submit', (e) => {
  e.preventDefault()
  const search = document.getElementById('search-bar').value
  document.getElementById('section1')
  document.getElementById('section1').innerHTML =`<h1>Search Results</h1><br>`
  db.collection("pm").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (String(doc.id).includes(search)) {
              if(doc.data().type !== 'request') {
                document.getElementById('section1').innerHTML += `<a href="${doc.data().homepage}" target="_blank" class="section1-seeplans-link">${doc.id}</a><br>`
              }
            }
      });
  });
})

