

 const clinicalStatusLabeAndName = ['酸素飽和度(SpO2)/selectSpO2','発症からの時期/selectOnset','臨床状態/selectSymptom','ワクチン接種/selectVaccination'];
 const ClinicalStatusOptions = [['≧96','93<<96%','<93%'],['3日以内','5日以内','7日以内'],
                ['呼吸器症状なし','咳のみ､呼吸困難なし','呼吸困難､肺炎所見','酸素投与が必要','ICUor人工呼吸器が必要'],
                ['未接種','最終接種半年以上前','半年以内接種済み,計3回未満','半年以内接種ずみ,計3回以上']];

 const checkBoxNameAndlabels = ['肥満/Obesity/BMI≧25kg/m2','喫煙歴/smoker/過去30日以内､100本以上の喫煙歴',
              '免疫抑制/immuneSurpressed/免疫抑制剤の使用あるいは免疫抑制状態','悪性腫瘍/malignancy',
              '血液疾患/boneMallowDisease/鎌状赤血球症',
              '慢性肺疾患/chronicRespiratryDisease/閉塞性肺疾患､気管支喘息(連日吸入処方)',
              '心疾患/vascularDisease/心不全､虚血性心疾患,心筋症',
              '神経疾患/neuroDisease/脳血管障害,頸動脈内膜剥離術後,多発性硬化症､重症筋無色症',
              '糖尿病/diabetes', '慢性腎障害/CKD','慢性肝疾患/CLD/肝硬変','高血圧/HT','AIDS/AIDS/あるいはコントロール不良のHIV感染',
              '神経発達障害/divelopmentalDisorder/脳性麻痺､ダウン症､重度の先天障害や遺伝性疾患'];


 const labelforMedications = [['抗不整脈薬/anti-arrhythmic',['アミオダロン','ペプリジル（ペプリコール)','フレカイニド(タンボコール)','プロバフェノン(プロノン)','キニジン']],
                    ['抗凝固薬/anticoagulate',['リバーロキサパン(イグザレルト)']],
                    ['抗不安薬、催眠鎮静薬/benzodiazepin',['トリアゾラム(ハルシオン)','ジアゼパム(セルシン・ホリゾン)','クロラゼブ酸(メンドン)','エスタゾラム(ユーロジン)','フルラゼパム(ダルメート)',]],
                    ['降圧薬/antiHypertensive',['レザルタス配合錠','アゼルニジピン(カルブロック)']],
                    ['片頭痛治療薬/migraineMedication',['エレトリプタン(レルパックス)','ジヒドロエルゴタミン','クリアミン']],
                    ['鎮痛剤/painKiller',['アンピロキシカム(フルカム)','ピロキシカム(パキソ、フェルデン)']],  
                    ['抗てんかん薬/antiepileptic',['ホスフェニトイン(ホストイン)','カルバマゼピン(テグレトール)','フェノバルビタール(フェノバール)','フェニトイン(ヒダントール、アレビアチン)']],
                    ['抗精神病薬/antipsychotic',['プロナンセリン(ロナセン)','ルシラドン(ラツーダ)','ピモジド']],
                    ['肺高血圧症治療薬/anti-pulmonaryHypertensive',['シナデナフィル(レバチオ)','タダラフィル(アドシルカ)','リオシグアト(アデムパス)']],
                    ['抗結核薬/antituberculous',['リファブチン(ミコブティン)','リファンピシン(リファジン)']],
                    ['抗真菌薬/antifungus',['ボリコナゾール(ブイフェンド)']],
                    ['抗悪性腫瘍薬/antitumor',['ベネトクラウス(ベネクレクスタ)','アパルタミド(アーリーダ)']],
                    ['高脂血症治療薬/lipid-lowering',['ロミタピド(ジャクスタピッド)']],
                    ['勃起不全改善薬/anti-ErectileDysfunction',['バルデナフィル(レビトラ)']],
                    ['ハーブ/herb',['セイヨウオトギリソウ、セント・ジョーンズ・ワート']],
                  ];

// 男性2.09 入院でCKD,CVD,DL,COPD,HTN,DM,CVD,LC,Malignancyのいずれからあれば15%死亡


window.onload = function(){
  let clinicalForm = document.querySelector('p[id="clinicalStatus"]');
  renderSelect(clinicalForm,clinicalStatusLabeAndName,ClinicalStatusOptions);
  let complications= document.querySelector('table[id="complication"]');
  renderCheckBox(complications,checkBoxNameAndlabels);
} 

