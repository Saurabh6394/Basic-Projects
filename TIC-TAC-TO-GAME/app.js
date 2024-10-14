const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create fun to initialize game

function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    //UI PE EMPTY BHI KARNA HOGA //
    boxes.forEach((box,index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // green color ko bhi remove krna hai ,initialize boxes with css property//
        box.classList = `box box${index+1}`

    }) 
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();


function swapTurn(){
    if(currentPlayer==="X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X"
    }
    gameInfo.innerText = `Current Player ${currentPlayer}`;
}

function checkGameOver() {
  let answer = "";
  winningPositions.forEach((position) =>{
    if(
        (gameGrid[position[0]] !== "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="")
      && (gameGrid[position[0]] === gameGrid[position[1]] ) && (gameGrid[position[1]] === gameGrid[position[2]] )) {
         
        //check if winner x //

        if(gameGrid[position[0]] === "X"){
            answer = "X";
        } else{
            answer = "Y";
        }

        //disable pointer

        boxes.forEach((box)=>{
            box.style.pointerEvents= "none";
        }
) 
        //now we know X or O is winner 
        boxes[position[0]].classList.add("win")
        boxes[position[1]].classList.add("win")
        boxes[position[2]].classList.add("win")
      }
 });

  //
  if(answer !== ""){
    gameInfo.innerText = `Winner player ${answer}` ;
    newGameBtn. classList.add("active");
    return;
  }

  //when there is  tied //

  let fillCount = 0;
  gameGrid.forEach((box) =>{
    if(box !== ""){
        fillCount++
    }
  });

  // board bhara hai to 9 fiilcount hoga
   if(fillCount ==9){
    gameInfo.innerText = "Game Tied!"
    newGameBtn.classList.add("active");
   }

}

newGameBtn.addEventListener("click",initGame);

function handleClick(index) {
    if(gameGrid[index] === "")  {
       boxes[index].innerText = currentPlayer;
       gameGrid[index] = currentPlayer;
       boxes[index].style.pointerEvents = "none"
       // swap turn//
       swapTurn();
       //check koi jeet to nhi gya //
       checkGameOver();
   
    }

    if(answer!= ""){
        boxes[position[0]].classList.remove("win")
        boxes[position[1]].classList.remove("win")
        boxes[position[2]].classList.remove("win")
    }
}

boxes.forEach((box, index) =>{
    box.addEventListener("click",() =>{
        handleClick(index);
    })
});

