import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit{

  settingsForm: FormGroup;

  constructor(private fb: FormBuilder, private settingsService: CommonService) {
    this.settingsForm = this.fb.group({
      theme: [''],
      notifications: [true],
      language: ['en']
    });
  }

  ngOnInit(): void {
    this.settingsService.getSettings().subscribe(data => {
      this.settingsForm.patchValue(data);
    });
  }

  saveSettings(): void {
    this.settingsService.updateSettings(this.settingsForm.value).subscribe(response => {
      alert('Settings updated successfully!');
    });
  }

}
