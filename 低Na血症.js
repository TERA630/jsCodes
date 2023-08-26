
const inputName = ["inputInfusionNa","inputInfusionK","inputPlasmaNa","inputWeight","inputUrineNa","inputUrineK"];
const inputDefault = ['153','0',"110",'55','18','20'];
const labelForInput = ["輸液Na-mEq/l","輸液K-mEq/l","血清Na-mEq/l","体重-kg","尿中Na-mEq/l","尿中K-mEq/l"];
const selectName = ["selectSex","selectVolume"];
const labelForSelect= ["性別","細胞外液量"] ; 
const optionOfSelect = [ ['男性','女性'],['細胞外液量減少','細胞外液量正常','細胞外液量増加']];

window.onload= function(){
const calcForm = document.querySelector('p[id="calcForm"]');
renderInputElements(calcForm);
renderSelectElements(calcForm);

calcForm.insertBefore(document.createElement('br'),null);
let calcButton = document.createElement('input');
calcButton.type = 'button';
calcButton.value = '予想△Na';
calcButton.onclick = calcSeverity;
calcForm.appendChild(calcButton);
}


function calcSeverity(){

  let infusionNa = getIntByName("inputInfusionNa");
  let infusionK = getFloatByName("inputInfusionK");
  let plasmaNa = getIntByName("inputPlasmaNa");
  let weight = getIntByName("inputWeight");
  let urineNa = getFloatByName("inputUrineNa");
  let urineK = getFloatByName("inputUrineK");
  
  let elevationNa = (((infusionNa + infusionK) - plasmaNa)/(0.6*weight + 1) );
  
  const queryElevateNa = getObjectOrAlert('inputElevatedNa') ; 
  queryElevateNa.value = elevationNa.toFixed(2);
  }
  
  function makeComment(){
    let commentofData = '';
  
    let infusionNa = getIntByName("inputInfusionNa");  
    let infusionK = getFloatByName("inputInfusionK");
    let plasmaNa = getIntByName("inputPlasmaNa");
    let weight = getIntByName("inputWeight");
    let urineNa = getFloatByName("inputUrineNa");
    let urineK = getFloatByName("inputUrineK");
    let evaluatedVolume = getIntByName('selectVolume');


    if(plasmaNa<125) {
      commentofData = '重症低Na血症です｡'
    } else if(plasmaNa<130){
      commentofData = '中等症の低Na血症です｡'
    } else if(plasmaNa<135){
      commentofData = '軽度の低Na血症です｡'
    }

    if(urineNa<30) {
      commentofData += '有効循環血漿量の低下が示唆されます｡'
      if(evaluatedVolume==0) {
        commentofData += '塩分の腎外喪失(嘔吐､下痢)あるいは利尿剤使用による細胞外液喪失の可能性があります｡'
      } else {
        commentofData += '心不全､肝硬変､ネフローゼ症候群の可能性があります｡'
      }
    } else {
      if(evaluatedVolume==0){
        commentofData += '嘔吐による細胞外液喪失の他､原発性副腎不全､低頻度ですが中枢性塩類喪失の可能性があります'
      } else if(evaluatedVolume == 1){
        commentofData += 'SIADH,二次性副腎不全,甲状腺機能低下の可能性はあります'
      } 
    }   
    let commentObj =  document.querySelector('p[id="quickResponse"]');
    if(commentObj !=null ) {commentObj.textContent = commentofData}
  
  }
function renderInputElements(parentForm){ // parentForm:親要素
 for(i=0 ;i < inputName.length; i++){
    let inputElement = document.createElement('input');
    inputElement.name = inputName[i];
    inputElement.inputMode = "numeric";
    inputElement.size = 4;
    inputElement.defaultValue = inputDefault[i];
    inputElement.onchange = makeComment;
    parentForm.appendChild(inputElement);
      
    let label = document.createElement('label');
    label.htmlFor = inputElement; 
    label.textContent = labelForInput[i].split("-")[0]; // 区切り文字の前半
    label.style.marginRight = '3em';
    parentForm.insertBefore(label,inputElement);
    
    let labelafter = document.createElement('label');
    labelafter.htmlFor = inputElement;
    labelafter.textContent = labelForInput[i].split("-")[1]; // 区切り文字の後半
    parentForm.insertBefore(labelafter,inputElement.nextSibling);
    parentForm.insertBefore(document.createElement('br'),null);
 }
}
function renderSelectElements(parentForm){ // parentForm:親要素
 for(k=0; k< labelForSelect.length; k++){      
  let selectElement = document.createElement('select');
  selectElement.name = selectName[k];
  parentForm.appendChild(selectElement);

  let label = document.createElement('label');
  label.htmlFor = selectElement ; 
  label.textContent = labelForSelect[k];
  parentForm.insertBefore(label,selectElement);
  for(l=0;l<optionOfSelect[k].length;l++){
   let optionElement = document.createElement(['option']);
   optionElement.text= optionOfSelect[k][l];
   optionElement.value = l; 
   selectElement.appendChild(optionElement);
  }
 }
}


function getObjectOrAlert(name_of_element){ // InputかSelectかオブジェクトがなければAlertする｡
let queryInput = document.querySelector(` input[name="${name_of_element}"]`)
if(queryInput==null){  // Inputでオブジェクトが見つからなかった場合
  let querySelect = document.querySelector(`select[name="${name_of_element}"]`)
  if(querySelect == null ) {   
    alert(`${name_of_element} was not found. Modify html.`);
    return null 
  } else {
      return querySelect;
    }
  }else {
    return queryInput; // 
  } 
}

function getIntByName(nameOfElementObject){
let valueInt =   getObjectOrAlert(nameOfElementObject)?.value ?? 0;
return parseInt(valueInt);
}
function getIntBySelect(nameOfElementObject){ // return : 　nameOfElementObject.options[nameOfElementObject.selectedIndex].value か0
let selectObject =  getObjectOrAlert(nameOfElementObject) // selectObject nullable 
let indexOfElement = selectObject?.selectedIndex ?? -1
if(indexOfElement == -1 ) {
  return 0
} else {
  return parseInt(selectObject.options[indexOfElement].value);
}
}

function getFloatByName(nameOfElementObject){ // return : nameOfElementObject.value(小数点をふくむであろうInput)  or 0;
let valueFloat =   getObjectOrAlert(nameOfElementObject)?.value ?? 0;
return parseFloat(valueFloat);
}
 