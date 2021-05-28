const SUITS = ["♠", "♣", "♥", "♦"];
const VALUES = ['9', '10', 'J', 'Q', 'K', 'A']

const CARD_VALUE_MAP = {
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
}

const TRUMP_VALUE_MAP = {
  '9': 19,
  '10': 20,
  'Q' : 21,
  'K' : 22,
  'A' : 23,
  'L' : 24,
  'J' : 25
}

var playerCardSlot1 = document.querySelector('.player-card-slot1');
var playerCardSlot2 = document.querySelector('.player-card-slot2');
var playerCardSlot3 = document.querySelector('.player-card-slot3');
var playerCardSlot4 = document.querySelector('.player-card-slot4');
var playerCardSlot5 = document.querySelector('.player-card-slot5');

var cp1CardSlot1 = document.querySelector('.cp1slotcard1');
var cp1CardSlot2 = document.querySelector('.cp1slotcard2');
var cp1CardSlot3 = document.querySelector('.cp1slotcard3');
var cp1CardSlot4 = document.querySelector('.cp1slotcard4');
var cp1CardSlot5 = document.querySelector('.cp1slotcard5');

var cp2CardSlot1 = document.querySelector('.cp2slotcard1');
var cp2CardSlot2 = document.querySelector('.cp2slotcard2');
var cp2CardSlot3 = document.querySelector('.cp2slotcard3');
var cp2CardSlot4 = document.querySelector('.cp2slotcard4');
var cp2CardSlot5 = document.querySelector('.cp2slotcard5');

var cp3CardSlot1 = document.querySelector('.cp3slotcard1');
var cp3CardSlot2 = document.querySelector('.cp3slotcard2');
var cp3CardSlot3 = document.querySelector('.cp3slotcard3');
var cp3CardSlot4 = document.querySelector('.cp3slotcard4');
var cp3CardSlot5 = document.querySelector('.cp3slotcard5');

const passButton = document.querySelector('.pass');
const selectTrump = document.querySelector('.box');
var upcard = document.querySelector('.deck');
const text = document.querySelector('.text');
var team1tricks = document.querySelector('#trick1score')
var team2tricks = document.querySelector('#trick2score')

function freshDeck() {
  return SUITS.flatMap(suit => {
    return VALUES.map(value => {
      return new Card(suit, value)
    })
  })
}

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }

  get numberOfCards() {
    return this.cards.length;
  }

  get upCard() {
    return this.cards[20];
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1));
      const oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }

  deal() {
    //if dealer is 0 player then deal this way...
    //do I actually need 4 different deal functions?????
    for (let i = 0; i < 1; i++) {
        cp1CardSlot1.appendChild(this.cards[i].getHTML());
        cp1CardSlot2.appendChild(this.cards[i+1].getHTML());
        cp2CardSlot1.appendChild(this.cards[i+2].getHTML());
        cp2CardSlot2.appendChild(this.cards[i+3].getHTML());
        cp2CardSlot3.appendChild(this.cards[i+4].getHTML());
        cp3CardSlot1.appendChild(this.cards[i+5].getHTML());
        cp3CardSlot2.appendChild(this.cards[i+6].getHTML());
        playerCardSlot1.appendChild(this.cards[i+7].getHTML());
        playerCardSlot2.appendChild(this.cards[i+8].getHTML());
        playerCardSlot3.appendChild(this.cards[i+9].getHTML());
        cp1CardSlot3.appendChild(this.cards[i+10].getHTML());
        cp1CardSlot4.appendChild(this.cards[i+11].getHTML());
        cp1CardSlot5.appendChild(this.cards[i+12].getHTML());
        cp2CardSlot4.appendChild(this.cards[i+13].getHTML());
        cp2CardSlot5.appendChild(this.cards[i+14].getHTML());
        cp3CardSlot3.appendChild(this.cards[i+15].getHTML());
        cp3CardSlot4.appendChild(this.cards[i+16].getHTML());
        cp3CardSlot5.appendChild(this.cards[i+17].getHTML());
        playerCardSlot4.appendChild(this.cards[i+18].getHTML());
        playerCardSlot5.appendChild(this.cards[i+19].getHTML());
        upcard.appendChild(this.cards[i+20].getHTML());
      }
    }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === "♠" || this.suit === "♣" ? 'black': 'red';
  }

  getHTML(){
    const cardDiv = document.createElement('div');
    cardDiv.innerText = this.suit;
    cardDiv.classList.add('card', this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }
}

class Euchre {
  constructor(playerCards, cpuOneCards, cpuTwoCards, cpuThreeCards, upcard) {
    this.playerCardsArray = playerCards;
    this.cpuOneCardsArray = cpuOneCards;
    this.cpuTwoCardsArray = cpuTwoCards;
    this.cpuThreeCardsArray = cpuThreeCards;
    this.upcard = upcard;
    this.score1 = document.getElementById('score1');
    this.score2 = document.getElementById('score2');
    this.deck = new Deck(); //i.e. game.deck.shuffle();
    this.cards = new Card(); // I don't think I need to use this, but it's possible.
    this.slots = [playerCardSlot1, playerCardSlot2, playerCardSlot3, playerCardSlot4, playerCardSlot5];
    this.handlers = this.slots.map(slot => () => this.clickHandler(slot));

  }

  get dealer() {
     // return Math.floor(Math.random() * 4); //this.dealer becomes useable after this getter function.
     return 0 //test with it always starting player as dealer.
  }

  startGame(){
    //decide dealer, shuffle deck, deal cards... decide trump?
    if (this.dealer === 0) {
      console.log('0 player is dealer');
      this.deck.shuffle();
      this.deck.deal();
      this.realdealer = 0;
      this.leader = 1;
      this.partner = 2;
      console.log(`leader is ${this.leader}`);
      // console.log(this.deck);

    } else if (this.dealer === 1){
      console.log('computer 1 is dealer');
      this.deck.shuffle();
      this.deck.deal();
      this.realdealer = 1;
      this.leader = 2;
      this.partner = 3;
      console.log(`leader is ${this.leader}`);
      // i.e. computer decides to pickup or pass...
      document.getElementById('deck').style.gridRowStart='4'; //this works to change deck position!
      document.getElementById('deck').style.gridColumnStart='1';

    } else if (this.dealer === 2) {
      console.log('computer 2 is dealer');
      this.deck.shuffle();
      this.deck.deal();
      this.realdealer = 2;
      this.leader = 3;
      this.partner = 0;
      console.log(`leader is ${this.leader}`);
      document.getElementById('deck').style.gridRowStart='1';
      document.getElementById('deck').style.gridColumnStart='6';

    } else {
      console.log('computer 3 is dealer');
      this.deck.shuffle();
      this.deck.deal();
      this.realdealer = 3;
      this.leader = 0;
      this.partner = 1;
      console.log(`leader is ${this.leader}`);
      document.getElementById('deck').style.gridRowStart='6';
      document.getElementById('deck').style.gridColumnStart='9';
    }
  }

  startRound(){
      this.roundTrump = upcard.firstElementChild.dataset.value.slice(2).trim();
      this.roundValues = [];
      this.leadValue = 0
      this.team1tricks = 0;
      this.team2tricks = 0;
      team1tricks.innerText = this.team1tricks
      team2tricks.innerText = this.team2tricks
      //dealer is random at start of game.
      passButton.style.display = 'none';
      passButton.classList.add('disabled')
      selectTrump.style.display = 'none';
      selectTrump.classList.add('disabled')

      if (this.dealer === 0) { // when player is dealer
        for (var i=0; i< 4; i++) { //computers 1-3 can say pick it up or pass...
          if (i === 3) { //player decides to pickup or pass
            text.innerText = 'Pick it up or pass?'
            // console.log('Pick it up or pass?');
            passButton.style.display = 'flex';
            passButton.classList.remove('disabled')
            passButton.addEventListener('click', () => {
              passButton.style.display = 'none';
              passButton.classList.add('disabled')
              this.secondBid();
            })
            this.playerPickUp();
            break;
          } else if (this.orderUp() === false) { //if cpu passes then next cpu
            // setTimeout(() => {
            //   text.innerText = `Player ${i+1} passes!`
            // }, 1500)
            continue
          } else { //computer has you pick up trump
              text.innerText = 'Click on card to pick it up.';
              this.playerPickUp();
              break;
          }
        }

      } //elif statements here regarding if player is in the other 3 positions...

}

  nextRound() {
    console.log('Next Round!');
    this.roundValues = [];
    // p1PlayedId.
    if (this.leader === 0) {
      this.play();
      setTimeout(() => {
        this.nextPlayer();
        this.cpuLead();
        this.nextPlayer();
      }, 2500);
      setTimeout(() => {
        this.cpuPlay();
        this.nextPlayer();
      }, 5000);
      setTimeout(() => {
        this.cpuPlay();
        this.isRoundWinner();
      }, 7500);
    } else if (this.leader === 1) {

      this.playHand();

    } else if (this.leader === 2) {

    } else if (this.leader === 3) {

    }
  }

  secondBid() { //called when player clicks "pass" button or computer dealer passes after startRound
    //checks who the dealer is and goes around again to determine trump.
    //flip down upcard no matter who is dealer
    console.log('Second Round Bidding');
    // console.log('leader is '+this.leader);
    upcard.style.display = 'none';
    upcard.classList.add('disabled')
    // this.nextPlayer();
    // console.log('leader is '+this.leader);

    if (this.dealer === 0) {
      this.leader = 1;
      // setTimeout(() => {
      //   text.innerText = 'You pass & flip down trump!'
      // }, 1500);

      for (var i=0; i<4; i++) {
        if (i === 3) {
          console.log('Screw the dealer!');
          this.playerPickTrump();
          break;
        } else if (this.cpuCallTrump() === false) { //computer passes again
          console.log(`Computer ${this.leader} passes again`);
          // setTimeout(() => {
          //   text.innerText = `Player ${i} passes!`
          // }, 1500)
          //continue
        } else { // computer picks a suit
          // text.innerText = `Player ${i+1} calls trump!`
          return this.cpuCallTrump();
          console.log('trump is '+this.roundTrump);
          break;
        }
      }
    } //other dealer positions

  }

