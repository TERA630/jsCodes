
 const selectName = ['selectAge','selectSpO2','selectOnset','selectSymptom','selectVaccination'];
 const labelForSelect = ['年齢','酸素飽和度(SpO2)','発症からの時期','臨床状態','ワクチン接種'];
 const optionOfSelect = [['65歳未満','65歳≦<75歳','75歳以上'],['≧96','93<<96%','<93%'],['3日以内','5日以内','7日以内'],['呼吸器症状なし','咳のみ､呼吸困難なし','呼吸困難､肺炎所見','酸素投与が必要','ICUor人工呼吸器が必要'],['未接種','接種済み']];
 const checkBoxName = ['malignancy','chronicRespiratoryDisease','DM','chronicLiverDiease','CKD','CVD','HT','Obesity','immuneSuppressed'];
 const labelForCheckBox = ['悪性腫瘍','慢性呼吸器疾患(COPD)-2.51','糖尿病-1.74','慢性肝障害','慢性腎不全','心血管･脳血管疾患-1.48','高血圧-1.33','肥満-1.75','免疫抑制'];
// 男性2.09 入院でCKD,CVD,DL,COPD,HTN,DM,CVD,LC,Malignancyのいずれからあれば15%死亡

window.onload = function(){
  let calcForm = document.querySelector('p[id="calcForm"]');
  renderSelect(calcForm);
  renderCheckBox(calcForm);
  renderCheckBoxGroup(calcForm,'抗不整脈薬/anti-arrhythmic',['アミオダロン','ペプリジル','フレカイニド ','プロバフェノン ','キニジン']);
} 

function calcSeverity(){
   let GradeOfSaturation = getIntBySelect('selectSpO2');
   let GradeOfSymptom = getIntBySelect('selectSymptom');
   let SeverityOfCOVID = '';

   if(GradeOfSaturation ==0 && GradeOfSymptom <= 1){
     SeverityOfCOVID = '軽症'
   } else if ( GradeOfSaturation == 1 || GradeOfSymptom<=2 ){
     SeverityOfCOVID = '中等症Ⅰ'
   } else if (GradeOfSaturation == 2  || GradeOfSymptom<= 3){
     SeverityOfCOVID = '中等症Ⅱ'
   } else if (GradeOfSymptom >= 4){
     SeverityOfCOVID = '重症'
   }
   let result =  document.querySelector('p[id="resultForm"]')
   result.textContent = SeverityOfCOVID;

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
  } else {
  return queryInput; 
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


function renderSelect(parentForm){ // selectName, labelForSelect,optionOfSelect

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
  parentForm.insertBefore(document.createElement('br'),null);
 }
}

function renderCheckBox(parentForm){ // checkBoxName,labelForCheckBox
 for(i=0; i< labelForCheckBox.length; i++){
    let checkBoxElement = document.createElement('input');
    checkBoxElement.name = checkBoxName[i];
    checkBoxElement.type = 'checkbox';
    parentForm.appendChild(checkBoxElement);
    let label = document.createElement('label');
    label.htmlFor = checkBoxElement;
    label.textContent = labelForCheckBox[i];
    parentForm.insertBefore(label,null);
}
}
function renderCheckBoxGroup(element_of_parent,name_Of_Group,nameOfElements){

    const roundedBoxFrame = document.createElement('div');
    roundedBoxFrame.className = 'roundedBox';
    element_of_parent.appendChild(roundedBoxFrame);

    const titleOfBox = document.createElement('span');
    titleOfBox.classList.add('roundedBoxTitle');
    titleOfBox.textContent = name_Of_Group.split('/')[0];
    roundedBoxFrame.appendChild(titleOfBox);

    const contentsOfbox = document.createElement('p');
    roundedBoxFrame.appendChild(contentsOfbox);

    for(i=0; i< nameOfElements.length; i++){
      let checkBoxElement = document.createElement('input');
      checkBoxElement.name = `${name_Of_Group.split('/')[1]}-child${i}`;
      checkBoxElement.type = 'checkbox';
      contentsOfbox.appendChild(checkBoxElement);
      let label = document.createElement('label');
      label.htmlFor = checkBoxElement;
      label.textContent = nameOfElements[i];
      contentsOfbox.insertBefore(label,null);
  }
}