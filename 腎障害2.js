


const evaluation = [['G1-green-140/90-caBOrThiazideOrRASi-follow','G1-yellow1-130/80-RASifirst-consult_if_blood','G1-orange-130/80-RASifirst-consult'], // CKDG1
['G2-green-140/90-caBOrThiazideOrRASi-follow','G2-yellow1-130/80-RASifirst-consult_if_blood','G2-orange-130/80-RASifirst-consult'], // CKDG2
['G3a-yellow2-140/90-caBOrThiazideOrRASi-consult_if_young','G3a-orange-130/80-RASifirst-consult','G3a-red-130/80-RASifirst-consult'], // CKDG3a
['G3b-orange-140/90-caBOrThiazideOrRASi-consult','G3b-red-130/80-RASifirst-consult','G3b-red-130/80-RASifirst-consult'], // CKDG3b
['G4-red-140/90-caBOrLoopOrRASi-consult','G4-red-130/80-RASifirstwithCaution-consult','G4-red-130/80-RASifirstwithCaution-consult'], // CKD4 
['G5-red-140/90-caBOrLoopOrRASi-consult','G5-red-130/80-RASifirstwithCaution-consult','G5-red-130/80-RASifirstwithCaution-consult'], // CKD5
]

window.onload= function(){
  
}

function showTreatment(){
 let gradeOfEGFR = getValueFromSelectByName('selectEGFR');
 let gradeOfProteinUrea = getValueFromSelectByName('selectProteinUrea');
 let gradeOfAge = getValueFromSelectByName('selectAge');

 let dataOfrecommend =evaluation[gradeOfEGFR][gradeOfProteinUrea].split("-");
 let gradeOfCKD = dataOfrecommend[0];
 let idealBloodPressure = dataOfrecommend[2];
 
 recommendOfAntiHypertensive = decideAntihypertensive(dataOfrecommend[3],gradeOfCKD,gradeOfAge);

 let queryOfResult = document.querySelector('div[name="resultForm"]');

 let treatment = `腎障害は${gradeOfCKD}A${gradeOfProteinUrea}です。降圧目標は${idealBloodPressure}で、降圧剤は${recommendOfAntiHypertensive}`;

 queryOfResult.textContent = treatment;
}


function decideAntihypertensive(statement_of_AntiHypertensive , grade_of_CKD,grade_of_age){
 let recommendedAntihypertensive = '推奨ありません';
 if( grade_of_age =='1' && (grade_of_CKD == 'G4' || grade_of_CKD== 'G5'))  {
  recommendedAntihypertensive = 'Ca拮抗薬が第一選択です。効果不充分であれば副作用に注意しながら、ACE阻害剤orARB、利尿剤を追加ください。';
  return recommendedAntihypertensive ;
 } 
 switch (statement_of_AntiHypertensive){
    case 'caBOrThiazideOrRASi':
        recommendedAntihypertensive = 'Ca拮抗薬、ACE阻害剤orARBのうち一剤のいずれかが推奨されます。';
      break;
    case 'caBOrLoopOrRASi':
      recommendedAntihypertensive = 'Ca拮抗薬、ACE阻害剤orARBのうち一剤の少量慎重投与のいずれかが推奨されます。';
      break;
    case 'RASifirst':
      recommendedAntihypertensive = 'ACE阻害薬かARBが第一選択です。第二選択はCa拮抗薬です。';
      break;
    case 'RASifirstwithCaution' :
      recommendedAntihypertensive = '少量でのACE阻害薬もしくはARBで開始､腎障害やカリウム値に留意ください。'; 
      break;
    default:
      recommendedAntihypertensive = '高血圧ガイドライン参照してください。';
  }

  let hasWaterRetention = (getValueFromSelectByName('fluidRetention') == '1');
  return recommendedAntihypertensive
}
function decideSGLT2i(grade_of_CKD,grade_of_age){
  //  DMR uACR>25mg/mmo　冠動脈疾患、うっ血性心不全　Grade1A　(UKKA)
  //　DMがあり、DM腎症でなくても ACR＞25mg/mmol　Grade1B　(UKKA)
  //　DMR 心血管イベント、25～60ml/min/1.73＋uACR<25mg/mmol Grade 2B(UKKA)
  //　DM合併無し、　うっ血性心不全　Grade1A
  //　PKDや免疫抑制がなければ蛋白尿uACR＞25ならば　Grade1B
  //　GFR25～30では糖尿病や蛋白尿にかかわらず、27%のリスク減少(GFR低下、ESKD,腎・脳血管関連死)と最もエビデンスが強い。
  //　
  // 日本の推奨では糖尿病合併、≧15ml/minなら積極的な使用を考慮。　糖尿病非合併なら蛋白尿あれば積極的な使用を考慮。
  // IgA腎症でGFR43、ACR　900mg/g　▽GFR4ml→3ml/年　　26%のアルブミン尿低下。
　//　巣状硬化症　▽4ml/min→1.9ml/min/年　
   


}
function getValueFromSelectByName(name_of_element){
 let querySelect = document.querySelector(`select[name="${name_of_element}"]`)
 let indexOfElement = querySelect?.selectedIndex ?? -1
 return parseInt(querySelect.options[indexOfElement].value);
}