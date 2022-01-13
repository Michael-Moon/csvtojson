import { Component } from '@angular/core';


import * as XLSX from 'xlsx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'csvtojson';
  convertedJson!: string;
  toConvertedObj: any;

  fileUpload(event: any ){

    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (e: any) => {

      let binaryData = e.target?.result;
      let workbook = XLSX.read(binaryData,  {type: 'binary',cellText:false,cellDates:true});


      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {raw: false, dateNF:'yyyy-mm-dd'});

        this.convertedJson = JSON.stringify(data, undefined, 5);
        this.toConvertedObj = JSON.parse(this.convertedJson);

      })
      console.log(this.toConvertedObj);
    }
  }
}
