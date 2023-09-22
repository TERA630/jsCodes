 

window.onload= function(){
    const calcForm = document.querySelector('p[id="calcForm"]');
    
} 

function showTreatment(){
    const resultFormElement = document.querySelector('div[name="resultForm"]');
    let lifeStage = getValueFromSelectByName('selectMenopause');
    let fragilitiyFracture = parseInt(getValueFromSelectByName('selectHasFlexture'));
    let tScore =parseInt(getValueFromSelectByName('selectTscore'));

    switch(fragilitiyFracture){
      case 0:
        if(tScore >= 2 ){recommend = '骨密度低下のため薬物治療が推奨されます'} else 
        {recommend = '骨折もないし骨密度低下もなさそうです.'};
        break;
      case 1:
        if(tScore>=2) {recommend = '重症骨粗鬆症として薬物治療が推奨されます。'
        }  else if(tScore == 1){ recommend = '薬物治療が推奨されます。'
        } else {
          recommend = '骨折はあるけれどどうするべきか';
        };
        break;
      case 2:
        recommend = '骨密度にかかわらず薬物治療が推奨されます。'
      default:
    };

    if(lifeStage == 0){
        recommend += ' '
    } else if(lifeStage == 1){
        recommend += 'SERM(選択的エストロゲン受容体モデュレーター)が推奨されます'
    } else {
        recommend += 'ビスホスホネートが第一選択です。3～5年継続しても骨折リスクが高ければデノスマブが推奨されます。'
    }
    resultFormElement.textContent = recommend;
}





function getValueFromSelectByName(name_of_element){
    let querySelect = document.querySelector(`select[name="${name_of_element}"]`)
    let indexOfElement = querySelect?.selectedIndex ?? -1
    return parseInt(querySelect.options[indexOfElement].value);
   }

   //　　最新の骨粗鬆症薬　　日老医誌2019;56:136-145臨床老年医学　

   //