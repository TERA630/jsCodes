
const inputName = ["inputAge","inputPCr","inputHeight","inputWeight"];
const inputDefault = ['65','0.8',"170",'70'];
const labelForInput = ["年齢-歳","血清クレアチニン-mg/dl","身長-cm","体重-kg"];
const selectName = ["selectSex","selectRBC","selectProteinurea","selectAlbuminuria"];
const labelForSelect= ["性別","血尿","蛋白尿(g/gCr)","アルブミン尿(mg/gCr)"] ; 
const optionOfSelect = [ ['男性','女性'],['無','有'],['無し or 0.15未満','0.15～0.49','0.5以上'], ['30未満','30～299','300以上'] ];

const evaluation = [['G1-green-140/90-caBOrThiazideOrRASi-follow','G1-yellow1-130/80-RASifirst-consult_if_blood','G1-orange-130/80-RASifirst-consult'], // CKDG1
['G2-green-140/90-caBOrThiazideOrRASi-follow','G2-yellow1-130/80-RASifirst-consult_if_blood','G2-orange-130/80-RASifirst-consult'], // CKDG2
['G3a-yellow2-140/90-caBOrThiazideOrRASi-consult_if_young','G3a-orange-130/80-RASifirst-consult','G3a-red-130/80-RASifirst-consult'], // CKDG3a
['G3b-orange-140/90-caBOrThiazideOrRASi-consult','G3b-red-130/80-RASifirst-consult','G3b-red-130/80-RASifirst-consult'], // CKDG3b
['G4-red-140/90-caBOrLoopOrRASi-consult','G4-red-130/80-RASifirstwithCaution-consult','G4-red-130/80-RASifirstwithCaution-consult'], // CKD4 
['G5-red-140/90-caBOrLoopOrRASi-consult','G5-red-130/80-RASifirstwithCaution-consult','G5-red-130/80-RASifirstwithCaution-consult'], // CKD5
]
//

window.onload= function(){
const calcForm = document.querySelector('p[id="calcForm"]');
let hasDMCheckbox = getObjectOrAlert("inputHasDM");
if(hasDMCheckbox != null) {  hasDMCheckbox.addEventListener("change",onCheckBoxChanged)}

for(i=0;i < inputName.length; i++){
  let inputElement = document.createElement('input');
  inputElement.name = inputName[i];
  inputElement.inputMode = "numeric";
  inputElement.size = 4;
  inputElement.defaultValue = inputDefault[i];
  calcForm.appendChild(inputElement);

  let label = document.createElement('label');
  label.htmlFor = inputElement; 
  label.textContent = labelForInput[i].split("-")[0]; // 区切り文字の前半
  label.style.marginRight = '3em';
  calcForm.insertBefore(label,inputElement);
  let labelafter = document.createElement('label');
  labelafter.htmlFor = inputElement;
  labelafter.textContent = labelForInput[i].split("-")[1]; // 区切り文字の後半
  calcForm.insertBefore(labelafter,inputElement.nextSibling);
  calcForm.insertBefore(document.createElement('br'),null);
}

for(k=0; k< labelForSelect.length; k++){      
  let selectElement = document.createElement('select');
  selectElement.name = selectName[k];
  calcForm.appendChild(selectElement);

  let label = document.createElement('label');
  label.htmlFor = selectElement ; 
  label.textContent = labelForSelect[k];
  calcForm.insertBefore(label,selectElement);

    for(l=0;l<optionOfSelect[k].length;l++){
       let optionElement = document.createElement(['option']);
      optionElement.text= optionOfSelect[k][l];
       optionElement.value = l; 
      selectElement.appendChild(optionElement);
    }
  }
if(hasDM()) {showAlbuminurea() } else {showProteinurea()}

calcForm.insertBefore(document.createElement('br'),null);
let calcButton = document.createElement('input');
calcButton.type = 'button';
calcButton.value = 'eGFR計算';
calcButton.onclick = calcGFRAndSeverity;
calcForm.appendChild(calcButton);

let GFRtoGradeElement  = getObjectOrAlert('buttonGFRtoGrade')
GFRtoGradeElement.onclick = getGFRAndShowSeverity;

}



function calcGFRAndSeverity(){

let age = getIntByName("inputAge");
let cre = getFloatByName("inputPCr");
let height = getIntByName("inputHeight");
let eGFRCreat = 150;

if(isFemale()) {
  eGFRCreat = 194*Math.pow(cre,-1.094)*Math.pow(age,-0.287) *0.739;
} else {
  eGFRCreat = 194*Math.pow(cre,-1.094)*Math.pow(age,-0.287)
}
  GFRtoSeverity(eGFRCreat);
}

function getGFRAndShowSeverity(){
  GFRtoSeverity(getIntByName('eGFR'));
}

