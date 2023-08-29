 window.onload= function(){
    let inputFormFrame = document.querySelector('p[id="evaluationOfALBI"]');
    const inputName = ["serumBilirubin","serumAlbumin"]; // serum:静置→遠心分離    plasma:抗凝固→遠心分離：血糖､凝固因子,BNP
    const inputId = ["IdBilirubin","idAlbumin"] ;
    const labelsBefore = ["血清総ビリルビン","血清アルブミン"];
    const defaultValue = ["1.2","3.2"];
    const labelsAfter =["mg/dl","g/dl"]; //

     for(i=0;i < 2; i++){
        let inputElement = document.createElement('input');
        inputElement.name = inputName[i];
        inputElement.form = inputFormFrame;
        inputElement.id = inputId[i]
        inputElement.min = "0";
        inputElement.placeholder = defaultValue[i];
        inputElement.size= "5";
        inputElement.style.marginRight = "10px";
        inputElement.style.marginLeft = "5px";
        inputFormFrame.appendChild(inputElement);
        putBetween(labelsBefore[i],inputElement,labelsAfter[i]);
      }

    let calcButton = document.createElement('input');
    calcButton.type = 'button';
    calcButton.value = 'ALBI計算';
    calcButton.onclick = calcALBI;
    inputFormFrame.appendChild(calcButton);
   
  }

function putBetween(beforeLabel,targetElement,afterlabel){
  let labelBeforeElemnt = document.createElement('label');
  labelBeforeElemnt.htmlFor = targetElement.id; 
  labelBeforeElemnt.textContent = beforeLabel;
  targetElement.before(labelBeforeElemnt);
  let labelAfterElement = document.createElement('label')
  labelAfterElement.htmlFor = targetElement.id ;
  labelAfterElement.textContent = afterlabel ;
  labelAfterElement.style.marginRight = "20px";
  targetElement.after(labelAfterElement);
}

function calcForm1(){
			let age = parseInt(document.form1.age.value);
			let pAST = parseInt(document.form1.AST.value);
			let pALT = parseInt (document.form1.ALT.value);
			let pPlt = parseFloat(document.form1.plt.value); 
			document.form1.fib4.value =  ( (age * pAST)  / (pPlt * Math.sqrt( pALT ) )).toFixed(2); 
		}
function calcForm2(){
const radioNames = ["tBil","alb","ascites","hepaticEncephalopathy","ptTime"] ;
var childScore = 0;
var childClass = "";
var twoYearSurvivalRate = 0;

for( let i = 0; i< radioNames.length; ++i) {
  let query = ` input[name="${radioNames[i]}"]:checked ` ;
  let radioChecked = document.querySelector(query);
  childScore += parseInt(radioChecked.value);
} 
 if ( childScore <= 6 ) { 
	childClass = "A" ; 
	twoYearSurvivalRate = 85;} 
  else if ( childScore>=10) { 
	childClass = "C" ;
	twoYearSurvivalRate = 35;} 
  else {childClass = "B" ;
	twoYearSurvivalRate = 60;
}

let result = `Child Pugh分類は${childClass}で､スコアは${childScore}です｡
   2年生存率は${twoYearSurvivalRate}％です｡`;
let resultOfChild = document.querySelector('p[id="resultOfChild"]');
resultOfChild.textContent = result;
}

function calcALBI(){
  let sBil = getFloatFromName("serumBilirubin");
  let sAlb = getFloatFromName("serumAlbumin");
  
  let valueALBI = (Math.log10(17.1*sBil))*0.66 + (10*sAlb*(-0.085)) ;
  let ALBIFixed = valueALBI.toFixed(2);
  let ALBIClass = "Grade2"
  if(ALBIFixed<=-2.60){ 
    ALBIClass = "Grade1";
  } else if(ALBIFixed<-2.27){
    ALBIClass = "Grade2a";
  } else if(ALBIFixed<-1.39){
    ALBIClass = "Grade2b";
  } else if (ALBIFixed>-1.39) {
    ALBIClass = "Grade3";
  } 
  
  let resultElement = document.querySelector("p[id='resultOfALBI']")
  let resultText = `ALBIスコアは${ALBIFixed}であり､mALBI ${ALBIClass}です｡`;
  resultElement.textContent = resultText ;
}

function getFloatFromName(name){
    let query = ` input[name="${name}"]`
    let Object = document.querySelector(query);
    if (Object == null) { return 0 ;} else { return parseFloat(Object.value);};
}
