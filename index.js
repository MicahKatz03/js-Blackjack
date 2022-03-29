
let messageEl = document.getElementById("message-el")
let cardsEl = document.getElementById("cards-el")
let totalEl = document.getElementById("total-el")
let startEl = document.querySelector("#start-btn")
let hitEl = document.querySelector("#hit-btn")
let standEl = document.querySelector("#stand-btn")
let chipsEl = document.getElementById("chips-el")

let firstCard = 0
let secondCard = 0
let cards = []
let chips = 200

let total = 0

let hasBlackjack = false
let isAlive = false

let message = ""
let cardsBlank = "cards:"
let totalBlank = "total:"
let addedCards = ""
let chipsBlank = "chips: "

hitEl.style.display="none"
standEl.style.display="none"
chipsEl.textContent = chipsBlank + chips

function getRandomCard(){
    let c = Math.floor(Math.random()*13)+1
    if(c === 1)
        return 11
    else if(c === 11 || c === 12 || c === 13)
        return 10
    else
        return c
}

function startGame(){
    if(chips > 0){
        firstCard = getRandomCard()
        secondCard = getRandomCard()
        cards.push(firstCard, secondCard)
        total+= firstCard + secondCard
        isAlive = true
        hasBlackjack = false
        renderGame()
    }
    else{
        messageEl.textContent = "insufficent funds"
    }
}

function renderGame(){

    totalEl.textContent = totalBlank
    cardsEl.textContent = cardsBlank

    if(total <= 20){
        message = "hit or stand"
        isAlive = true
    }
    else if(total === 21){
        message = "Blackjack"
        hasBlackjack = true
        chips += 50
        chipsEl.textContent = chipsBlank + chips
    }
    else{
        if(!hasEleven()){
            message = "bust"
            isAlive = false
            chips -= 50
            if(chips > 0)
                chipsEl.textContent = chipsBlank + chips
            else
                chipsEl.textContent = chipsBlank + 0
        }
        else{
            elevenToOne()
            isAlive = true
        }
    }

    messageEl.textContent = message
    for(i = 0; i < cards.length; i++){
        cardsEl.textContent += " " + cards[i]
    }
    totalEl.textContent += " " + total
    startEl.style.display="none"

    if(isAlive && !hasBlackjack){
        hitEl.style.display="block"
        standEl.style.display="block"
    }
    else{
        restartGame()
    }

}

function hit(){
    if(isAlive && !hasBlackjack){
        let newCard = getRandomCard()
        total += newCard
        cards.push(newCard)
        renderGame()
    }
}

function hasEleven(){
    for(i = 0; i < cards.length; i++){
        if(cards[i] === 11){
            return true
        }
    }
    return false
}

function elevenToOne(){
    for(i = 0; i < cards.length; i++){
        if(cards[i] === 11){
            cards[i] = 1
            total -= 10
        }
    }
    if(total = 21){
        message = "Blackjack"
        hasBlackjack = true
        chips += 50
        chipsEl.textContent = chipsBlank + chips
    }
    else{
        message = "hit or stand"
    }
}

function restartGame(){
    hitEl.style.display="none"
    standEl.style.display="none"
    startEl.style.display="block"
    cards = []
    console.log(cards)
    total = 0
}

function stand(){
    let dealerHand = Math.floor(Math.random()*8)+17
    if(dealerHand === total){
        messageEl.textContent = "push"
        restartGame()
    }
    else if(dealerHand < total || dealerHand > 21){
        chips += 30
        chipsEl.textContent = chipsBlank + chips
        messageEl.textContent = "you win"
        restartGame()
    }
    else if(dealerHand > total){
        chips -= 50
        if(chips > 0)
            chipsEl.textContent = chipsBlank + chips
        else
            chipsEl.textContent = chipsBlank + 0
        messageEl.textContent = "you lose"
        restartGame()
    }
    else{
        restartGame()
    }
}