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

const info = {};

function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function newReq() {
  document.getElementById("fullscreen-popup").style.display = "block";
  // const prompt = window.prompt('Enter a request url')

  // if (prompt) {
  //   const body = JSON.parse(window.prompt('Enter JSON for the body. (This will be supplied in every request)')) || {}
  //   if (body) {
  //     const header = JSON.parse(window.prompt('Enter JSON for the header. (This will be supplied in every request)')) || {}
  //     if (header) {
  //       const sites = []
  //       const site = window.prompt('What sites should be allowed access')
  //       if (site) {
  //         sites.push(site)

  //         db.collection("pm").doc(`@${info.uid}_${generateRandomString(5)}`).set({
  //             allowed: sites,
  //             headers: header,
  //             body: body,
  //             url: prompt,
  //             type: 'request'
  //         })
  //         .then(() => {
  //             console.log("Document successfully written!");
  //           alert('Created Request! Refer to the documentation for usage.')
  //           location.reload()
  //         })
  //         .catch((error) => {
  //             console.error("Error writing document: ", error);
  //         });
  //       }
  //     }
  //   }
  // }
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/v8/firebase.User
    var uid = user.uid;
    console.log(user);

    info.uid = user.providerData[0].uid;
    // ...
    db.collection("pm")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          if (String(doc.id).includes(user.providerData[0].uid)) {
            const tr = document.createElement("tr");
            const td = document.createElement("td");
            td.textContent = `${String(doc.id).replaceAll("_", "/")} - ${doc.data().url}`;
            td.colSpan = 2;
            td.style.cursor = "pointer";
            tr.appendChild(td);

            const td2 = document.createElement("td");
            td2.innerHTML = `<i class="material-icons">delete</i>`;
            td2.style = `font-size: 13px; float: right; cursor:pointer;`;

            tr.appendChild(td2);

            td.addEventListener("click", () => {
              // Copy the request URL to the clipboard
              navigator.clipboard
                .writeText(`${String(doc.id).replaceAll("_", "/")}`)
                .then(function () {
                  console.log("Request URL copied to clipboard");
                  alert("Request copied to clipboard");
                })
                .catch(function (error) {
                  console.error("Error copying text: ", error);
                });
            });

            td2.addEventListener("click", function () {
              const prompt = window.confirm(
                `Are you sure you want to delete ${String(doc.id).replaceAll("_", "/")}?`,
              );

              if (prompt) {
                db.collection("pm")
                  .doc(doc.id)
                  .delete()
                  .then(() => {
                    console.log("Document successfully deleted!");
                    alert("Deleted!");
                    tr.remove();
                  })
                  .catch((error) => {
                    console.error("Error removing document: ", error);
                    alert("Error!");
                  });
              }
            });

            document.querySelector("tbody").append(tr);
          }
        });
      });
  } else {
    // User is signed out
    // ...
    window.location = "/auth";
  }
});

setInterval(function () {
  try {
    document.querySelectorAll(".input-field > input").forEach(function (input) {
      if (input.value.length > 0) {
        input.parentElement.querySelector("label").style.display = "none";
      } else {
        input.parentElement.querySelector("label").style.display = "block";
      }
    });
  } catch {}

  try {
    document
      .querySelectorAll(".input-field > textarea")
      .forEach(function (input) {
        if (input.value.length > 0) {
          input.parentElement.querySelector("label").style.display = "none";
        } else {
          input.parentElement.querySelector("label").style.display = "block";
        }
      });
  } catch {}
}, 10);

var editor = CodeMirror.fromTextArea(document.getElementById("req_body"), {
  mode: "application/json",
  // lineNumbers: true,
  lineWrapping: true,
  autofocus: true,
});

var editor2 = CodeMirror.fromTextArea(document.getElementById("req_headers"), {
  mode: "application/json",
  // lineNumbers: true,
  lineWrapping: true,
  autofocus: true,
});

document.getElementById("request-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const body = editor.getValue() || "{}";
  const header = editor2.getValue() || "{}";
  const sites = [];
  sites.push(document.getElementById("allowed_url").value);
  const url = document.getElementById("request_url").value;

  db.collection("pm")
    .doc(`@${info.uid}_${generateRandomString(5)}`)
    .set({
      allowed: sites,
      headers: JSON.parse(header),
      body: JSON.parse(body),
      url: url,
      type: "request",
    })
    .then(() => {
      console.log("Document successfully written!");
      alert("Created Request! Refer to the documentation for usage.");
      location.reload();
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
});
