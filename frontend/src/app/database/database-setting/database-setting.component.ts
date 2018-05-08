import { Component, OnInit } from '@angular/core';
import {DatabaseDTO} from "../../../../../src/dtos/database-dto";
import {DatabaseService} from "../database.service";

@Component({
  selector: 'app-database-setting',
  templateUrl: './database-setting.component.html',
  styleUrls: ['./database-setting.component.scss']
})
export class DatabaseSettingComponent implements OnInit {

  database: DatabaseDTO = <DatabaseDTO>{};

  constructor(private databaseService: DatabaseService) { }

  ngOnInit() {
    this.databaseService.getDatabaseSettings().subscribe(
      (setting: DatabaseDTO) => {
        this.database = setting;
      },
      (err) => {
        console.log(err);
      }
    )
  }

  updateDatabase() {
    this.databaseService.updateDatabaseSettings(this.database).subscribe(
      (setting: DatabaseDTO)=> {
        this.database = setting;
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
