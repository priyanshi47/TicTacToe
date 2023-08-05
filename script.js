const gameInfo = document.querySelector("[data-game-info]");
const boxes = document.querySelectorAll(".cell");
const btn = document.querySelector(".btn");


var currentPlayer;
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

function startGame()
{
    currentPlayer = 'X';
    gameGrid = ["","","","","","","","",""];
    boxes.forEach((box, index) =>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "auto";
        boxes[index].classList.remove("win");
    });
    btn.classList.remove("active");
    gameInfo.innerText = `Current Player- ${currentPlayer}`;
}
startGame();

function changePlayer(){
    if(currentPlayer == 'X'){
        currentPlayer = 'O';
    }
    else{
        currentPlayer = 'X';
    }
}
function gameOver()
{
    let answer = "";
    winningPositions.forEach((position) => {
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "" ) && (gameGrid[position[0]] == gameGrid[position[1]] && gameGrid[position[1]] == gameGrid[position[2]] )){
           
            if(gameGrid[position[0]] == 'X'){
                answer= 'X';
            }
            else{
                answer='O';
            }
        
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
            
        }
        
    });

    if(answer !== ""){
        gameInfo.innerText = `Winner - ${answer}`;
        btn.classList.add("active");
        
        boxes.forEach((box) => {
            box.style.pointerEvents = "none";
        });
        return;
    }
    
    let emptyCells = 0;
        boxes.forEach((box) => {
            if(box.innerHTML == ""){
                emptyCells++;
            }
        });

        if(emptyCells == 0){
            btn.classList.add("active");
            gameInfo.innerText = "It's a tie!!";
            return;
        }
    
    }
    
function handleClick(index){
    if(gameGrid[index] === "")
    {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        changePlayer();
        gameInfo.innerText = `Current Player- ${currentPlayer}`;
        boxes[index].style.pointerEvents = "none";
        // boxes[index].classList.add("alreadyMarked");
        gameOver();
    }
    
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});


btn.addEventListener("click", startGame);




