
window.onload= function(){
    const calcForm = document.querySelector('form[name="inputForm"]');

    calcForm.insertBefore(document.createElement('br'),null);
    let calcButton = document.createElement('input');
    calcButton.type = 'button';
    calcButton.value = '判定';
    calcButton.onclick = calcRisk;
    calcForm.appendChild(calcButton);
    }

function calcRisk(){
   
    const hasDM = document.querySelector('input[name="checkDM"]').checked;
    const hasDMcomplicatoin = document.querySelector('input[name="checkDMcomplication"]').checked;
    const hasCKD = document.querySelector('input[name="checkCKD"]').checked;
    const hasCI = document.querySelector('input[name="checkCI"]').checked;   
    const hasPAD = document.querySelector('input[name="checkPAD"]').checked;
    const hasIHD = document.querySelector('input[name="checkIHD"]').checked;  
    const hasFHofIHD = document.querySelector('input[name="checkFHofIHD"]').checked;   
    let scoreHisayama = vauleOfSelect('selectSex') + vauleOfSelect('selectsBp') +vauleOfSelect('selectLDL') + vauleOfSelect('selectHDL') + vauleOfSelect('selectSmoke');

    
    let recommend = '推奨を示します';
    if(hasCI || hasIHD){
        recommend = '二次予防でLDL-C＜70mg/dl､non-HDL＜100mg/dlが推奨されます｡'; // 二次予防
    } else if(hasDM){
        if(hasPAD || hasDMcomplicatoin){
            recommend = '糖尿病かつリスク因子ありなので､LDL-C＜100mg/dl､non-HDL-C＜130mg/dlを考慮ください';
        } else {
            recommend = '糖尿病あり､高リスクのため､LDL-C＜120mg/dl､non-HDL＜150mg/dlが推奨されます｡';
        }
    } else if(hasCKD || hasPAD) {
        recommend = '高リスクのため､LDL-C＜120mg/dl､non-HDL＜150mg/dlが推奨されます｡';
    }  else {
        recommend = scoreHisayamaToRisk(scoreHisayama)
    }
    const resultForm = document.querySelector('p[name="resultState"]');
    resultForm.textContent = recommend;
}

function scoreHisayamaToRisk(scoreHisayama){

   let AgeStage = vauleOfSelect('selectAge');
    let riskStage = 0;
    if(AgeStage== 3){// 70-79歳
        riskStage = (scoreHisayama >= 8 )? 2: 1;
    } else if(AgeStage == 2){
        if(scoreHisayama ==0 || scoreHisayama ==1 ){
            riskStage = 0;
        } else {
            riskStage = (scoreHisayama>= 13)? 2 : 1; 
        }
    } else if(AgeStage ==1){
        if(scoreHisayama <=7 ){
            riskStage =0
        } else {
            riskStage =(scoreHisayama>=19) ? 2: 1;
        }
    } else {
        riskStage = (scoreHisayama>=13 )? 1 : 0;
    }   
    let destLDL = 160;
    let destNonHDL = 190;
    let riskIs = '低リスク'
    switch(riskStage){
        case 0:
            riskIs = '低リスク(10年間の動脈硬化性疾患発症リスク＜2%)'
            destLDL = 160;
            destNonHDL = 190;
            break;
        case 1:
            riskIs = '中リスク(10年間の動脈硬化性疾患発症リスク:2～10%)'
            destLDL = 140;
            destNonHDL = 170;
            break;
        case 2:
            riskIs = '高リスク(10年間の動脈硬化性疾患発症リスク＞10%)'
            destLDL = 120;
            destNonHDL= 150;
            break;
        default:
    }
    return `久山町スコアは${scoreHisayama}でした｡ リスクは${riskIs}, 目標LDL-Cは${destLDL},目標Non-HDL-Cは${destNonHDL}です`;
}

function vauleOfSelect(name_of_element){
        let querySelect = document.querySelector(`select[name="${name_of_element}"]`)
        let indexOfElement = querySelect?.selectedIndex ?? -1
        return parseInt(querySelect.options[indexOfElement].value);
       }

    

