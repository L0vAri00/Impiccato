import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import wordsData from './../../assets/words.json';

interface Word {
  word: string;
  length: number;
}

interface Category {
  Animali: Word[];
  Cibo: Word[];
  Città: Word[];
  Tecnologia: Word[];
  Sport: Word[];
  Musica: Word[];
  Arte: Word[];
  Istruzione: Word[];
  Impresa: Word[];
  Casa: Word[];
}

interface WordsData {
  Words: { Category: Category[] }[];
}

@Component({
  selector: 'app-game',
  templateUrl: 'game.page.html',
  styleUrls: ['game.page.scss'],
})

export class Game implements OnInit {
  randomWord: Word;
  wordCategoryMap: Map<Word, string>;
  isMatch: boolean = false;
  comp: boolean = false;
  inputChar: string = '';
  errorImages: string[] = ['./../../assets/hangman/hangMan1-removebg-preview.png', './../../assets/hangman/hangMan2-removebg-preview.png', './../../assets/hangman/hangMan3-removebg-preview.png', './../../assets/hangman/hangMan4-removebg-preview.png', './../../assets/hangman/hangMan5-removebg-preview.png', './../../assets/hangman/hangMan6-removebg-preview.png', './../../assets/hangman/hangMan7-removebg-preview.png', './../../assets/loser-removebg-preview.png'];
  i: number = 0;
  nClicks: number= 0;
  encryptedWordArray: string[] = [];
  foundCharacters: string[] = [];
  winScore: number = 0;
  firstLetter: string = '';
  
  constructor(private alertController: AlertController) { 
    this.randomWord = { word: '', length: 0 };
    this.wordCategoryMap = new Map<Word, string>();
  }

  ngOnInit() {
    this.randomWord = this.getRandomWord();
    this.encryptedWordArray = this.encryptWord();
  }

  reloadPage() {
    window.location.reload();
  }

  getRandomWord(): Word {
    const categories: WordsData = wordsData;
    const allWords: Word[] = [];

    categories.Words.forEach(wordCategory => {
      wordCategory.Category.forEach(category => {
        Object.entries(category).forEach(([categoryName, words]) => {
          words.forEach((word: Word) => {
            allWords.push(word);
            this.wordCategoryMap.set(word, categoryName);
          });
        });
      });
    });

    const randomIndex = Math.floor(Math.random() * allWords.length);
    return allWords[randomIndex];
  }

  encryptWord(): string[] {
    return this.randomWord.word.split('').map(char => (/[a-zA-Z]/.test(char) ? '_' : char));
  }

  compareInput() {
    if (this.inputChar.length > 0) {
      const input = this.inputChar[0].toLowerCase();
      let found = false;

      for (let i = 0; i < this.randomWord.word.length; i++) {
        if (input === this.randomWord.word[i].toLowerCase()) {
          this.encryptedWordArray[i] = this.randomWord.word[i];
          found = true;
        }
      }

      if (found) {
        this.foundCharacters.push(input);
      }

      this.isMatch = found;

      if (!found) {
        this.changeImage();
        this.finishGame();
      }

      console.log(this.randomWord.word);

      this.isWordCompleted();

    } else {
      this.isMatch = false;
    }
    this.inputChar = '';
  }

  changeImage() {
    if(this.i <= 6){
      this.i++;
    }
    else{
    }
  }

  openHints() {
    this.nClicks++;
    var i: number = 1;
    console.log(this.randomWord.word);
    if(this.nClicks == i){
      this.presentAlert1();
    }
    else if(this.nClicks > 1){
      this.presentAlert();
    }

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Categoria',
      message: this.giveCategory(),
      buttons: [
        {
          text: 'Conferma',
          handler: () => {
        }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Primo Carattere',
      message: this.giveFirstLetter(),
      buttons: [
        {
          text: 'Conferma',
          handler: () => {
            this.putFirstLetter(); 
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Hai perso',
      message: 'Hai fatto il massimo numero di errori',
      buttons: [
        {
          text: 'Conferma',
          handler: () => {
            this.reloadPage();
        }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert3() {
    const alert = await this.alertController.create({
      header: 'Hai vinto!',
      message: 'Hai indovinato la parola segreta',
      buttons: [
        {
          text: 'Conferma',
          handler: () => {
            this.reloadPage();
        }
        }
      ]
    });

    await alert.present();
  }


  giveFirstLetter(): string {
    let n: number = 0;
  
    while (n < this.randomWord.word.length) {
      if (this.encryptedWordArray[n] === '_') {
        this.firstLetter = this.randomWord.word.substring(n, n + 1);
        break;
      }
      n++;
    }
  
    return this.firstLetter;
  }
  
  putFirstLetter() {
    for (let i = 0; i < this.randomWord.word.length; i++) {
      if (this.firstLetter.toLowerCase() === this.randomWord.word[i].toLowerCase()) {
        this.encryptedWordArray[i] = this.randomWord.word[i];
        this.winScore++;
      }
    }
  }

  giveCategory(): string {
      return this.wordCategoryMap.get(this.randomWord) || 'Unknown';
  }

  getI() {
    return this.i;
  }

  finishGame() {
    if(this.i === 6){
      this.presentAlert2();
      
    }
  }

  isWordCompleted() {
    for(let i: number = 0; i < this.randomWord.length; i++){
      if(this.inputChar === this.randomWord.word[i]){
        if(this.winScore === 0){
          this.winScore = 1;
        } else {
                  this.winScore++;
        }
      }
    }

    console.log(this.winScore);
    console.log(this.randomWord.length);

    if(this.winScore === this.randomWord.length){
      this.presentAlert3();
    }
  }
}