  cpuCallTrump() { //called during secondBid only
    // ***issue is that computer 0 (player is calling trump before cpu1 and player shouldn't be run in this)
    var arr = [];
    this.getPlayer().forEach(card => arr.push(card.firstElementChild.dataset.value.slice(2).trim()))
    var counts = {};
    arr.forEach(function(x) {counts[x] = (counts[x] || 0) + 1})
    var potential = ["♠", "♣", "♥", "♦"];
    potential.splice(potential.indexOf(this.roundTrump), 1); //eliminates first round trump
    //note: below trump conditionals don't account for left bauer
    if (counts[potential[0]] >= 3) {
      console.log(`Computer ${this.leader} calls ${potential[0]} as trump!`);
      return this.roundTrump = potential[0];
    } else if (counts[potential[1]] >= 3) {
      console.log(`Computer ${this.leader} calls ${potential[1]} as trump!`);
      return this.roundTrump = potential[1];
    } else if (counts[potential[2]] >= 3) {
      console.log(`Computer ${this.leader} calls ${potential[2]} as trump!`);
      return this.roundTrump = potential[2];
    } else if (this.leader === 0) { //only computers use this function
      this.pass();
      return false;
    }
    else {
      this.pass();
      // console.log('this player is false: '+this.leader);
      return false;
    }
  }

  screwTheDealer() { //called during secondBid only
    //computer that is dealer* must pick a trump, it cannot be the trump from startRound
    console.log(`Computer ${this.leader} randomly picks trump`);
    var possibleTrump = ["♠", "♣", "♥", "♦"];
    possibleTrump.splice(possibleTrump.indexOf(this.roundTrump, 1))
    return this.roundTrump = possibleTrump[Math.floor(Math.random()*possibleTrump.length)]
  }

  playerPickTrump() { //called during secondBid only
    //player must pick trump with selectTrump button
    selectTrump.style.display = 'block';
    selectTrump.classList.remove('disabled')

    return
  }

  orderUp() {
      var arr = [];
      this.getPlayer().forEach(card => arr.push(card.firstElementChild.dataset.value.slice(2).trim())); //puts suits of cards in array
      var counts = {};
      arr.forEach(function(x) {counts[x] = (counts[x] || 0) + 1;}) // counts all suits in array / in cpu's hand
      // console.log(counts);
      // console.log(Object.keys(counts).length + ' suited');
      var numTrump = counts[upcard.firstElementChild.dataset.value.slice(2).trim()]; //gets amount of potential trump minus the left...
      if (numTrump === undefined) {
        numTrump = 0;
      }
      // this.cpuOneCardsArray.forEach(card => console.log(CARD_VALUE_MAP[card.firstElementChild.dataset.value.slice(0,2).trim()])); //get card values
      if (this.isLeft() === true) {
        numTrump = numTrump + 1;
      }
      // console.log('potential trump ' + numTrump);

      if (numTrump >= 4) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        this.orderer = this.leader;
        console.log('trump is '+this.roundTrump);
        return this.roundTrump
        // return true;
      } else if (numTrump === 3 && (this.isLeft() === true || this.isRight() === true) && (this.isSideAce() === true || Object.keys(counts).length <= 3)) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        console.log('trump is '+this.roundTrump);
        setTimeout(() => {
          text.innerText = `Computer ${this.leader} Orders it up!!!`
        }, 2000);
        this.orderer = this.leader;
        return this.roundTrump
        // return true;
      } else if (numTrump === 3 && this.isSideAce() === true && Object.keys(counts).length <= 3 && (this.isPartner() === true)) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        this.orderer = this.leader;
        console.log('trump is '+this.roundTrump);
        return this.roundTrump
        // return true;
      } else if (numTrump === 3 && Object.keys(counts).length <= 2 && (this.isPartner() === true)) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        this.orderer = this.leader;
        console.log('trump is '+this.roundTrump);
        return this.roundTrump
        // return true;
      } else if (this.isLeft() === true && this.isRight() === true && (this.isPartner() === true)) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        this.orderer = this.leader;
        console.log('trump is '+this.roundTrump);
        return this.roundTrump
        // return true;
      } else if (this.isRight() === true && this.isLeft() === true && this.isTrumpAce() === true) {
        text.innerText = `Player ${this.leader} orders it up!`;
        console.log(`Computer ${this.leader} Orders it up!!!`);
        this.orderer = this.leader;
        console.log('trump is '+this.roundTrump);
        return this.roundTrump
        // return true;
      }
      else {
        text.innerText = `Player ${this.leader} passes!`
        console.log(`Computer ${this.leader} passes!`);
        this.pass();
        return false;
      }
  }
  isPartner() { // should really be  isPARTNER DEALER
    if (this.leader === this.realdealer + 2 || this.leader === this.realdealer - 2) {
      return true; //don't need this.orderer? cuz leader is just player
    }
    else {
      return false;
    }
  }
  isOpponent() {
    if (this.leader === this.leader + 1 || this.leader === this.leader - 1) {
      return true;
    }
    else {
      return false;
    }
  }

  continue() {
    return this.busy = false;
  }

  pass(){
    //add pass counter for screw the dealer
    return this.nextPlayer();
  }

  cpuPickUp() {
    //called when the computer must pickup trump
    var opposite = {
      "♠":"♣",
      "♣":"♠",
      "♥":"♦",
      "♦":"♥"
    };
    this.leader = this.realdealer;
    text.innerText = `Computer ${this.leader} picks it up and is discarding...`
    var arr = [];
    var suits = ["♠", "♣", "♥", "♦"]
    this.getDealer().forEach(card => arr.push(card.firstElementChild.dataset.value.slice(2).trim()))
    var countingSuits = {};
    for (var i = 0; i < arr.length; i++) {
      var num = arr[i];
      countingSuits[num] = countingSuits[num] ? countingSuits[num] + 1: 1; //counting # of ea suit in hand
    }
    for (var key in countingSuits) {
      if (countingSuits[key] === 1 && key !== this.roundTrump) {
        // and dont discard left
        var index = arr.indexOf(key)
        if (this.getDealer()[index].firstElementChild.dataset.value !== 'J '+opposite[this.roundTrump] && this.getDealer()[index].firstElementChild.dataset.value.slice(0,2).trim() !== ('A' || 'K') ) {
          //if the one suit is not the left, or a singleton A or K, then discard it
          console.log(`Computer ${this.realdealer} picks it up, discards, & short suit themself`);
          setTimeout(() =>  {
          // this.getDealer()[index].innerHTML = '';
          upcard.classList.remove('deck');
          upcard.classList.add(this.getDealer()[index].id);
          }, 2500);
          return
        }
      } else { //discard low card as long as it's not trump or left
          var holding = [];
          var lowvals = [];
          for (var i= 0; i< arr.length; i++) {
            if (arr[i] !== this.roundTrump) {
              holding.push(i)
              lowvals.push(CARD_VALUE_MAP[this.getDealer()[i].firstElementChild.dataset.value.slice(0,2).trim()])
            }
          }
          var min = Math.min(...lowvals);
          var minIndex = lowvals.indexOf(min)
          var realIndex = holding[minIndex]
          console.log(`Computer ${this.realdealer} picks it up, discards, & short suit themself`);
          setTimeout(() =>  {
          // this.getDealer()[realIndex].innerHTML = '';
          upcard.classList.remove('deck');
          upcard.classList.add(this.getDealer()[realIndex].id);
          }, 2500);
          return
      }
    }


  }

