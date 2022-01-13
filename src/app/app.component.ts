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

  fileUpload(event: any ){

    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (e: any) => {

      let binaryData = e.target?.result;
      let workbook = XLSX.read(binaryData, {type: 'binary'});
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

        this.convertedJson = JSON.stringify(data, undefined, 4);
        console.log(this.convertedJson);
      })

    }
  }
}