function calcSeverity(){
   let GradeOfSaturation = getIntBySelect('selectSpO2');
   let GradeOfSymptom = getIntBySelect('selectSymptom');
   let SeverityOfCOVID = '';

   if(GradeOfSaturation ==0 && GradeOfSymptom <= 1){
    let priority = calcPriority();
    let statement = '';
    if(priority == 5) statement ='抗ウィルス剤による重症化予防の適応外です｡';
    else  statement = `治療薬の優先度は${priority}です｡`;
    SeverityOfCOVID = `軽症です｡${statement}`;
   } else if ( GradeOfSaturation == 1 || GradeOfSymptom<=2 ){
     SeverityOfCOVID = '中等症Ⅰです。入院適応です。';
   } else if (GradeOfSaturation == 2  || GradeOfSymptom<= 3){
     SeverityOfCOVID = '中等症Ⅱです。緊急対応を要します。'
   } else if (GradeOfSymptom >= 4){
     SeverityOfCOVID = '重症'
   }
   let result =  document.querySelector('p[id="resultForm"]');

   result.textContent = SeverityOfCOVID;

//   const medicationForm = document.querySelector('p[id="medicationForm"]');

// for(let i=0; i< labelforMedications.length; i++){ 
 // renderCheckBoxGroup(medicationForm,labelforMedications[i][0],labelforMedications[i][1]);
 // }
} 

function calcPriority(){
  if(isChecked('immuneSurpressed')) {return 1};
  
  let isVaccinated = (getIntBySelect('selectVaccination') >= 2); 
  let riskByAge = getIntBySelect('selectAge');


  //               < 65 | 65-75       | >=75
  //   vaccinated  | 5 or 4 |  4 or 3 | 3
  // Not vaccinated| 5 or 2 |  2 or 1 | 1  
  
  //                              <65 | 65-75
  //  vaccinated has no risk       5  |  4
  //  vaccinated has risk          4  |  3 
  //  not vaccinated has no risk   5  |  2
  //  not vaccinated has risk      2  |  1 


if(riskByAge == 4) return isVaccinated? 3 : 1;          // 75歳以上　適切なワクチン状態なら優先度3、でなければ優先度1
if(riskByAge <= 2) {//　65歳未満
 if(!hasRisk()) return 5  // リスクなしなら、ワクチン接種にかかわらず投与推奨されず
 else  return isVaccinated? 4 : 2;  // 重症化リスクあり、ワクチン接種未→優先度2、接種済みなら優先度4

} else { // 65歳以上
    if(hasRisk) return isVaccinated? 3 : 1 // 65歳以上リスクあり
    else return isVaccinated? 4 : 2 // 65歳以上リスク無
}

}

function hasRisk(){
  let checkedElements = document.querySelectorAll('input[type="checkbox"]:checked');
  let result =[];
  for(let i=0;i<checkedElements.length;i++){
    result.push(checkedElements[i].name);
  }
  return (result.length !=0);
}


function isChecked(name_of_element){
  let checkedElements = document.querySelectorAll('input[type="checkbox"]:checked');
  let result = ['found'];
  for(let i=0;i<checkedElements.length;i++){
    result.push(checkedElements[i].name);
  }
 
  return result.includes(name_of_element);

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


function renderSelect(parentForm,label_and_name_array, options_Array){ // selectName, labelForSelect,optionOfSelect

for(let k=0; k< label_and_name_array.length; k++){ 
  
 let selectElement = document.createElement('select');
 selectElement.name = label_and_name_array[k].split('/')[1];
 parentForm.appendChild(selectElement);

 let label = document.createElement('label');
 label.htmlFor = selectElement; 
 label.textContent = label_and_name_array[k].split('/')[0];
 parentForm.insertBefore(label,selectElement);

 for(let l=0;l<options_Array[k].length;l++){
    let optionElement = document.createElement(['option']);
    optionElement.text= options_Array[k][l];
    optionElement.value = l; 
   selectElement.appendChild(optionElement);
  }
 }
}

function renderCheckBox(table_element,label_and_name_array){ // checkBoxName,labelForCheckBox


 for(let i=0; i< label_and_name_array.length; i++){
    let tableRow = document.createElement('tr');
    table_element.appendChild(tableRow);

    let columnFirst = document.createElement('td');
    tableRow.appendChild(columnFirst);

    let checkBoxElement = document.createElement('input');
    let rowHeader = label_and_name_array[i].split('/');
    checkBoxElement.type = 'checkbox';
    checkBoxElement.name = rowHeader[1];
    columnFirst.appendChild(checkBoxElement);

    let label = document.createElement('label');
    label.htmlFor = checkBoxElement;
    label.textContent = rowHeader[0] 
    columnFirst.insertBefore(label,null);

    let columnSecond = document.createElement('td');
    tableRow.appendChild(columnSecond);

    if(rowHeader[2] != undefined) {
      columnSecond.textContent = rowHeader[2];
    }
 }
 
}
 