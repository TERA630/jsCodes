const inputNames = ['ヘモグロビン-inputHemoglobin-11.8-g/dl','赤血球数-inputRBC-400-万/mm3','ヘマトクリット-inputHaematocrit-40-%','網状球-inputReticlocyte-4-%',
'血清鉄-inputSerumIron-100-μg/dl', 'TIBC-inputTIBC-260-μg/dL','フェリチン-inputFerritin-100-ng/ml','エリスロポエチン-inputErthropoietin--mIU/ml'];

// 網状球 実施料12点 判断量 血液学的検査(125点)
// 鉄 実施料11点 判断料 生化学検査I 144点(5~7項目 93点 8~9項目99点 10項目以上106点にまとめ) UIBC
// エリスロポエチン 注釈 赤血球増加症の鑑別、重度の慢性腎不全あるいはEpoやESA製剤投与中の透析患者の腎性貧血の診断  骨髄異形成症候群の治療方針の決定
// TIBC  通常はトランスフェリンの1/3は鉄と結合(＝血清鉄)  通常は2/3が鉄が結合可能な部分 

window.onload= function(){
  const labwrapper = document.querySelector('div[name="labResult"]');
  if(labwrapper == null) alert ('labwrapper was not found.'); else renderinput(labwrapper,inputNames);
 
}
function calcForm(){
  const outputForm = document.querySelector('div[name="textRecommend"]');
 

  let RBCCount = getIntByName('inputRBC');
 // let hemoglobin = getFloatByName('inputHemoglobin');
  let hematocrit = getIntByName('inputHaematocrit');
  let reticlocyte = getIntByName('inputReticlocyte');
  let resultText = '';

  if( isIlegalNumber(hematocrit) || isIlegalNumber(RBCCount)) { resultText='赤血球数、ヘマトクリットの正しい値を入力ください。\r\n' } 
  else {
    let meanCorpuscularVolume = ((hematocrit / RBCCount) * 1000).toFixed(1);
    if(meanCorpuscularVolume <= 80) {resultText = `MCV${meanCorpuscularVolume}の小球性貧血です。`}
    else if (meanCorpuscularVolume<=100){resultText = '正球性貧血です。'}
    else if(meanCorpuscularVolume>120){resultText = `MCV${meanCorpuscularVolume}と著明高値であり､巨赤芽球性貧血の可能性があります｡`}
  }

  let serumIron =  getIntByName('inputSerumIron');
  let serumTIBC = getIntByName('inputTIBC');
  let saturatonOfIron = (serumIron/serumTIBC * 100).toFixed(1);
  if(saturatonOfIron != null && saturatonOfIron != 0){
    resultText += `鉄飽和率は${saturatonOfIron}%でした。` 
  }
  calcRPI(hematocrit,reticlocyte);
  outputForm.textContent = resultText
}
function calcRPI(_hematocrit,_reticlocyte){
   


  
}

function isIlegalNumber(_variable){
  if(_variable == null) return true
  if(Number.isNaN(_variable)) return true
  if(_variable == 0) return true
  return false
}

function getIntByName(name_input){
  let query = ` input[name="${name_input}"]`
  let Object = document.querySelector(query);

  if (Object == null) {
    alert (name_input + 'was not found'); 
    return 0
  } else { 
    return parseInt(Object.value)
  }
}
function getFloatByName(name_input){
  let query = ` input[name="${name_input}"]`
  let Object = document.querySelector(query);
  if (Object == null) {
    alert (name_input + 'was not found'); 
    return 0
  } else { 
    return parseFloat(Object.value)
  }


}



function renderinput(parent_element,label_and_name_array){ // checkBoxName,labelForCheckBox


    for(let i=0; i< label_and_name_array.length; i++){
 //     let rowCell = document.createElement('div');
 //     parent_element.appendChild(rowCell);
      
      let rowContents = label_and_name_array[i].split('-');
      let labelBefore = document.createElement('label');
 
      labelBefore.textContent = rowContents[0] 
      parent_element.appendChild(labelBefore);

      let inputElement = document.createElement('input');
      labelBefore.htmlFor = inputElement;
 
      inputElement.type = 'number';
      inputElement.name = rowContents[1];
      inputElement.min = '0';
      inputElement.value = rowContents[2];
      parent_element.appendChild(inputElement);

      let labelafter = document.createElement('label');
      labelafter.textContent = rowContents[3];
      labelafter.htmlFor = inputElement;
      parent_element.appendChild(labelafter);
    }
}
