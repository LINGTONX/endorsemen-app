
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://endorsement-app-85910-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementsInDB = ref(database, "Endorsements")
//const fromInDB = ref(database, "From")
//const toInDB = ref(database, "To")





const endorsmentInput = document.getElementById("endorsment-text")
const publish = document.getElementById("publish-btn")
// const endorsmentReceiver = document.getElementById("endorsement-to")
// const endorsmentFrom = document.getElementById("endorsement-from")
const publishEndorsement = document.getElementById("endorsment-details")


publish.addEventListener("click", function(){
    let endorsmentValue = endorsmentInput.value
    push(endorsementsInDB, endorsmentValue)
    clearTextarea()
   
});

onValue(endorsementsInDB, function(snapshot){
   let endorsementSnapshot = Object.values(snapshot.val())
    clearEndorsements()
   for (let i = 0; i < endorsementSnapshot.length; i++) {
    appendEndorsements(endorsementSnapshot[i])

   }

})


function clearTextarea() {
    endorsmentInput.value = ""
}
function clearEndorsements(){
    publishEndorsement.innerHTML = ""
}

function appendEndorsements(endorsementText){
    publishEndorsement.innerHTML += `<p id="endorsment" class="in-font">${endorsementText} </p>`
}