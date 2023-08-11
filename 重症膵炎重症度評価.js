

window.onload= function(){
    let outMostFrame = document.querySelector('p[id="evaluatonOfSeverity"]');
    const inputName = ["inputWBC","inputPlt","inputCRP","inputBUN","inputLDH","inputPCa","inputBE","inputPAO2"];
    const inputDefalutValue = ['8800','20',"4.5",'18','260','8.8','0','90'];
    const inputLabels = ["WBC-/mm3","血小板数-/万","CRP-mg/dl","BUN-mg/dl","LDH-U/l","Ca-mg/dl","BaseExcess-mEq/L","PaO2-mmHg"];
    const selectorName = ["selectorEffusion","selectorIch"];
    const selectorLabels= ["膵外進展","膵の造影不良域"] ; 
    const checkBoxName = ['isShock','isElder','isIntubated','isRenalDamaged'];
    const checkBoxLabels = ['ショック状態','年齢70歳以上','人工呼吸器装着','乏尿(輸液後1日尿量≦400ml)かCre≧2mg/dl'];
    const optionOfSelectors = [  ['前腎傍腔','結腸間膜根部','腎下極以遠'],  ['膵1/3未満','膵1/3から1/2','膵の1/2以上']] ;


    let checkBoxFrame = document.createElement('div');
    checkBoxFrame.style.display = "row";
    checkBoxFrame.style.backgroundColor = '#FFFFCC';

    outMostFrame.appendChild(checkBoxFrame);
    for(j=0;j< checkBoxLabels.length; j++){
      let checkBoxElement = document.createElement('input');
      checkBoxElement.name = checkBoxName[j];
      checkBoxElement.type = 'checkbox';
      checkBoxFrame.appendChild(checkBoxElement);

      let label = document.createElement('label');
      label.htmlFor = checkBoxElement; 
      label.style.paddingInline = "10px";
      label.textContent = checkBoxLabels[j];
      checkBoxFrame.insertBefore(label,checkBoxElement.nextSibling);
    }
    let inputFrame = document.createElement('div');
    inputFrame.style.display = 'table';
    outMostFrame.appendChild(inputFrame);
  
    for(i=0;i < inputName.length; i++){
      let inputElement = document.createElement('input');
      inputElement.name = inputName[i];
      inputElement.inputMode = "numeric";
      inputElement.size = 4;
      inputElement.defaultValue = inputDefalutValue[i];
      inputElement.style.display = 'table-cell';
      inputFrame.appendChild(inputElement);

      let label = document.createElement('label');
      label.htmlFor = inputElement ; 
      label.textContent = inputLabels[i].split("-")[0]; // 区切り文字の前半
      inputFrame.insertBefore(label,inputElement);
      let labelafter = document.createElement('label');
      labelafter.htmlFor = inputElement;
      labelafter.textContent = inputLabels[i].split("-")[1]; // 区切り文字の後半
      inputFrame.insertBefore(labelafter,inputElement.nextSibling);
      let br = document.createElement('br');
      inputFrame.insertBefore(br,null);
    }



    let selectorFrame = document.createElement('div');
    selectorFrame.style.display = "row";
    outMostFrame.appendChild(selectorFrame);
    for(k=0; k< selectorLabels.length; k++){      
      let selectorElement = document.createElement('select');
      selectorElement.name = selectorName[k];
      selectorFrame.appendChild(selectorElement);
      let label = document.createElement('label');
      label.htmlFor = selectorElement ; 
      label.textContent = selectorLabels[k];
      selectorFrame.insertBefore(label,selectorElement);

        for(l=0;l<3;l++){
          let OptionText = optionOfSelectors[k][l];
          if(OptionText == "") continue;
          else {
           let optionElement = document.createElement(['option']);
           optionElement.text= OptionText;
           optionElement.value = l; 
           selectorElement.appendChild(optionElement);
         } 
        }
      }
  
    let calcButton = document.createElement('input');
    calcButton.type = 'button';
    calcButton.value = '重症度計算';
    calcButton.onclick = calcSeverity;
    outMostFrame.appendChild(calcButton);
  }

  function calcSeverity(){
/*    const inputName = ["inputWBC","inputPlt","inputCRP","inputBUN","inputLDH","inputPCa","inputBE","inputPAO2"];
    for(i=0;i<inputName.length; i++){
      values[i]= getValueFromName(inputName[i]);
    }
    let severityScore = 0 ;
    let sirsScore = 0;
     if(value[0]< 4000 || value >12000) {sirsScore++;} // WBC (SIRS診断基準における陽性項目)
     if(value[1]<=10) {severityScore++} // 血小板数
     if(value[2]>=15) {severityScore++}// CRP
     if(value[3]>=40) {severityScore++} // BUN
     if(value[4]>=440) {severityScore++}// LDH
     if(value[5]<=7.5) {severityScore++} // Ca
     if(value[6]<-3) {severityScore++} // BE
     if(value[7]<60) {severityScore++} ;// PaO2
    */

    alert('calc') ;
    let queryOfResult = document.querySelector('p[name="resultOfSeverity"]');
    queryOfResult.text = `SIRSスコアは${sirsScore}です。重症度スコアは${severityScore}でした `;
  }

  function getValueFromName(name){
    let query = ` select[name="${name}"]`
    let Object = document.querySelector(query);
    if (Object == null) { return 0 ;} else { return parseInt(Object.value);};
  }
 