//playHand() works on first round realdealer === 0 or when player has last play of hand i.e. cpu1 leads
  playHand() {
    this.isLeader();
    console.log(`leader is ${this.leader}`);
    setTimeout(() => {
      this.cpuLead();
      this.nextPlayer();
    }, 2500);
    setTimeout(() => {
      this.cpuPlay();
      this.nextPlayer();
    }, 5000);
    setTimeout(() => {
      this.cpuPlay();
      this.nextPlayer();
    }, 7500);
    setTimeout(() => {
      this.play();
    }, 10000);
  }




  cpuLead() {
    var opposite = {
      "♠":"♣",
      "♣":"♠",
      "♥":"♦",
      "♦":"♥"
    };
    if (this.isSideAce() === true) {
      var arr1 = [];
      this.getPlayer().forEach(card => arr1.push(card.firstElementChild.dataset.value));
      var index = arr1.indexOf('A '+ this.offSuit) // card index to play offsuit ace

      if (this.leader === 1) {
        var x = '5';
        var y = '3';
      } else if (this.leader === 2) {
        var x = '4';
        var y = '5';
      } else if (this.leader === 3) {
        var x = '5';
        var y = '7';
      }
      else {
        var x = '6';
        var y = '5';
      }

      document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
      document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;

      this.leadValue = 14; //this condition is always an off-suit ace
      this.roundValues.push(this.leadValue);  //adds into trick/round scoring array
      // console.log(this.getPlayer()[index]);
      this.leadingSuit = this.getPlayer()[index].firstElementChild.dataset.value.slice(2).trim();
      // console.log(this.leadingSuit);
      return this.leadingSuit;
    } else if (this.orderer === this.leader + 2 || this.orderer === this.leader - 2) {
      //if your partner ordered up trump, lead lowest trump
      var arr2 = [];
      this.getPlayer().forEach(card => arr2.push(card.firstElementChild.dataset.value))
      //if trump in hand play lowest trump, including the left...
      var opposite = {
        "♠":"♣",
        "♣":"♠",
        "♥":"♦",
        "♦":"♥"
      };
      if (this.leader === 1) {
        var x = '5';
        var y = '3';
      } else if (this.leader === 2) {
        var x = '4';
        var y = '5';
      } else if (this.leader === 3) {
        var x = '5';
        var y = '7';
      }
      else {
        var x = '6';
        var y = '5';
      }

      if (arr2.includes('9 '+this.roundTrump) === true) {
        var index = arr2.indexOf('9 '+this.roundTrump)
        this.leadValue = 19;
        this.roundValues.push(this.leadValue);
      } else if (arr2.includes('10 '+this.roundTrump) === true) {
        var index = arr2.indexOf('10 '+this.roundTrump)
        this.leadValue = 20;
        this.roundValues.push(this.leadValue);
      } else if (arr2.includes('Q '+this.roundTrump) === true) {
        var index = arr2.indexOf('Q '+this.roundTrump)
        this.leadValue = 21;
        this.roundValues.push(this.leadValue);
      } else if (arr2.includes('K '+this.roundTrump) === true) {
        var index = arr2.indexOf('K '+this.roundTrump)
        this.leadValue = 22;
        this.roundValues.push(this.leadValue);
      } else if (arr2.includes('A '+this.roundTrump) === true) {
        var index = arr2.indexOf('A '+this.roundTrump)
        this.leadValue = 23;
        this.roundValues.push(this.leadValue);
      } else if (arr2.includes('J '+opposite[this.roundTrump]) === true) {
        var index = arr2.indexOf('J '+opposite[this.roundTrump])
        this.leftIsLead = true;
        this.leadValue = 24;
        this.roundValues.push(this.leadValue);
      } else if (arr2.includes('J '+this.roundTrump) === true ) {
        var index = arr2.indexOf('J '+this.roundTrump)
        this.leadValue = 25;
        this.roundValues.push(this.leadValue);
      } else {
        var index = 0;
      }

      document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
      document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;

      this.leadingSuit = this.getPlayer()[index].firstElementChild.dataset.value.slice(2).trim();
      // console.log(this.leadingSuit);
      return this.leadingSuit;

      // getAllIndexes(arr2, this.roundTrump);

    }  else {

      if (this.leader === 1) {
        var x = '5';
        var y = '3';
      } else if (this.leader === 2) {
        var x = '4';
        var y = '5';
      } else if (this.leader === 3) {
        var x = '5';
        var y = '7';
      }
      else {
        var x = '6';
        var y = '5';
      }

      if (this.getPlayer()[0].firstElementChild.dataset.value === 'J '+opposite[this.roundTrump]) {
        this.leftIsLead = true;
      }


      // console.log(this.getPlayer()[0].id); // prints id of specific card

      document.getElementById(this.getPlayer()[0].id).style.gridRowStart=x;
      document.getElementById(this.getPlayer()[0].id).style.gridColumnStart=y;

      //todo:
      //finish play, pass, and play order.then onto scoring.

      //below line gets value of played card, still need to determine if trump or not...
      // console.log('value '+ CARD_VALUE_MAP[this.getPlayer()[0].firstElementChild.dataset.value.slice(0,2).trim()])
      this.leadingSuit = this.getPlayer()[0].firstElementChild.dataset.value.slice(2).trim();
      this.leadValue = CARD_VALUE_MAP[this.getPlayer()[0].firstElementChild.dataset.value.slice(0,2).trim()]
      this.roundValues.push(this.leadValue);
      //NOTE: above doesn't work if trump is in the first slot / 0 index
      // console.log(this.leadingSuit);
      return this.leadingSuit;
      }
  }

  cpuPlay() {
    //reads what suit was lead and requires suit to be followed.
    //need to add leading card to round/trick scoring array


    if (this.leader === 1) {
      var x = '5';
      var y = '3';
    } else if (this.leader === 2) {
      var x = '4';
      var y = '5';
    } else if (this.leader === 3) {
      var x = '5';
      var y = '7';
    }
    else {
      var x = '6';
      var y = '5';
    }

    var opposite = {
      "♠":"♣",
      "♣":"♠",
      "♥":"♦",
      "♦":"♥"
    };
    var leftSuit = opposite[this.roundTrump];

    var arr = [];
    var indexes = [];
    this.getPlayer().forEach(card => arr.push(card.firstElementChild.dataset.value.slice(2).trim()))
    //if leading card is Left Bauer, trump needs to be lead. not sure if working...
    if (this.leftIsLead === true) {
      this.leadingSuit = this.roundTrump;
    }

    for (var i=0; i < arr.length; i++){
      if (arr[i] === this.leadingSuit) {
        indexes.push(i); //indexes of the same suit that was lead
      }
    }
    if (this.roundTrump === this.leadingSuit && this.isLeft() === true) {
      indexes.push(this.indexOfLeft);
      //next adjust values to MAP to TRUMP

    }
    else if (this.leadingSuit === leftSuit && this.isLeft() === true) {  // prevents left from being played as its suit
      if (indexes.length === 1) {
        console.log(`Computer ${this.leader} doesn't have to follow suit`); //take with lowest trump card if partner doesn't have it won
        var arr3 = [];
        var suits = ["♠", "♣", "♥", "♦"]
        this.getPlayer().forEach(card => arr3.push(card.firstElementChild.dataset.value.slice(2).trim()))
        var countingSuits = {};
        for (var i = 0; i < arr3.length; i++) {
          var num = arr3[i];
          countingSuits[num] = countingSuits[num] ? countingSuits[num] + 1: 1; //counting # of ea suit in hand
        }
        if (countingSuits.hasOwnProperty(this.roundTrump) === true) {
          if (countingSuits[this.roundTrump] === 1) {
            var index = arr3.indexOf(this.roundTrump)
            var lowtrump = TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()]
              document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws ${lowtrump} and trumps!`);
              this.roundValues.push(lowtrump);
              return
          } else if (countingSuits[this.roundTrump] >= 2) { //if 2 or more trump in hand scans them and plays lowest
              var holding = [];
              var trumpvalues = [];
              for (var i=0; i < countingSuits[this.roundTrump]; i++) {
                holding.push(arr3.indexOf(this.roundTrump))
                arr3.splice(arr3.indexOf(this.roundTrump), 1, 'X')
                var index = holding[i]
                trumpvalues.push(TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()])
              }
              var min = Math.min(...trumpvalues);
              var minIndex = trumpvalues.indexOf(min)
              var realIndex = holding[minIndex] //index of lowest trump in hand
              var lowtrump = TRUMP_VALUE_MAP[this.getPlayer()[realIndex].firstElementChild.dataset.value.slice(0,2).trim()]
                document.getElementById(this.getPlayer()[realIndex].id).style.gridRowStart=x;
                document.getElementById(this.getPlayer()[realIndex].id).style.gridColumnStart=y;
                console.log(`Computer ${this.leader} throws lowest of their trump ${lowtrump} and trumps!`);
                this.roundValues.push(lowtrump);
                return
          }
        } else { //two suited not lead suit or trump
            var offsuitvalues = [];
            for (var i=0; i<arr3.length; i++) {
              offsuitvalues.push(CARD_VALUE_MAP[this.getPlayer()[i].firstElementChild.dataset.value.slice(0,2).trim()])
            }
            var min = Math.min(...offsuitvalues);
            var index = offsuitvalues.indexOf(min);
            document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
            document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;
            console.log(`Computer ${this.leader} throws a low off suit card`);
            this.roundValues.push(min);
            return
        }


      } else {
        indexes.splice(indexes.indexOf(this.indexOfLeft), 1); //was an index probelm but solved.
        // console.log(indexes+' should have removed left bauer index');
      }
    }

    //above code runs, can identify whether or not a hand can follow suit. including left bauer!

    if (indexes.length >= 1) {
      var newArr = [];
      var holding = [];
      // console.log(`Computer ${this.leader} can follow suit! at indexes `+indexes);
      // console.log('first card value is '+ CARD_VALUE_MAP[this.getPlayer()[indexes[0]].firstElementChild.dataset.value.slice(0,2).trim()])
      if (this.roundTrump === this.leadingSuit && this.isLeft() === true) {
        indexes.forEach(index => newArr.push(TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()]))
        newArr.pop() //removes 25 value of jack and replaces it with left value
        newArr.push(24);
      } else if (this.roundTrump === this.leadingSuit) {
        indexes.forEach(index => newArr.push(TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()]))
      } else {
        indexes.forEach(index => newArr.push(CARD_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()]))
      }

      if (newArr.length === 1) { //if the cpu only has one of that suit they play it
        document.getElementById(this.getPlayer()[indexes[0]].id).style.gridRowStart=x;
        document.getElementById(this.getPlayer()[indexes[0]].id).style.gridColumnStart=y;
        console.log(`Computer ${this.leader} must follow suit!`);
        this.roundValues.push(newArr[0]);
        return
      }
      else if (newArr.length > 1 ) { //need to fix over trumping partner's trump lead if they have it won situation
        var highCard = 0; // i.e. cpu1 lead left and cpu3 trumped with right...
        var index = 0;
        for (var i=0; i < newArr.length; i++) {
          if (newArr[i] > highCard) {
            highCard = newArr[i];
            index = i;
            console.log('highcard is ' +highCard);
          }
        }
        document.getElementById(this.getPlayer()[indexes[index]].id).style.gridRowStart=x;
        document.getElementById(this.getPlayer()[indexes[index]].id).style.gridColumnStart=y;
        console.log(`Computer ${this.leader} follows suit with high card ${highCard}!`);
        this.roundValues.push(highCard);
        return
    }
  }
  else {
    console.log(`Computer ${this.leader} doesn't have to follow suit`);
    if (this.roundValues.length === 1 && this.leadingSuit === this.roundTrump) {
      // cpu doesn't have trump. short suit yourself if low card or throw lowest card
      var arr3 = [];
      var suits = ["♠", "♣", "♥", "♦"]
      this.getPlayer().forEach(card => arr3.push(card.firstElementChild.dataset.value.slice(2).trim()))
      var countingSuits = {};
      for (var i = 0; i < arr3.length; i++) {
        var num = arr3[i];
        countingSuits[num] = countingSuits[num] ? countingSuits[num] + 1: 1; //counting # of ea suit in hand
      }
      //check value from oject to find if only 1 suit, get index, and play if "low card" Q or lower
      var arrkey = Object.keys(countingSuits) //array of keys in countingSuits
      // console.log('arrkey '+arrkey);
      for (var key in countingSuits) {
      // for (var i=0; i < arrkey.length; i++ ) {
        // var key = arrkey[i];
        if (countingSuits[key] === 1) {
          // var index = arr3.indexOf(arrkey[i]);
          var index = arr3.indexOf(key)
          var lowcard = CARD_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()]
          if (lowcard <= 12) {
            document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
            document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;
            console.log(`Computer ${this.leader} throws ${lowcard} and short suits themself!`);
            this.roundValues.push(lowcard);
            return
          }
        }
        //else if two suited throw lower of the two cards
        else if (countingSuits[key] === 2) {
          function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
          }
          var suitOfTwoCards = getKeyByValue(countingSuits, 2)
          var firstCard = arr3.indexOf(suitOfTwoCards)
          arr3.splice(firstCard, 1, 'X')
          var secondCard = arr3.indexOf(suitOfTwoCards);
          var c1value = CARD_VALUE_MAP[this.getPlayer()[firstCard].firstElementChild.dataset.value.slice(0,2).trim()]
          var c2value = CARD_VALUE_MAP[this.getPlayer()[secondCard].firstElementChild.dataset.value.slice(0,2).trim()]
          if (c1value < c2value) {
            document.getElementById(this.getPlayer()[firstCard].id).style.gridRowStart=x;
            document.getElementById(this.getPlayer()[firstCard].id).style.gridColumnStart=y;
            console.log(`Computer ${this.leader} throws lower of two cards`);
            this.roundValues.push(c1value);
            return
          }
          else {
            document.getElementById(this.getPlayer()[secondCard].id).style.gridRowStart=x;
            document.getElementById(this.getPlayer()[secondCard].id).style.gridColumnStart=y;
            console.log(`Computer ${this.leader} throws lower of two cards`);
            this.roundValues.push(c2value);
            return
          }
        } else if (countingSuits[key] === 3) {
          function getKeyByValue(object, value) {
            return Object.keys(object).find(key => object[key] === value);
          }
          var suitOfThreeCards = getKeyByValue(countingSuits, 3)
          var firstCard = arr3.indexOf(suitOfThreeCards)
          arr3.splice(firstCard, 1, 'X')
          var secondCard = arr3.indexOf(suitOfThreeCards);
          arr3.splice(secondCard, 1, 'X')
          var thirdCard = arr3.indexOf(suitOfThreeCards)
          var c1value = CARD_VALUE_MAP[this.getPlayer()[firstCard].firstElementChild.dataset.value.slice(0,2).trim()]
          var c2value = CARD_VALUE_MAP[this.getPlayer()[secondCard].firstElementChild.dataset.value.slice(0,2).trim()]
          var c3value = CARD_VALUE_MAP[this.getPlayer()[thirdCard].firstElementChild.dataset.value.slice(0,2).trim()]
          if (c1value < c2value && c1value < c3value) {
            document.getElementById(this.getPlayer()[firstCard].id).style.gridRowStart=x;
            document.getElementById(this.getPlayer()[firstCard].id).style.gridColumnStart=y;
            console.log(`Computer ${this.leader} throws lower of three cards`);
            this.roundValues.push(c1value);
            return
          } else if (c2value < c1value && c2value < c3value) {
            document.getElementById(this.getPlayer()[secondCard].id).style.gridRowStart=x;
            document.getElementById(this.getPlayer()[secondCard].id).style.gridColumnStart=y;
            console.log(`Computer ${this.leader} throws lower of three cards`);
            this.roundValues.push(c2value);
            return
          }
          else {
            document.getElementById(this.getPlayer()[thirdCard].id).style.gridRowStart=x;
            document.getElementById(this.getPlayer()[thirdCard].id).style.gridColumnStart=y;
            console.log(`Computer ${this.leader} throws lower of three cards`);
            this.roundValues.push(c3value);
            return
          }
        } else { // the below logic is bad, just random filler for now
          for (var i=0; i<arr3.length; i++) {
            document.getElementById(this.getPlayer()[i].id).style.gridRowStart=x;
            document.getElementById(this.getPlayer()[i].id).style.gridColumnStart=y;
            this.roundValues.push(CARD_VALUE_MAP[this.getPlayer()[i].firstElementChild.dataset.value.slice(0,2).trim()])
            return
          }
        }
      }
      // }


    } else if (this.roundValues.length === 1 && this.leadingSuit !== this.roundTrump) {
        //throw low trump if you have trump, otherwise throw low
        var arr3 = [];
        var suits = ["♠", "♣", "♥", "♦"]
        this.getPlayer().forEach(card => arr3.push(card.firstElementChild.dataset.value.slice(2).trim()))
        var countingSuits = {};
        for (var i = 0; i < arr3.length; i++) {
          var num = arr3[i];
          countingSuits[num] = countingSuits[num] ? countingSuits[num] + 1: 1; //counting # of ea suit in hand
        }
        if (countingSuits.hasOwnProperty(this.roundTrump) === true) {
          if (countingSuits[this.roundTrump] === 1) {
            var index = arr3.indexOf(this.roundTrump)
            var lowtrump = TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()]
              document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws ${lowtrump} and trumps!`);
              this.roundValues.push(lowtrump);
              return
          } else if (countingSuits[this.roundTrump] >= 2) { //if 2 or more trump in hand scans them and plays lowest
              var holding = [];
              var trumpvalues = [];
              for (var i=0; i < countingSuits[this.roundTrump]; i++) {
                holding.push(arr3.indexOf(this.roundTrump))
                arr3.splice(arr3.indexOf(this.roundTrump), 1, 'X')
                var index = holding[i]
                trumpvalues.push(TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()])
              }
              var min = Math.min(...trumpvalues);
              var minIndex = trumpvalues.indexOf(min)
              var realIndex = holding[minIndex] //index of lowest trump in hand
              var lowtrump = TRUMP_VALUE_MAP[this.getPlayer()[realIndex].firstElementChild.dataset.value.slice(0,2).trim()]
                document.getElementById(this.getPlayer()[realIndex].id).style.gridRowStart=x;
                document.getElementById(this.getPlayer()[realIndex].id).style.gridColumnStart=y;
                console.log(`Computer ${this.leader} throws lowest of their trump ${lowtrump} and trumps!`);
                this.roundValues.push(lowtrump);
                return
          }
        } else { //two suited not lead suit or trump
            var offsuitvalues = [];
            for (var i=0; i<arr3.length; i++) {
              offsuitvalues.push(CARD_VALUE_MAP[this.getPlayer()[i].firstElementChild.dataset.value.slice(0,2).trim()])
            }
            var min = Math.min(...offsuitvalues);
            var index = offsuitvalues.indexOf(min);
            document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
            document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;
            console.log(`Computer ${this.leader} throws a low off suit card`);
            this.roundValues.push(min);
            return
        }

    } else if (this.roundValues.length === 2 && this.roundValues[0] > this.roundValues[1]) {
      //if partner is winning trick throw off/ try to short suit, else low trump
      var arr3 = [];
      var suits = ["♠", "♣", "♥", "♦"]
      this.getPlayer().forEach(card => arr3.push(card.firstElementChild.dataset.value.slice(2).trim()))
      var countingSuits = {};
      for (var i = 0; i < arr3.length; i++) {
        var num = arr3[i];
        countingSuits[num] = countingSuits[num] ? countingSuits[num] + 1: 1; //counting # of ea suit in hand
      }
      var arrkey = Object.keys(countingSuits) //array of keys in countingSuits
        //if less than or equal to queen, play low trump
        if (countingSuits.hasOwnProperty(this.roundTrump) === true && this.roundValues[0] <= 12) {
          if (countingSuits[this.roundTrump] === 1) {
            var index = arr3.indexOf(this.roundTrump)
            var lowtrump = TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()]
              document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws ${lowtrump} and trumps!`);
              this.roundValues.push(lowtrump);
              return
          } else if (countingSuits[this.roundTrump] >= 2) { //if 2 or more trump in hand scans them and plays lowest
              var holding = [];
              var trumpvalues = [];
              for (var i=0; i < countingSuits[this.roundTrump]; i++) {
                holding.push(arr3.indexOf(this.roundTrump))
                arr3.splice(arr3.indexOf(this.roundTrump), 1, 'X')
                var index = holding[i]
                trumpvalues.push(TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()])
              }
              var min = Math.min(...trumpvalues);
              var minIndex = trumpvalues.indexOf(min)
              var realIndex = holding[minIndex] //index of lowest trump in hand
              var lowtrump = TRUMP_VALUE_MAP[this.getPlayer()[realIndex].firstElementChild.dataset.value.slice(0,2).trim()]
                document.getElementById(this.getPlayer()[realIndex].id).style.gridRowStart=x;
                document.getElementById(this.getPlayer()[realIndex].id).style.gridColumnStart=y;
                console.log(`Computer ${this.leader} throws lowest of their trump ${lowtrump} and trumps!`);
                this.roundValues.push(lowtrump);
                return
          }
      } else {
        //need to try and short suit/throw a low card
        for (var key in countingSuits) { //there is an issue where left is not accounted for
          if (countingSuits[key] === 1 && countingSuits[key] !== this.roundTrump) {
            var a = arr3.indexOf(key)
            var avalue = CARD_VALUE_MAP[this.getPlayer()[a].firstElementChild.dataset.value.slice(0,2).trim()]
            if (avalue <= 12) {
              document.getElementById(this.getPlayer()[a].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[a].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws ${avalue} off since partner is taking trick!`);
              this.roundValues.push(avalue);
              return
            }
          } else if (countingSuits[key] === 2) {
            function getKeyByValue(object, value) {
              return Object.keys(object).find(key => object[key] === value);
            }
            var suitOfTwoCards = getKeyByValue(countingSuits, 2)
            var firstCard = arr3.indexOf(suitOfTwoCards)
            arr3.splice(firstCard, 1, 'X')
            var secondCard = arr3.indexOf(suitOfTwoCards);
            var c1value = CARD_VALUE_MAP[this.getPlayer()[firstCard].firstElementChild.dataset.value.slice(0,2).trim()]
            var c2value = CARD_VALUE_MAP[this.getPlayer()[secondCard].firstElementChild.dataset.value.slice(0,2).trim()]
            if (c1value < c2value) {
              document.getElementById(this.getPlayer()[firstCard].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[firstCard].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws lower of two cards`);
              this.roundValues.push(c1value);
              return
            } else {
              document.getElementById(this.getPlayer()[secondCard].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[secondCard].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws lower of two cards`);
              this.roundValues.push(c2value);
              return
            }
          } else if (countingSuits[key] === 3) {
            function getKeyByValue(object, value) {
              return Object.keys(object).find(key => object[key] === value);
            }
            var suitOfThreeCards = getKeyByValue(countingSuits, 3)
            var firstCard = arr3.indexOf(suitOfThreeCards)
            arr3.splice(firstCard, 1, 'X')
            var secondCard = arr3.indexOf(suitOfThreeCards);
            arr3.splice(secondCard, 1, 'X')
            var thirdCard = arr3.indexOf(suitOfThreeCards)
            var c1value = CARD_VALUE_MAP[this.getPlayer()[firstCard].firstElementChild.dataset.value.slice(0,2).trim()]
            var c2value = CARD_VALUE_MAP[this.getPlayer()[secondCard].firstElementChild.dataset.value.slice(0,2).trim()]
            var c3value = CARD_VALUE_MAP[this.getPlayer()[thirdCard].firstElementChild.dataset.value.slice(0,2).trim()]
            if (c1value < c2value && c1value < c3value) {
              document.getElementById(this.getPlayer()[firstCard].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[firstCard].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws lower of three cards`);
              this.roundValues.push(c1value);
              return
            } else if (c2value < c1value && c2value < c3value) {
              document.getElementById(this.getPlayer()[secondCard].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[secondCard].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws lower of three cards`);
              this.roundValues.push(c2value);
              return
            }
            else {
              document.getElementById(this.getPlayer()[thirdCard].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[thirdCard].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws lower of three cards`);
              this.roundValues.push(c3value);
              return
            }
          }

          }
        }
      } else if (this.roundValues.length === 2 && this.roundValues[0] < this.roundValues[1]) {
          //throw low trump if you have trump, otherwise throw low
          var arr3 = [];
          var suits = ["♠", "♣", "♥", "♦"]
          this.getPlayer().forEach(card => arr3.push(card.firstElementChild.dataset.value.slice(2).trim()))
          var countingSuits = {};
          for (var i = 0; i < arr3.length; i++) {
            var num = arr3[i];
            countingSuits[num] = countingSuits[num] ? countingSuits[num] + 1: 1; //counting # of ea suit in hand
          }
          if (countingSuits.hasOwnProperty(this.roundTrump) === true) {
            if (countingSuits[this.roundTrump] === 1) {
              var index = arr3.indexOf(this.roundTrump)
              var lowtrump = TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()]
                document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
                document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;
                console.log(`Computer ${this.leader} throws ${lowtrump} and trumps!`);
                this.roundValues.push(lowtrump);
                return
            } else if (countingSuits[this.roundTrump] >= 2) { //if 2 or more trump in hand scans them and plays lowest
                var holding = [];
                var trumpvalues = [];
                for (var i=0; i < countingSuits[this.roundTrump]; i++) {
                  holding.push(arr3.indexOf(this.roundTrump))
                  arr3.splice(arr3.indexOf(this.roundTrump), 1, 'X')
                  var index = holding[i]
                  trumpvalues.push(TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()])
                }
                var min = Math.min(...trumpvalues);
                var minIndex = trumpvalues.indexOf(min)
                var realIndex = holding[minIndex] //index of lowest trump in hand
                var lowtrump = TRUMP_VALUE_MAP[this.getPlayer()[realIndex].firstElementChild.dataset.value.slice(0,2).trim()]
                  document.getElementById(this.getPlayer()[realIndex].id).style.gridRowStart=x;
                  document.getElementById(this.getPlayer()[realIndex].id).style.gridColumnStart=y;
                  console.log(`Computer ${this.leader} throws lowest of their trump ${lowtrump} and trumps!`);
                  this.roundValues.push(lowtrump);
                  return
            }
          } else { //two suited not lead suit or trump
              var offsuitvalues = [];
              for (var i=0; i<arr3.length; i++) {
                offsuitvalues.push(CARD_VALUE_MAP[this.getPlayer()[i].firstElementChild.dataset.value.slice(0,2).trim()])
              }
              var min = Math.min(...offsuitvalues);
              var index = offsuitvalues.indexOf(min);
              document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws a low off suit card`);
              this.roundValues.push(min);
              return
          }

      }else if (this.roundValues.length === 3 && this.roundValues[1] > (this.roundValues[0] && this.roundValues[2])) {
      //same rules as above
      var arr3 = [];
      var suits = ["♠", "♣", "♥", "♦"]
      this.getPlayer().forEach(card => arr3.push(card.firstElementChild.dataset.value.slice(2).trim()))
      var countingSuits = {};
      for (var i = 0; i < arr3.length; i++) {
        var num = arr3[i];
        countingSuits[num] = countingSuits[num] ? countingSuits[num] + 1: 1; //counting # of ea suit in hand
      }
      var arrkey = Object.keys(countingSuits) //array of keys in countingSuits
        //if less than or equal to queen, play low trump
        if (countingSuits.hasOwnProperty(this.roundTrump) === true) {
          if (countingSuits[this.roundTrump] === 1) {
            var index = arr3.indexOf(this.roundTrump)
            var lowtrump = TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()]
              document.getElementById(this.getPlayer()[index].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[index].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws ${lowtrump} and trumps!`);
              this.roundValues.push(lowtrump);
              return
          } else if (countingSuits[this.roundTrump] >= 2) { //if 2 or more trump in hand scans them and plays lowest
              var holding = [];
              var trumpvalues = [];
              for (var i=0; i < countingSuits[this.roundTrump]; i++) {
                holding.push(arr3.indexOf(this.roundTrump))
                arr3.splice(arr3.indexOf(this.roundTrump), 1, 'X')
                var index = holding[i]
                trumpvalues.push(TRUMP_VALUE_MAP[this.getPlayer()[index].firstElementChild.dataset.value.slice(0,2).trim()])
              }
              var min = Math.min(...trumpvalues);
              var minIndex = trumpvalues.indexOf(min)
              var realIndex = holding[minIndex] //index of lowest trump in hand
              var lowtrump = TRUMP_VALUE_MAP[this.getPlayer()[realIndex].firstElementChild.dataset.value.slice(0,2).trim()]
                document.getElementById(this.getPlayer()[realIndex].id).style.gridRowStart=x;
                document.getElementById(this.getPlayer()[realIndex].id).style.gridColumnStart=y;
                console.log(`Computer ${this.leader} throws lowest of their trump ${lowtrump} and trumps!`);
                this.roundValues.push(lowtrump);
                return
          }
      } else {
        //need to try and short suit/throw a low card
        for (var key in countingSuits) {
          if (countingSuits[key] === 1 && countingSuits[key] !== this.roundTrump) {
            var a = arr3.indexOf(key)
            var avalue = CARD_VALUE_MAP[this.getPlayer()[a].firstElementChild.dataset.value.slice(0,2).trim()]
            if (avalue <= 12) {
              document.getElementById(this.getPlayer()[a].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[a].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws ${avalue} off since partner is taking trick!`);
              this.roundValues.push(avalue);
              return
            }
          } else if (countingSuits[key] === 2) {
            function getKeyByValue(object, value) {
              return Object.keys(object).find(key => object[key] === value);
            }
            var suitOfTwoCards = getKeyByValue(countingSuits, 2)
            var firstCard = arr3.indexOf(suitOfTwoCards)
            arr3.splice(firstCard, 1, 'X')
            var secondCard = arr3.indexOf(suitOfTwoCards);
            var c1value = CARD_VALUE_MAP[this.getPlayer()[firstCard].firstElementChild.dataset.value.slice(0,2).trim()]
            var c2value = CARD_VALUE_MAP[this.getPlayer()[secondCard].firstElementChild.dataset.value.slice(0,2).trim()]
            if (c1value < c2value) {
              document.getElementById(this.getPlayer()[firstCard].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[firstCard].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws lower of two cards`);
              this.roundValues.push(c1value);
              return
            } else {
              document.getElementById(this.getPlayer()[secondCard].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[secondCard].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws lower of two cards`);
              this.roundValues.push(c2value);
              return
            }
          } else if (countingSuits[key] === 3) {
            function getKeyByValue(object, value) {
              return Object.keys(object).find(key => object[key] === value);
            }
            var suitOfThreeCards = getKeyByValue(countingSuits, 3)
            var firstCard = arr3.indexOf(suitOfThreeCards)
            arr3.splice(firstCard, 1, 'X')
            var secondCard = arr3.indexOf(suitOfThreeCards);
            arr3.splice(secondCard, 1, 'X')
            var thirdCard = arr3.indexOf(suitOfThreeCards)
            var c1value = CARD_VALUE_MAP[this.getPlayer()[firstCard].firstElementChild.dataset.value.slice(0,2).trim()]
            var c2value = CARD_VALUE_MAP[this.getPlayer()[secondCard].firstElementChild.dataset.value.slice(0,2).trim()]
            var c3value = CARD_VALUE_MAP[this.getPlayer()[thirdCard].firstElementChild.dataset.value.slice(0,2).trim()]
            if (c1value < c2value && c1value < c3value) {
              document.getElementById(this.getPlayer()[firstCard].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[firstCard].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws lower of three cards`);
              this.roundValues.push(c1value);
              return
            } else if (c2value < c1value && c2value < c3value) {
              document.getElementById(this.getPlayer()[secondCard].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[secondCard].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws lower of three cards`);
              this.roundValues.push(c2value);
              return
            }
            else {
              document.getElementById(this.getPlayer()[thirdCard].id).style.gridRowStart=x;
              document.getElementById(this.getPlayer()[thirdCard].id).style.gridColumnStart=y;
              console.log(`Computer ${this.leader} throws lower of three cards`);
              this.roundValues.push(c3value);
              return
            }
          }
    }
  }
} else { //bad logic below but want to just play a card everytime
  var arr3 = [];
  this.getPlayer().forEach(card => arr3.push(card.firstElementChild.dataset.value.slice(2).trim()))
  if (arr3[0] === this.roundTrump) {
    var cardvalue = TRUMP_VALUE_MAP[this.getPlayer()[0].firstElementChild.dataset.value.slice(0,2).trim()]
    document.getElementById(this.getPlayer()[0].id).style.gridRowStart=x;
    document.getElementById(this.getPlayer()[0].id).style.gridColumnStart=y;
    console.log(`Computer ${this.leader} arbitrarily throws first card in hand`);
    this.roundValues.push(cardvalue);
    return
  } else {
      var cardvalue = CARD_VALUE_MAP[this.getPlayer()[0].firstElementChild.dataset.value.slice(0,2).trim()]
      document.getElementById(this.getPlayer()[0].id).style.gridRowStart=x;
      document.getElementById(this.getPlayer()[0].id).style.gridColumnStart=y;
      console.log(`Computer ${this.leader} arbitrarily throws first card in hand`);
      this.roundValues.push(cardvalue);
      return
  }
    }
    //repeating code to try and get card played everytime no matter what
    var arr3 = [];
    this.getPlayer().forEach(card => arr3.push(card.firstElementChild.dataset.value.slice(2).trim()))
    if (arr3[0] === this.roundTrump) {
      var cardvalue = TRUMP_VALUE_MAP[this.getPlayer()[0].firstElementChild.dataset.value.slice(0,2).trim()]
      document.getElementById(this.getPlayer()[0].id).style.gridRowStart=x;
      document.getElementById(this.getPlayer()[0].id).style.gridColumnStart=y;
      console.log(`Computer ${this.leader} arbitrarily throws first card in hand`);
      this.roundValues.push(cardvalue);
      return
    } else {
        var cardvalue = CARD_VALUE_MAP[this.getPlayer()[0].firstElementChild.dataset.value.slice(0,2).trim()]
        document.getElementById(this.getPlayer()[0].id).style.gridRowStart=x;
        document.getElementById(this.getPlayer()[0].id).style.gridColumnStart=y;
        console.log(`Computer ${this.leader} arbitrarily throws first card in hand`);
        this.roundValues.push(cardvalue);
        return
      }
  }
}



  isLeader() {
    if (this.realdealer === 3) {
      return this.leader = 0;
    } else {
      return this.leader = this.realdealer + 1;
    }
  }
  isLeft() {
    //used for computer to figure out if the J in their hand is considered a trump.
    //if card is a J and opposite suit of the upcard.
    // if (this.leader === 1) { //this.player
      var anyJacks = []
      var opposite = {
        "♠":"♣",
        "♣":"♠",
        "♥":"♦",
        "♦":"♥"
      };
      var trumpSuit = upcard.firstElementChild.dataset.value.slice(2).trim();
      var left = opposite[trumpSuit];


      this.getPlayer().forEach(card => anyJacks.push((card.firstElementChild.dataset.value)));
      // console.log(anyJacks);
      // console.log(anyJacks.includes('J '+left)); //boolean
      if (anyJacks.includes('J '+left) === true) {
        this.indexOfLeft = anyJacks.indexOf('J '+ left); // index of left in hand
        return true;
      } else {
          return false;
      }
    //need to assign value to trump vs normal cards...?
}
  isRight() {
    var anyJacks = [];
    var trumpSuit = upcard.firstElementChild.dataset.value.slice(2).trim();
    this.getPlayer().forEach(card => anyJacks.push(card.firstElementChild.dataset.value));
    if (anyJacks.includes('J '+trumpSuit) === true) {
      return true;
    } else {
      return false;
    }
  }
  isSideAce() {
    var anyAces = [];
    var offSuit = ["♠", "♣", "♥", "♦"]
    var countSuits = [];
    var trumpSuit = upcard.firstElementChild.dataset.value.slice(2).trim();
    this.getPlayer().forEach(card => anyAces.push(card.firstElementChild.dataset.value));
    offSuit = offSuit.filter(e => e !== trumpSuit); //removes trumpsuit from "offsuit array"
    this.getPlayer().forEach(card => countSuits.push(card.firstElementChild.dataset.value.slice(2).trim()));
    var counts = {};
    for (var i = 0; i < countSuits.length; i++) {
      var num = countSuits[i];
      counts[num] = counts[num] ? counts[num] + 1: 1; //counting # of ea suit in hand
    }

    if (anyAces.includes('A '+ offSuit[0]) && counts[offSuit[0]] === 1) {
      this.offSuit = offSuit[0];
      return true;
    } else if (anyAces.includes('A '+ offSuit[1]) && counts[offSuit[1]] === 1) {
      this.offSuit = offSuit[1];
      return true;
    } else if (anyAces.includes('A '+offSuit[2]) && counts[offSuit[2]] === 1) {
      this.offSuit = offSuit[2];
      return true;
    } else {
      return false;
    }
  }
  isTrumpAce() {
    var anyAces = [];
    var trumpSuit = upcard.firstElementChild.dataset.value.slice(2).trim();
    this.getPlayer().forEach(card => anyAces.push(card.firstElementChild.dataset.value));
    if (anyAces.includes('A '+trumpSuit) === true) {
      return true;
    } else {
      return false;
    }
  }

  getDealer() {
    if (this.realdealer === 0) {
      return this.playerCardsArray
    }
    else if (this.realdealer === 1) {
      return this.cpuOneCardsArray
    }
    else if (this.realdealer === 2) {
      return this.cpuTwoCardsArray
    }
    else {
      return this.cpuThreeCardsArray
    }
  }


  getPlayer() {
    //used for inputing into orderUp, isleft, isright, isSideAce,  functions so
    //i don't have to do it 4 times
    if (this.leader === 0) {
      return this.playerCardsArray
    }
    else if (this.leader === 1) {
      return this.cpuOneCardsArray
    }
    else if (this.leader === 2) {
      return this.cpuTwoCardsArray
    }
    else {
      return this.cpuThreeCardsArray
    }
  }

  nextPlayer() {
    //if pass() or play() or cpulead() is called, increment currentplayer aka "leader" by 1 if 3 reset to player 0...
    //start function can reset variable to have the round's true leader (person left of dealer).
    console.log('next player was called');
    this.leader++
    if (this.leader > 3) {
      this.leader = 0;
    }
    return this.leader
  }

  play() { //user play function
    console.log('who is leader during my turn? leader is '+this.leader);
    // this.leader = 0;
    text.innerText = 'Your move!'
    var arroop = [];
    var holding = [];
    this.playerCardsArray.forEach(card => arroop.push(card.firstElementChild.dataset.value.slice(2).trim()))

    function getAllIndexes (arr, val) {
      var indexes = [], i = -1;
      while ((i = arr.indexOf(val, i+1)) != -1){
        indexes.push(i);
      }

      return indexes;
    }

    console.log('array of suits '+arroop);
    var playableCards = getAllIndexes(arroop, this.leadingSuit);
    console.log(playableCards);
    if (this.isLeft() === true && this.leadingSuit === this.roundTrump) {
      //add to left index playableCards array
      playableCards.push(this.indexOfLeft);
    }
    //if player picks up trump, maker sure card is added properly to their hand and cpu's hand
    //might need to add p1 c1 classes etc...
    if (playableCards.length >= 1) {
      //player must follow suit
      playerCardSlot1.classList.add('disabled')
      playerCardSlot2.classList.add('disabled')
      playerCardSlot3.classList.add('disabled')
      playerCardSlot4.classList.add('disabled')
      playerCardSlot5.classList.add('disabled')
        if (playableCards.includes(0)) {
          playerCardSlot1.classList.remove('disabled')
          playerCardSlot1.classList.toggle('cselected');
        } if (playableCards.includes(1)) {
          playerCardSlot2.classList.remove('disabled')
          playerCardSlot2.classList.toggle('cselected');
        } if (playableCards.includes(2)) {
          playerCardSlot3.classList.remove('disabled')
          playerCardSlot3.classList.toggle('cselected');
        } if (playableCards.includes(3)) {
          playerCardSlot4.classList.remove('disabled')
          playerCardSlot4.classList.toggle('cselected');
        } if (playableCards.includes(4)){
          playerCardSlot5.classList.remove('disabled')
          playerCardSlot5.classList.toggle('cselected');
        }
    } else {
      console.log('user does not have to follow suit');
      //need to make it work if cards have been played...
      playerCardSlot1.classList.toggle('cselected');
      playerCardSlot2.classList.toggle('cselected');
      playerCardSlot3.classList.toggle('cselected');
      playerCardSlot4.classList.toggle('cselected');
      playerCardSlot5.classList.toggle('cselected');

      playerCardSlot1.classList.remove('disabled')
      playerCardSlot2.classList.remove('disabled')
      playerCardSlot3.classList.remove('disabled')
      playerCardSlot4.classList.remove('disabled')
      playerCardSlot5.classList.remove('disabled')
    }
    console.log('card one is ' +this.getPlayer()[0].id)
    //user plays card (need to disable toggle for the other selected/unselected cards)
    playerCardSlot1.addEventListener('click', () => {
      // playerCardSlot1.classList.add('disabled')
      playerCardSlot1.classList.remove('cselected')

      playerCardSlot2.classList.remove('cselected')
      playerCardSlot3.classList.remove('cselected')
      playerCardSlot4.classList.remove('cselected')
      playerCardSlot5.classList.remove('cselected')

      console.log(`on clicking first card, Player ${this.leader} plays a card`);
      document.getElementById(this.playerCardsArray[0].id).style.gridRowStart=6;
      document.getElementById(this.playerCardsArray[0].id).style.gridColumnStart=5;
      console.log(`Player throws a card`);
      //Need to account for if the user plays the left
      if (this.playerCardsArray[0].firstElementChild.dataset.value.slice(2).trim() === this.roundTrump) {
        var pcardvalue = TRUMP_VALUE_MAP[this.playerCardsArray[0].firstElementChild.dataset.value.slice(0,2).trim()]
      } else {
        var pcardvalue = CARD_VALUE_MAP[this.playerCardsArray[0].firstElementChild.dataset.value.slice(0,2).trim()]
      }
      this.roundValues.push(pcardvalue);
      console.log('dealer is '+this.realdealer); //if this.realdealer === 0 return this.isRoundWinner
      this.p1PlayedId = this.playerCardsArray[0].id
      return this.isRoundWinner()
    })

    playerCardSlot2.addEventListener('click', () => {
      playerCardSlot2.classList.add('disabled')
      playerCardSlot2.classList.remove('cselected')

      playerCardSlot1.classList.remove('cselected')
      playerCardSlot3.classList.remove('cselected')
      playerCardSlot4.classList.remove('cselected')
      playerCardSlot5.classList.remove('cselected')

      document.getElementById(this.playerCardsArray[1].id).style.gridRowStart=6;
      document.getElementById(this.playerCardsArray[1].id).style.gridColumnStart=5;
      console.log(`Player throws a card`);
      //Need to account for if the user plays the left
      if (this.playerCardsArray[1].firstElementChild.dataset.value.slice(2).trim() === this.roundTrump) {
        var pcardvalue = TRUMP_VALUE_MAP[this.playerCardsArray[1].firstElementChild.dataset.value.slice(0,2).trim()]
      } else {
        var pcardvalue = CARD_VALUE_MAP[this.playerCardsArray[1].firstElementChild.dataset.value.slice(0,2).trim()]
      }
      this.roundValues.push(pcardvalue);
      this.p1PlayedId = this.playerCardsArray[1].id
      return this.isRoundWinner()
    })

    playerCardSlot3.addEventListener('click', () => {
      playerCardSlot3.classList.add('disabled')
      playerCardSlot3.classList.remove('cselected')

      playerCardSlot1.classList.remove('cselected')
      playerCardSlot2.classList.remove('cselected')
      playerCardSlot4.classList.remove('cselected')
      playerCardSlot5.classList.remove('cselected')

      document.getElementById(this.playerCardsArray[2].id).style.gridRowStart=6;
      document.getElementById(this.playerCardsArray[2].id).style.gridColumnStart=5;
      console.log(`Player throws a card`);
      //Need to account for if the user plays the left
      if (this.playerCardsArray[2].firstElementChild.dataset.value.slice(2).trim() === this.roundTrump) {
        var pcardvalue = TRUMP_VALUE_MAP[this.playerCardsArray[2].firstElementChild.dataset.value.slice(0,2).trim()]
      } else {
        var pcardvalue = CARD_VALUE_MAP[this.playerCardsArray[2].firstElementChild.dataset.value.slice(0,2).trim()]
      }
      this.roundValues.push(pcardvalue);
      this.p1PlayedId = this.playerCardsArray[2].id
      return this.isRoundWinner()
    })

    playerCardSlot4.addEventListener('click', () => {
      playerCardSlot4.classList.add('disabled')
      playerCardSlot4.classList.remove('cselected')

      playerCardSlot1.classList.remove('cselected')
      playerCardSlot2.classList.remove('cselected')
      playerCardSlot3.classList.remove('cselected')
      playerCardSlot5.classList.remove('cselected')

      document.getElementById(this.playerCardsArray[3].id).style.gridRowStart=6;
      document.getElementById(this.playerCardsArray[3].id).style.gridColumnStart=5;
      console.log(`Player throws a card`);
      //Need to account for if the user plays the left
      if (this.playerCardsArray[3].firstElementChild.dataset.value.slice(2).trim() === this.roundTrump) {
        var pcardvalue = TRUMP_VALUE_MAP[this.playerCardsArray[3].firstElementChild.dataset.value.slice(0,2).trim()]
      } else {
        var pcardvalue = CARD_VALUE_MAP[this.playerCardsArray[3].firstElementChild.dataset.value.slice(0,2).trim()]
      }
      this.roundValues.push(pcardvalue);
      this.p1PlayedId = this.playerCardsArray[3].id
      return this.isRoundWinner()
    })

    playerCardSlot5.addEventListener('click', () => {
      playerCardSlot5.classList.add('disabled')
      playerCardSlot5.classList.remove('cselected')

      playerCardSlot1.classList.remove('cselected')
      playerCardSlot2.classList.remove('cselected')
      playerCardSlot3.classList.remove('cselected')
      playerCardSlot4.classList.remove('cselected')

      document.getElementById(this.playerCardsArray[4].id).style.gridRowStart=6;
      document.getElementById(this.playerCardsArray[4].id).style.gridColumnStart=5;
      console.log(`Player throws a card`);
      //Need to account for if the user plays the left
      if (this.playerCardsArray[4].firstElementChild.dataset.value.slice(2).trim() === this.roundTrump) {
        var pcardvalue = TRUMP_VALUE_MAP[this.playerCardsArray[4].firstElementChild.dataset.value.slice(0,2).trim()]
      } else {
        var pcardvalue = CARD_VALUE_MAP[this.playerCardsArray[4].firstElementChild.dataset.value.slice(0,2).trim()]
      }
      this.roundValues.push(pcardvalue);
      this.p1PlayedId = this.playerCardsArray[4].id
      return this.isRoundWinner()
    })




}

  clickHandlerX() {
    passButton.style.display = 'none';
    passButton.classList.add('disabled')
    upcard.classList.add('disabled')
    return this.playerDiscard();
  }

  playerPickUp() {
    upcard.classList.toggle('selected');
    upcard.addEventListener('click', () => this.clickHandlerX(), {once:true});
}

//   clickHandler() {
//     playerCardSlot1.innerHTML = '';
//     upcard.classList.add('disabled')
//     upcard.style.display = 'none';
//     this.count = 1;
//     console.log('count is '+this.count);
//
//
//     var newDiv = document.createElement('div');
//     newDiv.innerText = upcard.firstElementChild.dataset.value.slice(2).trim();
//     newDiv.classList.add('card', upcard.firstElementChild.className.split(' ')[1]);
//     newDiv.dataset.value = upcard.firstElementChild.dataset.value;
//     playerCardSlot1.appendChild(newDiv);
//
//
//
//     playerCardSlot1.classList.add('disabled')
//     playerCardSlot2.classList.add('disabled')
//     playerCardSlot3.classList.add('disabled')
//     playerCardSlot4.classList.add('disabled')
//     playerCardSlot5.classList.add('disabled')
//
//     const func = () => this.clickHandler()
//     const func2 = () => this.clickHandler2()
//     const func3 = () => this.clickHandler3()
//     const func4 = () => this.clickHandler4()
//     const func5 = () => this.clickHandler5()
//
//     playerCardSlot1.removeEventListener('click', func);
//     playerCardSlot2.removeEventListener('click', func2);
//     playerCardSlot3.removeEventListener('click', func3);
//     playerCardSlot4.removeEventListener('click', func4);
//     playerCardSlot5.removeEventListener('click', func5);
//
//     this.stopAnimation();
//     return this.playHand();
// }
//
//   clickHandler2() {
//     playerCardSlot2.innerHTML = '';
//     upcard.style.display = 'none';
//     upcard.classList.add('disabled')
//     this.count = 1;
//
//     var newDiv = document.createElement('div');
//     newDiv.innerText = upcard.firstElementChild.dataset.value.slice(2).trim();
//     newDiv.classList.add('card', upcard.firstElementChild.className.split(' ')[1]);
//     newDiv.dataset.value = upcard.firstElementChild.dataset.value;
//     playerCardSlot2.appendChild(newDiv);
//
//
//     playerCardSlot1.classList.add('disabled')
//     playerCardSlot2.classList.add('disabled')
//     playerCardSlot3.classList.add('disabled')
//     playerCardSlot4.classList.add('disabled')
//     playerCardSlot5.classList.add('disabled')
//
//     const func = () => this.clickHandler()
//     const func2 = () => this.clickHandler2()
//     const func3 = () => this.clickHandler3()
//     const func4 = () => this.clickHandler4()
//     const func5 = () => this.clickHandler5()
//
//     playerCardSlot1.removeEventListener('click', func);
//     playerCardSlot2.removeEventListener('click', func2);
//     playerCardSlot3.removeEventListener('click', func3);
//     playerCardSlot4.removeEventListener('click', func4);
//     playerCardSlot5.removeEventListener('click', func5);
//
//
//
//     this.stopAnimation();
//
//     return this.playHand();
//   }
//
//   clickHandler3() {
//     playerCardSlot3.innerHTML = '';
//     upcard.style.display = 'none';
//     upcard.classList.add('disabled')
//     this.count = 1;
//
//     var newDiv = document.createElement('div');
//     newDiv.innerText = upcard.firstElementChild.dataset.value.slice(2).trim();
//     newDiv.classList.add('card', upcard.firstElementChild.className.split(' ')[1]);
//     newDiv.dataset.value = upcard.firstElementChild.dataset.value;
//     playerCardSlot3.appendChild(newDiv);
//
//
//     playerCardSlot1.classList.add('disabled')
//     playerCardSlot2.classList.add('disabled')
//     playerCardSlot3.classList.add('disabled')
//     playerCardSlot4.classList.add('disabled')
//     playerCardSlot5.classList.add('disabled')
//
//     const func = () => this.clickHandler()
//     const func2 = () => this.clickHandler2()
//     const func3 = () => this.clickHandler3()
//     const func4 = () => this.clickHandler4()
//     const func5 = () => this.clickHandler5()
//
//     playerCardSlot1.removeEventListener('click', func);
//     playerCardSlot2.removeEventListener('click', func2);
//     playerCardSlot3.removeEventListener('click', func3);
//     playerCardSlot4.removeEventListener('click', func4);
//     playerCardSlot5.removeEventListener('click', func5);
//
//
//     this.stopAnimation();
//     return this.playHand();
//   }
//
//   clickHandler4() {
//     playerCardSlot4.innerHTML = '';
//     upcard.style.display = 'none';
//     upcard.classList.add('disabled')
//     this.count = 1;
//
//     var newDiv = document.createElement('div');
//     newDiv.innerText = upcard.firstElementChild.dataset.value.slice(2).trim();
//     newDiv.classList.add('card', upcard.firstElementChild.className.split(' ')[1]);
//     newDiv.dataset.value = upcard.firstElementChild.dataset.value;
//     playerCardSlot4.appendChild(newDiv);
//
//
//     playerCardSlot1.classList.add('disabled')
//     playerCardSlot2.classList.add('disabled')
//     playerCardSlot3.classList.add('disabled')
//     playerCardSlot4.classList.add('disabled')
//     playerCardSlot5.classList.add('disabled')
//
//     const func = () => this.clickHandler()
//     const func2 = () => this.clickHandler2()
//     const func3 = () => this.clickHandler3()
//     const func4 = () => this.clickHandler4()
//     const func5 = () => this.clickHandler5()
//
//     playerCardSlot1.removeEventListener('click', func);
//     playerCardSlot2.removeEventListener('click', func2);
//     playerCardSlot3.removeEventListener('click', func3);
//     playerCardSlot4.removeEventListener('click', func4);
//     playerCardSlot5.removeEventListener('click', func5);
//
//
//
//     this.stopAnimation();
//     return this.playHand();
//   }
//
  // clickHandler5() {
  //   playerCardSlot5.innerHTML = '';
  //   upcard.style.display = 'none';
  //   upcard.classList.add('disabled')
  //   this.count = 1;
  //
  //   var newDiv = document.createElement('div');
  //   newDiv.innerText = upcard.firstElementChild.dataset.value.slice(2).trim();
  //   newDiv.classList.add('card', upcard.firstElementChild.className.split(' ')[1]);
  //   newDiv.dataset.value = upcard.firstElementChild.dataset.value;
  //   playerCardSlot5.appendChild(newDiv);
  //
  //
  //   playerCardSlot1.classList.add('disabled')
  //   playerCardSlot2.classList.add('disabled')
  //   playerCardSlot3.classList.add('disabled')
  //   playerCardSlot4.classList.add('disabled')
  //   playerCardSlot5.classList.add('disabled')
  //
  //   const func = () => this.clickHandler()
  //   const func2 = () => this.clickHandler2()
  //   const func3 = () => this.clickHandler3()
  //   const func4 = () => this.clickHandler4()
  //   const func5 = () => this.clickHandler5()
  //
  //   playerCardSlot1.removeEventListener('click', func);
  //   playerCardSlot2.removeEventListener('click', func2);
  //   playerCardSlot3.removeEventListener('click', func3);
  //   playerCardSlot4.removeEventListener('click', func4);
  //   playerCardSlot5.removeEventListener('click', func5);
  //
  //   this.stopAnimation();
  //   return this.playHand();
  // }

  clickHandler(slot) {
    slot.innerHTML = '';
    upcard.style.display = 'none';
    upcard.classList.add('disabled')

    let newDiv = document.createElement('div');
    newDiv.innerText = upcard.firstElementChild.dataset.value.slice(2).trim();
    newDiv.classList.add('card', upcard.firstElementChild.className.split(' ')[1]);
    newDiv.dataset.value = upcard.firstElementChild.dataset.value;
    slot.appendChild(newDiv);
    this.slots.forEach(slot => slot.classList.add('disabled'));
    this.slots.forEach((slot, position) => slot.removeEventListener('click', this.handlers[position]));
    this.stopAnimation();
    return this.playHand();
  }

  playerDiscard() {
    // upcard.removeEventListener('click', this.listener, true);
    text.innerText = 'Click on card you want to replace.';
    // this.count = 0
    // playerCardSlot1.classList.toggle('cselected');
    // playerCardSlot2.classList.toggle('cselected');
    // playerCardSlot3.classList.toggle('cselected');
    // playerCardSlot4.classList.toggle('cselected');
    // playerCardSlot5.classList.toggle('cselected');
    //
    // const func = () => this.clickHandler()
    // const func2 = () => this.clickHandler2()
    // const func3 = () => this.clickHandler3()
    // const func4 = () => this.clickHandler4()
    // const func5 = () => this.clickHandler5()



    //if playercard x is clicked run that click event and stop/disable the other 4 click events!

    // playerCardSlot1.addEventListener('click', () => this.clickHandler(), {once:true});
    // playerCardSlot2.addEventListener('click', () => this.clickHandler2(), {once:true});
    // playerCardSlot3.addEventListener('click', () => this.clickHandler3(), {once:true});
    // playerCardSlot4.addEventListener('click', () => this.clickHandler4(), {once:true});
    // playerCardSlot5.addEventListener('click', () => this.clickHandler5(), {once:true});

    // playerCardSlot1.addEventListener('click', func, {once:true});
    // playerCardSlot2.addEventListener('click', func2, {once:true});
    // playerCardSlot3.addEventListener('click', func3, {once:true});
    // playerCardSlot4.addEventListener('click', func4, {once:true});
    // playerCardSlot5.addEventListener('click', func5, {once:true});

    // playerCardSlot1.removeEventListener('click', func, {once:true});
    // playerCardSlot2.removeEventListener('click', func2, {once:true});
    // playerCardSlot3.removeEventListener('click', func3, {once:true});
    // playerCardSlot4.removeEventListener('click', func4, {once:true});
    // playerCardSlot5.removeEventListener('click', func5, {once:true});
    this.slots.forEach(slot => slot.classList.toggle('cselected'));
    this.slots.forEach((slot, position) => slot.addEventListener('click', this.handlers[position], {once:true}));

  }

  stopAnimation() {
    playerCardSlot1.classList.toggle('cselected');
    playerCardSlot2.classList.toggle('cselected');
    playerCardSlot3.classList.toggle('cselected');
    playerCardSlot4.classList.toggle('cselected');
    playerCardSlot5.classList.toggle('cselected');

  }

  isRoundWinner() {
    console.log(this.roundValues);
    var max = Math.max(...this.roundValues);
    var index = this.roundValues.indexOf(max);
    this.isLeader();
    // console.log('max index is '+index);
    // console.log('leader is '+ this.leader);
    if (this.leader === 0 && index === 0) {
      text.innerText = 'You take the trick!'
      this.team1tricks += 1;
      team1tricks.innerText = this.team1tricks;
      // this.leader = 0;
      // return this.nextRound();
      return
    } else if (this.leader === 0 && index === 1) {
      text.innerText = 'Computer 1 takes the trick!'
      this.team2tricks +=1;
      team2tricks.innerText = this.team2tricks;
      return
    } else if (this.leader === 0 && index === 2) {
      text.innerText = 'Your partner takes the trick!'
      this.team1tricks += 1;
      team1tricks.innerText = this.team1tricks;
      return
    } else if (this.leader === 0 && index === 3) {
      text.innerText = 'Computer 3 takes the trick!'
      this.team2tricks +=1;
      team2tricks.innerText = this.team2tricks;
      return
    } else if (this.leader === 1 && index === 0) {
      text.innerText = 'Computer 1 takes the trick!'
      this.team2tricks +=1;
      team2tricks.innerText = this.team2tricks;
      return
    } else if (this.leader === 1 && index === 1) {
      text.innerText = 'Your partner takes the trick!'
      this.team1tricks += 1;
      team1tricks.innerText = this.team1tricks;
      return
    } else if (this.leader === 1 && index === 2) {
      text.innerText = 'Computer 3 takes the trick!'
      this.team2tricks +=1;
      team2tricks.innerText = this.team2tricks;
      return
    } else if (this.leader === 1 && index === 3) {
      text.innerText = 'You take the trick!'
      this.team1tricks += 1;
      team1tricks.innerText = this.team1tricks;
      // this.leader = 0;
      // return this.nextRound();
    }
    else {
      return
    }
  }

  trickTaker() {
    //quick glow animation to indicate card that takes the trick.
  }

}



function ready() {
  //add overlays to start game and when user wins/loses game later
  let playerCards = Array.from(document.getElementsByClassName('p1'));
  let cpuOneCards = Array.from(document.getElementsByClassName('c1'));
  let cpuTwoCards = Array.from(document.getElementsByClassName('c2'));
  let cpuThreeCards = Array.from(document.getElementsByClassName('c3'));
  let upcard = document.getElementById('deck');

  let game = new Euchre(playerCards, cpuOneCards, cpuTwoCards, cpuThreeCards, upcard);
  game.startGame();
  game.startRound();

  }

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ready());
} else {
    ready();
}
