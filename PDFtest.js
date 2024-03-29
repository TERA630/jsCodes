
const inputAssets = ['氏名-inputPatientName-山田太郎-','身長-inputHeight-160-cm','体重-inputWeight-70-kg','腹囲-inputAbdominalCircumference-80-cm'];
const formMetrics = ['heightInPdf-63-71','weightInPdf-63-76','bmiInPdf-63-83'];
const FONT_URL = '/font/ipaexg.ttf';
const PDF_URL = '/pdf/updated_format.pdf';


window.onload = function(){
    renderinput(document.querySelector('div[name="inputForm"]'),inputAssets);
}

function fillPdffile(){
 async function createPdf(){

    const existingPdfBytes = await fetch(PDF_URL).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    pdfDoc.registerFontkit(fontkit);
    
    const fontData = await pdfDoc.embedFont(await(await fetch(FONT_URL)).arrayBuffer(),{subset:true});
    const pages = pdfDoc.getPages();
    const page = pages[0];
    const { width, height } = page.getSize();
    const font_color_base = rgb(0.1,0.1,0.1);

        page.drawText(('#IJUBG').val(),{
            x: width -90,
            y: height/2 + 320,
            size: 11,
            font : fontData,
            color : font_color_base
    
        });
        window.open(URL.createObjectURL(new Blob([await pdfDoc.save()],{type:'application/pdf'})));
        createPdf();
    }
}


function renderinput(parent_element,label_and_name_array){ // checkBoxName,labelForCheckBox

    for(let i=0; i< label_and_name_array.length; i++){
     let inputRow = label_and_name_array[i].split('-');

     let labelBefore = document.createElement('label');
     labelBefore.textContent = inputRow[0];
     parent_element.appendChild(labelBefore);

     let inputElement = document.createElement('input');

     labelBefore.htmlFor = inputElement;
     inputElement.name = inputRow[1];
     inputElement.value = inputRow[2];
     inputElement.min = '0';
     parent_element.appendChild(inputElement);

     let labelafter = document.createElement('label');
     labelafter.textContent = inputRow[3];
     labelafter.htmlFor = inputElement;
     parent_element.appendChild(labelafter);

     parent_element.appendChild(document.createElement('br'));
    }
}