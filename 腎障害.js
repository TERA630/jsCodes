

window.onload= function(){
  let calcFrame = document.querySelector('p[id="calcForm"]');
  const inputName = ["inputAge","inputPCr","inputHeight","inputWeight"];
  const inputDefault = ['65','0.8',"170",'70'];
  const labelForInput = ["年齢-歳","血清クレアチニン-mg/dl","身長-cm","体重-kg"];
  const selectName = ["selectorSex","selectorRBC","selectorProtein","selectorAlbuminuria"];
  const labelForSelect= ["性別","血尿","蛋白尿(g/gCr)","アルブミン尿(糖尿病の場合)(mg/gCr)"] ; 
  const optionOfSelect = [ ['男性','女性'],['無','有'],['無し or 0.15未満','0.15～0.49','0.5以上'], ['30未満','30～299','300以上'] ];
  const flags = [['green','yellow1','red'],['green','yellow1','red'],['yellow2','red','red']];


  for(i=0;i < inputName.length; i++){
    let inputElement = document.createElement('input');
    inputElement.name = inputName[i];
    inputElement.inputMode = "numeric";
    inputElement.size = 4;
    inputElement.defaultValue = inputDefault[i];
    inputElement.style.display = 'table-cell';
    calcFrame.appendChild(inputElement);

    let label = document.createElement('label');
    label.htmlFor = inputElement ; 
    label.textContent = labelForInput[i].split("-")[0]; // 区切り文字の前半
    calcFrame.insertBefore(label,inputElement);
    let labelafter = document.createElement('label');
    labelafter.htmlFor = inputElement;
    labelafter.textContent = labelForInput[i].split("-")[1]; // 区切り文字の後半
    calcFrame.insertBefore(labelafter,inputElement.nextSibling);
    calcFrame.insertBefore(document.createElement('br'),null);
  }
 
  for(k=0; k< labelForSelect.length; k++){      
    let selectorElement = document.createElement('select');
    selectorElement.name = selectName[k];
    calcFrame.appendChild(selectorElement);


    let label = document.createElement('label');
    label.htmlFor = selectorElement ; 
    label.textContent = labelForSelect[k];
    calcFrame.insertBefore(label,selectorElement);

      for(l=0;l<optionOfSelect[k].length;l++){
        let OptionText = optionOfSelect[k][l];
        if(OptionText == "") continue;
        else {
         let optionElement = document.createElement(['option']);
         optionElement.text= OptionText;
         optionElement.value = l; 
         selectorElement.appendChild(optionElement);
       } 
      }
      selectorElement.addEventListener("change",onOptionSelected);
    }


  calcFrame.insertBefore(document.createElement('br'),null);
  let calcButton = document.createElement('input');
  calcButton.type = 'button';
  calcButton.value = 'eGFR計算';
  calcButton.onclick = calcSeverity;
  calcFrame.appendChild(calcButton);
}

function calcSeverity(){
  let age = getIntByName("inputAge");
  let cre = getFloatByName("inputPCr");
  let height = getIntByName("inputHeight");
  let weight = getIntByName("inputWeight");

  uProtein = greaterOf(getIntFromSelectByName("selectorAlbuminuria"),getIntFromSelectByName("selectorProtein") );

  let CCRCockcroft = (140-age)*weight /( 72*cre);

  if(isFemale) {
    eGFRCreat = 194*Math.pow(cre,-1.094)*Math.pow(age,-0.287) *0.739;
  } else {
    eGFRCreat = 194*Math.pow(cre,-1.094)*Math.pow(age,-0.287)
  } 

  let BSA = Math.pow(weight,0.425)*Math.pow(height,0.725)*0.007184;
  let eGFR = eGFRCreat * BSA/1.73;

  // CKD G4,G5は一括して区分

  if(eGFRCreat>90) {
    GFRScore = 0;
    evalCKD = "正常(G1)"}
  else if(eGFRCreat<15) {
    GFRScore =4;
    evalCKD = "末期腎不全(G5)";
  }
  else if(eGFRCreat<30) {
    GFRScore = 4; 
    evalCKD = "高度低下(G4)";
  } else if(eGFRCreat<45) {
    GFRScore = 3;
    evalCKD = "中等度～高度低下(G3b)";
  } else if(eGFRCreat<60)  {
    GFRScore = 2;
    evalCKD = "軽度～中等度低下(G3a)";
  } else {
    GFRScore = 1;
    evalCKD = "腎機能は正常または軽度低下(G2)";};

  stateProteinUrea = "蛋白尿区分はA" + (uProtein+1);

  let queryOfResult = document.querySelector('p[id="resultForm"]');

  queryOfResult.textContent = `Crは${CCRCockcroft.toFixed(1)}です。eGFRは${eGFRCreat.toFixed(1)}でした｡ 腎機能は${evalCKD}で${stateProteinUrea}です`;

}

function greaterOf(A1,A2){
  alert(`A1は${A1}でA2は${A2}です`);
  if(A1<A2) {
         return A2;} 
  else {
    return A1 ;}
}
function getIntByName(name){
  let query = ` input[name="${name}"]`
  let Object = document.querySelector(query);

  if (Object == null) { return 0 ;} else { result =  parseInt(Object.value);};
  return result;
}
function getIntFromSelectByName(name){
  let query = ` select[name="${name}"]`
  let Object = document.querySelector(query);
  if (Object == null || Object.value == NaN) { return 0 ;} else { result =  parseInt(Object.value);};
  return result;
}

function getFloatByName(name){
  let query = ` input[name="${name}"]`
  let Object = document.querySelector(query);
  if (Object == null) { return 0 ;} else { return parseFloat(Object.value);};
}

function hasHematuria(){
  let selectorRBCObj =  document.querySelector('select[name="selectorRBC"]');
  if (selectorRBCObj.value == 1) { return true
  } else {
    return false
  }
}
function isFemale(){
  let selector=  document.querySelector('select[name="selectorSex"]');
  if (selector.value == 1) { return true
  } else {
    return false
  }

}

function onOptionSelected(event){ // Selector選択時の処理
  const element = event.target;
  switch(element.name){
   case "selectorProtein":
    let selectAlb = document.querySelector('select[name="selectorAlbuminuria"]');
    selectAlb.selectedIndex = -1;
    break;
   case "selectorAlbuminuria":
    let selectProtein = document.querySelector('select[name="selectorProtein"]');
    selectProtein.selectedIndex = -1;
    break;
    default:
  }
}