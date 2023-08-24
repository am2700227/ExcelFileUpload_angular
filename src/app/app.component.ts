import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Product } from './interfaces/product';
import { ExcelService } from './services/excel.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  show: boolean = false;
  ExcelData: Product[] = [];
  file: any;
  flag = true;

  constructor(private http: HttpClient, private excelService : ExcelService) {}

  ngOnInit(): void {
    this.getData();
  }
  
  /**
   * @method selectFile
   * method to initiailize "file" with file selected
   * @memberof AppComponent
   * @param event
   */
  selectFile(event: any): void {
    this.file = event.target.files[0];
  }

  /**
   * @method uploadFile
   * method to upload the file
   * @memberof AppComponent
   */
  uploadFile(): void {
    // Create a FormData object to send the file to the server
    let formData = new FormData();
    formData.append('file', this.file);
    // Set the flag to indicate that a file is being uploaded
    this.flag = false;
    // Make an HTTP POST request to upload the file
    this.excelService.uploadFile(formData).subscribe(
      //subscribe gives teo method for success adn for error
      (data: any) => {
        // Reset the flag to indicate that the upload is complete
        this.flag = true;
        alert(data.message);
      },
      (error) => {
        this.flag = true;
        // Show an error message to the user
        alert(error);
      }
    );
    this.getData();
  }
  getData(): void {
    this.excelService.getData()
      .subscribe((data: any) => {
        if (data.status === 200) {
          this.show = true; // Assigning the parsed data to this.ExcelData
          const responseBody = JSON.parse(data.body);
          this.ExcelData = responseBody;
          console.log('this is my response', this.ExcelData);
          console.log('Success. Server returned status:', data.status);
        } else {
          // this.ExcelData = data;
          console.log(
            'Failed to upload file. Server returned status:',
            data.status
          );
        }
      }),
      (error: any) => {
        console.log('Failed to upload file.', error);
        this.show = true;
      };
  }
 
}
