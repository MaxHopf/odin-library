# My Odin Library

## Background
This project is an assignment from [The Odin Project](https://www.theodinproject.com/lessons/node-path-javascript-library) to develop a small library application. Its purpose is purely educational.

## Objectives
* all books are stored in an array
* display all books of the array in a UI
* add button that brings up a form where user can input **title**, **author**, **page number** and a **read status**
* add button to each book entry to remove the book from the library 
* add button to each book entry to change its read status

## Approach
First I have designed a mockup in Figma.
![Mockup of "My Library" app dashboard](<readme-content/Screenshot from 2024-08-24 10-31-20.png>)
![Mockup of "Add new Book" buttons modal](<readme-content/Screenshot from 2024-08-24 10-31-40.png>)
Then I converted the design into code using HTML and CSS, and afterward, I developed the logic in JavaScript.

## Lessons learned
* existence of text alignment issue on chrome browser when using specific fonts e.g. "Nimbus Sans"
* the concept of **closures** and **scopes**
* how to create object **constructor functions**, understand the concept of **prototypal inheritance** and how to utilize the prototype for adding methods to the constructed objects prototype
* how to refactor object constructors into **factory functions** and utilize closures to create methods that retain access to certain variables and object properties even after the 'main' function has returned
* how to create a **module** with immediately invoked function expression **(IIFE)** 
