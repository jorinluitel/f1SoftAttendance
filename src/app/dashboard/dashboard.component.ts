import { Component, OnInit } from '@angular/core';

interface Attendance {
  date: string;
  checkin: string;
  checkout: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn: boolean = false;
  userAttendance: Attendance[] = [];

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    if (username) {
      // Fetch user attendance data from a backend API using the username
      // and populate the userAttendance array with the data
      // For example:
      // this.userAttendance = apiService.getUserAttendance(username);
    }
  }

  isBeforeCheckinTime(): boolean {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour < 13;
  }

  checkin(): void {
    const now = new Date();
    const today = now.toDateString();
    const time = now.toLocaleTimeString();
    const attendance = this.userAttendance.find(a => a.date === today);
    if (attendance) {
      // User has already checked in today
      console.log('You have already checked in today.');
      return;
    }
    // Check if current time is before 1:30 pm local time
    if (!this.isBeforeCheckinTime()) {
      console.log('You can only check in before 1:30 pm.');
      return;
    }
    // User is checking in before 1:30 pm, add a new attendance object
    this.userAttendance.push({ date: today, checkin: time, checkout: '' });
    console.log('Checked in successfully.');
    // Save the updated attendance data to the backend API
    // For example:
    // apiService.updateUserAttendance(localStorage.getItem('username'), this.userAttendance);
  }

  hasCheckedIn(): boolean {
    const now = new Date();
    const attendance = this.userAttendance.find(a => a.date === now.toDateString());
    return attendance !== undefined && attendance.checkin !== '';
  }

  isAfterCheckinTime(): boolean {
    const now = new Date();
    const currentHour = now.getHours();
    return currentHour >= 14;
  }

  checkout(): void {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const attendance = this.userAttendance.find(a => a.date === now.toDateString());
    if (!attendance) {
      // User has not checked in today
      console.log('You have not checked in today.');
      return;
    }
    if (attendance.checkout) {
      // User has already checked out today
      console.log('You have already checked out today.');
      return;
    }
    // Check if current time is after 2:00 pm local time
    if (!this.isAfterCheckinTime()) {
      console.log('You can only check out after 2:00 pm.');
      return;
    }
    // User is checking out after checking in, update the check-out time
    attendance.checkout = time;
    console.log('Checked out successfully.');
    // Save the updated attendance data to the backend API
    // For example:
    // apiService.updateUserAttendance(localStorage.getItem('username'), this.userAttendance);
  }
}
