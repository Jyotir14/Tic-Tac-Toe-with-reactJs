import React, {useState} from "react:;
import ReactDOM from "react-dom";
const rowstyle={
  display:"flex"
};

const sqaureStyle = {
  width:"60px",
  height:"60px",
  backgroundColor:"#ddd",
  margin:"4px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  fontSize:"30px",
  color:"black"
};
const boardStyle={
backgroundColor:"#eee",
width:"208px",
alignItems:"center",
justifyContent:"center",
display:"flex",
flexDirection:"column",
border:"3px #eee solid"
};
const containerStyle={
display:"flex",
alignItems:"center",
flexDirection:"column"
};
const instructionStyle={
marginTop:"5px",
marginBottom:"5px",
fontWeight:"bold",
fontSize:"16px"
};
const buttonStyle={
marginTop:"15px",
marginBottom:"16px",
width:"80px",
height:"40px",
backgroundColor:"#8acaca",
color:"white",
fontSize:"16px"
};

class Square extends React.Component{
 handleClick(index){}

render(){
return(
<div classname="square" style={squareStyle} onClick={this.props.onClick}>
{this.props.value}
</div>
);
}
}

class Board extends React.Component{
 renderSquare(i){
return(
<Square
value={this.props.squares[i]}
onClick={()=>this.props.onClick(i)}
/>
);
}

render(){
 return(
<div style = {containerStyle} className="gameBoard">
<div className="status" style={instructionStyle}>
Next player:{this.props.status}
</div>
<div className="winner" style={instructionStyle}>
Winner:{this.props.winner}
</div>
<button style={buttonStyle} onClick={this.props.resetClick}>
Reset
</button>
<div style={boardStyle}>
<div className="board-row" style={rowStyle}>
{this.renderSquare(O)}
{this.renderSquare(1)}
{this.renderSquare(2)}
</div>
<div className="board-row" style={rowStyle}>
{this.renderSqaure(3)}
{this.renderSquare(4)}
{this.renderSquare(5)}
</div>
<div className="board-row" style={rowStyle}>
{this.renderSquare(6)}
{this.renderSquare(7)}
{this.renderSquare(8)}
</div>
</div>
</div>
);
}
}

class Game extends React.Component{
constructor(props){
super(props);
this.state={
history: [
{
squares: Array(9).fill((null)
}
],
stepNumber:0,
xIsNext:true
};
}

handleClick(i){
const history=this.state.history.slice(0, this.state.stepNumber+1);
const current = history[history.length-1];
const squares = current.squares.slice();
if(this.calculateWinner(squares) || squares[i]){
return;
}
squares[i]=this.state.xIsNext ? "X":"O";
this.setState({
history:history.concat([
{
squares: squares
}
]),
stepNumber:history.length,
xIsNext:!this.state.xIsNext
});
}

jumpTo(step){
this.setState({
stepNumber:step,
xIsNext:step%2==0
}):
}

calculateWinner(squares){
const lines=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];
for {let i=0;i<lines.length;i++){
const[a,b,c]=lines[i];
if(
squares[a] &&
squares[a]===squares[b] &&
squares[a]===squares[c]
)}
return squares[a];
}
}
return null;
}
render(){
const history=this.state.history;
const current=history[this.state.stepNumber];
const winner=this.calculateWinner(current.squares);

let status=this.state.xIsNext ? "X" : "O";
if(winner){
status="None";
}
return(
<div className="game">
<div className="game-board">
<Board
squares={current.squares}
onClick={(i)=>this.handleClick(i)}
status={status}
winner={winner}
resetClick={()=>this.jumpTo(0)}
/>
</div>
</div>
);
}
}
ReactDOM.render(<Game/>,document.getElementById("root")):