function GFRtoSeverity(eGFRCreat) { // eGFRCreat 0-150のFloatかInt　
// CKD G4,G5は一括して区分
if(eGFRCreat>90) {
  GFRScore = 0;
} else if(eGFRCreat<15) {
  GFRScore =5;
} else if(eGFRCreat<30) {
  GFRScore = 4; 
} else if(eGFRCreat<45) {
  GFRScore = 3;
} else if(eGFRCreat<60)  {
  GFRScore = 2;
} else {
  GFRScore = 1;};
  

let age = getIntByName("inputAge");
let cre = getFloatByName("inputPCr");
const weight = getIntByName("inputWeight"); 
const uProtein = greaterOf(getIntBySelect("selectProteinurea") ,getIntBySelect("selectAlbuminuria"));
let CCRCockcroft = (140-age)*weight /( 72*cre);

const stateProteinUrea = "A" + (uProtein+1);
const evaluationState = evaluation[GFRScore][uProtein].split('-');

const queryOfResult = document.querySelector('p[id="resultForm"]');
const paragraphOfGrade = document.querySelector('p[name="paragraphOfGrade"]');
const inputGFR = document.querySelector('input[name = "eGFR"]');

let recommendedAntihypertensive = '推奨未';
switch (evaluationState[3]){
  case 'caBOrThiazideOrRASi':
    recommendedAntihypertensive = '通常はCa拮抗薬、体液貯留があればサイアザイド系利尿薬、もしくはRA阻害剤(ACE阻害剤orARB)のいずれかが推奨されます。';
    break;
  case 'caBOrLoopOrRASi':
    recommendedAntihypertensive = '通常はCa拮抗薬、体液貯留があればループ利尿薬、もしくはRA阻害剤(ACE阻害剤orARB)を少量慎重投与のいずれかが推奨されます。';
    break;
  case 'RASifirst':
    recommendedAntihypertensive = 'ACE阻害薬もしくはARBが第一選択です。第二選択はCa拮抗薬です';
    break;
  case 'RASifirstwithCaution' :
    recommendedAntihypertensive = '少量でのACE阻害薬もしくはARBから開始､腎障害やカリウム値に留意ください。'; 
    break;
  default:
    recommendedAntihypertensive = '高血圧ガイドライン参照してください';
}

paragraphOfGrade.textContent  = `Cr(Cockcroft)は${CCRCockcroft.toFixed(1)}です。 腎機能は${evaluationState[0]}${stateProteinUrea}です｡
降圧目標は${evaluationState[2]}であり、降圧薬としては${recommendedAntihypertensive}`;
inputGFR.value = eGFRCreat.toFixed(1);
}

function greaterOf(A1,A2){
if(A1>=A2) { return A1;}  else { return A2 ;}
}


function getObjectOrAlert(name_of_element){ // InputかSelectかオブジェクトがなければAlertする｡
let queryInput = document.querySelector(` input[name="${name_of_element}"]`)
let querySelect = document.querySelector(`select[name="${name_of_element}"]`)

if(querySelect == null && queryInput == null) {   
  alert(`${name_of_element} のINPUT要素､SELECT要素のいずれも認めませんでした`);
  return null } 
  else if(queryInput != null){
    return queryInput
  } else {
    return querySelect
  } 
}

function getIntByName(nameOfElementObject){ // return non null 
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

function hasDM(){
let  hasDM =  getObjectOrAlert('inputHasDM');
return hasDM?.checked ?? false;
}

function hasHematuria(){
let valueOfHematouria = getIntBySelect('selectRBC');
return  (valueOfHematouria ==1);
}
function isFemale(){
let valueOfSex = getIntBySelect('selectSex');
return ( valueOfSex == 1 );
}

function onCheckBoxChanged(event){
const element = event.target;
if(element.checked) {showAlbuminurea() } else {showProteinurea()}
}

function showAlbuminurea(){ // アルブミン尿の選択肢を表示して､蛋白尿は消す｡
 const albuminUrea = getObjectOrAlert('selectAlbuminuria');
 const proteinUrea = getObjectOrAlert('selectProteinurea');

 const albuminUreaLabel = albuminUrea.previousElementSibling;
 const proteinUreaLabel = proteinUrea.previousElementSibling;

 albuminUrea.style.visibility = 'visible';
 albuminUreaLabel.style.visibility = 'visible';
 proteinUrea.style.visibility = 'hidden';
 proteinUreaLabel.style.visibility = 'hidden';
}
function showProteinurea() { // アルブミン尿の選択肢を消して､蛋白尿を出す｡
const albuminUrea = getObjectOrAlert('selectAlbuminuria');
const proteinUrea = getObjectOrAlert('selectProteinurea');

const albuminUreaLabel = albuminUrea.previousElementSibling;
const proteinUreaLabel = proteinUrea.previousElementSibling;

albuminUrea.style.visibility = 'hidden';
albuminUreaLabel.style.visibility = 'hidden';
proteinUrea.style.visibility = 'visible';
proteinUreaLabel.style.visibility = 'visible';
}
