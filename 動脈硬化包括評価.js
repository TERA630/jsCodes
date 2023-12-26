
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
    let riskGrade = 0;
    const hasDM = document.querySelector('input[name="checkDM"]').value;
    const hasCKD = document.querySelector('input[name="checkCKD"]').value;
    const hasCI = document.querySelector('input[name="checkCI"]').value;   
    const hasPAD = document.querySelector('input[name="checkPAD"]').value;

    let scoreHisayama = getValueFromSelectByName('selectSex')

    scoreHisayama += getValueFromSelectByName('selectsBp') ;

    if(hasDM || hasCKD || hasCI || hasPAD) {
        riskGrade = 2;
    }
    const resultForm = document.querySelector('p[name="resultState"]');
    resultForm.textContent = `久山町スコアは${scoreHisayama}でリスクは${riskGrade}でした｡`

}



function getValueFromSelectByName(name_of_element){
        let querySelect = document.querySelector(`select[name="${name_of_element}"]`)
        let indexOfElement = querySelect?.selectedIndex ?? -1
        return parseInt(querySelect.options[indexOfElement].value);
       }

    

