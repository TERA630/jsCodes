
 const selectName = ['selectAge','selectSpO2','selectOnset','selectSymptom','selectVaccination'];
 const labelForSelect = ['年齢','酸素飽和度(SpO2)','発症からの時期','臨床状態','ワクチン接種'];
 const optionOfSelect = [['12歳未満','12歳以上60歳未満','60≦＜64歳','65歳≦<75歳','75歳以上'],['≧96','93<<96%','<93%'],['3日以内','5日以内','7日以内'],['呼吸器症状なし','咳のみ､呼吸困難なし','呼吸困難､肺炎所見','酸素投与が必要','ICUor人工呼吸器が必要'],['未接種','接種済み']];
 const checkBoxName = ['Obesity','smoker','immuneSurpressed','malignancy','diabetes','chronicLiverDiease','CKD','HT','divelopmentalDisorder'];
 const labelForCheckBox = ['肥満BMI≧25kg/m2-1.75','喫煙歴','免疫抑制疾患・免疫抑制剤','悪性腫瘍','糖尿病-1.74','慢性肝障害','慢性腎臓病','高血圧-1.33','神経発達障害'];
 const labelForDiseaseGroup = [['慢性肺疾患','気管支喘息','閉塞性肺疾患(COPD)-2.51'],
                    ['心血管系疾患-1.48','心筋梗塞','脳卒中','心不全','狭心症(ニトログリセリン処方)','冠動脈バイパス後','経皮的冠動脈形成後','頸動脈内膜剥離術'],
                    ['神経発達障害','脳性麻痺','ダウン症','遺伝性疾患','その他重度の先天異常']
]

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
  let calcForm = document.querySelector('p[id="calcForm"]');
  renderSelect(calcForm);
 renderCheckBox(calcForm);
  for(let i=0; i< labelforMedications.length; i++){ 
    renderCheckBoxGroup(calcForm,labelforMedications[i][0],labelforMedications[i][1]);
  }

} 

function calcSeverity(){
   let GradeOfSaturation = getIntBySelect('selectSpO2');
   let GradeOfSymptom = getIntBySelect('selectSymptom');
   let SeverityOfCOVID = '';

   if(GradeOfSaturation ==0 && GradeOfSymptom <= 1){
     SeverityOfCOVID = '軽症';
     alert(isChecked('immuneSurpressed'));
   } else if ( GradeOfSaturation == 1 || GradeOfSymptom<=2 ){
     SeverityOfCOVID = '中等症Ⅰ';
     alert(isChecked('immuneSurpressed'));
   } else if (GradeOfSaturation == 2  || GradeOfSymptom<= 3){
     SeverityOfCOVID = '中等症Ⅱ'
   } else if (GradeOfSymptom >= 4){
     SeverityOfCOVID = '重症'
   }
   let result =  document.querySelector('p[id="resultForm"]')
   result.textContent = SeverityOfCOVID;

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

    for(let i=0; i< nameOfElements.length; i++){
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