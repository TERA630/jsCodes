const selectName = ["stoolFrequency","bloodyStool","fever","tachycardia","anemia","erythrocyteSedimentationRate","CRP"];
const labelsOfselect = ["便回数","血便","発熱","頻脈","貧血","赤沈","CRP"];
const optionsOfSelect = [
  ["≦4回-0","≦5回-1","6～14回まで-2","≧15回-3"],
  ["無or排便の半数以下で血液付着-0","ほとんどの排便時に顕血便-1","大部分が血液-2"],
  ["なし-0","38＞≧37.5℃,≧38℃の熱は間欠的-2","≧38℃が持続-3"],
  ["＜90bpm-0","≧90bpm-2"],
  ["Hgb>10.0g/dl-0","Hgb≦10.0g/dl-2"],
  ["正常-0","","≧30mm/1hr-2"],
  ["正常-0","≧3.0mg/dL-2"]
] ;  

window.onload= function(){
    let inputFormFrame = document.querySelector('p[id="evaluatonOfSeverity"]');
     for(i=0;i < selectName.length ; i++){　//セレクトボックスの追加
        let selectElement = document.createElement('select');
        selectElement.name = selectName[i];
        inputFormFrame.appendChild(selectElement);

        let label = document.createElement('label');
        label.htmlFor = selectElement ; 
        label.textContent = labelsOfselect[i];
        inputFormFrame.insertBefore(label,selectElement);

        for(j=0;j<optionsOfSelect[i].length;j++){ // 選択肢の追加
          let optionElement = document.createElement(['option']);
          let optionText = optionsOfSelect[i][j].split('-')[0];
          optionElement.text = optionText;
          optionElement.value = optionsOfSelect[i][j].split('-')[1]
          selectElement.appendChild(optionElement);
        }
      }
      
    let calcButton = document.createElement('input');
    calcButton.type = 'button';
    calcButton.value = '重症度計算';
    calcButton.onclick = calcSeverity;
    inputFormFrame.appendChild(calcButton);
  }

  function calcSeverity(){
    
    let resultOfSeverity = '中等症';
    let numberOfPositive = 0;
     
    let stoolFrequencyGrade = getValueFromName('stoolFrequency');
    if(stoolFrequencyGrade>0) {numberOfPositive++} 
    let bloodyStoolGrade = getValueFromName('bloodyStool');
    if(bloodyStoolGrade>0) {numberOfPositive++} 
    let feverGrade = getValueFromName('fever');
    if(feverGrade>0) {numberOfPositive++}
    let hasTachycardia = getValueFromName('tachycardia');  
    if(hasTachycardia>0) {numberOfPositive++}
    let isSystematic = (feverGrade>0) || (hasTachycardia >0);
    let hasAnemia = getValueFromName('anemia');
    if(hasAnemia>0) {numberOfPositive++}

    let severelyInflamed = ( getValueFromName('erythrocyteSedimentationRate') >0 ) || (getValueFromName('CRP')>0);
    if(severelyInflamed) {numberOfPositive++};

    let hasSevereBowelSymptom =  (stoolFrequencyGrade >0) && (bloodyStoolGrade>0) ;
    let hasClinicalSymptom = isSystematic || (stoolFrequencyGrade >0) || (bloodyStoolGrade>0) ;
    let resultFrame = document.querySelector('p[id="resultOfSeverity"]');
    resultFrame.textContent = `重症度は${resultOfSeverity}です`;
  }
 


  function getValueFromName(name){
    let query = ` select[name="${name}"]`
    let Object = document.querySelector(query);
    if (Object == null) { 
      alert (name +"was found null." );
      return 0;
    } else { 
      return parseInt(Object.value);
    }
  }
