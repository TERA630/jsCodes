window.onload= function(){
    let inputFormFrame = document.querySelector('p[id="evaluatonOfSeverity"]');
    const selectorName = ["stoolFrequency","bloodyStool","fever","tachycardia","anemia","erythrocyteSedimentationRate"];
    const selectorLabels = ["便回数","血便","発熱","頻脈","貧血","赤沈"];
    const optionOfSelectors = [
      ["4回以下","5回","6回以上"],
      ["無or排便の半数以下で血液付着","ほとんどの排便時に顕血便","大部分が血液"],
      ["発熱なし","","37.5℃以上の発熱"],
      ["90bpm以下","","90bpm以上"],
      ["Hgb>10.0g/dl","","Hgb≦10.0g/dl"],
      ["正常","","30mm/1hr以上"]
    ] ;


     for(i=0;i < 6; i++){　//セレクトボックスの追加
        let selectorElement = document.createElement('select');
        selectorElement.name = selectorName[i];
        inputFormFrame.appendChild(selectorElement);
        let label = document.createElement('label');
        label.htmlFor = selectorElement ; 
        label.textContent = selectorLabels[i];
        inputFormFrame.insertBefore(label,selectorElement);
        for(j=0;j<3;j++){ // 選択肢の追加
          let optionElement = document.createElement(['option']);
          let optionText = optionOfSelectors[i][j];
          if(optionText=="") continue;
          optionElement.text = optionText;
          optionElement.value = j; 
          selectorElement.appendChild(optionElement);
        }
      }
      
    let calcButton = document.createElement('input');
    calcButton.type = 'button';
    calcButton.value = '重症度計算';
    calcButton.onclick = calcSeverity;
    inputFormFrame.appendChild(calcButton);
    
    let changeButton = document.createElement('input');
    calcButton.type = 'button';
    calcButton.value = 'Mayo Scoreに切り替え';
    calcButton.onclick = calcMayo;
    inputFormFrame.appendChild(changeButton);
  
  }

  function calcSeverity(){
    
    let resultOfSeverity = '中等症';
     
    let stoolFrequencyValue = getValueFromName('stoolFrequency');
    let bloodyStoolValue = getValueFromName('bloodyStool');
    let feverValue = getValueFromName('fever');
    let tachycardiaValue = getValueFromName('tachycardia');  
    let anemiaValue = getValueFromName('anemia');
    let erythrocyteSedimentationRateValue = getValueFromName('erythrocyteSedimentationRate');


    let totalValue = stoolFrequencyValue + bloodyStoolValue + feverValue + tachycardiaValue + anemiaValue + erythrocyteSedimentationRateValue;
  
    if (totalValue==0){
      resultOfSeverity = '軽症';
    } else if (((stoolFrequencyValue || bloodyStoolValue) == 0 )|| (feverValue||tachycardiaValue) == 0){
      resultOfSeverity = '中等症';
    } else if(totalValue >= 8){
      resultOfSeverity = '重症';
    } 

    let resultFrame = document.querySelector('p[id="resultOfSeverity"]');
    resultFrame.textContent = `スコア${totalValue}点 重症度は${resultOfSeverity}です`;
  }
  function calcMayo(){
    alert('Mayoに切り替えYo')
  }



  function getValueFromName(name){
    let query = ` select[name="${name}"]`
    let Object = document.querySelector(query);
    if (Object == null) { return 0 ;} else { return parseInt(Object.value);};
  }