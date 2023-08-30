
 const selectName = ['selectAge','selectSpO2','selectOnset','selectSymptom'];
 const labelForSelect = ['年齢','酸素飽和度(SpO2)','臨床状態','発症からの時期','ワクチン接種'];
 const optionOfSelect = [['65歳未満','65歳≦<75歳','75歳以上'],['≧96','93<<96%','<93%'],,['3日以内','5日以内','7日以内'],['呼吸器症状なし','咳のみ､呼吸困難なし','呼吸困難､肺炎所見','酸素投与が必要','ICUor人工呼吸器が必要'],['未接種','接種済み']];
 const checkBoxName = ['malignancy','chronicRespiratoryDisease','DM','chronicLiverDiease','CKD','CVD','HT','Obesity','immuneSuppressed'];
 const labelForCheckBox = ['悪性腫瘍','慢性呼吸器疾患(COPDなど)','糖尿病','慢性肝障害','慢性腎不全','心血管･脳血管疾患','高血圧','肥満','免疫抑制'];

window.onload = function(){
  let calcForm = document.querySelector('p[id="calcForm"]');
  renderSelect(calcForm);
  renderCheckBox(calcForm);
} // 

//
function calcSeverity(){
   let GradeOfSaturation = getIntBySelect('selectSpO2');
   let GradeOfSymptom = getIntBySelect('selectSymptom');
   if(GradeOfSaturation ==0 && GradeOfSymptom == 0)
   { SeverityOfCOVID = '軽症'
   } else if ( GradeOfSaturation == 1 && GradeOfSymptom<=1){
    


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
  } else {
  return queryInput; 
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
}
