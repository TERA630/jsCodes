
const labelAndNameForSelect= ["selectSex/性別","selectBP/血圧","selectIGT/糖代謝異常（糖尿は含まない)","selectLDL-C/血清LDL-C","selectHDL/血清HDL-C","selectSmoke/現在の喫煙"];
const optionOfSelect = [ ['女性/0','男性/7'],['<120mmHg/0','120-129/1','130-139/2','140-159/3','160-/4'],['なし/0','あり/1'],
['<120/0','120-139/1','140-159/2','160-/3'],['＞60/0','40-59','＜40'],['なし/0','あり/2']];

window.onload = function(){

  let clinicalForm = document.querySelector('p[name="tableHisayama"]');
    if(clinicalForm==null) {
        alert('fail to find tableHisayama. modify html.')
    } else {   renderSelect(clinicalForm,labelAndNameForSelect,optionOfSelect)
    }
  } 

function renderSelect(parentForm,label_and_name_array, options_Array){ // selectName, labelForSelect,optionOfSelect

    for(let k=0; k< label_and_name_array.length; k++){ 
      
     let selectElement = document.createElement('select');
     selectElement.name = label_and_name_array[k].split('/')[0];
     parentForm.appendChild(selectElement);
    
     let label = document.createElement('label');
     label.htmlFor = selectElement; 
     label.textContent = label_and_name_array[k].split('/')[1];
     parentForm.insertBefore(label,selectElement);
    
     for(let l=0;l<options_Array[k].length;l++){
        let optionElement = document.createElement(['option']);
        optionElement.text= options_Array[k][l];
        optionElement.value = l; 
       selectElement.appendChild(optionElement);
      }
     }
    }