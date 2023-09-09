
const selectName = ["selectTscore"];
const labelForSelect= ['骨密度値(Tスコア:若年成人の平均SD','脆弱性骨折'] ; 
const optionOfSelect = [ ['Tスコア≧-1','-2.5＞Tスコア≧-1','Tスコア<-2.5'],['無し','あり']];

window.onload= function(){
    const calcForm = document.querySelector('p[id="calcForm"]');

    renderSelectElements(calcForm);
}


function renderSelectElements(parentForm){ // parentForm:親要素 selectName[],labelForSelect[],optionForSelect[]
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
    }
}